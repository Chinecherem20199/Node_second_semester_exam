const request = require('supertest');
const { connect } = require('./database');
const app = require('../index');
// const moment = require('moment');
const userModel = require('../models/user_schema');
const blogModel = require('../models/blog_schema');
//  const { response } = require('../app');

describe('Blog Route', () => {
    let conn;
    let token;

    //connect before every test
    beforeAll(async () => {
        conn = await connect();
        await userModel.create({
            email: 'jay@example.com',
            password: 'password1',
            firstname: 'Jamal',
            lastname: 'Ibrahim'
        });

        const loginResponse = await request(app)
            .post('/login')
            .set('content-type', 'application/json')
            .send({ email: 'jay@example.com', password: 'password1' });

        token = loginResponse.body.token;
    });

    //clean up each time after tested
    afterEach(async () => {
        await conn.cleanup();
    });

    //disconnect after all tested
    afterAll(async () => {
        await conn.disconnect();
    });

     it('should return create blog', async() => {
        await blogModel.create({
            title: 'Backend Engineering2',
            description: 'Build Backend for company',
            tags: ['Javascript', 'API', 'node', 'expressjs'],
            body: "A backend engineer is responsible for designing, building, and maintaining the server-side of web applications. In other words, a backend engineer's primary responsibility is to build the structure of a software application. They set the software team's foundations of what they need to do to achieve the main goals."
        });

        const response = await request(app)
            .get('/blogs')
            .set('content-type', 'application/json')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
         expect(response.body).toHaveProperty('Blog');
         expect(response.body).toHaveProperty('status', true);
    });
});

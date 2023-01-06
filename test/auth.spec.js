const request = require('supertest');
const { connect } = require('./database');
const UserModel = require('../models/user_schema');
const app = require('../index');

describe('Auth: Signup', () => {
    let conn;

    beforeAll(async () => {
        conn = await connect();
    });

    afterEach(async () => {
        await conn.cleanup();
    });

    afterAll(async () => {
        await conn.disconnect();
    });

    it('should signup a user', async () => {
        const response = await request(app)
            .post('/signup')
            .set('content-type', 'application/json')
            .send({
                email: 'chiem@gmail.com',
                password: 'Password123',
                firstname: 'tobie',
                lastname: 'Augustina'
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('user');
        expect(response.body.user).toHaveProperty('email', 'chiem@gmail.com');
        expect(response.body.user).toHaveProperty('firstname', 'tobie');
        expect(response.body.user).toHaveProperty('lastname', 'Augustina');
        
    });

    it('should login a user', async () => {
        // create user in out db
        const user = await UserModel.create({
            email: 'chiem@gmail.com',
            password: '123456',
            firstname: 'tobie',
            lastname: 'Augustina'
        });

        // login user
        const response = await request(app)
            .post('/login')
            .set('content-type', 'application/json')
            .send({
                email: 'chiem@gmail.com',
                password: '123456'
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
    });
});

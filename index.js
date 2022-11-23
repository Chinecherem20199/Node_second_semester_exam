
const express = require('express');
const blogsRoute = require('./route/blog_route');
const userRoute = require('./route/user_route');
// const passport = require('passport');
const app = express();
require('./auth/passport');


app.use(express.json());

app.use('/blogs', blogsRoute);
app.use('/', userRoute);

app.get('/', (req, res) => {
    console.log(res)
    res.status(200).json({ message: 'Welcome to the Blog API' });
});

app.use('*', (req, res) => {
    return res.status(404).json({ message: 'Route not found' });
});


module.exports = app;
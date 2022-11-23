
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
    res.status(200);
    res.send('Welcome to the Blog API');
});

app.use(function (err, req, res, next) {
    console.log(err);
    res.status(err.status || 500);
    res.json({ error: err.message });
});


module.exports = app;
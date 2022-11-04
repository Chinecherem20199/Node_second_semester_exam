const express = require('express');
const blogsRoute = require('./route/blog_route');
const userRoute = require('./route/user_route');
// const BasicAuth = require('./auth/auth');

 const bodyParser = require('body-parser');

require('./db').connectToMongoDB() // Connect to MongoDB
require('dotenv').config()
require('./auth/passport')

//require("./authentication/auth") // Signup and login authentication middleware

const PORT = 8080;
const app = express();

// app.use(BasicAuth);

//  app.use(bodyParser.urlencoded({ extended: false }));
// app.use('/', authRoute);
app.use(express.json());

app.use('/blogs', blogsRoute);
app.use('/', userRoute);


app.get('/', (req, res) => {
    res.status(200)
    res.send('Welcome to the book API');
});

app.use(function (err, req, res, next) {
    console.log(err);
    res.status(err.status || 500);
    res.json({ error: err.message });
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
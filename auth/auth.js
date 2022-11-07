// // const { mongo } = require("mongoose");


// const BasicAuth =(req, res, next) =>{
//     const authheader = req.headers.authorization;
//     console.log(req.headers);
 
//     if (!authheader) {

//         // req.setHeader('auth', 'token');
//         res.setHeader('WWW-Authenticate', 'Basic');
//         return res.status(401).json({message: "You are not authenticated!"})
       
//     }
//     //  console.log({authheader});
//     const auth = new Buffer.from(authheader.split(' ')[1],
//     'base64').toString().split(':');
//     const email = auth[0];
//     const pass = auth[1];

//     //understand this code
//     // const userFromDB = mongo.getUser({email})
//     // const decriptPass = decriptPass(userFromDB.pass)
 
//     if (email == 'email' && pass == 'password') {
 
//         // If Authorized user
//         next();
//     } else {
//         res.setHeader('WWW-Authenticate', 'Basic');
//         return res.status(401).json({message: "You are not authenticated!"})
//     }


// }

// module.exports = BasicAuth;
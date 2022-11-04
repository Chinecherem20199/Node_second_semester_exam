const express = require('express');
const passport = require('passport')
const UserController = require('../controller/user_controller')
const userRouter = express.Router();



userRouter.post('/signup', passport.authenticate('signup', { session: false }), UserController.signUp);

userRouter.post("/login", async (req, res, next) =>
  passport.authenticate("login", (err, user, info) => {
    UserController.login(req, res, { err, user, info });
  })(req, res, next)
);

//  userRouter.post("/login", async(req, res, next)=>{
//   passport.authenticate("login", async(err, user, info)=>{
//     try {
//       if(err){
//         return next(err)
//       }
//       if(!user){
//         const error = new Error("Email or Password is incorrect");
//         return next(error);
//       }
//       req.login(user, {session:false})
//     } catch (error) {
//       if(error) 
//       return next(error)
//     }
    
//   })})

 module.exports = userRouter;
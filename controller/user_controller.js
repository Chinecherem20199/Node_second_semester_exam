const jwt = require("jsonwebtoken");
require("dotenv").config();


exports.signUp = async (req, res) => {
console.log(req.body)
return res.status(201).json({
  message: "Sign Up Succesfully.",
  user: req.user
})
};

exports.login = (req, res, { err, user, info}) => {

    if (!user) {
        return res.status(400).json({ message: 'email or password is incorrect'})
    }

    // req.login is provided by passport
    req.login(user, { session: false },
        async (error) => {
            if (error) return res.status(400).json(error)

            const body = { _id: user._id, email: user.email };
            //You store the id and username in the payload of the JWT. 
            // You then sign the token with a secret or key (JWT_SECRET), and send back the token to the user.
            // DO NOT STORE PASSWORDS IN THE JWT!
            const token = jwt.sign(
              { user: body },
              process.env.JWT_SECRET || "something_secret",
              { expiresIn: "1h" }
            );

            return res.status(200).json({ token });
        }
    );
}



  
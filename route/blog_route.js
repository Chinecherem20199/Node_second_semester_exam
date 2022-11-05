const express = require("express");
const passport = require("passport");
const BlogController = require("../controller/blog_controller");
// require("../auth/passport");

const blogRouter = express.Router();

blogRouter.get("/", BlogController.getBlogs);
blogRouter.get("/:id", BlogController.getBlog);

blogRouter.post("/", passport.authenticate("jwt", { session: false }),BlogController.createBlog);

blogRouter.put("/:id", passport.authenticate("jwt", { session: false }), BlogController.updateBlog);
blogRouter.delete("/:id", passport.authenticate("jwt", { session: false }), BlogController.deleteBlog);

module.exports = blogRouter;

const express = require("express");
const {
  getPost,
  getTopPost,
  updatePost,
  deletePost,
  createPost,
} = require("../controller/post.controller");
const { registerUser, loginUser } = require("../controller/user.controller");
const { Authenticator } = require("../middlewares/Authenticator");

const postRouter = express.Router();

postRouter.use(Authenticator);

postRouter.get("/", getPost);
postRouter.post("/create", createPost);
postRouter.get("/top", getTopPost);

postRouter.patch("/update/:_id", updatePost);

postRouter.delete("/delete/:_id", deletePost);

module.exports = {
  postRouter,
};

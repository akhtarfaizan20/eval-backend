const { PostModel } = require("../model/posts.model");
const { UserModel } = require("../model/users.model");

const getPost = async (req, res) => {
  const userID = req.body.userID;
  try {
    let data = await PostModel.find({ userID });
    res.send(data);
  } catch (error) {
    res.status(400).send({ msg: "Cannot get the post" });
  }
};

const createPost = async (req, res) => {
  try {
    let data = new PostModel(req.body);
    await data.save();
    res.status(201).send({ msg: "post is successfully added" });
  } catch (err) {
    console.log(err);
    res.status(400).send({ msg: "Cannot add the post" });
  }
};

const getTopPost = async (req, res) => {
  const userID = req.body.userID;
  try {
    let data = await PostModel.find({ userID }).sort({
      no_if_comments: "desc",
    });
    res.send(data[0]);
  } catch (error) {
    res.status(400).send({ msg: "Cannot get the post" });
  }
};

const updatePost = async (req, res) => {
  const userID = req.body.userID;
  const { _id } = req.params;
  try {
    await PostModel.findByIdAndUpdate(_id, req.body);
    res.send({ msg: "Updated Successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: "Cannot update the post" });
  }
};
const deletePost = async (req, res) => {
  const userID = req.body.userID;
  const { _id } = req.params;
  try {
    await PostModel.findByIdAndDelete(_id);
    res.send({ msg: "Deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: "Cannot update the post" });
  }
};

module.exports = {
  getPost,
  getTopPost,
  updatePost,
  deletePost,
  createPost,
};

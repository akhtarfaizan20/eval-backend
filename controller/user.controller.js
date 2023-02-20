const { UserModel } = require("../model/users.model");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const registerUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await UserModel.find({ email });
    if (existingUser.length) {
      res.status(400).send({ msg: "User already exist, please login" });
    } else {
      bcrypt.hash(password, 5, async function (err, hash) {
        // Store hash in your password DB.
        if (err) {
          res.status(400).send({ msg: "Error is password hashing" });
        } else {
          let data = new UserModel({ ...req.body, password: hash });
          await data.save();
          res.status(201).send({ msg: "User is successfully registered" });
        }
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: "Something went wrong in registration" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    let existingUser = await UserModel.find({ email });
    if (existingUser.length === 0) {
      res.status(404).send({ msg: "Email ID is not registered" });
    } else {
      bcrypt.compare(
        password,
        existingUser[0].password,
        function (err, result) {
          if (err) {
            res.status(400).send({ msg: "Error is password hashing" });
          } else {
            if (result) {
              const token = jwt.sign(
                { _id: existingUser[0]._id },
                process.env.JWT_SECRET
              );
              res.send({ msg: "Login Successfull", token: token });
            } else {
              res.status(400).send({ msg: "Wrong Password" });
            }
          }
        }
      );
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: "Something went wrong in login" });
  }
};

module.exports = {
  registerUser,
  loginUser,
};

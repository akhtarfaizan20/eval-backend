const jwt = require("jsonwebtoken");
const { UserModel } = require("../model/users.model");

const Authenticator = async (req, res, next) => {
  const token = req.headers.authorization;
  try {
    // console.log(req.headers);
    jwt.verify(token, process.env.JWT_SECRET, async function (err, decoded) {
      if (err) {
        console.log(err);
        res.status(400).send({ msg: "Error is authenticator verify token" });
      } else {
        // console.log(decoded);
        const user = await UserModel.findById(decoded._id);
        if (user) {
          req.body.userID = decoded._id;
          next();
        } else {
          res.status(400).send({ msg: "Invalid Token" });
        }
      }
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: "Error in Authenticator" });
  }
};

module.exports = {
  Authenticator,
};

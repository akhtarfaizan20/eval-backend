const express = require("express");
const { connectDB } = require("./config/db");
const { postRouter } = require("./routes/posts.routes");
const { userRouter } = require("./routes/users.routes");
var cors = require("cors");
require("dotenv").config();
const app = express();
app.use(express.json());

app.use(cors());
app.use("/users", userRouter);

app.use("/posts", postRouter);

app.get("/", (req, res) => {
  res.send("Homepage");
});

app.listen(process.env.PORT, async () => {
  try {
    await connectDB;
    console.log("Connected to DB");
  } catch (error) {
    console.log(error);
  }
  console.log(`Server is running`);
});

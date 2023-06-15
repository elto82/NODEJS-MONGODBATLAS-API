require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user.js");

const port = process.env.PORT || 9000;

const app = express();

app.use(express.json());
app.use("/api", userRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ status: "ok", message: "Hello people" });
});

//connect Db
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log("http://localhost:" + port);
});

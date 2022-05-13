const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const courseRoutes = require("./course-routes");

const app = express();

app.use(bodyParser.json());
app.use("/course", courseRoutes);

app.use((req, res, next) => {
  throw new Error("couldnt find this route");
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "unknown error occured..!" });
});

mongoose
  .connect(
    "mongodb+srv://OG1:11223344@cluster0.owz5w.mongodb.net/School1?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });

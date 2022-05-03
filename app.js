const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const courseRoutes = require("./course-routes");

const app = express();

app.use(bodyParser.json());
app.use("/course", courseRoutes);

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

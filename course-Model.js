const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const courseSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  coverImage: { type: String, required: false },
  id: { type: String, required: true },
});

module.exports = mongoose.model("Course", courseSchema);

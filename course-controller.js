const Course = require("./course-Model");

const mongoose = require("mongoose");

const createCourse = async (req, res, next) => {
  const { title, description, coverImage, id } = req.body;

  try {
    let existingTitle = await Course.find({ title: title });

    if (existingTitle) {
      console.log(existingTitle);
      res.json({
        message: "invalid inputs, course with same title already exists.",
      });
      return;
    }
  } catch (error) {
    return next(error);
  }
  const newCourse = new Course({ title, description, coverImage, id });
  try {
    await newCourse.save();
  } catch (error) {
    return next(error);
  }
  res.json({ message: `new course added with title:${newCourse.title}` });
};

const updateCourse = async (req, res, next) => {
  const { id, updtitle, upddescription, updImage } = req.body;
  try {
    let updCourse = await Course.find({ id });
  } catch (error) {
    return next(error);
  }
  if (updtitle) {
    updCourse.title = updtitle;
  }
  if (upddescription) {
    updCourse.description = upddescription;
  }
  if (updImage) {
    updCourse.coverImage = updImage;
  }
  try {
    await updCourse.save();
  } catch (err) {
    return next(err);
  }
  res.json({ message: "updated course" });
};
exports.createCourse = createCourse;
exports.updateCourse = updateCourse;

const Course = require("./course-Model");

const mongoose = require("mongoose");

const createCourse = async (req, res, next) => {
  const { title, description, coverImage, id } = req.body;

  try {
    let existingTitle = await Course.findOne({ title: title });
    console.log(existingTitle);
    if (existingTitle) {
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
  let updCourse;
  try {
    updCourse = await Course.findOne({ id: id });
    console.log(updCourse.id);
    if (updtitle) {
      updCourse.title = updtitle;
    }
    if (upddescription) {
      updCourse.description = upddescription;
    }
    if (updImage) {
      updCourse.coverImage = updImage;
    }
  } catch (error) {
    return next(error);
  }
  try {
    await updCourse.save();
  } catch (err) {
    return next(err);
  }
  res.json({ message: "updated course" });
};

const deleteCourse = async (req, res, next) => {
  const { id } = req.body;
  let delCourse;
  try {
    delCourse = await Course.findOne({ id });
  } catch (error) {
    return next(error);
  }
  // if (!delCourse) {
  //   res.json({
  //     message: "couldnt delete, no course with such ID, please try again",
  //   });
  //   return;
  // }
  let now = new Date().getUTCDate;
  console.log(now);
  console.log(delCourse.createdAt);
};
exports.createCourse = createCourse;
exports.updateCourse = updateCourse;
exports.delCourse = deleteCourse;

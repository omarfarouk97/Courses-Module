const Course = require("./course-Model");

const mongoose = require("mongoose");

const createCourse = async (req, res, next) => {
  const { title, description, coverImage, id } = req.body;

  try {
    let existingTitle = await Course.findOne({ title: title });

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
    //let now = newCourse.createdAt;
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
  if (!delCourse) {
    res.json({
      message:
        "Deletion error, no course with entered ID exists, please try again",
    });
    return;
  }
  const milliSToDay = 1000 * 60 * 60 * 24;
  let currentDay = new Date();
  let dayDiff =
    (currentDay.getTime() - delCourse.createdAt.getTime()) / milliSToDay;

  if (dayDiff <= 3) {
    try {
      await Course.deleteOne({ id });
    } catch (error) {
      return next(error);
    }
    res.json({ message: `Course: ${delCourse.title}, deleted.` });
  } else {
    res.json({
      message: `Couldn't delete course:${delCourse.title}, course has passed allowed deletion period (3 Days).`,
    });
    return;
  }
};
const listCourses = async (req, res, next) => {
  let courses;
  try {
    courses = await Course.find();
  } catch (error) {
    return next(error);
  }
  res.json({ courses: courses });
};
const filterCourses = async (req, res, next) => {
  let { filter } = req.body; //to test,enter in JSON Format {"filter":"<insert here value you want to search>""}
  let results;
  try {
    results = await Course.find({
      title: { $regex: filter, $options: "i" },
    });
  } catch (err) {
    return next(err);
  }
  res.json({ result: results });
};

exports.createCourse = createCourse;
exports.updateCourse = updateCourse;
exports.deleteCourse = deleteCourse;
exports.listCourses = listCourses;
exports.filterCourses = filterCourses;

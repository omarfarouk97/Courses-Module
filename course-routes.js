const express = require("express");
const courseController = require("./course-controller");

const router = express.Router();

router.post("/create", courseController.createCourse);
router.patch("/update", courseController.updateCourse);
router.delete("/delete", courseController.deleteCourse);

module.exports = router;

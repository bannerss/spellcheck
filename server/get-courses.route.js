"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCourseById = exports.getAllCourses = void 0;
const db_data_1 = require("../src/db-data");
function getAllCourses(req, res) {
    res.status(200).json(Object.values(db_data_1.COURSES));
}
exports.getAllCourses = getAllCourses;
function getCourseById(req, res) {
    const courseId = req.params['id'];
    const courses = Object.values(db_data_1.COURSES);
    const course = courses.find(course => course.id == courseId);
    res.status(200).json(course);
}
exports.getCourseById = getCourseById;
//# sourceMappingURL=get-courses.route.js.map
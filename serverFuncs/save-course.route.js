"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveCourse = void 0;
const db_data_1 = require("../../src/db-data");
function saveCourse(req, res) {
    const id = req.params["id"], changes = req.body;
    console.log("Saving course", id, JSON.stringify(changes));
    const course = (0, db_data_1.findCourseById)(+id);
    course.description = changes.description;
    res.status(200).json(course);
}
exports.saveCourse = saveCourse;
//# sourceMappingURL=save-course.route.js.map
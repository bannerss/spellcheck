import { findCourseById } from '../../src/db-data';
export function saveCourse(req, res) {
    const id = req.params["id"], changes = req.body;
    console.log("Saving course", id, JSON.stringify(changes));
    const course = findCourseById(+id);
    course.description = changes.description;
    res.status(200).json(course);
}
//# sourceMappingURL=save-course.route.js.map
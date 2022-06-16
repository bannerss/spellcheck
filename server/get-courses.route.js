import { COURSES } from '../src/db-data';
export function getAllCourses(req, res) {
    res.status(200).json(Object.values(COURSES));
}
export function getCourseById(req, res) {
    const courseId = req.params['id'];
    const courses = Object.values(COURSES);
    const course = courses.find(course => course.id == courseId);
    res.status(200).json(course);
}
//# sourceMappingURL=get-courses.route.js.map
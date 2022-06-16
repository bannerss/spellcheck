import * as express from 'express';
import { getAllCourses } from './server/get-courses.route';
import { saveCourse } from './server/save-course.route';
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
app.use(cors({ origin: true }));
app.use(bodyParser.json());
app.route('/api/courses').get(getAllCourses);
app.route('/api/courses/:id').put(saveCourse);
const httpServer = app.listen(9000, () => {
    console.log("HTTP REST API Server running at http://localhost:" + httpServer.address().port);
});
//# sourceMappingURL=server.js.map
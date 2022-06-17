"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const get_courses_route_1 = require("./server/get-courses.route");
const save_course_route_1 = require("./server/save-course.route");
const cors = require('cors');
const path = require("path");
const bodyParser = require('body-parser');
const app = express();
app.use(cors({ origin: true }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    console.log = function () { };
    /*if(req.hostname.indexOf('https://www.izkor.gov.il') < 0 && req.query.utm_source)
    {
      return res.redirect(301, 'https://www.izkor.gov.il/' + req.originalUrl);
    }*/
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('X-Frame-Options', 'sameorigin'); // deny
    res.setHeader('X-Content-Type-Options', 'nosniff'); //disable nosniff? for MIME mismatch?
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    //res.setHeader('Strict-Transport-Security', 'max-age=31536000');
    //res.setHeader('Cache-Control', 'no-cache');
    //handle cors:
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, MERGE, PATCH, DELETE');
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Access-Control-Allow-Credentials', "true");
    next();
});
app.route('/api/courses').get(get_courses_route_1.getAllCourses);
app.route('/api/courses/:id').put(save_course_route_1.saveCourse);
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/index.html'));
});
const port = (process.env.PORT || 9000);
const httpServer = app.listen(port, () => {
    // let adrs = httpServer.address() as AddressInfo ;
    console.log("HTTP REST API Server running at http://localhost:" + port);
});
//# sourceMappingURL=server.js.map
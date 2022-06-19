"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoursesService = void 0;
const core_1 = require("@angular/core");
const http_1 = require("@angular/common/http");
let counter = 0;
let CoursesService = class CoursesService {
    constructor(http) {
        this.http = http;
        counter++;
        this.id = counter;
    }
    loadCourses() {
        const params = new http_1.HttpParams()
            .set("page", "1")
            .set("pageSize", "10");
        return this.http.get('/api/courses', { params });
    }
    saveCourse(course) {
        const headers = new http_1.HttpHeaders()
            .set("X-Auth", "userId");
        return this.http.put(`/api/courses/${course.id}`, course, { headers });
    }
};
CoursesService = __decorate([
    (0, core_1.Injectable)()
], CoursesService);
exports.CoursesService = CoursesService;
//# sourceMappingURL=courses.service.js.map
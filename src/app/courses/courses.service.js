var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
let counter = 0;
let CoursesService = class CoursesService {
    constructor(http) {
        this.http = http;
        counter++;
        this.id = counter;
    }
    loadCourses() {
        const params = new HttpParams()
            .set("page", "1")
            .set("pageSize", "10");
        return this.http.get('/api/courses', { params });
    }
    saveCourse(course) {
        const headers = new HttpHeaders()
            .set("X-Auth", "userId");
        return this.http.put(`/api/courses/${course.id}`, course, { headers });
    }
};
CoursesService = __decorate([
    Injectable()
], CoursesService);
export { CoursesService };
//# sourceMappingURL=courses.service.js.map
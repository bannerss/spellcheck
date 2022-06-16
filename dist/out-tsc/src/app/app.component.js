var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Component, Inject } from '@angular/core';
import { CONFIG_TOKEN } from './config';
import { COURSES } from '../db-data';
import { createCustomElement } from '@angular/elements';
import { CourseTitleComponent } from './course-title/course-title.component';
let AppComponent = class AppComponent {
    constructor(coursesService, config, injector) {
        this.coursesService = coursesService;
        this.config = config;
        this.injector = injector;
        this.courses = COURSES;
        this.coursesTotal = this.courses.length;
    }
    ngOnInit() {
        const htmlElement = createCustomElement(CourseTitleComponent, { injector: this.injector });
        customElements.define('course-title', htmlElement);
    }
    onEditCourse() {
        this.courses[1].category = 'ADVANCED';
    }
    save(course) {
        this.coursesService.saveCourse(course)
            .subscribe(() => console.log('Course Saved!'));
    }
};
AppComponent = __decorate([
    Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.css'],
    }),
    __param(1, Inject(CONFIG_TOKEN))
], AppComponent);
export { AppComponent };
//# sourceMappingURL=app.component.js.map
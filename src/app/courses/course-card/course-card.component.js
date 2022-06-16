var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Attribute, Component, EventEmitter, Input, Output } from '@angular/core';
let CourseCardComponent = class CourseCardComponent {
    constructor(coursesService, type) {
        this.coursesService = coursesService;
        this.type = type;
        this.courseEmitter = new EventEmitter();
    }
    ngOnInit() {
    }
    onTitleChanged(newTitle) {
        this.course.description = newTitle;
    }
    onSaveClicked(description) {
        this.courseEmitter.emit({ ...this.course, description });
    }
};
__decorate([
    Input()
], CourseCardComponent.prototype, "course", void 0);
__decorate([
    Input()
], CourseCardComponent.prototype, "cardIndex", void 0);
__decorate([
    Output('courseChanged')
], CourseCardComponent.prototype, "courseEmitter", void 0);
CourseCardComponent = __decorate([
    Component({
        selector: 'course-card',
        templateUrl: './course-card.component.html',
        styleUrls: ['./course-card.component.css']
    }),
    __param(1, Attribute('type'))
], CourseCardComponent);
export { CourseCardComponent };
//# sourceMappingURL=course-card.component.js.map
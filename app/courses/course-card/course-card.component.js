"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseCardComponent = void 0;
const core_1 = require("@angular/core");
let CourseCardComponent = class CourseCardComponent {
    constructor(coursesService, type) {
        this.coursesService = coursesService;
        this.type = type;
        this.courseEmitter = new core_1.EventEmitter();
    }
    ngOnInit() {
    }
    onTitleChanged(newTitle) {
        this.course.description = newTitle;
    }
    onSaveClicked(description) {
        this.courseEmitter.emit(Object.assign(Object.assign({}, this.course), { description }));
    }
};
__decorate([
    (0, core_1.Input)()
], CourseCardComponent.prototype, "course", void 0);
__decorate([
    (0, core_1.Input)()
], CourseCardComponent.prototype, "cardIndex", void 0);
__decorate([
    (0, core_1.Output)('courseChanged')
], CourseCardComponent.prototype, "courseEmitter", void 0);
CourseCardComponent = __decorate([
    (0, core_1.Component)({
        selector: 'course-card',
        templateUrl: './course-card.component.html',
        styleUrls: ['./course-card.component.css']
    }),
    __param(1, (0, core_1.Attribute)('type'))
], CourseCardComponent);
exports.CourseCardComponent = CourseCardComponent;
//# sourceMappingURL=course-card.component.js.map
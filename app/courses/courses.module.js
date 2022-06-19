"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoursesModule = void 0;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const course_card_component_1 = require("./course-card/course-card.component");
const course_image_component_1 = require("./course-image/course-image.component");
const courses_service_1 = require("./courses.service");
const highlighted_directive_1 = require("./directives/highlighted.directive");
const ngx_unless_directive_1 = require("./directives/ngx-unless.directive");
const filter_by_category_pipe_1 = require("./filter-by-category.pipe");
let CoursesModule = class CoursesModule {
};
CoursesModule = __decorate([
    (0, core_1.NgModule)({
        imports: [
            common_1.CommonModule
        ],
        declarations: [
            course_card_component_1.CourseCardComponent,
            course_image_component_1.CourseImageComponent,
            highlighted_directive_1.HighlightedDirective,
            ngx_unless_directive_1.NgxUnlessDirective,
            filter_by_category_pipe_1.FilterByCategoryPipe
        ],
        exports: [
            course_card_component_1.CourseCardComponent,
            course_image_component_1.CourseImageComponent,
            filter_by_category_pipe_1.FilterByCategoryPipe
        ],
        providers: [courses_service_1.CoursesService],
        schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA]
    })
], CoursesModule);
exports.CoursesModule = CoursesModule;
//# sourceMappingURL=courses.module.js.map
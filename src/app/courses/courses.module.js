var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseCardComponent } from './course-card/course-card.component';
import { CourseImageComponent } from './course-image/course-image.component';
import { CoursesService } from './courses.service';
import { HighlightedDirective } from './directives/highlighted.directive';
import { NgxUnlessDirective } from './directives/ngx-unless.directive';
import { FilterByCategoryPipe } from './filter-by-category.pipe';
let CoursesModule = class CoursesModule {
};
CoursesModule = __decorate([
    NgModule({
        imports: [
            CommonModule
        ],
        declarations: [
            CourseCardComponent,
            CourseImageComponent,
            HighlightedDirective,
            NgxUnlessDirective,
            FilterByCategoryPipe
        ],
        exports: [
            CourseCardComponent,
            CourseImageComponent,
            FilterByCategoryPipe
        ],
        providers: [CoursesService],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
], CoursesModule);
export { CoursesModule };
//# sourceMappingURL=courses.module.js.map
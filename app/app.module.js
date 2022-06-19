"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const platform_browser_1 = require("@angular/platform-browser");
const core_1 = require("@angular/core");
const app_component_1 = require("./app.component");
const animations_1 = require("@angular/platform-browser/animations");
const http_1 = require("@angular/common/http");
const courses_module_1 = require("./courses/courses.module");
const course_title_component_1 = require("./course-title/course-title.component");
const spell_check_module_1 = require("./spellcheck/spell-check.module");
const forms_1 = require("@angular/forms");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, core_1.NgModule)({
        declarations: [
            app_component_1.AppComponent,
            course_title_component_1.CourseTitleComponent
        ],
        imports: [
            forms_1.FormsModule,
            platform_browser_1.BrowserModule,
            animations_1.BrowserAnimationsModule,
            http_1.HttpClientModule,
            courses_module_1.CoursesModule,
            spell_check_module_1.SpellCheckModule
        ],
        providers: [],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map
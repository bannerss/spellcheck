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
exports.AppComponent = void 0;
const core_1 = require("@angular/core");
const config_1 = require("./config");
const db_data_1 = require("../db-data");
const elements_1 = require("@angular/elements");
const course_title_component_1 = require("./course-title/course-title.component");
let AppComponent = class AppComponent {
    constructor(coursesService, config, injector, dictionaryManagerService) {
        this.coursesService = coursesService;
        this.config = config;
        this.injector = injector;
        this.dictionaryManagerService = dictionaryManagerService;
        this.courses = db_data_1.COURSES;
        this.coursesTotal = this.courses.length;
        this.nonWordsArray = ["ילדד", "גרלל", "בןן"];
        this.txt = "";
    }
    ngOnInit() {
        const htmlElement = (0, elements_1.createCustomElement)(course_title_component_1.CourseTitleComponent, { injector: this.injector });
        customElements.define('course-title', htmlElement);
    }
    onEditCourse() {
        this.courses[1].category = 'ADVANCED';
    }
    save(course) {
        this.coursesService.saveCourse(course)
            .subscribe(() => console.log('Course Saved!'));
    }
    rebuildNonWordsArray(textAreaContent) {
        if (textAreaContent) {
            let userTextArray = textAreaContent.split(/[\s,.]+/).filter(element => element);
            for (let element = 0; element < userTextArray.length; element++)
                if (!this.nonWordsArray.includes(userTextArray[element])) {
                    if (!this.dictionaryManagerService.search(userTextArray[element])) {
                        this.nonWordsArray.push(userTextArray[element]);
                    }
                }
        }
    }
};
AppComponent = __decorate([
    (0, core_1.Component)({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.css'],
    }),
    __param(1, (0, core_1.Inject)(config_1.CONFIG_TOKEN))
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map
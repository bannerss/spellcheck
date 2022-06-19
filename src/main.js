"use strict";
(self["webpackChunkangular_course"] = self["webpackChunkangular_course"] || []).push([["main"],{

/***/ 5041:
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppComponent = void 0;
const config_1 = __webpack_require__(/*! ./config */ 9698);
const db_data_1 = __webpack_require__(/*! ../db-data */ 6764);
const elements_1 = __webpack_require__(/*! @angular/elements */ 7616);
const course_title_component_1 = __webpack_require__(/*! ./course-title/course-title.component */ 7583);
const i0 = __importStar(__webpack_require__(/*! @angular/core */ 3184));
const i1 = __importStar(__webpack_require__(/*! ./courses/courses.service */ 4745));
const i2 = __importStar(__webpack_require__(/*! ./spellcheck/services/dictionary-manager.service */ 3794));
const i3 = __importStar(__webpack_require__(/*! @angular/common */ 6362));
const i4 = __importStar(__webpack_require__(/*! ./courses/course-card/course-card.component */ 5126));
const i5 = __importStar(__webpack_require__(/*! ./courses/course-image/course-image.component */ 8360));
const i6 = __importStar(__webpack_require__(/*! ./spellcheck/spell-check-validator/spell-check-validator.component */ 5628));
function AppComponent_course_card_7_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "course-card", 8);
    i0.ɵɵlistener("courseChanged", function AppComponent_course_card_7_Template_course_card_courseChanged_0_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.save($event)); });
    i0.ɵɵelement(1, "course-image", 9);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const course_r1 = ctx.$implicit;
    i0.ɵɵproperty("course", course_r1);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("src", course_r1.iconUrl);
} }
class AppComponent {
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
}
exports.AppComponent = AppComponent;
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(i0.ɵɵdirectiveInject(i1.CoursesService), i0.ɵɵdirectiveInject(config_1.CONFIG_TOKEN), i0.ɵɵdirectiveInject(i0.Injector), i0.ɵɵdirectiveInject(i2.DictionaryManagerService)); };
AppComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AppComponent, selectors: [["app-root"]], decls: 9, vars: 2, consts: function () { let i18n_0; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        /**
         * @suppress {msgDescriptions}
         */
        const MSG_EXTERNAL_5048677437444385397$$SRC_APP_APP_COMPONENT_TS_1 = goog.getMsg("Edit Course");
        i18n_0 = MSG_EXTERNAL_5048677437444385397$$SRC_APP_APP_COMPONENT_TS_1;
    }
    else {
        i18n_0 = $localize `:␟756b2b2744938130877e47fd8e697024cb532092␟5048677437444385397:Edit Course`;
    } return [[1, "top-menu"], ["src", "https://angular-academy.s3.amazonaws.com/main-logo/main-page-logo-small-hat.png", 1, "logo"], [1, "demo"], [3, "click"], i18n_0, [1, "courses"], ["type", "beginner", 3, "course", "courseChanged", 4, "ngFor", "ngForOf"], [3, "nonWordsArray"], ["type", "beginner", 3, "course", "courseChanged"], [3, "src"]]; }, template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelement(1, "img", 1);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(2, "div")(3, "div", 2)(4, "button", 3);
        i0.ɵɵlistener("click", function AppComponent_Template_button_click_4_listener() { return ctx.onEditCourse(); });
        i0.ɵɵi18n(5, 4);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(6, "div", 5);
        i0.ɵɵtemplate(7, AppComponent_course_card_7_Template, 2, 2, "course-card", 6);
        i0.ɵɵelementEnd();
        i0.ɵɵelement(8, "spell-check-validator", 7);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(7);
        i0.ɵɵproperty("ngForOf", ctx.courses);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("nonWordsArray", ctx.nonWordsArray);
    } }, dependencies: [i3.NgForOf, i4.CourseCardComponent, i5.CourseImageComponent, i6.SpellCheckValidatorComponent], styles: [".top-menu[_ngcontent-%COMP%] {\r\n    background: #1976d2;\r\n    padding: 2px 15px;\r\n}\r\n\r\n.logo[_ngcontent-%COMP%] {\r\n  max-height: 55px;\r\n}\r\n\r\n.courses[_ngcontent-%COMP%] {\r\n    max-width: 400px;\r\n    margin: 50px auto;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQTtJQUNJLG1CQUFtQjtJQUNuQixpQkFBaUI7QUFDckI7O0FBRUE7RUFDRSxnQkFBZ0I7QUFDbEI7O0FBR0E7SUFDSSxnQkFBZ0I7SUFDaEIsaUJBQWlCO0FBQ3JCIiwiZmlsZSI6ImFwcC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbi50b3AtbWVudSB7XHJcbiAgICBiYWNrZ3JvdW5kOiAjMTk3NmQyO1xyXG4gICAgcGFkZGluZzogMnB4IDE1cHg7XHJcbn1cclxuXHJcbi5sb2dvIHtcclxuICBtYXgtaGVpZ2h0OiA1NXB4O1xyXG59XHJcblxyXG5cclxuLmNvdXJzZXMge1xyXG4gICAgbWF4LXdpZHRoOiA0MDBweDtcclxuICAgIG1hcmdpbjogNTBweCBhdXRvO1xyXG59XHJcblxyXG5cclxuXHJcblxyXG5cclxuIl19 */"] });


/***/ }),

/***/ 6747:
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const platform_browser_1 = __webpack_require__(/*! @angular/platform-browser */ 318);
const app_component_1 = __webpack_require__(/*! ./app.component */ 5041);
const animations_1 = __webpack_require__(/*! @angular/platform-browser/animations */ 3598);
const http_1 = __webpack_require__(/*! @angular/common/http */ 8784);
const courses_module_1 = __webpack_require__(/*! ./courses/courses.module */ 3170);
const course_title_component_1 = __webpack_require__(/*! ./course-title/course-title.component */ 7583);
const spell_check_module_1 = __webpack_require__(/*! ./spellcheck/spell-check.module */ 1488);
const forms_1 = __webpack_require__(/*! @angular/forms */ 587);
const i0 = __importStar(__webpack_require__(/*! @angular/core */ 3184));
class AppModule {
}
exports.AppModule = AppModule;
AppModule.ɵfac = function AppModule_Factory(t) { return new (t || AppModule)(); };
AppModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: AppModule, bootstrap: [app_component_1.AppComponent] });
AppModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ providers: [], imports: [forms_1.FormsModule,
        platform_browser_1.BrowserModule,
        animations_1.BrowserAnimationsModule,
        http_1.HttpClientModule,
        courses_module_1.CoursesModule,
        spell_check_module_1.SpellCheckModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(AppModule, { declarations: [app_component_1.AppComponent,
        course_title_component_1.CourseTitleComponent], imports: [forms_1.FormsModule,
        platform_browser_1.BrowserModule,
        animations_1.BrowserAnimationsModule,
        http_1.HttpClientModule,
        courses_module_1.CoursesModule,
        spell_check_module_1.SpellCheckModule] }); })();


/***/ }),

/***/ 9698:
/*!***************************!*\
  !*** ./src/app/config.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CONFIG_TOKEN = exports.APP_CONFIG = void 0;
const core_1 = __webpack_require__(/*! @angular/core */ 3184);
exports.APP_CONFIG = {
    apiUrl: 'http://localhost:9000',
    courseCacheSize: 10
};
exports.CONFIG_TOKEN = new core_1.InjectionToken('CONFIG_TOKEN', {
    providedIn: 'root',
    factory: () => exports.APP_CONFIG
});


/***/ }),

/***/ 7583:
/*!********************************************************!*\
  !*** ./src/app/course-title/course-title.component.ts ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CourseTitleComponent = void 0;
const i0 = __importStar(__webpack_require__(/*! @angular/core */ 3184));
class CourseTitleComponent {
    constructor() { }
    ngOnInit() {
    }
}
exports.CourseTitleComponent = CourseTitleComponent;
CourseTitleComponent.ɵfac = function CourseTitleComponent_Factory(t) { return new (t || CourseTitleComponent)(); };
CourseTitleComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CourseTitleComponent, selectors: [["course-title"]], inputs: { title: "title" }, decls: 2, vars: 1, consts: [[1, "course-title"]], template: function CourseTitleComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵtext(1);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate1(" ", ctx.title, " ");
    } }, styles: [".course-title[_ngcontent-%COMP%] {\r\n    text-decoration: underline;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvdXJzZS10aXRsZS5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUE7SUFDSSwwQkFBMEI7QUFDOUIiLCJmaWxlIjoiY291cnNlLXRpdGxlLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuXHJcbi5jb3Vyc2UtdGl0bGUge1xyXG4gICAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XHJcbn0iXX0= */"] });


/***/ }),

/***/ 5126:
/*!**************************************************************!*\
  !*** ./src/app/courses/course-card/course-card.component.ts ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CourseCardComponent = void 0;
const core_1 = __webpack_require__(/*! @angular/core */ 3184);
const i0 = __importStar(__webpack_require__(/*! @angular/core */ 3184));
const i1 = __importStar(__webpack_require__(/*! ../courses.service */ 4745));
const i2 = __importStar(__webpack_require__(/*! @angular/common */ 6362));
function CourseCardComponent_div_0_ng_content_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵprojection(0, 0, ["*ngIf", "course.iconUrl"]);
} }
function CourseCardComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 1, 2)(2, "div", 3);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, CourseCardComponent_div_0_ng_content_4_Template, 1, 0, "ng-content", 4);
    i0.ɵɵelementStart(5, "div", 5);
    i0.ɵɵtext(6, " Edit Title: ");
    i0.ɵɵelementStart(7, "input", 6, 7);
    i0.ɵɵlistener("keyup", function CourseCardComponent_div_0_Template_input_keyup_7_listener() { i0.ɵɵrestoreView(_r5); const _r3 = i0.ɵɵreference(8); const ctx_r4 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r4.onTitleChanged(_r3.value)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "div", 8)(10, "div", 9);
    i0.ɵɵi18n(11, 10);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "button", 11);
    i0.ɵɵlistener("click", function CourseCardComponent_div_0_Template_button_click_12_listener() { i0.ɵɵrestoreView(_r5); const _r3 = i0.ɵɵreference(8); const ctx_r6 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r6.onSaveClicked(_r3.value)); });
    i0.ɵɵtext(13, "Save Course");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", ctx_r0.cardIndex || "" + " " + ctx_r0.course.description, " ");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.course.iconUrl);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("value", ctx_r0.course.description);
    i0.ɵɵadvance(4);
    i0.ɵɵi18nExp(ctx_r0.course.category);
    i0.ɵɵi18nApply(11);
} }
const _c4 = [[["course-image"]]];
const _c5 = ["course-image"];
class CourseCardComponent {
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
}
exports.CourseCardComponent = CourseCardComponent;
CourseCardComponent.ɵfac = function CourseCardComponent_Factory(t) { return new (t || CourseCardComponent)(i0.ɵɵdirectiveInject(i1.CoursesService), i0.ɵɵinjectAttribute('type')); };
CourseCardComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CourseCardComponent, selectors: [["course-card"]], inputs: { course: "course", cardIndex: "cardIndex" }, outputs: { courseEmitter: "courseChanged" }, ngContentSelectors: _c5, decls: 1, vars: 1, consts: function () { let i18n_1; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        /**
         * @suppress {msgDescriptions}
         */
        const MSG_EXTERNAL_7666592539534630094$$SRC_APP_COURSES_COURSE_CARD_COURSE_CARD_COMPONENT_TS__2 = goog.getMsg("{VAR_SELECT, select, BEGINNER {Beginner} INTERMEDIATE {Intermediate} ADVANCED {Advanced}}");
        i18n_1 = MSG_EXTERNAL_7666592539534630094$$SRC_APP_COURSES_COURSE_CARD_COURSE_CARD_COMPONENT_TS__2;
    }
    else {
        i18n_1 = $localize `:␟d136815a5d48f44a4c49fa02b2493417cda30cac␟7666592539534630094:{VAR_SELECT, select, BEGINNER {Beginner} INTERMEDIATE {Intermediate} ADVANCED {Advanced}}`;
    } i18n_1 = i0.ɵɵi18nPostprocess(i18n_1, { "VAR_SELECT": "\uFFFD0\uFFFD" }); let i18n_0; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        /**
         * @suppress {msgDescriptions}
         */
        const MSG_EXTERNAL_3298647605921537140$$SRC_APP_COURSES_COURSE_CARD_COURSE_CARD_COMPONENT_TS__3 = goog.getMsg(" {$icu} ", { "icu": i18n_1 }, { original_code: { "icu": "{\r\n            course.category,\r\n            select,\r\n            BEGINNER {Beginner}\r\n            INTERMEDIATE {Intermediate}\r\n            ADVANCED {Advanced}\r\n        }" } });
        i18n_0 = MSG_EXTERNAL_3298647605921537140$$SRC_APP_COURSES_COURSE_CARD_COURSE_CARD_COMPONENT_TS__3;
    }
    else {
        i18n_0 = $localize `:␟a1f41bf61907bd5d970a1ef782c40b3cd545614b␟3298647605921537140: ${i18n_1}:ICU: `;
    } return [["class", "course-card", 4, "ngIf"], [1, "course-card"], ["container", ""], [1, "course-title"], [4, "ngIf"], [1, "course-description"], [3, "value", "keyup"], ["courseTitle", ""], [1, "course-category"], [1, "category"], i18n_0, [3, "click"]]; }, template: function CourseCardComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵprojectionDef(_c4);
        i0.ɵɵtemplate(0, CourseCardComponent_div_0_Template, 14, 4, "div", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.course);
    } }, dependencies: [i2.NgIf], styles: ["[_nghost-%COMP%] {\r\n  display: block;\r\n}\r\n\r\n.is-first[_nghost-%COMP%] {\r\n  border-top: 2px solid grey;\r\n  padding-top: 20px;\r\n}\r\n\r\n.is-last[_nghost-%COMP%] {\r\n  border-bottom: 2px solid grey;\r\n  padding-top: 20px;\r\n}\r\n\r\n.is-even[_nghost-%COMP%] {\r\n  background: lightgray;\r\n}\r\n\r\n.is-odd[_nghost-%COMP%] {\r\n  background: lightcyan;\r\n}\r\n\r\n.salmon-theme[_nghost-%COMP%]   .course-card[_ngcontent-%COMP%], .salmon-theme   [_nghost-%COMP%]   .course-card[_ngcontent-%COMP%] {\r\n  background: lightsalmon;\r\n}\r\n\r\n.course-card[_ngcontent-%COMP%] {\r\n  margin-bottom: 40px;\r\n  text-align: center;\r\n  border-radius: 4px;\r\n  padding: 20px 0;\r\n  box-shadow: 0 1px 16px 0 rgba(0, 0, 0, .2), 0 2px 8px 0 rgba(0, 0, 0, .14), 0 4px 8px -1px rgba(0, 0, 0, .12);\r\n}\r\n\r\n.course-card[_ngcontent-%COMP%]   .course-title[_ngcontent-%COMP%] {\r\n  font-size: 27px;\r\n  font-weight: bold;\r\n}\r\n\r\n.course-card[_ngcontent-%COMP%]   .course-description[_ngcontent-%COMP%] {\r\n  max-width: 360px;\r\n  margin: 0 auto;\r\n  margin-top: 15px;\r\n  -webkit-user-select: none;\r\n     -moz-user-select: none;\r\n      -ms-user-select: none;\r\n          user-select: none;\r\n}\r\n\r\n.course-card[_ngcontent-%COMP%]   .course-description[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\r\n  font-size: 20px;\r\n}\r\n\r\n.course-card.beginner[_ngcontent-%COMP%] {\r\n  background: lightsalmon;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvdXJzZS1jYXJkLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBO0VBQ0UsY0FBYztBQUNoQjs7QUFFQTtFQUNFLDBCQUEwQjtFQUMxQixpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSw2QkFBNkI7RUFDN0IsaUJBQWlCO0FBQ25COztBQUVBO0VBQ0UscUJBQXFCO0FBQ3ZCOztBQUVBO0VBQ0UscUJBQXFCO0FBQ3ZCOztBQUVBO0VBQ0UsdUJBQXVCO0FBQ3pCOztBQUVBO0VBQ0UsbUJBQW1CO0VBQ25CLGtCQUFrQjtFQUNsQixrQkFBa0I7RUFDbEIsZUFBZTtFQUNmLDZHQUE2RztBQUMvRzs7QUFFQTtFQUNFLGVBQWU7RUFDZixpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxnQkFBZ0I7RUFDaEIsY0FBYztFQUNkLGdCQUFnQjtFQUNoQix5QkFBaUI7S0FBakIsc0JBQWlCO01BQWpCLHFCQUFpQjtVQUFqQixpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsdUJBQXVCO0FBQ3pCIiwiZmlsZSI6ImNvdXJzZS1jYXJkLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuOmhvc3Qge1xyXG4gIGRpc3BsYXk6IGJsb2NrO1xyXG59XHJcblxyXG46aG9zdC5pcy1maXJzdCB7XHJcbiAgYm9yZGVyLXRvcDogMnB4IHNvbGlkIGdyZXk7XHJcbiAgcGFkZGluZy10b3A6IDIwcHg7XHJcbn1cclxuXHJcbjpob3N0LmlzLWxhc3Qge1xyXG4gIGJvcmRlci1ib3R0b206IDJweCBzb2xpZCBncmV5O1xyXG4gIHBhZGRpbmctdG9wOiAyMHB4O1xyXG59XHJcblxyXG46aG9zdC5pcy1ldmVuIHtcclxuICBiYWNrZ3JvdW5kOiBsaWdodGdyYXk7XHJcbn1cclxuXHJcbjpob3N0LmlzLW9kZCB7XHJcbiAgYmFja2dyb3VuZDogbGlnaHRjeWFuO1xyXG59XHJcblxyXG46aG9zdC1jb250ZXh0KC5zYWxtb24tdGhlbWUpIC5jb3Vyc2UtY2FyZCB7XHJcbiAgYmFja2dyb3VuZDogbGlnaHRzYWxtb247XHJcbn1cclxuXHJcbi5jb3Vyc2UtY2FyZCB7XHJcbiAgbWFyZ2luLWJvdHRvbTogNDBweDtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xyXG4gIHBhZGRpbmc6IDIwcHggMDtcclxuICBib3gtc2hhZG93OiAwIDFweCAxNnB4IDAgcmdiYSgwLCAwLCAwLCAuMiksIDAgMnB4IDhweCAwIHJnYmEoMCwgMCwgMCwgLjE0KSwgMCA0cHggOHB4IC0xcHggcmdiYSgwLCAwLCAwLCAuMTIpO1xyXG59XHJcblxyXG4uY291cnNlLWNhcmQgLmNvdXJzZS10aXRsZSB7XHJcbiAgZm9udC1zaXplOiAyN3B4O1xyXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG59XHJcblxyXG4uY291cnNlLWNhcmQgLmNvdXJzZS1kZXNjcmlwdGlvbiB7XHJcbiAgbWF4LXdpZHRoOiAzNjBweDtcclxuICBtYXJnaW46IDAgYXV0bztcclxuICBtYXJnaW4tdG9wOiAxNXB4O1xyXG4gIHVzZXItc2VsZWN0OiBub25lO1xyXG59XHJcblxyXG4uY291cnNlLWNhcmQgLmNvdXJzZS1kZXNjcmlwdGlvbiBpbnB1dCB7XHJcbiAgZm9udC1zaXplOiAyMHB4O1xyXG59XHJcblxyXG4uY291cnNlLWNhcmQuYmVnaW5uZXIge1xyXG4gIGJhY2tncm91bmQ6IGxpZ2h0c2FsbW9uO1xyXG59XHJcblxyXG5cclxuIl19 */"] });


/***/ }),

/***/ 8360:
/*!****************************************************************!*\
  !*** ./src/app/courses/course-image/course-image.component.ts ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CourseImageComponent = void 0;
const i0 = __importStar(__webpack_require__(/*! @angular/core */ 3184));
class CourseImageComponent {
    constructor() { }
    ngOnInit() {
    }
}
exports.CourseImageComponent = CourseImageComponent;
CourseImageComponent.ɵfac = function CourseImageComponent_Factory(t) { return new (t || CourseImageComponent)(); };
CourseImageComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CourseImageComponent, selectors: [["course-image"]], inputs: { imageUrl: ["src", "imageUrl"] }, decls: 3, vars: 1, consts: [[1, "course-image"], ["courseImage", ""], ["width", "300", "alt", "Angular Logo", 3, "src"]], template: function CourseImageComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0, 1);
        i0.ɵɵelement(2, "img", 2);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("src", ctx.imageUrl, i0.ɵɵsanitizeUrl);
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJjb3Vyc2UtaW1hZ2UuY29tcG9uZW50LmNzcyJ9 */"] });


/***/ }),

/***/ 3170:
/*!*******************************************!*\
  !*** ./src/app/courses/courses.module.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CoursesModule = void 0;
const common_1 = __webpack_require__(/*! @angular/common */ 6362);
const course_card_component_1 = __webpack_require__(/*! ./course-card/course-card.component */ 5126);
const course_image_component_1 = __webpack_require__(/*! ./course-image/course-image.component */ 8360);
const courses_service_1 = __webpack_require__(/*! ./courses.service */ 4745);
const highlighted_directive_1 = __webpack_require__(/*! ./directives/highlighted.directive */ 5112);
const ngx_unless_directive_1 = __webpack_require__(/*! ./directives/ngx-unless.directive */ 4856);
const filter_by_category_pipe_1 = __webpack_require__(/*! ./filter-by-category.pipe */ 4137);
const i0 = __importStar(__webpack_require__(/*! @angular/core */ 3184));
class CoursesModule {
}
exports.CoursesModule = CoursesModule;
CoursesModule.ɵfac = function CoursesModule_Factory(t) { return new (t || CoursesModule)(); };
CoursesModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: CoursesModule });
CoursesModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ providers: [courses_service_1.CoursesService], imports: [common_1.CommonModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(CoursesModule, { declarations: [course_card_component_1.CourseCardComponent,
        course_image_component_1.CourseImageComponent,
        highlighted_directive_1.HighlightedDirective,
        ngx_unless_directive_1.NgxUnlessDirective,
        filter_by_category_pipe_1.FilterByCategoryPipe], imports: [common_1.CommonModule], exports: [course_card_component_1.CourseCardComponent,
        course_image_component_1.CourseImageComponent,
        filter_by_category_pipe_1.FilterByCategoryPipe] }); })();


/***/ }),

/***/ 4745:
/*!********************************************!*\
  !*** ./src/app/courses/courses.service.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CoursesService = void 0;
const http_1 = __webpack_require__(/*! @angular/common/http */ 8784);
const i0 = __importStar(__webpack_require__(/*! @angular/core */ 3184));
const i1 = __importStar(__webpack_require__(/*! @angular/common/http */ 8784));
let counter = 0;
class CoursesService {
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
}
exports.CoursesService = CoursesService;
CoursesService.ɵfac = function CoursesService_Factory(t) { return new (t || CoursesService)(i0.ɵɵinject(i1.HttpClient)); };
CoursesService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: CoursesService, factory: CoursesService.ɵfac });


/***/ }),

/***/ 5112:
/*!*************************************************************!*\
  !*** ./src/app/courses/directives/highlighted.directive.ts ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HighlightedDirective = void 0;
const core_1 = __webpack_require__(/*! @angular/core */ 3184);
const i0 = __importStar(__webpack_require__(/*! @angular/core */ 3184));
const i1 = __importStar(__webpack_require__(/*! ../courses.service */ 4745));
class HighlightedDirective {
    constructor(coursesService) {
        this.coursesService = coursesService;
        this.isHighlighted = false;
        this.toggleHighlight = new core_1.EventEmitter();
        console.log('coursesService highlighted ' + coursesService.id);
    }
    get cssClasses() {
        return this.isHighlighted;
    }
    mouseOver($event) {
        console.log($event);
        this.isHighlighted = true;
        this.toggleHighlight.emit(this.isHighlighted);
    }
    mouseLeave() {
        this.isHighlighted = false;
        this.toggleHighlight.emit(this.isHighlighted);
    }
    toggle() {
        this.isHighlighted = !this.isHighlighted;
        this.toggleHighlight.emit(this.isHighlighted);
    }
}
exports.HighlightedDirective = HighlightedDirective;
HighlightedDirective.ɵfac = function HighlightedDirective_Factory(t) { return new (t || HighlightedDirective)(i0.ɵɵdirectiveInject(i1.CoursesService)); };
HighlightedDirective.ɵdir = /*@__PURE__*/ i0.ɵɵdefineDirective({ type: HighlightedDirective, selectors: [["", "highlighted", ""]], hostVars: 2, hostBindings: function HighlightedDirective_HostBindings(rf, ctx) { if (rf & 1) {
        i0.ɵɵlistener("mouseover", function HighlightedDirective_mouseover_HostBindingHandler($event) { return ctx.mouseOver($event); })("mouseleave", function HighlightedDirective_mouseleave_HostBindingHandler() { return ctx.mouseLeave(); });
    } if (rf & 2) {
        i0.ɵɵclassProp("highlighted", ctx.cssClasses);
    } }, inputs: { isHighlighted: ["highlighted", "isHighlighted"] }, outputs: { toggleHighlight: "toggleHighlight" }, exportAs: ["hl"] });


/***/ }),

/***/ 4856:
/*!************************************************************!*\
  !*** ./src/app/courses/directives/ngx-unless.directive.ts ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NgxUnlessDirective = void 0;
const i0 = __importStar(__webpack_require__(/*! @angular/core */ 3184));
class NgxUnlessDirective {
    constructor(templateRef, viewContainer) {
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
        this.visible = false;
    }
    set ngxUnless(condition) {
        if (!condition && !this.visible) {
            this.viewContainer.createEmbeddedView(this.templateRef);
            this.visible = true;
        }
        else if (condition && this.visible) {
            this.viewContainer.clear();
            this.visible = false;
        }
    }
}
exports.NgxUnlessDirective = NgxUnlessDirective;
NgxUnlessDirective.ɵfac = function NgxUnlessDirective_Factory(t) { return new (t || NgxUnlessDirective)(i0.ɵɵdirectiveInject(i0.TemplateRef), i0.ɵɵdirectiveInject(i0.ViewContainerRef)); };
NgxUnlessDirective.ɵdir = /*@__PURE__*/ i0.ɵɵdefineDirective({ type: NgxUnlessDirective, selectors: [["", "ngxUnless", ""]], inputs: { ngxUnless: "ngxUnless" } });


/***/ }),

/***/ 4137:
/*!****************************************************!*\
  !*** ./src/app/courses/filter-by-category.pipe.ts ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FilterByCategoryPipe = void 0;
const i0 = __importStar(__webpack_require__(/*! @angular/core */ 3184));
class FilterByCategoryPipe {
    transform(courses, category) {
        console.log('Called transform()');
        return courses.filter(course => course.category === category);
    }
}
exports.FilterByCategoryPipe = FilterByCategoryPipe;
FilterByCategoryPipe.ɵfac = function FilterByCategoryPipe_Factory(t) { return new (t || FilterByCategoryPipe)(); };
FilterByCategoryPipe.ɵpipe = /*@__PURE__*/ i0.ɵɵdefinePipe({ name: "filterByCategory", type: FilterByCategoryPipe, pure: true });


/***/ }),

/***/ 3794:
/*!*******************************************************************!*\
  !*** ./src/app/spellcheck/services/dictionary-manager.service.ts ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DictionaryManagerService = void 0;
const i0 = __importStar(__webpack_require__(/*! @angular/core */ 3184));
const i1 = __importStar(__webpack_require__(/*! @angular/common/http */ 8784));
class DictionaryManagerService {
    constructor(http) {
        this.http = http;
        this.root = new TrieNode(null);
        http.get("/api/trie").subscribe(res => {
            if (res && res.data) {
                if (JSON.stringify(res.data) !== JSON.stringify({}))
                    this.root = res.data;
            }
        });
    }
    insert(word) {
        let current = this.root;
        // iterate through all the characters of word
        for (let character of word) {
            // if node doesn't have the current character as child, insert it
            if (current.children[character] === undefined) {
                current.children[character] = new TrieNode(character);
            }
            // move down, to insert next character
            current = current.children[character];
        }
        // mark the last inserted character as end of the word
        current.isEndOfWord = true;
        this.updateFile();
        //this.httpservice.updateTrie(this.root);
    }
    bulkInsert(list) {
        list.forEach(element => {
            this.insert(element);
        });
        this.updateFile();
    }
    populateFromFile() {
        this.http.get("/api/trie/populateFromFile").subscribe(res => {
            if (res && res.data) {
                if (JSON.stringify(res.data) !== JSON.stringify({}))
                    this.root = res.data;
            }
        });
    }
    updateFile() {
        //this.coursesService.saveTrie(this.root);
    }
    search(word) {
        let current = this.root;
        // iterate through all the characters of word
        for (let character of word) {
            if (current.children[character] === undefined) {
                // could not find this character in sequence, return false
                return false;
            }
            // move down, to match next character
            current = current.children[character];
        }
        // found all characters, return true if last character is end of a word
        return current.isEndOfWord;
    }
}
exports.DictionaryManagerService = DictionaryManagerService;
DictionaryManagerService.ɵfac = function DictionaryManagerService_Factory(t) { return new (t || DictionaryManagerService)(i0.ɵɵinject(i1.HttpClient)); };
DictionaryManagerService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: DictionaryManagerService, factory: DictionaryManagerService.ɵfac, providedIn: 'root' });
class TrieNode {
    /**
     *
     */
    constructor(value) {
        this.value = '';
        this.isEndOfWord = false; // false by default, a green node means this flag is true
        this.children = {};
        this.value = value;
    }
    populateTrieNode(value) {
        this.value = value;
        this.isEndOfWord = false; // false by default, a green node means this flag is true
        this.children = {}; // children are stored as Map, where key is the letter and value is a TrieNode for that letter 
    }
}


/***/ }),

/***/ 5628:
/*!*************************************************************************************!*\
  !*** ./src/app/spellcheck/spell-check-validator/spell-check-validator.component.ts ***!
  \*************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SpellCheckValidatorComponent = void 0;
const i0 = __importStar(__webpack_require__(/*! @angular/core */ 3184));
const i1 = __importStar(__webpack_require__(/*! ../services/dictionary-manager.service */ 3794));
const i2 = __importStar(__webpack_require__(/*! @angular/forms */ 587));
const _c0 = ["spellcheckerrorsholder"];
class SpellCheckValidatorComponent {
    constructor(dictionaryManagerService) {
        this.dictionaryManagerService = dictionaryManagerService;
        this.textValue = "";
        this.nonWordsArray = [];
        this.doneTypingInterval = 1000;
    }
    handleScroll() {
    }
    onTextAreaChange(content) {
        clearTimeout(this.typingTimer);
        this.typingTimer = setTimeout(this.populateNonWordsArray.bind(this, content), this.doneTypingInterval);
    }
    populateNonWordsArray(txt) {
        if (txt) {
            this.nonWordsArray = [];
            let userTextArray = txt.split(/[\s,.]+/).filter(element => element);
            for (let element = 0; element < userTextArray.length; element++)
                if (!this.nonWordsArray.includes(userTextArray[element])) {
                    if (!this.dictionaryManagerService.search(userTextArray[element])) {
                        this.nonWordsArray.push(userTextArray[element]);
                    }
                }
            txt = txt ? txt
                .replace(/\n$/g, "\n\n") : '';
            this.nonWordsArray.forEach(x => {
                txt = txt
                    .replace(new RegExp(x + '[(?!\\s)|(?!,)|(?!.)]|' + x + '$', 'g'), '<mark style="border-bottom: 1px solid red;background-color: transparent;" class="mark">$&</mark>');
            });
            this.spellcheckerrorsholder.nativeElement.innerHTML = txt;
        }
    }
    applyHighlights(text) {
    }
    createTrie() {
        //const trie = this.dictionaryManagerService;
        // trie.populateFromFile();
        // insert few words
        //trie.insert("CAT");
        //trie.insert("DOG");
        //trie.insert("CATS");
        //trie.insert("FISH");
        // search something
        // trie.search("MAT") // false
        // trie.search("DOG") // true  
    }
}
exports.SpellCheckValidatorComponent = SpellCheckValidatorComponent;
SpellCheckValidatorComponent.ɵfac = function SpellCheckValidatorComponent_Factory(t) { return new (t || SpellCheckValidatorComponent)(i0.ɵɵdirectiveInject(i1.DictionaryManagerService)); };
SpellCheckValidatorComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: SpellCheckValidatorComponent, selectors: [["spell-check-validator"]], viewQuery: function SpellCheckValidatorComponent_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(_c0, 5);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.spellcheckerrorsholder = _t.first);
    } }, inputs: { nonWordsArray: "nonWordsArray" }, decls: 10, vars: 1, consts: [[1, "container"], [1, "backdrop"], ["backdrop", ""], [1, "highlights"], ["spellcheckerrorsholder", ""], [3, "ngModel", "ngModelChange", "scroll"], ["textarea", ""], [3, "click"]], template: function SpellCheckValidatorComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0)(1, "div", 1, 2);
        i0.ɵɵelement(3, "div", 3, 4);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "textarea", 5, 6);
        i0.ɵɵlistener("ngModelChange", function SpellCheckValidatorComponent_Template_textarea_ngModelChange_5_listener($event) { return ctx.onTextAreaChange($event); })("scroll", function SpellCheckValidatorComponent_Template_textarea_scroll_5_listener() { return ctx.handleScroll(); });
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(7, "div")(8, "button", 7);
        i0.ɵɵlistener("click", function SpellCheckValidatorComponent_Template_button_click_8_listener() { return ctx.createTrie(); });
        i0.ɵɵtext(9, "createTrie");
        i0.ɵɵelementEnd()();
    } if (rf & 2) {
        i0.ɵɵadvance(5);
        i0.ɵɵproperty("ngModel", ctx.textValue);
    } }, dependencies: [i2.DefaultValueAccessor, i2.NgControlStatus, i2.NgModel], styles: ["*[_ngcontent-%COMP%], *[_ngcontent-%COMP%]::before, *[_ngcontent-%COMP%]::after {\r\n  box-sizing: border-box;\r\n}\r\n\r\n.container[_ngcontent-%COMP%], .backdrop[_ngcontent-%COMP%], textarea[_ngcontent-%COMP%] {\r\n  width: 460px;\r\n  height: 180px;\r\n}\r\n\r\n.highlights[_ngcontent-%COMP%], textarea[_ngcontent-%COMP%] {\r\n  padding: 10px;\r\n  font: 20px/28px \"Open Sans\", sans-serif;\r\n  letter-spacing: 1px;\r\n}\r\n\r\n.container[_ngcontent-%COMP%] {\r\n  display: block;\r\n  margin: 0 auto;\r\n  transform: translateZ(0);\r\n  -webkit-text-size-adjust: none;\r\n}\r\n\r\n.backdrop[_ngcontent-%COMP%] {\r\n  position: absolute;\r\n  z-index: 1;\r\n  border: 2px solid #685972;\r\n  background-color: #fff;\r\n  overflow: auto;\r\n  pointer-events: none;\r\n  transition: transform 1s;\r\n}\r\n\r\n.highlights[_ngcontent-%COMP%] {\r\n  white-space: pre-wrap;\r\n  word-wrap: break-word;\r\n  color: transparent;\r\n}\r\n\r\ntextarea[_ngcontent-%COMP%] {\r\n  display: block;\r\n  position: absolute;\r\n  z-index: 2;\r\n  margin: 0;\r\n  border: 2px solid #74637f;\r\n  border-radius: 0;\r\n  color: #444;\r\n  background-color: transparent;\r\n  overflow: auto;\r\n  resize: none;\r\n  transition: transform 1s;\r\n}\r\n\r\n  .mark {\r\n  border-radius: 3px;\r\n  color: transparent;\r\n  -webkit-text-decoration: wavy;\r\n          text-decoration: wavy;\r\n  border-bottom: 1px solid red;\r\n  background-color: transparent;\r\n}\r\n\r\n.perspective[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\r\n  transform: perspective(1500px) translateX(155px) rotateY(45deg) scale(1.1);\r\n}\r\n\r\ntextarea[_ngcontent-%COMP%]:focus, button[_ngcontent-%COMP%]:focus {\r\n  outline: none;\r\n  box-shadow: 0 0 0 2px #c6aada;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNwZWxsLWNoZWNrLXZhbGlkYXRvci5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7RUFHRSxzQkFBc0I7QUFDeEI7O0FBRUE7OztFQUdFLFlBQVk7RUFDWixhQUFhO0FBQ2Y7O0FBRUE7O0VBRUUsYUFBYTtFQUNiLHVDQUF1QztFQUN2QyxtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxjQUFjO0VBQ2QsY0FBYztFQUNkLHdCQUF3QjtFQUN4Qiw4QkFBOEI7QUFDaEM7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsVUFBVTtFQUNWLHlCQUF5QjtFQUN6QixzQkFBc0I7RUFDdEIsY0FBYztFQUNkLG9CQUFvQjtFQUNwQix3QkFBd0I7QUFDMUI7O0FBRUE7RUFDRSxxQkFBcUI7RUFDckIscUJBQXFCO0VBQ3JCLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLGNBQWM7RUFDZCxrQkFBa0I7RUFDbEIsVUFBVTtFQUNWLFNBQVM7RUFDVCx5QkFBeUI7RUFDekIsZ0JBQWdCO0VBQ2hCLFdBQVc7RUFDWCw2QkFBNkI7RUFDN0IsY0FBYztFQUNkLFlBQVk7RUFDWix3QkFBd0I7QUFDMUI7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsa0JBQWtCO0VBQ2xCLDZCQUFxQjtVQUFyQixxQkFBcUI7RUFDckIsNEJBQTRCO0VBQzVCLDZCQUE2QjtBQUMvQjs7QUFFQTtFQUNFLDBFQUEwRTtBQUM1RTs7QUFFQTs7RUFFRSxhQUFhO0VBQ2IsNkJBQTZCO0FBQy9CIiwiZmlsZSI6InNwZWxsLWNoZWNrLXZhbGlkYXRvci5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiKixcclxuKjo6YmVmb3JlLFxyXG4qOjphZnRlciB7XHJcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcclxufVxyXG5cclxuLmNvbnRhaW5lcixcclxuLmJhY2tkcm9wLFxyXG50ZXh0YXJlYSB7XHJcbiAgd2lkdGg6IDQ2MHB4O1xyXG4gIGhlaWdodDogMTgwcHg7XHJcbn1cclxuXHJcbi5oaWdobGlnaHRzLFxyXG50ZXh0YXJlYSB7XHJcbiAgcGFkZGluZzogMTBweDtcclxuICBmb250OiAyMHB4LzI4cHggXCJPcGVuIFNhbnNcIiwgc2Fucy1zZXJpZjtcclxuICBsZXR0ZXItc3BhY2luZzogMXB4O1xyXG59XHJcblxyXG4uY29udGFpbmVyIHtcclxuICBkaXNwbGF5OiBibG9jaztcclxuICBtYXJnaW46IDAgYXV0bztcclxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVooMCk7XHJcbiAgLXdlYmtpdC10ZXh0LXNpemUtYWRqdXN0OiBub25lO1xyXG59XHJcblxyXG4uYmFja2Ryb3Age1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICB6LWluZGV4OiAxO1xyXG4gIGJvcmRlcjogMnB4IHNvbGlkICM2ODU5NzI7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcclxuICBvdmVyZmxvdzogYXV0bztcclxuICBwb2ludGVyLWV2ZW50czogbm9uZTtcclxuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMXM7XHJcbn1cclxuXHJcbi5oaWdobGlnaHRzIHtcclxuICB3aGl0ZS1zcGFjZTogcHJlLXdyYXA7XHJcbiAgd29yZC13cmFwOiBicmVhay13b3JkO1xyXG4gIGNvbG9yOiB0cmFuc3BhcmVudDtcclxufVxyXG5cclxudGV4dGFyZWEge1xyXG4gIGRpc3BsYXk6IGJsb2NrO1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICB6LWluZGV4OiAyO1xyXG4gIG1hcmdpbjogMDtcclxuICBib3JkZXI6IDJweCBzb2xpZCAjNzQ2MzdmO1xyXG4gIGJvcmRlci1yYWRpdXM6IDA7XHJcbiAgY29sb3I6ICM0NDQ7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XHJcbiAgb3ZlcmZsb3c6IGF1dG87XHJcbiAgcmVzaXplOiBub25lO1xyXG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAxcztcclxufVxyXG5cclxuOjpuZy1kZWVwIC5tYXJrIHtcclxuICBib3JkZXItcmFkaXVzOiAzcHg7XHJcbiAgY29sb3I6IHRyYW5zcGFyZW50O1xyXG4gIHRleHQtZGVjb3JhdGlvbjogd2F2eTtcclxuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgcmVkO1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xyXG59XHJcblxyXG4ucGVyc3BlY3RpdmUgdGV4dGFyZWEge1xyXG4gIHRyYW5zZm9ybTogcGVyc3BlY3RpdmUoMTUwMHB4KSB0cmFuc2xhdGVYKDE1NXB4KSByb3RhdGVZKDQ1ZGVnKSBzY2FsZSgxLjEpO1xyXG59XHJcblxyXG50ZXh0YXJlYTpmb2N1cyxcclxuYnV0dG9uOmZvY3VzIHtcclxuICBvdXRsaW5lOiBub25lO1xyXG4gIGJveC1zaGFkb3c6IDAgMCAwIDJweCAjYzZhYWRhO1xyXG59XHJcbiJdfQ== */"] });


/***/ }),

/***/ 1488:
/*!**************************************************!*\
  !*** ./src/app/spellcheck/spell-check.module.ts ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SpellCheckModule = void 0;
const common_1 = __webpack_require__(/*! @angular/common */ 6362);
const spell_check_validator_component_1 = __webpack_require__(/*! ./spell-check-validator/spell-check-validator.component */ 5628);
const forms_1 = __webpack_require__(/*! @angular/forms */ 587);
const i0 = __importStar(__webpack_require__(/*! @angular/core */ 3184));
class SpellCheckModule {
}
exports.SpellCheckModule = SpellCheckModule;
SpellCheckModule.ɵfac = function SpellCheckModule_Factory(t) { return new (t || SpellCheckModule)(); };
SpellCheckModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: SpellCheckModule });
SpellCheckModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [common_1.CommonModule, forms_1.FormsModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(SpellCheckModule, { declarations: [spell_check_validator_component_1.SpellCheckValidatorComponent], imports: [common_1.CommonModule, forms_1.FormsModule], exports: [spell_check_validator_component_1.SpellCheckValidatorComponent] }); })();


/***/ }),

/***/ 6764:
/*!************************!*\
  !*** ./src/db-data.ts ***!
  \************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.findCourseById = exports.COURSES = void 0;
exports.COURSES = [
    {
        id: 1,
        description: "Angular Core Deep Dive",
        iconUrl: 'https://s3-us-west-1.amazonaws.com/angular-university/course-images/angular-core-in-depth-small.png',
        longDescription: "A detailed walk-through of the most important part of Angular - the Core and Common modules",
        lessonsCount: 10,
        category: 'INTERMEDIATE'
    },
    {
        id: 2,
        description: "RxJs In Practice Course",
        iconUrl: 'https://s3-us-west-1.amazonaws.com/angular-university/course-images/rxjs-in-practice-course.png',
        longDescription: "Understand the RxJs Observable pattern, learn the RxJs Operators via practical examples",
        category: 'BEGINNER',
        lessonsCount: 10
    },
    {
        id: 3,
        description: 'NgRx In Depth',
        longDescription: "Learn the modern Ngrx Ecosystem, including Store, Effects, Router Store, Ngrx Entity, Dev Tools and Schematics.",
        iconUrl: 'https://s3-us-west-1.amazonaws.com/angular-university/course-images/angular-ngrx-course.png',
        category: 'ADVANCED'
    },
    {
        id: 4,
        description: "Angular for Beginners",
        iconUrl: 'https://angular-academy.s3.amazonaws.com/thumbnails/angular2-for-beginners-small-v2.png',
        longDescription: "Establish a solid layer of fundamentals, learn what's under the hood of Angular",
        category: 'BEGINNER',
        lessonsCount: 10
    },
    {
        id: 5,
        description: 'Angular Security Course',
        longDescription: "Learn Web Security Fundamentals and apply them to defend an Angular / Node Application from multiple types of attacks.",
        iconUrl: 'https://s3-us-west-1.amazonaws.com/angular-university/course-images/security-cover-small-v2.png',
        category: 'ADVANCED',
        lessonsCount: 11
    },
    {
        id: 6,
        description: 'Angular PWA Course',
        longDescription: "Learn Angular Progressive Web Applications, build the future of the Web Today.",
        iconUrl: 'https://s3-us-west-1.amazonaws.com/angular-university/course-images/angular-pwa-course.png',
        category: 'ADVANCED',
        lessonsCount: 8
    },
    {
        id: 7,
        description: 'Angular Advanced Course',
        longDescription: "Learn Advanced Angular functionality typically used in Library Development. Advanced Components, Directives, Testing, Npm",
        iconUrl: 'https://angular-academy.s3.amazonaws.com/thumbnails/advanced_angular-small-v3.png',
        category: 'ADVANCED'
    },
    {
        id: 8,
        description: 'Complete Typescript Course',
        longDescription: "Complete Guide to Typescript From Scratch: Learn the language in-depth and use it to build a Node REST API.",
        iconUrl: 'https://angular-academy.s3.amazonaws.com/thumbnails/typescript-2-small.png',
        category: 'BEGINNER'
    },
    {
        id: 9,
        description: 'Angular Architecture Course',
        longDescription: "Learn the core RxJs Observable Pattern as well and many other Design Patterns for building Reactive Angular Applications.",
        iconUrl: 'https://s3-us-west-1.amazonaws.com/angular-academy/blog/images/rxjs-reactive-patterns-small.png',
        category: 'BEGINNER'
    },
    {
        id: 10,
        description: "Angular Material Course",
        iconUrl: "https://s3-us-west-1.amazonaws.com/angular-university/course-images/material_design.png",
        longDescription: "Build Applications with the official Angular Widget Library",
        category: 'ADVANCED'
    }
];
function findCourseById(courseId) {
    return exports.COURSES.find(course => course.id == courseId);
}
exports.findCourseById = findCourseById;


/***/ }),

/***/ 2340:
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports) => {


// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.environment = void 0;
exports.environment = {
    production: false
};
/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ 4431:
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const __NgCli_bootstrap_1 = __importStar(__webpack_require__(/*! @angular/platform-browser */ 318));
const core_1 = __webpack_require__(/*! @angular/core */ 3184);
const app_module_1 = __webpack_require__(/*! ./app/app.module */ 6747);
const environment_1 = __webpack_require__(/*! ./environments/environment */ 2340);
if (environment_1.environment.production) {
    (0, core_1.enableProdMode)();
}
__NgCli_bootstrap_1.platformBrowser().bootstrapModule(app_module_1.AppModule)
    .catch(err => console.log(err));


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor"], () => (__webpack_exec__(4431)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.js.map
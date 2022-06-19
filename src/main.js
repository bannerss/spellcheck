"use strict";
(self["webpackChunkangular_course"] = self["webpackChunkangular_course"] || []).push([["main"],{

/***/ 5041:
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppComponent = void 0;
const config_1 = __webpack_require__(/*! ./config */ 9698);
const db_data_1 = __webpack_require__(/*! ../db-data */ 6764);
const elements_1 = __webpack_require__(/*! @angular/elements */ 7616);
const course_title_component_1 = __webpack_require__(/*! ./course-title/course-title.component */ 7583);
const i0 = __webpack_require__(/*! @angular/core */ 3184);
const i1 = __webpack_require__(/*! ./courses/courses.service */ 4745);
const i2 = __webpack_require__(/*! @angular/common */ 6362);
const i3 = __webpack_require__(/*! ./courses/course-card/course-card.component */ 5126);
const i4 = __webpack_require__(/*! ./courses/course-image/course-image.component */ 8360);
function AppComponent_course_card_7_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "course-card", 7);
    i0.ɵɵlistener("courseChanged", function AppComponent_course_card_7_Template_course_card_courseChanged_0_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.save($event)); });
    i0.ɵɵelement(1, "course-image", 8);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const course_r1 = ctx.$implicit;
    i0.ɵɵproperty("course", course_r1);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("src", course_r1.iconUrl);
} }
class AppComponent {
    constructor(coursesService, config, injector) {
        this.coursesService = coursesService;
        this.config = config;
        this.injector = injector;
        this.courses = db_data_1.COURSES;
        this.coursesTotal = this.courses.length;
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
}
exports.AppComponent = AppComponent;
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(i0.ɵɵdirectiveInject(i1.CoursesService), i0.ɵɵdirectiveInject(config_1.CONFIG_TOKEN), i0.ɵɵdirectiveInject(i0.Injector)); };
AppComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AppComponent, selectors: [["app-root"]], decls: 8, vars: 1, consts: function () { let i18n_0; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        /**
         * @suppress {msgDescriptions}
         */
        const MSG_EXTERNAL_5048677437444385397$$SRC_APP_APP_COMPONENT_TS_1 = goog.getMsg("Edit Course");
        i18n_0 = MSG_EXTERNAL_5048677437444385397$$SRC_APP_APP_COMPONENT_TS_1;
    }
    else {
        i18n_0 = $localize `:␟756b2b2744938130877e47fd8e697024cb532092␟5048677437444385397:Edit Course`;
    } return [[1, "top-menu"], ["src", "https://angular-academy.s3.amazonaws.com/main-logo/main-page-logo-small-hat.png", 1, "logo"], [1, "demo"], [3, "click"], i18n_0, [1, "courses"], ["type", "beginner", 3, "course", "courseChanged", 4, "ngFor", "ngForOf"], ["type", "beginner", 3, "course", "courseChanged"], [3, "src"]]; }, template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelement(1, "img", 1);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(2, "div")(3, "div", 2)(4, "button", 3);
        i0.ɵɵlistener("click", function AppComponent_Template_button_click_4_listener() { return ctx.onEditCourse(); });
        i0.ɵɵi18n(5, 4);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(6, "div", 5);
        i0.ɵɵtemplate(7, AppComponent_course_card_7_Template, 2, 2, "course-card", 6);
        i0.ɵɵelementEnd()();
    } if (rf & 2) {
        i0.ɵɵadvance(7);
        i0.ɵɵproperty("ngForOf", ctx.courses);
    } }, dependencies: [i2.NgForOf, i3.CourseCardComponent, i4.CourseImageComponent], styles: [".top-menu[_ngcontent-%COMP%] {\r\n    background: #1976d2;\r\n    padding: 2px 15px;\r\n}\r\n\r\n.logo[_ngcontent-%COMP%] {\r\n  max-height: 55px;\r\n}\r\n\r\n.courses[_ngcontent-%COMP%] {\r\n    max-width: 400px;\r\n    margin: 50px auto;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQTtJQUNJLG1CQUFtQjtJQUNuQixpQkFBaUI7QUFDckI7O0FBRUE7RUFDRSxnQkFBZ0I7QUFDbEI7O0FBR0E7SUFDSSxnQkFBZ0I7SUFDaEIsaUJBQWlCO0FBQ3JCIiwiZmlsZSI6ImFwcC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbi50b3AtbWVudSB7XHJcbiAgICBiYWNrZ3JvdW5kOiAjMTk3NmQyO1xyXG4gICAgcGFkZGluZzogMnB4IDE1cHg7XHJcbn1cclxuXHJcbi5sb2dvIHtcclxuICBtYXgtaGVpZ2h0OiA1NXB4O1xyXG59XHJcblxyXG5cclxuLmNvdXJzZXMge1xyXG4gICAgbWF4LXdpZHRoOiA0MDBweDtcclxuICAgIG1hcmdpbjogNTBweCBhdXRvO1xyXG59XHJcblxyXG5cclxuXHJcblxyXG5cclxuIl19 */"] });


/***/ }),

/***/ 6747:
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const platform_browser_1 = __webpack_require__(/*! @angular/platform-browser */ 318);
const app_component_1 = __webpack_require__(/*! ./app.component */ 5041);
const animations_1 = __webpack_require__(/*! @angular/platform-browser/animations */ 3598);
const http_1 = __webpack_require__(/*! @angular/common/http */ 8784);
const courses_module_1 = __webpack_require__(/*! ./courses/courses.module */ 3170);
const course_title_component_1 = __webpack_require__(/*! ./course-title/course-title.component */ 7583);
const i0 = __webpack_require__(/*! @angular/core */ 3184);
class AppModule {
}
exports.AppModule = AppModule;
AppModule.ɵfac = function AppModule_Factory(t) { return new (t || AppModule)(); };
AppModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: AppModule, bootstrap: [app_component_1.AppComponent] });
AppModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ providers: [], imports: [platform_browser_1.BrowserModule,
        animations_1.BrowserAnimationsModule,
        http_1.HttpClientModule,
        courses_module_1.CoursesModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(AppModule, { declarations: [app_component_1.AppComponent,
        course_title_component_1.CourseTitleComponent], imports: [platform_browser_1.BrowserModule,
        animations_1.BrowserAnimationsModule,
        http_1.HttpClientModule,
        courses_module_1.CoursesModule] }); })();


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
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CourseTitleComponent = void 0;
const i0 = __webpack_require__(/*! @angular/core */ 3184);
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
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CourseCardComponent = void 0;
const core_1 = __webpack_require__(/*! @angular/core */ 3184);
const i0 = __webpack_require__(/*! @angular/core */ 3184);
const i1 = __webpack_require__(/*! ../courses.service */ 4745);
const i2 = __webpack_require__(/*! @angular/common */ 6362);
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
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CourseImageComponent = void 0;
const i0 = __webpack_require__(/*! @angular/core */ 3184);
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
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CoursesModule = void 0;
const common_1 = __webpack_require__(/*! @angular/common */ 6362);
const course_card_component_1 = __webpack_require__(/*! ./course-card/course-card.component */ 5126);
const course_image_component_1 = __webpack_require__(/*! ./course-image/course-image.component */ 8360);
const courses_service_1 = __webpack_require__(/*! ./courses.service */ 4745);
const highlighted_directive_1 = __webpack_require__(/*! ./directives/highlighted.directive */ 5112);
const ngx_unless_directive_1 = __webpack_require__(/*! ./directives/ngx-unless.directive */ 4856);
const filter_by_category_pipe_1 = __webpack_require__(/*! ./filter-by-category.pipe */ 4137);
const i0 = __webpack_require__(/*! @angular/core */ 3184);
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
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CoursesService = void 0;
const http_1 = __webpack_require__(/*! @angular/common/http */ 8784);
const i0 = __webpack_require__(/*! @angular/core */ 3184);
const i1 = __webpack_require__(/*! @angular/common/http */ 8784);
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
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HighlightedDirective = void 0;
const core_1 = __webpack_require__(/*! @angular/core */ 3184);
const i0 = __webpack_require__(/*! @angular/core */ 3184);
const i1 = __webpack_require__(/*! ../courses.service */ 4745);
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
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NgxUnlessDirective = void 0;
const i0 = __webpack_require__(/*! @angular/core */ 3184);
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
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FilterByCategoryPipe = void 0;
const i0 = __webpack_require__(/*! @angular/core */ 3184);
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
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const __NgCli_bootstrap_1 = __webpack_require__(/*! @angular/platform-browser */ 318);
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
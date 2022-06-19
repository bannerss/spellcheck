"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const courses_module_1 = require("./courses.module");
describe('CoursesModule', () => {
    let coursesModule;
    beforeEach(() => {
        coursesModule = new courses_module_1.CoursesModule();
    });
    it('should create an instance', () => {
        expect(coursesModule).toBeTruthy();
    });
});
//# sourceMappingURL=courses.module.spec.js.map
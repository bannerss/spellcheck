"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const courses_service_1 = require("./courses.service");
describe('CoursesService', () => {
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({
            providers: [courses_service_1.CoursesService]
        });
    });
    it('should be created', (0, testing_1.inject)([courses_service_1.CoursesService], (service) => {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=courses.service.spec.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const course_title_component_1 = require("./course-title.component");
describe('CourseTitleComponent', () => {
    let component;
    let fixture;
    beforeEach((0, testing_1.waitForAsync)(() => {
        testing_1.TestBed.configureTestingModule({
            declarations: [course_title_component_1.CourseTitleComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(course_title_component_1.CourseTitleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=course-title.component.spec.js.map
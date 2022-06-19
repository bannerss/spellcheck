"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const course_card_component_1 = require("./course-card.component");
describe('CourseCardComponent', () => {
    let component;
    let fixture;
    beforeEach((0, testing_1.waitForAsync)(() => {
        testing_1.TestBed.configureTestingModule({
            declarations: [course_card_component_1.CourseCardComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(course_card_component_1.CourseCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=course-card.component.spec.js.map
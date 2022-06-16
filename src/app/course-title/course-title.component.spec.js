import { TestBed, waitForAsync } from '@angular/core/testing';
import { CourseTitleComponent } from './course-title.component';
describe('CourseTitleComponent', () => {
    let component;
    let fixture;
    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [CourseTitleComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(CourseTitleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=course-title.component.spec.js.map
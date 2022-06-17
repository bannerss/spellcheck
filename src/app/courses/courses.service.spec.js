import { TestBed, inject } from '@angular/core/testing';
import { CoursesService } from './courses.service';
describe('CoursesService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [CoursesService]
        });
    });
    it('should be created', inject([CoursesService], (service) => {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=courses.service.spec.js.map
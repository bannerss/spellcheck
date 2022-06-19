"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const app_component_1 = require("./app.component");
describe('AppComponent', () => {
    beforeEach((0, testing_1.waitForAsync)(() => {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                app_component_1.AppComponent
            ],
        }).compileComponents();
    }));
    it('should create the app', (0, testing_1.waitForAsync)(() => {
        const fixture = testing_1.TestBed.createComponent(app_component_1.AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
    it(`should have as title 'angular-course'`, (0, testing_1.waitForAsync)(() => {
        const fixture = testing_1.TestBed.createComponent(app_component_1.AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app.title).toEqual('angular-course');
    }));
    it('should render title in a h1 tag', (0, testing_1.waitForAsync)(() => {
        const fixture = testing_1.TestBed.createComponent(app_component_1.AppComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('h1').textContent).toContain('Welcome to angular-course!');
    }));
});
//# sourceMappingURL=app.component.spec.js.map
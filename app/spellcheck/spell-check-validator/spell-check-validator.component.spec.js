"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const spell_check_validator_component_1 = require("./spell-check-validator.component");
describe('SpellCheckValidatorComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await testing_1.TestBed.configureTestingModule({
            declarations: [spell_check_validator_component_1.SpellCheckValidatorComponent]
        })
            .compileComponents();
        fixture = testing_1.TestBed.createComponent(spell_check_validator_component_1.SpellCheckValidatorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=spell-check-validator.component.spec.js.map
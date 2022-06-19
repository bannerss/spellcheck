"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpellCheckModule = void 0;
const common_1 = require("@angular/common");
const spell_check_validator_component_1 = require("./spell-check-validator/spell-check-validator.component");
const forms_1 = require("@angular/forms");
const core_1 = require("@angular/core");
let SpellCheckModule = class SpellCheckModule {
};
SpellCheckModule = __decorate([
    (0, core_1.NgModule)({
        imports: [common_1.CommonModule, forms_1.FormsModule],
        declarations: [spell_check_validator_component_1.SpellCheckValidatorComponent],
        exports: [spell_check_validator_component_1.SpellCheckValidatorComponent]
    })
], SpellCheckModule);
exports.SpellCheckModule = SpellCheckModule;
//# sourceMappingURL=spell-check.module.js.map
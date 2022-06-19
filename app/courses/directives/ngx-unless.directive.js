"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NgxUnlessDirective = void 0;
const core_1 = require("@angular/core");
let NgxUnlessDirective = class NgxUnlessDirective {
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
};
__decorate([
    (0, core_1.Input)()
], NgxUnlessDirective.prototype, "ngxUnless", null);
NgxUnlessDirective = __decorate([
    (0, core_1.Directive)({
        selector: '[ngxUnless]'
    })
], NgxUnlessDirective);
exports.NgxUnlessDirective = NgxUnlessDirective;
//# sourceMappingURL=ngx-unless.directive.js.map
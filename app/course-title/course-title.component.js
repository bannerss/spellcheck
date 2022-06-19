"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseTitleComponent = void 0;
const core_1 = require("@angular/core");
let CourseTitleComponent = class CourseTitleComponent {
    constructor() { }
    ngOnInit() {
    }
};
__decorate([
    (0, core_1.Input)()
], CourseTitleComponent.prototype, "title", void 0);
CourseTitleComponent = __decorate([
    (0, core_1.Component)({
        selector: 'course-title',
        templateUrl: './course-title.component.html',
        styleUrls: ['./course-title.component.css']
    })
], CourseTitleComponent);
exports.CourseTitleComponent = CourseTitleComponent;
//# sourceMappingURL=course-title.component.js.map
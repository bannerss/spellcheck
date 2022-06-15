"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextareaHighlightModule = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const highlighed_text_component_1 = require("../highlighed-text.component");
const forms_1 = require("@angular/forms");
let TextareaHighlightModule = class TextareaHighlightModule {
};
TextareaHighlightModule = tslib_1.__decorate([
    (0, core_1.NgModule)({
        imports: [common_1.CommonModule, forms_1.FormsModule],
        declarations: [highlighed_text_component_1.HighlighedTextComponent],
        exports: [highlighed_text_component_1.HighlighedTextComponent]
    })
], TextareaHighlightModule);
exports.TextareaHighlightModule = TextareaHighlightModule;
//# sourceMappingURL=textarea-highlight.module.js.map
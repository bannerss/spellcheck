"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
const app_component_1 = require("./app.component");
const http_1 = require("@angular/common/http");
const textarea_highlight_module_1 = require("./highlighed-text/textarea-highlight/textarea-highlight.module");
const animations_1 = require("@angular/platform-browser/animations");
const forms_1 = require("@angular/forms");
const spell_check_textarea_component_1 = require("./spell-check-textarea/spell-check-textarea.component");
let AppModule = class AppModule {
};
AppModule = tslib_1.__decorate([
    (0, core_1.NgModule)({
        declarations: [
            app_component_1.AppComponent,
            spell_check_textarea_component_1.SpellCheckTextareaComponent,
        ],
        imports: [
            forms_1.FormsModule,
            platform_browser_1.BrowserModule,
            animations_1.BrowserAnimationsModule,
            http_1.HttpClientModule,
            textarea_highlight_module_1.TextareaHighlightModule
        ],
        providers: [],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map
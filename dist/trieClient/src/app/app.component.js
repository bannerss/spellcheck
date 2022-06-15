"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const dictionary_manager_service_1 = require("./services/dictionary-manager.service");
let AppComponent = class AppComponent {
    /**
     *
     */
    constructor(dictionaryManagerService) {
        this.dictionaryManagerService = dictionaryManagerService;
        this.nonWordsArray = ["ילדד", "גרלל", "בןן"];
        this.txt = "";
    }
    rebuildNonWordsArray(textAreaContent) {
        if (textAreaContent) {
            let userTextArray = textAreaContent.split(/[\s,.]+/).filter(element => element);
            for (let element = 0; element < userTextArray.length; element++)
                if (!this.nonWordsArray.includes(userTextArray[element])) {
                    if (!this.dictionaryManagerService.search(userTextArray[element])) {
                        this.nonWordsArray.push(userTextArray[element]);
                    }
                }
        }
    }
};
AppComponent = tslib_1.__decorate([
    (0, core_1.Component)({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [dictionary_manager_service_1.DictionaryManagerService])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map
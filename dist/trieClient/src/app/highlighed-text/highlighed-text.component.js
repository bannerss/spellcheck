"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HighlighedTextComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const dictionary_manager_service_1 = require("../services/dictionary-manager.service");
let HighlighedTextComponent = class HighlighedTextComponent {
    constructor(dictionaryManagerService) {
        this.dictionaryManagerService = dictionaryManagerService;
        this.textValue = "";
        this.nonWordsArray = [];
        this.doneTypingInterval = 1000;
    }
    handleScroll() {
    }
    onTextAreaChange(content) {
        clearTimeout(this.typingTimer);
        this.typingTimer = setTimeout(this.populateNonWordsArray.bind(this, content), this.doneTypingInterval);
    }
    populateNonWordsArray(txt) {
        if (txt) {
            this.nonWordsArray = [];
            let userTextArray = txt.split(/[\s,.]+/).filter(element => element);
            for (let element = 0; element < userTextArray.length; element++)
                if (!this.nonWordsArray.includes(userTextArray[element])) {
                    if (!this.dictionaryManagerService.search(userTextArray[element])) {
                        this.nonWordsArray.push(userTextArray[element]);
                    }
                }
            txt = txt ? txt
                .replace(/\n$/g, "\n\n") : '';
            this.nonWordsArray.forEach(x => {
                txt = txt
                    .replace(new RegExp(x + '[(?!\\s)|(?!,)|(?!.)]|' + x + '$', 'g'), '<mark style="border-bottom: 1px solid red;background-color: transparent;" class="mark">$&</mark>');
            });
            this.spellcheckerrorsholder.nativeElement.innerHTML = txt;
        }
    }
    applyHighlights(text) {
    }
    createTrie() {
        //const trie = this.dictionaryManagerService;
        // trie.populateFromFile();
        // insert few words
        //trie.insert("CAT");
        //trie.insert("DOG");
        //trie.insert("CATS");
        //trie.insert("FISH");
        // search something
        // trie.search("MAT") // false
        // trie.search("DOG") // true  
    }
};
tslib_1.__decorate([
    (0, core_1.Input)(),
    tslib_1.__metadata("design:type", Array)
], HighlighedTextComponent.prototype, "nonWordsArray", void 0);
tslib_1.__decorate([
    (0, core_1.ViewChild)('spellcheckerrorsholder'),
    tslib_1.__metadata("design:type", core_1.ElementRef)
], HighlighedTextComponent.prototype, "spellcheckerrorsholder", void 0);
HighlighedTextComponent = tslib_1.__decorate([
    (0, core_1.Component)({
        selector: "app-highlighed-text",
        templateUrl: "./highlighed-text.component.html",
        styleUrls: ["./highlighed-text.component.css"]
    }),
    tslib_1.__metadata("design:paramtypes", [dictionary_manager_service_1.DictionaryManagerService])
], HighlighedTextComponent);
exports.HighlighedTextComponent = HighlighedTextComponent;
//# sourceMappingURL=highlighed-text.component.js.map
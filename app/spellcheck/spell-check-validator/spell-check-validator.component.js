"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpellCheckValidatorComponent = void 0;
const core_1 = require("@angular/core");
let SpellCheckValidatorComponent = class SpellCheckValidatorComponent {
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
__decorate([
    (0, core_1.Input)()
], SpellCheckValidatorComponent.prototype, "nonWordsArray", void 0);
__decorate([
    (0, core_1.ViewChild)('spellcheckerrorsholder')
], SpellCheckValidatorComponent.prototype, "spellcheckerrorsholder", void 0);
SpellCheckValidatorComponent = __decorate([
    (0, core_1.Component)({
        selector: 'spell-check-validator',
        templateUrl: './spell-check-validator.component.html',
        styleUrls: ['./spell-check-validator.component.css']
    })
], SpellCheckValidatorComponent);
exports.SpellCheckValidatorComponent = SpellCheckValidatorComponent;
//# sourceMappingURL=spell-check-validator.component.js.map
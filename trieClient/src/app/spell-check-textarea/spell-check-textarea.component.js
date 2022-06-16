"use strict";
var SpellCheckTextareaComponent_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpellCheckTextareaComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
const dictionary_manager_service_1 = require("../services/dictionary-manager.service");
let SpellCheckTextareaComponent = SpellCheckTextareaComponent_1 = class SpellCheckTextareaComponent {
    constructor(dictionaryManagerService) {
        this.dictionaryManagerService = dictionaryManagerService;
        this.nonWordsArray = ['qq', 'ww'];
        this.textValue = "";
        this.sleepticks = new Date().getTime();
        this.textAreaContent = new core_1.EventEmitter();
    }
    get highlightedText() {
        this.textAreaContent.emit(this.textValue);
        //this.checkText();
        //this.nonWordsArray.push("ssss");
        return this.applyHighlights(this.textValue);
    }
    checkText() {
        if (this.textValue) {
            let userTextArray = this.textValue.split(/[\s,.]+/).filter(element => element);
            for (let element = 0; element < userTextArray.length; element++)
                if (!this.nonWordsArray.includes(userTextArray[element])) {
                    if (!this.dictionaryManagerService.search(userTextArray[element])) {
                        this.nonWordsArray.push(userTextArray[element]);
                    }
                }
            console.log(userTextArray);
            console.log(this.nonWordsArray);
        }
    }
    applyHighlights(text) {
        const newticks = new Date().getTime();
        const oldTicks = this.sleepticks;
        this.sleepticks = newticks;
        if (newticks - oldTicks > 3000) {
            text = text ? text
                .replace(/\n$/g, "\n\n") : '';
            this.nonWordsArray.forEach(x => {
                text = text
                    .replace(new RegExp(x, 'g'), '<mark style="border-bottom: 1px solid red;background-color: transparent;" class="mark">$&</mark>');
            });
        }
        return text;
    }
    handleScroll() {
        var scrollTop = this.$textarea.nativeElement.scrollTop;
        this.$backdrop.nativeElement.scrollTop = scrollTop;
        var scrollLeft = this.$textarea.nativeElement.scrollLeft;
        this.$backdrop.nativeElement.scrollLeft = scrollLeft;
    }
    writeValue(value) {
        console.log(" writeValue(value: any): void {");
        if (value !== undefined) {
            this.textValue = value;
        }
    }
    registerOnChange(fn) {
        //this.onChanges = (value) => { Promise.resolve(null).then(() => fn(value)) };
        console.log("registerOnChange");
        this.onChanges = fn;
    }
    registerOnTouched(fn) {
        console.log("registerOnTouched");
        this.onTouched = fn;
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
], SpellCheckTextareaComponent.prototype, "nonWordsArray", void 0);
tslib_1.__decorate([
    (0, core_1.ViewChild)("backdrop", { static: true }),
    tslib_1.__metadata("design:type", core_1.ElementRef)
], SpellCheckTextareaComponent.prototype, "$backdrop", void 0);
tslib_1.__decorate([
    (0, core_1.ViewChild)("textarea"),
    tslib_1.__metadata("design:type", core_1.ElementRef)
], SpellCheckTextareaComponent.prototype, "$textarea", void 0);
tslib_1.__decorate([
    (0, core_1.Output)(),
    tslib_1.__metadata("design:type", Object)
], SpellCheckTextareaComponent.prototype, "textAreaContent", void 0);
SpellCheckTextareaComponent = SpellCheckTextareaComponent_1 = tslib_1.__decorate([
    (0, core_1.Component)({
        selector: 'app-spell-check-textarea',
        templateUrl: './spell-check-textarea.component.html',
        styleUrls: ['./spell-check-textarea.component.css'],
        providers: [
            {
                provide: forms_1.NG_VALUE_ACCESSOR,
                useExisting: (0, core_1.forwardRef)(() => SpellCheckTextareaComponent_1),
                multi: true
            }
        ]
    }),
    tslib_1.__metadata("design:paramtypes", [dictionary_manager_service_1.DictionaryManagerService])
], SpellCheckTextareaComponent);
exports.SpellCheckTextareaComponent = SpellCheckTextareaComponent;
//# sourceMappingURL=spell-check-textarea.component.js.map
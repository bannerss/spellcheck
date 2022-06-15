import { ElementRef } from "@angular/core";
import { DictionaryManagerService } from "../services/dictionary-manager.service";
export declare class HighlighedTextComponent {
    dictionaryManagerService: DictionaryManagerService;
    textValue: string;
    nonWordsArray: string[];
    spellcheckerrorsholder: ElementRef;
    typingTimer: any;
    doneTypingInterval: number;
    constructor(dictionaryManagerService: DictionaryManagerService);
    handleScroll(): void;
    onTextAreaChange(content: string): void;
    populateNonWordsArray(txt: string): void;
    applyHighlights(text: string): void;
    createTrie(): void;
}

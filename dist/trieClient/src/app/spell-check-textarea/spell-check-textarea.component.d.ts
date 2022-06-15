import { ElementRef } from "@angular/core";
import { ControlValueAccessor } from "@angular/forms";
import { DictionaryManagerService } from "../services/dictionary-manager.service";
export declare class SpellCheckTextareaComponent implements ControlValueAccessor {
    dictionaryManagerService: DictionaryManagerService;
    constructor(dictionaryManagerService: DictionaryManagerService);
    nonWordsArray: string[];
    $backdrop: ElementRef<HTMLDivElement>;
    $textarea: ElementRef<HTMLTextAreaElement>;
    textValue: string;
    sleepticks: number;
    private textAreaContent;
    get highlightedText(): string;
    checkText(): void;
    applyHighlights(text: string): string;
    handleScroll(): void;
    onChanges: ($value: any) => void;
    onTouched: () => void;
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    createTrie(): void;
}

import { DictionaryManagerService } from './services/dictionary-manager.service';
export declare class AppComponent {
    dictionaryManagerService: DictionaryManagerService;
    /**
     *
     */
    constructor(dictionaryManagerService: DictionaryManagerService);
    nonWordsArray: string[];
    txt: string;
    rebuildNonWordsArray(textAreaContent: string): void;
}

import { ITrie } from '@interfaces/tries.interface';
declare class DictionaryService {
    root: ITrie;
    getDictionary(): Promise<ITrie>;
    searchForWord(word: string): Promise<boolean>;
    insert(word: string): void;
    bulkInsertWordsToTrie(list: string[]): Promise<string>;
    populateFromFile(): Promise<string>;
    updateFile(): Promise<string>;
}
export default DictionaryService;

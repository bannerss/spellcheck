import { HttpClient } from '@angular/common/http';
export declare class DictionaryManagerService {
    private http;
    root: any;
    constructor(http: HttpClient);
    insert(word: string): void;
    bulkInsert(list: string[]): void;
    populateFromFile(): void;
    updateFile(): void;
    search(word: string): any;
}

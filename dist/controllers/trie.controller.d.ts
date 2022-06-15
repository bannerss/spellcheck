import { NextFunction, Request, Response } from 'express';
import dictionaryService from '@services/dictionary.service';
declare class TrieController {
    dictionaryService: dictionaryService;
    getDictionaryTrie: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    populateFromFile: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    isWordExists: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    bulkInsertWordsToTrie: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
export default TrieController;

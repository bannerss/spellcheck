"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const dictionary_service_1 = tslib_1.__importDefault(require("../services/dictionary.service"));
class TrieController {
    constructor() {
        this.dictionaryService = new dictionary_service_1.default();
        this.getDictionaryTrie = async (req, res, next) => {
            try {
                const getDictionary = await this.dictionaryService.getDictionary();
                res.status(200).json({ data: getDictionary, message: 'get Dictionary' });
            }
            catch (error) {
                next(error);
            }
        };
        this.populateFromFile = async (req, res, next) => {
            try {
                const getDictionary = await this.dictionaryService.populateFromFile();
                res.status(200).json({ data: getDictionary, message: 'populated From File' });
            }
            catch (error) {
                next(error);
            }
        };
        this.isWordExists = async (req, res, next) => {
            try {
                const word = String(req.params.word);
                const findword = await this.dictionaryService.searchForWord(word);
                res.status(200).json({ data: findword, message: 'word found = ' + findword });
            }
            catch (error) {
                next(error);
            }
        };
        this.bulkInsertWordsToTrie = async (req, res, next) => {
            try {
                const wordsArray = req.body;
                const bulkInsertWordsToTrie = await this.dictionaryService.bulkInsertWordsToTrie(wordsArray);
                res.status(201).json({ message: 'wordsInserted' });
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.default = TrieController;
//# sourceMappingURL=trie.controller.js.map
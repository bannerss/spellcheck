"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs_1 = require("fs");
const path = tslib_1.__importStar(require("path"));
const dict = tslib_1.__importStar(require("../models/dic.json"));
const heb_dic_a_1 = require("../models/heb-dic-a");
class DictionaryService {
    constructor() {
        this.root = dict;
    }
    async getDictionary() {
        const trie = this.root;
        return trie;
    }
    async searchForWord(word) {
        let current = this.root;
        // iterate through all the characters of word
        for (let character of word) {
            if (current.children[character] === undefined) {
                // could not find this character in sequence, return false
                return false;
                break;
            }
            // move down, to match next character
            current = current.children[character];
        }
        // found all characters, return true if last character is end of a word
        return current.isEndOfWord;
    }
    insert(word) {
        let current = this.root;
        // iterate through all the characters of word
        for (let character of word) {
            // if node doesn't have the current character as child, insert it
            if (current.children[character] === undefined) {
                current.children[character] = { value: character, isEndOfWord: false, children: {} };
            }
            // move down, to insert next character
            current = current.children[character];
        }
        // mark the last inserted character as end of the word
        current.isEndOfWord = true;
    }
    async bulkInsertWordsToTrie(list) {
        list.forEach(element => {
            this.insert(element);
        });
        const insertResult = this.updateFile();
        return insertResult;
    }
    async populateFromFile() {
        let words = heb_dic_a_1.Dictionaries; //wordsArray['default'] as string[];
        words.forEach(element => {
            this.insert(element);
        });
        this.updateFile().then(result => { return "ok"; })
            .catch(error => { return "error"; })
            .finally(() => { });
        return "done";
    }
    async updateFile() {
        try {
            console.log(path.resolve('./src/models/dic.json'));
            (0, fs_1.writeFileSync)(path.resolve('./src/models/dic.json'), JSON.stringify(this.root, null, 2), 'utf8');
            console.log('Data successfully saved to disk');
            return 'Data successfully saved to disk';
        }
        catch (error) {
            console.log('An error has occurred ', error);
            return "Error Data Not saved to disk";
        }
    }
}
exports.default = DictionaryService;
//# sourceMappingURL=dictionary.service.js.map
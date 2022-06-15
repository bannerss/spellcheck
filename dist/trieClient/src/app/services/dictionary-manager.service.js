"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DictionaryManagerService = void 0;
const tslib_1 = require("tslib");
const http_1 = require("@angular/common/http");
const core_1 = require("@angular/core");
let DictionaryManagerService = class DictionaryManagerService {
    constructor(http) {
        this.http = http;
        this.root = new TrieNode(null);
        http.get("/api/trie").subscribe(res => {
            if (res && res.data) {
                if (JSON.stringify(res.data) !== JSON.stringify({}))
                    this.root = res.data;
            }
        });
    }
    insert(word) {
        let current = this.root;
        // iterate through all the characters of word
        for (let character of word) {
            // if node doesn't have the current character as child, insert it
            if (current.children[character] === undefined) {
                current.children[character] = new TrieNode(character);
            }
            // move down, to insert next character
            current = current.children[character];
        }
        // mark the last inserted character as end of the word
        current.isEndOfWord = true;
        this.updateFile();
        //this.httpservice.updateTrie(this.root);
    }
    bulkInsert(list) {
        list.forEach(element => {
            this.insert(element);
        });
        this.updateFile();
    }
    populateFromFile() {
        this.http.get("/api/trie/populateFromFile").subscribe(res => {
            if (res && res.data) {
                if (JSON.stringify(res.data) !== JSON.stringify({}))
                    this.root = res.data;
            }
        });
    }
    updateFile() {
        //this.coursesService.saveTrie(this.root);
    }
    search(word) {
        let current = this.root;
        // iterate through all the characters of word
        for (let character of word) {
            if (current.children[character] === undefined) {
                // could not find this character in sequence, return false
                return false;
            }
            // move down, to match next character
            current = current.children[character];
        }
        // found all characters, return true if last character is end of a word
        return current.isEndOfWord;
    }
};
DictionaryManagerService = tslib_1.__decorate([
    (0, core_1.Injectable)({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [http_1.HttpClient])
], DictionaryManagerService);
exports.DictionaryManagerService = DictionaryManagerService;
class TrieNode {
    /**
     *
     */
    constructor(value) {
        this.value = '';
        this.isEndOfWord = false; // false by default, a green node means this flag is true
        this.children = {};
        this.value = value;
    }
    populateTrieNode(value) {
        this.value = value;
        this.isEndOfWord = false; // false by default, a green node means this flag is true
        this.children = {}; // children are stored as Map, where key is the letter and value is a TrieNode for that letter 
    }
}
//# sourceMappingURL=dictionary-manager.service.js.map
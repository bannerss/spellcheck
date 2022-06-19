"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const trie_controller_1 = tslib_1.__importDefault(require("@controllers/trie.controller"));
class TrieRoute {
    constructor() {
        this.path = '/api/trie';
        this.router = (0, express_1.Router)();
        this.trieController = new trie_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}`, this.trieController.getDictionaryTrie);
        this.router.get(`${this.path}/populateFromFile`, this.trieController.populateFromFile);
        this.router.get(`${this.path}/:word`, this.trieController.isWordExists);
        this.router.put(`${this.path}/populatetrie`, this.trieController.bulkInsertWordsToTrie);
    }
}
exports.default = TrieRoute;
//# sourceMappingURL=trie.route.js.map
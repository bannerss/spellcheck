import { Router } from 'express';
import TrieController from '@controllers/trie.controller';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class TrieRoute implements Routes {
  public path = '/api/trie';
  public router = Router();
  public trieController = new TrieController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.trieController.getDictionaryTrie);
    this.router.get(`${this.path}/populateFromFile`, this.trieController.populateFromFile);
    this.router.get(`${this.path}/:word`, this.trieController.isWordExists);
    this.router.put(`${this.path}/populatetrie`, this.trieController.bulkInsertWordsToTrie);
  }
}

export default TrieRoute;

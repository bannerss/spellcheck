import TrieController from '@controllers/trie.controller';
import { Routes } from '@interfaces/routes.interface';
declare class TrieRoute implements Routes {
    path: string;
    router: import("express-serve-static-core").Router;
    trieController: TrieController;
    constructor();
    private initializeRoutes;
}
export default TrieRoute;

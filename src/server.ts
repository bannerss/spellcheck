import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';

import TrieRoute from '@routes/trie.route';
import validateEnv from '@utils/validateEnv';


validateEnv();

const app = new App([new IndexRoute(), new UsersRoute(), new TrieRoute(), new AuthRoute()]);

app.listen();

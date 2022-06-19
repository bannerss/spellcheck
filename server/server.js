"use strict";
/*Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const app_1 = tslib_1.__importDefault(require("./app"));
const auth_route_1 = tslib_1.__importDefault(require("./routes/auth.route"));
const index_route_1 = tslib_1.__importDefault(require("./routes/index.route"));
const users_route_1 = tslib_1.__importDefault(require("./routes/users.route"));
const trie_route_1 = tslib_1.__importDefault(require("./routes/trie.route"));
const validateEnv_1 = tslib_1.__importDefault(require("./utils/validateEnv"));
(0, validateEnv_1.default)();
const app = new app_1.default([new index_route_1.default(), new users_route_1.default(), new trie_route_1.default(), new auth_route_1.default()]);
app.listen();
*/
//# sourceMappingURL=server.js.map



import  express from 'express';
import {Application} from "express";

const cors = require('cors');
import * as path from 'path';
const bodyParser = require('body-parser');
console.log(123);
const app: Application = express();
console.log(123);
app.use(cors({origin: true}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    console.log = function() {}
     
      /*if(req.hostname.indexOf('https://www.izkor.gov.il') < 0 && req.query.utm_source)
      {
        return res.redirect(301, 'https://www.izkor.gov.il/' + req.originalUrl);
      }*/
      res.setHeader('X-XSS-Protection', '1; mode=block');
      res.setHeader('X-Frame-Options', 'sameorigin');  // deny
      res.setHeader('X-Content-Type-Options', 'nosniff');  //disable nosniff? for MIME mismatch?
      res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
      res.setHeader("Pragma", "no-cache");
      res.setHeader("Expires", "0");
      //res.setHeader('Strict-Transport-Security', 'max-age=31536000');
  
      //res.setHeader('Cache-Control', 'no-cache');
  
  
      //handle cors:
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader('Access-Control-Request-Method', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, MERGE, PATCH, DELETE');
      res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      res.setHeader('Access-Control-Allow-Credentials', "true");
      next();
  });

app.use('/', express.static(path.join(__dirname, 'src')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/index.html'));
});
const port = (process.env.PORT || 9000);
const httpServer = app.listen(port, () => {
   // let adrs = httpServer.address() as AddressInfo ;
    
    console.log("HTTP REST API Server running at http://localhost:" + port);
});




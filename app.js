const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");

const app = express();

mongoose
  .connect(
    "mongodb+srv://max:" +
      process.env.MONGO_ATLAS_PW +
      "@cluster0-ntrwp.mongodb.net/node-angular"
  )
  .then(() => {
    console.log("Connected to mongoose database!");
  })
  .catch(() => {
    console.log("mongoose Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/", express.static(path.join(__dirname, "angular")));

app.use(function(req, res, next) {
  console.log = function() {}
    if (req.hostname === 'izkor.mod.gov.il' || req.hostname === 'izkor.gov.il' || req.hostname === 'www.izkor.mod.gov.il') {
      return res.redirect(301, 'https://www.izkor.gov.il/' + req.originalUrl);
    }
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
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PATCH, PUT, DELETE, OPTIONS"
//   );
//   next();
// });

app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);
app.use((req, res, next) => {
  console.log("index.html");
  res.sendFile(path.join(__dirname, "angular", "index.html"));
});

module.exports = app;

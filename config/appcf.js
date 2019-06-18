const express = require("express");
const bodyParser = require("body-parser");
const session = require('express-session');
const fs = require("fs");
/*-SETUP-*/
const app = express();
app.set('view engine', 'ejs');
app.set('views','./view');
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
 secret: 'tiendungkid',
 resave: false,
 saveUninitialized: true,
 cookie: {
     secure: false,
     maxAge: 3600000
 }
}));
module.exports = app;

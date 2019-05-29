const express = require("express");
const io = require("socket.io");
const mysql = require("mysql");
const fs = require("fs");
const bodyParser = require("body-parser");
const session = require('express-session');
const md5 = require('md5');
const validate = require("./Validate/createuser.js");
/*
 * CreateServer
 */
const app = express();
const server = require("http").Server(app).listen(process.env.PORT || 3000,()=>{
  console.log("LISTEN - * - 3000");
});
/*
 * Set env
 */
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.set('views','./view/view');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json())
app.use(session({
  secret: 'tiendungkid',
  resave: false,
  saveUninitialized: true,
  cookie: {
      secure: false,
      maxAge: 3600000
  }
}));
const connectSQL = mysql.createConnection({
    host: "localhost",
    user: "root",
    pass: "",
    database: "family"
});
connectSQL.connect((err)=>{
    if (err) console.log(err);
    else console.log("Connect DB -*- SUCCESS");
});
 /*
  * Get router
  */
app.get('/',(req,res)=>{
  let user = req.query.user;
  let pass = req.query.pass;
  let date = req.query.date;
  let key = req.query.key;
  let sql = `INSERT INTO tb_user(user_name,pass_wd,date,key_of_pass,group_id) `+`VALUES('` + user + `','` + md5(pass) + `','` + date + `','` + key + `', 1)`;
  /*Validate*/
  let test = validate.vl(user,pass,date,key,1);
  test.then(data =>{
      console.log(data);
      /*Check inserted*/
      let inserted = new Promise((resolve, reject) => {
          connectSQL.query(sql,(err, data)=>{
              if (err) return reject(err);
              data.ststus = "success";
              return resolve(data);
          });
      });
      inserted.then(data => res.send(data),err =>{
          err.sqlMessage = undefined;
          err.sql = undefined;
          res.send(err);
      });
  } ,err =>{
      console.log(err);
      res.send(err);
  });
});

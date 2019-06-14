
const io = require("socket.io");
const fs = require("fs");
const url = require("url");
const cf_path = "./config/";
const validate_path = "./Validate/";
const validate = require(validate_path+'mainvl.js');
const connectSQL = require(cf_path+'dbcf.js');
const app = require(cf_path+'appcf.js');
app.use(require('express').static(__dirname + '/public'));
/*
 * CreateServer
 */
 const server = require("http").Server(app).listen(process.env.PORT || 3000,()=>{
  console.log("LISTEN - * - 3000");
 });
 /*
  * Get router
  */
  /*Create user Process*/
  app.post('/cruser',(req,res)=>{
    if (req.session.user_id && req.session.user_name) res.render("extend/loadingpage");
    let user = req.body.user ? req.body.user : req.query.user;
    let pass = req.body.pass ? req.body.pass : req.query.pass;
    let date = req.body.date ? req.body.date : req.query.date;
    let key = req.body.key ? req.body.key : req.query.key;
    /*Validate*/
    let test = validate.vl(user,pass,date,key,1);
    test.then(
      data =>{
        console.log(data);
        /*Check inserted*/
        let inserted = new Promise((resolve, reject) => {
            let sql = validate.crsql(user,pass,date,key,1);
            connectSQL.query(sql,(err, data)=>{
                if (err) return reject(err);
                data.ststus = "Add-success";
                return resolve(data);
            });
        });
        inserted.then(data => res.send(data),err =>{
            err.sqlMessage = undefined;
            err.sql = undefined;
            res.send(err);
        });
      },
    err =>{
        console.log(err);
        res.send(err);
    });
  });
  /*Login Process */
  app.post('/',(req,res)=>{
    if (req.session.user_id && req.session.user_name){
      res.render("extend/loadingpage",{router: "test2"});
    }
    else{
        let user = req.body.user ? req.body.user: req.query.user;
        let pass = req.body.pass ? req.body.pass: req.query.pass;
        let prepage = req.body.prepage ? req.body.prepage: req.query.prepage;
        let check = validate.checklogin(user,pass);
        if(!check){console.log("RegExp redirect...");res.render('main/login',validate.createPrepage(prepage));}
        else{
          // let sql = validate.loginsql(user,pass);
          // connectSQL.query(sql,(err, data)=>{
          //   if(err){
          //     console.log("SQL redirect...");
          //     res.render("main/login.ejs");
          //   }else{
          //     if (err) res.render("main/login.ejs");
          //     if (data.length===1){
          //         req.session.user_id = data[0].id;
          //         req.session.user_name = data[0].user_name;
          //         req.session.user_date = data[0].date;
          //         console.log("Login Success...");
          //         res.render("extend/loadingpage.ejs");
          //     }else{
          //       console.log("User And Password incorrect...");
          //       res.render("main/login.ejs");
          //     }
          //   }
          // });
          if(user==="tiendungkid"&&pass==="Dungpro1"){
            req.session.user_id = "1";
            req.session.user_name = user;
            req.session.user_date = "29/11/1999";
            console.log("Login Success...");
            res.render("extend/loadingpage",{router: prepage});
          }else{
            console.log("User And Password incorrect...");
            res.render("main/login",validate.createPrepage(prepage));
          }
      }
    }
  });
  /*Login Page*/
  app.get('/',(req,res)=>{
      if (!req.session.user_id && !req.session.user_name){
        let prepage = req.query.pagename ? req.query.pagename : "calculatortime";
        res.render("main/login",validate.createPrepage(prepage));
      }
      else {res.render("extend/loadingpage",{router: "test"});}
  });
  /*LogOut Page */
  app.get('/logout',(req,res)=>{
    req.session.destroy((err)=>{
        if (err) console.log(err);
        else console.log("Logouted...");
        res.redirect('/');
    });
  });
  /*Loadding page*/
  app.get('/loading',(req,res)=>{
    res.render("extend/loadingpage");
  });
/*
 * Calculator time go to sleep
 */
 app.get('/calculatortime',(req,res)=>{
  if(!validate.isLogin(req)){
    res.redirect(url.format(validate.getRedirect("/","calculatortime")));
  }
  else{
    res.render("main/calculatortime");
  }
 });
 /*
  * Test Router
  */
 app.get('/test',(req,res)=>{
  if(!validate.isLogin(req)){
    res.redirect(url.format(validate.getRedirect("/","test")));
  }
  else{
    res.send("test");
  }
 });
 app.get('/test2',(req,res)=>{
    if(!validate.isLogin(req)){
      res.redirect(url.format(validate.getRedirect('/','test2')));
    }else{
      res.send("test2");
    }
 });
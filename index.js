const fs = require("fs");
const url = require("url");
const randomstring = require('randomstring');
const cf_path = "./config/";
const validate_path = "./Validate/";
const validate = require(validate_path + 'mainvl.js');
const connectSQL = require(cf_path + 'dbcf.js');
const app = require(cf_path + 'appcf.js');
app.use(require('express').static(__dirname + '/public'));
// const server = require("https").Server(validate.getSSL,app).listen(process.env.PORT || 3000, () => {
//   console.log("LISTEN - * - 3000");
// });
const server = require("http").Server(app).listen(process.env.PORT || 3000, () => {
  console.log("LISTEN - * - 3000");
});
const io = require("socket.io")(server);
/**
 * GET Router And Process [Start]
 */
app.post('/cruser', (req, res) => {
  if (req.session.user_id && req.session.user_name) res.render("extend/loadingpage");
  let user = req.body.user ? req.body.user : req.query.user;
  let pass = req.body.pass ? req.body.pass : req.query.pass;
  let date = req.body.date ? req.body.date : req.query.date;
  let key = req.body.key ? req.body.key : req.query.key;
  let test = validate.vl(user, pass, date, key, 1);
  test.then(
    data => {
      console.log(data);
      let inserted = new Promise((resolve, reject) => {
        let sql = validate.crsql(user, pass, date, key, 1);
        connectSQL.query(sql, (err, data) => {
          if (err) return reject(err);
          data.ststus = "Add-success";
          return resolve(data);
        });
      });
      inserted.then(data => res.send(data), err => {
        err.sqlMessage = undefined;
        err.sql = undefined;
        res.send(err);
      });
    },
    err => {
      console.log(err);
      res.send(err);
    });
});
app.post('/', (req, res) => {
  if (req.session.user_id && req.session.user_name) {
    res.render("extend/loadingpage", {
      router: "musicrelax"
    });
  } else {
    let user = req.body.user ? req.body.user : req.query.user;
    let pass = req.body.pass ? req.body.pass : req.query.pass;
    let prepage = req.body.prepage ? req.body.prepage : req.query.prepage;
    let check = validate.checklogin(user, pass);
    if (!check) {
      console.log("RegExp redirect...");
      res.render('main/login', validate.createPrepage(prepage));
    } else {
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
      if (user === "tiendungkid" && pass === "Dungpro1") {
        req.session.user_id = "1";
        req.session.user_name = user;
        req.session.user_date = "29/11/1999";
        console.log("Login Success...");
        res.render("extend/loadingpage", {
          router: prepage
        });
      } else {
        console.log("User And Password incorrect...");
        res.render("main/login", validate.createPrepage(prepage));
      }
    }
  }
});
app.get('/', (req, res) => {
  if (!req.session.user_id && !req.session.user_name) {
    let prepage = req.query.pagename ? req.query.pagename : "calculatortime";
    res.render("main/login", validate.createPrepage(prepage));
  } else {
    res.render("extend/loadingpage", {
      router: "musicrelax"
    });
  }
});
app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) console.log(err);
    else console.log("Logouted...");
    res.redirect('/');
  });
});
app.get('/loading', (req, res) => {
  res.render("extend/loadingpage");
});
app.get('/calculatortime', (req, res) => {
  if (!validate.isLogin(req)) {
    res.redirect(url.format(validate.getRedirect("/", "calculatortime")));
  } else {
    res.render("main/calculatortime");
  }
});
app.get('/test', (req, res) => {
  if (!validate.isLogin(req)) {
    res.redirect(url.format(validate.getRedirect("/", "test")));
  } else {
    res.send("test");
  }
});
app.get('/musicrelax', (req, res) => {
  if (!validate.isLogin(req)) {
    res.redirect(url.format(validate.getRedirect('/', 'musicrelax')));
  } else {
    res.render("main/musicrelax");
  }
});
app.get('/loginwithkey',(req,res)=>{
  let key = req.query.key;
  if(!key || key ==="" ||key.length > 1000){
    res.redirect(url.format(validate.getRedirect('/', 'musicrelax')));
  }
  connectSQL.query(validate.KEYloginsql(key),(err,data)=>{
    if(err){
      res.redirect(url.format(validate.getRedirect('/', 'musicrelax')));
    }
    else if(data.length!==1){
      console.log("Login Success...");
      res.redirect(url.format(validate.getRedirect('/', 'musicrelax')));
    }
    else{
      req.session.user_id = data[0].id;
      req.session.user_name = data[0].user_name;
      req.session.user_date = data[0].date;
      console.log("Login -*- Success");
      connectSQL.query(validate.KEYloginsql2(key),(err,data)=>{
        if(err) throw err;
        else res.render("main/calculatortime");
      });
    }
  });
});
/**
 * GET Router And Process [End]
 */
/**
 * Process Socket [Start]
 */
io.on('connection',(socket)=>{
  console.log("Connect Socket -*- Success");
  console.log("Socket ID -*- ", socket.id);
  socket.on("checkBF",async (uInfo)=>{
    if(!validate.fb_info(uInfo)) emitErr(status(false,"Vui lòng kiểm tra lại tài khoản !"));
    else{
      let sql = validate.FBsql(uInfo.id);
      await connectSQL.query(sql,async (err,data)=>{
        if(err){emitErr(status(false,"Có lỗi khi đăng nhập vui lòng thử lại sau !"))}
        else{
          if(data.length!==1) emitErr(status(false,"Xin lỗi ứng dụng chỉ dùng cho thành viên trong gia đình !"));
          else{
            let key = randomstring.generate({length: 100,charset: 'numeric'});
            await connectSQL.query(validate.KEYsql(data[0],key,uInfo.accessToken),(err,inserted)=>{
              if(err) emitErr(status(false,"Có lỗi khi đăng nhập vui lòng thử lại sau !"));
              else{
                emitSucc(status(true,{key:key}));
              }
            });
          }
        }
      });
    }
    let emitErr = (st) => socket.emit("SentBackStatus",st);
    let emitSucc = (st) => socket.emit("SentBackStatus",st);
    let status = (status,msg)=>{return {status: status,msg: msg}}
  })
});
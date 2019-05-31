const md5 = require("md5");
let validate = {
    vl : (u,p,d,k,g)=>{
          return new Promise((resolve, reject)=>{
            if (u===undefined||p===undefined||d===undefined||k===undefined||g===undefined)return reject({st: false,err:"Vui Lòng nhập đủ thông tin"});
            if (getLength(u)<5||getLength(u)>15)return reject({st: false,err:"User have to be bigger than 5 character and < 15"});
            if (getLength(p)<5||getLength(p)>20)return reject({st: false,err:"Pass have to be bigger than 5 character and < 20"});
            if (getLength(d)<5||getLength(d)>50)return reject({st: false,err:"Date have to be bigger than 5 character and < 10"});
            if (getLength(k)<3||getLength(k)>20)return reject({st: false,err: "Key have to be bigger than 5 character and < 20"});
            if (typeof(g) != 'number')return reject({st: false,err:"Group is number type"});
            return resolve("Invaild");
        });
    },
    crsql : (u,p,d,k,g)=>{
            p = md5(p);
            return `INSERT INTO tb_user(user_name,pass_wd,date,key_of_pass,group_id) `+`VALUES('` + u + `','` + p + `','` + d + `','` + k + `',`+ g + `)`;
    },
    loginsql : (u,p)=>{
            p = md5(p);
            return `SELECT * FROM tb_user WHERE user_name ='` + u + `' AND pass_wd = '`+ p + `' LIMIT 1`;
    },
    checklogin : (u,p)=>{
            let regex = RegExp(/^[a-zA-Z0-9]{3,30}/);
            if(u==undefined) return false;
            if(p==undefined) return false;
            if(getLength(u)==0) return false;
            if(getLength(p)==0) return false;
            if(getLength(u)<4||getLength(u)>30) return false;
            if(getLength(p)<4||getLength(p)>30) return false;
            if (!regex.test(u)) return false;
            if (!regex.test(p)) return false;
            return true;
    }
};
let getLength = v => v.length;
module.exports = validate;

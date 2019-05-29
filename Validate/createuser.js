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
    }
};
let getLength = v => v.length;
module.exports = validate;
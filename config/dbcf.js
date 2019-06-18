const mysql = require("mysql");
const connectSQL = mysql.createConnection({
    host: "localhost",
    user: "root",
    pass: "",
    database: "family"
});
connectSQL.connect((err)=>{
    if (err) console.log(err.toString());
    else console.log("Connect DB -*- SUCCESS");
});
connectSQL.on('error',(err)=>{
    console.log("Connect DB -*- Failed");
})
module.exports = connectSQL;

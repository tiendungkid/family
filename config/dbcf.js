const mysql = require("mysql");
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
module.exports = connectSQL;

const mysql = require("mysql2");
const pw = require("./pw")

var config = module.exports;

config.db = mysql.createPool({
    user: "admin",
    host: "skkudb.cfnhyw2dkvaj.us-east-2.rds.amazonaws.com",
    password: `${pw}`,
    database: "mydb",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0

});

config.express = {
    port: 3001
};
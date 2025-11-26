require("dotenv").config()

const mysql = require("mysql2/promise")

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections:true,
    connectionLimit:10,
    queueLimit:0,
})

module.exports = pool


// server/config/db.js
//const mysql = require("mysql2/promise");

/*const pool = mysql.createPool({
  host: "localhost",      // normalmente é localhost
  user: "root",           // USB Server/XAMPP geralmente usa root
  password: "",           // muitas vezes é senha vazia, veja no painel do USB Server
  database: "ztintas",    // mesmo nome que criamos no banco.sql
  port: 3306              // algumas versões usam 3307 ou outro, confira!
});*/

//module.exports = pool;

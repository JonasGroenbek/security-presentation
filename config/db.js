const mysql = require('mysql');

const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'juanni',
  password : 'qwer',
  database : 'test_db'
});

module.exports = db;

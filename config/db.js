const mysql = require('mysql');

const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '3460jhjtg',
  database : 'test_db'
});

module.exports = db;

var mysql      = require('mysql');//db연결
var conn = mysql.createConnection({
  host     : 'localhost',
  port     : '3306',
  user     : 'root',
  password : 'password',
  database : 'cosmeticdiarydb',
  dateStrings: 'date'
});
conn.connect(function (err){
if(! err){
  console.log("db연결함.");
} else{
  console.log("db연결 오류발생");}
});
module.exports = conn;
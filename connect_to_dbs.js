var express    = require("express");
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'youthservice.cnmbl5wsbdbo.us-east-2.rds.amazonaws.com',
  port     : '3306',
  user     : 'youth_service',
  password : 'youth123',
  database : 'brisbane_youth_service'

});
var app = express();

connection.connect(function(err){

if(!err) {
    console.log("Database is connected ... ");    
} else {
    console.log("Error connecting database ... ")
	console.log(err);    
}
});

connection.query('SELECT * from worker', function (error, results, fields) {
  if (error) throw error;
  console.log(results)
});


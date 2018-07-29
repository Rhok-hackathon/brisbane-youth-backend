var request = require('request');
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

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connection.connect(function(err){

app.get('/UserInfo', (req,res) => {
	connection.query('SELECT * from worker',(err,result)=> {
		if(err) throw err;
		console.log(result);
		res.send(result);
	});
});
app.get('/UserInfo/:id', (req,res) => {
	
	var id = req.params.id
	let sql = 'SELECT * from worker WHERE id = '+id;
	let query = connection.query(sql,(err,results)=> {
		if(err) throw err;
		console.log(results);
		res.send(results);
	});
});

app.get('/addUser/:first_name/:last_name/:email', (req,res) => {
	var id = null
	var first_name = req.params.first_name
	var last_name = req.params.last_name
	var email = req.params.email
	let sql = 'insert into worker values (null,"'+first_name+'","'+last_name+'","'+email+'","password")';
	let query = connection.query(sql,(err,results)=> {
		if(err) throw err;
		console.log(results);
		res.send(results);
	});
});

app.post('/user', (req,res) => {
	var id = req.params.id
	let sql = 'SELECT * from worker WHERE id = '+id;
	let query = connection.query(sql,(err,results)=> {
		if(err) throw err;
		console.log(results);
		res.send(results);
	});
});

app.get('/addMSG/:sender/:msg/', (req,res) => {
	var id = null
	var sender = req.params.sender
	var msg = req.params.msg
	let sql = 'insert into messages values (null,"'+sender+'","'+ msg +'")';
	
	let query = connection.query(sql,(err,results)=> {
		if(err) throw err;
		console.log(results);
		res.send(results);
	});
});

function posting_message(sender,msg){
	let sql = 'insert into messages values (null,"'+ msg +'","'+sender+'")';
	let query = connection.query(sql,(err,results)=> {
		if(err) throw err;
		console.log(results);
	});
};

module.exports = {
	posting_message: posting_message
};

app.listen('3000', () => {
	console.log('Server started on port 3000');
});

if(!err) {
    console.log("Database is connected ... ");    
} else {
    console.log("Error connecting database ... ")
	console.log(err);    
}
});

connection.query('SELECT * from worker', function (error, results, fields) {
  if (error) throw error;
});

//app.post('/addMSG', posting_message)



//ASD

var ejs= require('ejs');
var mysql = require('mysql');

function getConnection(){
	var connection = mysql.createConnection({
	    host     : 'localhost',
	    user     : 'root',
	    password : 'root',
	    database : 'wfms'
	});
	return connection;
}


function fetchData(callback,sqlQuery){
	
	console.log("\nSQL Fetch Query::"+sqlQuery);
	
	var connection=getConnection();
	
	connection.query(sqlQuery, function(err, rows, fields) {
		if(err){
			console.log("errrrrrrrrrrr: " + err.message);
		}
		else 
		{	// return err or result
			callback(err, rows);
		}
	});
	console.log("\nConnection closed..");
	connection.end();
}	


function insertData(callback,sqlQuery,post){
	
	console.log("\nSQL Query::"+sqlQuery);
	
	var connection=getConnection();
	
	connection.query(sqlQuery, post ,function(err, rows, fields) {
		
	 if(err){
			console.log("errrrrrrrrrrr: " + err.message);
		}
		else 
		{	// return err or result
			callback(err, rows);
		}
	});
	console.log("\nConnection closed..");
	connection.end();
}	


function updateData(callback,sqlQuery){
	
	console.log("\nSQL Query::"+sqlQuery);
	
	var connection=getConnection();
	
	connection.query(sqlQuery,function(err, rows, fields) {
		
	 if(err){
			console.log("errrrrrrrrrrr: " + err.message);
		}
		else 
		{	// return err or result
			callback(err, rows);
		}
	});
	console.log("\nConnection closed..");
	connection.end();
}

exports.updateData=updateData;
exports.fetchData=fetchData;
exports.insertData=insertData;
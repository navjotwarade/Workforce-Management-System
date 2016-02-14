/**
 * New node file
 */
var mysql = require('./mysql');
var bcrypt = require ('bcrypt');

function ClientList(msg, callback){
	console.log("In Server ClientList");
	var res = {};
	var sqlFindUser = "select * from Person where Person_Type_ID=2";
	mysql.handle_database(function(err,results){

		if(err){
			console.log(err);
			throw err;
		}
		else 
		{
			console.log("In ClientList Output");
			callback(null, results);

		}
	},sqlFindUser);

}
exports.ClientList = ClientList;

function ClientDetails2(msg, callback){
	console.log("In Server ClientDetails2");
	var res = {};
	var qry1="call bill('"+msg.id+"')";
	console.log();
	mysql.handle_database(function(err,results){

		if(err){
			console.log(err);
			throw err;
		}
		else 
		{
			console.log("In ClientDetails2 Output");
			callback(null, results);

		}
	},qry1);

}
exports.ClientDetails2 = ClientDetails2;

function DeleteClient(msg, callback){
	console.log("In Server ClientDetails2");
	var res = {};
	var qry1="delete from patrolreport where Client_ID='"+msg.id+"';delete from patrolevents where Client_ID='"+msg.id+"';delete from building where Client_ID='"+msg.id+"';delete from alertsraised where Client_ID='"+msg.id+"';	delete from building_requests where Client_ID='"+msg.id+"';delete from guardposition where Client_ID='"+msg.id+"';delete from Clients where Client_SSN='"+msg.id+"' ; delete from Person where SSN='"+msg.id+"'";
	
	

	console.log();
	mysql.handle_database(function(err,results){

		if(err){
			console.log(err);
			throw err;
		}
		else 
		{
			
			callback(null, results);

		}
	},qry1);

}
exports.DeleteClient = DeleteClient;
/*
function DeletePerson(msg, callback){
	console.log("In Server DeletePerson");
	var res = {};
	var qry1="delete from Person where SSN='"+msg.id+"'";
	console.log()
	mysql.handle_database(function(err,results){

		if(err){
			console.log(err);
			throw err;
		}
		else 
		{
			callback(null, results);

		}
	},qry1);

}
exports.DeletePerson = DeletePerson;
*/

function EditPersonalDetails(msg, callback){
	console.log("In Server EditPersonalDetails");
	var res = {};
	var qry="update Person set Firstname='"+msg.fname+"',Lastname='"+msg.lname+"',Address='"+msg.addr+"',City='"+msg.city+"',State='"+msg.state+"',Zipcode='"+msg.zip+"', Phone_number='"+msg.phone+"', EmailID='"+msg.mail+"' where SSN= '"+msg.id+"'";
	mysql.handle_database(function(err,results){

		if(err){
			console.log(err);
			throw err;
		}
		else 
		{
			callback(null, results);

		}
	},qry);

}
exports.EditPersonalDetails = EditPersonalDetails;

function EditClientDetails(msg, callback){
	console.log("In Server EditClientDetails");
	var res = {};
	var qry="update Clients set Monthly_service_charge='"+msg.service+"', Balance='"+msg.bal+"', Start_Date='"+msg.start+"', End_Date='"+msg.end+"' where Client_SSN='"+msg.id+"'";

	mysql.handle_database(function(err,results){

		if(err){
			console.log(err);
			throw err;
		}
		else 
		{
			callback(null, results);

		}
	},qry);

}
exports.EditClientDetails = EditClientDetails;

function requestbuildingform(msg, callback){
	console.log("In Server requestbuildingform");
	var res = {};
	var qry = "insert into building_requests values('"+msg.id+"','"+msg.bname+"',POINT("+msg.coordinates11+","+ msg.coordinates12+"),POINT("+msg.coordinates21+","+ msg.coordinates22+"),POINT("+msg.coordinates31+","+ msg.coordinates32+"),POINT("+msg.coordinates41+","+ msg.coordinates42+"),'"+msg.description+"',"+msg.reqfulfilled+")";

console.log(qry);
	mysql.handle_database(function(err,results){

		if(err){
			console.log(err);
			throw err;
		}
		else 
		{
			callback(null, results);

		}
	},qry);

}
exports.requestbuildingform = requestbuildingform;
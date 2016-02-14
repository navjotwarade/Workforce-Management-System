/**
 * New node file
 */


var express = require('express');
var router = express.Router();
var ejs=require("ejs");

var mq_client = require('../rpc/client');
var express2=require('express-session');
var path = require('path');
var ejs = require("ejs");
var sys = require ('sys');
var http = require('http');
var fs=require('fs');




router.get('/RequestBuilding',function(req,res) {
	res.render('RequestBuilding');
});

router.get('/Clients',function(req,res){
	res.render('AdminViewClients');
});

router.get('/ClientList',function(req,res) {
	console.log("In ClientList");
	var msg_payload = { "type": "ClientList"};
	mq_client.make_request('client_queue',msg_payload, function(err,results){

		console.log(results);
		if(err)
		{
			throw err;
		}
		else 
		{			

			console.log(typeof(results));
			JSON.stringify(results);
			console.log(results);
			res.send(results);

		}  
	});
});
router.post('/ClientDetails2', function(req,res) {
	console.log("In ClientDetails2");
	var id=req.body.num ;
	var msg_payload = { "type": "ClientDetails2","id":id};
	mq_client.make_request('client_queue',msg_payload, function(err,results){

		console.log(results);
		if(err)
		{
			throw err;
		}
		else 
		{			
			console.log("Client side Details");
			console.log("res:"+results[0]);
			res.send(results);

		}  
	});
});

router.post('/DeleteClient',function(req,res) {
	console.log("In ClientDetails2");
	var id=req.body.num;
	var msg_payload = { "type": "DeleteClient","id":id};
	mq_client.make_request('client_queue',msg_payload, function(err,results){

		console.log(results);
		if(err)
		{
			throw err;
		}
		else 
		{			
			JSON.stringify(results);
			res.send(results);

		}  
	});
	
	

});
router.post('/requestbuildingform',function(req,res) {
	var ses=req.session;
	var id=ses.ssn;
	var bname=req.body.bname ;
	var coordinates11=req.body.coordinates11 ;
	var coordinates12=req.body.coordinates12 ;
	var coordinates21=req.body.coordinates21 ;
	var coordinates22=req.body.coordinates22 ;
	var coordinates31=req.body.coordinates31 ;
	var coordinates32=req.body.coordinates32 ;
	var coordinates41=req.body.coordinates41 ;
	var coordinates42=req.body.coordinates42 ;
	var description=req.body.description ;

	console.log(id);
	
	var msg_payload = { "type": "requestbuildingform","id":id,"bname":bname,"coordinates11":coordinates11,"coordinates12":coordinates12,"coordinates21":coordinates21,"coordinates22": coordinates22,"coordinates31":coordinates31,"coordinates32":coordinates32,"coordinates41":coordinates41,"coordinates42": coordinates42,"description":description,"reqfulfilled":1};
	mq_client.make_request('client_queue',msg_payload, function(err,results){

		console.log(results);
		if(err)
		{
			throw err;
		}
		else 
		{			
			JSON.stringify(results);
			res.send(results);

		}  
	});
});

router.post('/SignIn',function(req,res) {
	var name=req.body.num ;
	var pass=req.body.pass ;
	console.log(name);
	//console.log("printing user id: "+req.session.emailid);

	var qry="select * from Person where Firstname=? and LoginPassword=?";
	var params=[name,pass];
	console.log("Query is:"+qry);
	res.send("success");

});



router.post('/EditPersonalDetails',function(req,res) {

	var fname=req.body.fname ;
	var lname=req.body.lname ;
	var addr=req.body.addr ;
	var city=req.body.city ;
	var state=req.body.state ;
	var zip=req.body.zip ;
	var phone=req.body.phone ;
	var mail=req.body.mail ;
	var id=req.body.num ;
	console.log(id);

	var msg_payload = { "type": "EditPersonalDetails","fname":fname,"lname":lname,"addr":addr,"city":city,"state":state,"zip":zip,"phone":phone,"mail":mail,"id":id};
	mq_client.make_request('client_queue',msg_payload, function(err,results){

		console.log(results);
		if(err)
		{
			throw err;
		}
		else 
		{			
			JSON.stringify(results);
			res.send(results);

		}  
	});

});


router.post('/EditClientDetails',function(req,res) {

	var service=req.body.service ;
	var bal=req.body.bal ;
	var start=req.body.start ;
	var end=req.body.end ;
	var id=req.body.num ;
	console.log(id);


	var msg_payload = { "type": "EditClientDetails","service":service,"bal":bal,"start":start,"end":end,"id":id};
	mq_client.make_request('client_queue',msg_payload, function(err,results){

		console.log(results);
		if(err)
		{
			throw err;
		}
		else 
		{			
			JSON.stringify(results);
			res.send(results);

		}  
	});

	
	

});



module.exports = router;

/**
 * New node file
 */
var mq_client = require('../rpc/client');
var express = require('express');
var express2=require('express-session');
var router = express.Router();
var path = require('path');
var ejs = require("ejs");
var sys = require ('sys');
var http = require('http');
var fs=require('fs');

router.post('/submitAlertPage',function(req,res) {
	var id=req.body.alertid;
	var name=req.body.type;
	var desc=req.body.desc;
	var sev=req.body.severe;
	
	if(name==undefined){
		name=null
	}
	else{
		name=name;
	}

	var msg_payload = { "id": id,"type":"submitAlertPage","name":name,"desc":desc,"sev":sev};

	console.log(id+type+desc+sev);
	mq_client.make_request('guard_queue',msg_payload, function(err,results){

		if(results.affectedRows==1){ 
			console.log('The solution is: ', rows);

		}
		else {  console.log('Error while performing Query.');}

		res.send(results);	 
	});

});

router.get('/createGuard',function(req,res) {
	console.log("Inside create guard");
	res.render('CreateGuard');	
});

router.get('/assignguard',function(req,res) {
	console.log("Inside create guard");
	res.render('AssignGuard');	
});

router.post('/listGuard',function(req,res) {

	var msg_payload = {"type":"listGuard"};
	mq_client.make_request('guard_queue',msg_payload, function(err,results){

		if(results.affectedRows==1){ 
			console.log('The solution is: ', rows);

		}
		else {  console.log('Error while performing Query.');}

		res.send(results);	 
	});
});
router.post('/search',function(req,res) {
	var firstName=req.body.firstName;
	cosole.log("firstName:"+firstName);
	var msg_payload = { "firstName": firstName,"type":"searchGuard"};
	mq_client.make_request('guard_queue',msg_payload, function(err,results){

		if(results.affectedRows==1){ 
			console.log('The solution is: ', rows);

		}
		else {  console.log('Error while performing Query.');}

		res.send(results);	 
	}); 

});
router.post('/create',function(req,res) {
	console.log("Inside create for guard");
	var fname=req.body.firstname,
	lname=req.body.lastname ,
	addr=req.body.address ,
	city=req.body.city ,
	state=req.body.state ,
	zip=req.body.zip ,
	phone=req.body.phone ,
	email=req.body.email ,
	guardid=req.body.guardid ,
	sdate=req.body.sdate ,
	ldate=req.body.ldate ,
	totalhours=req.body.totalhours ,
	buildingid=req.body.buildingid ,
	mon=req.body.mon ,
	tue=req.body.tue ,
	wed=req.body.wed ,
	thu=req.body.thu ,
	fri=req.body.fri ,
	sat=req.body.sat ,
	sun=req.body.sun ,
	password=req.body.password,
	clientid=req.body.ClientID;
	
	console.log("mon:"+mon);
	console.log("tue:"+tue);
	console.log("wed"+wed);
	console.log("thu:"+thu);
	console.log("fri:"+fri);
	console.log("sat:"+sat);
	console.log("sun:"+sun);
	
	console.log(fname);

	var msg_payload = { "type":"create","fname": fname, "lname": lname ,"addr":addr, "city":city,"state":state, "zip":zip,"phone":phone,"email":email,"guardid":guardid,"sdate":sdate,"ldate":ldate,"totalhours":totalhours,"buildingid":buildingid,"password":password,"ClientID":clientid,"mon":mon,"tue":tue,"wed":wed,"thu":thu,"fri":fri,"sat":sat,"sun":sun};
	mq_client.make_request('guard_queue',msg_payload, function(err,results){

		if(results.affectedRows==1){ 
			console.log('The solution is: ', rows);

		}
		else {  console.log('Error while performing Query.');}

		res.send(results);	 
	}); 

});

router.post('/CreateGuard',function(req,res) {

	var guardid=req.body.first ;
	var msg_payload = { "type":"CreateGuard","guardid":guardid };
	mq_client.make_request('guard_queue',msg_payload, function(err,results){

		if(results.affectedRows==1){ 
			console.log('The solution is: ', rows);

		}
		else {  console.log('Error while performing Query.');}

		res.send(results);	 
	}); 	
});

router.get('/getsubmitAlertPage',function(req,res) {
	res.render('submitAlertPage');

});

router.post('/abc',function(req,res) {

	var id=req.body.first ;
	
	var msg_payload = { "type":"abc","id":id};
	mq_client.make_request('guard_queue',msg_payload, function(err,results){

		if(results.affectedRows==1){ 
			console.log('The solution is: ', rows);

		}
		else {  console.log('Error while performing Query.');}

		res.send(results);	 
	}); 

	
});
router.post('/update',function(req,res) {
	
	console.log("In update function");
	var fname=req.body.firstname ,
	lname=req.body.lastname ,
	addr=req.body.address ,
	city=req.body.city ,
	state=req.body.state ,
	zip=req.body.zip ,
	phone=req.body.phone ,
	email=req.body.email ,
	guardid=req.body.guardid ,
	sdate=req.body.sdate ,
	ldate=req.body.ldate ,
	totalhours=req.body.totalhours ,
	buildingid=req.body.buildingid ,
	mon=req.body.mon ,
	tue=req.body.tue ,
	wed=req.body.wed ,
	thu=req.body.thu ,
	fri=req.body.fri ,
	sat=req.body.sat ,
	sun=req.body.sun ;
	console.log(fname);

	var msg_payload = { "type":"update","fname": fname, "lname": lname ,"addr":addr, "city":city,"state":state, "zip":zip,"phone":phone,"email":email,"guardid":guardid,"sdate":sdate,"ldate":ldate,"totalhours":totalhours,"buildingid":buildingid};

	mq_client.make_request('guard_queue',msg_payload, function(err,results){

		if(results.affectedRows==1){ 
			console.log('The solution is: ', rows);

		}
		else {  console.log('Error while performing Query.');}

		res.send(results);	 
	}); 
	
});
module.exports = router;


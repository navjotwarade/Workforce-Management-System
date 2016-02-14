var express = require('express');
var router = express.Router();
var mq_client = require('../rpc/client');
var ses;

/* GET home page. */
router.get('/', function(req, res) {
	  res.render('wfmhome');
	});

module.exports = router;


router.post('/afterlogin', function(req, res) {
	var ssn = req.body.ssn;
	var password = req.body.password;
	var type = req.body.type;
	ses=req.session;
	ses.ssn=ssn;
	var msg_payload = { "ssn": ssn, "password": password, "type": type, "service": "login"};
	
	mq_client.make_request('login_queue',msg_payload, function(err,results){
		
		console.log(results);
		if(err)
		{
			throw err;
		}
		else 
		{
			if(results.code == 200){
				console.log("valid Login");
				res.send({"login": type});
			}
			else {    
				console.log("Invalid Login");
				res.send({"login":"Fail"});
			}
		}  
	});
	
});

router.get('/logout', function(req, res){
	console.log(req.session.username);
	  req.session.destroy(function(err){
		  if(err){
			  console.log(err);
		  }
		  else{
			  res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0'); 
			  res.redirect('/login');
		  }
		  
	  });
});

router.get('/home', function(req, res) {
	  res.render('wfmhome');
});

router.get('/login', function(req, res) {
	  res.render('wfmlogin');
});

router.get('/signup', function(req, res) {
	  res.render('wfmsignup');
});

router.get('/contact', function(req, res) {
	  res.render('wfmcontact');
});

router.get('/admin', function(req, res) {
	  res.render('Admin');
});

router.get('/client', function(req, res) {
	  res.render('Client');
});

router.get('/guardlogin', function(req, res) {
	  res.render('guardLogin');
});

router.get('/guard', function(req, res) {
	  res.render('guardHome');
});


router.get('/editGuardDetails', function(req, res) {
	  res.render('editGuard');
});

router.get('/getAdminDetails', function(req, res) {
var msg_payload = { "ssn": req.session.ssn,"type": 1, "service":"admin"};		
	
	mq_client.make_request('login_queue',msg_payload, function(err,results){
		
		console.log(results);
		if(err)
		{
			throw err;
		}
		else 
		{
			if(results[1].code == '200'){
				results.pop();
				console.log("Admin data fetched");
				res.send(results);
			}
			else{    
				console.log("Invalid Login");
				res.send({"admin":"Fail"});
			}
		}  
	});
});

router.get('/getGuardDetails', function(req, res) {
	var msg_payload = { "ssn": req.session.ssn,"type": 3, "service":"guarddetails"};		
		console.log("Printing MSG: "+ msg_payload.ssn);
		mq_client.make_request('login_queue',msg_payload, function(err,results){
			
			console.log(results);
			if(err)
			{
				throw err;
			}
			else 
			{
				if(results[1].code == '200'){
					results.pop();
					console.log("Guard data fetched");
					res.send(results);
				}
				else{    
					console.log("Invalid Login");
					res.send({"guard":"Fail"});
				}
			}  
		});
	});

router.get('/getClientDetails', function(req, res) {
	var msg_payload = { "ssn": req.session.ssn,"type": 2, "service":"client"};		
		
		mq_client.make_request('login_queue',msg_payload, function(err,results){
			
			console.log(results);
			if(err)
			{
				throw err;
			}
			else 
			{
				if(results[1].code == '200'){
					results.pop();
					console.log("client data fetched");
					res.send(results);
				}
				else{    
					console.log("Invalid Login");
					res.send({"client":"Fail"});
				}
			}  
		});
	});

router.get('/getGuard', function(req, res) {
	var msg_payload = { "ssn": req.session.ssn, "service":"guard"};		
		
		mq_client.make_request('login_queue',msg_payload, function(err,results){
			
			console.log(results);
			if(err)
			{
				throw err;
			}
			else 
			{
				if(results[1].code == '200'){
					results.pop();
					console.log("client data fetched");
					res.send(results);
				}
				else{    
					console.log("Invalid Login");
					res.send({"client":"Fail"});
				}
			}  
		});
	});

router.get('/getClient', function(req, res) {
	var msg_payload = { "ssn": req.session.ssn, "service":"clientdetail"};		
		
		mq_client.make_request('login_queue',msg_payload, function(err,results){
			
			console.log(results);
			if(err)
			{
				throw err;
			}
			else 
			{
				if(results[1].code == '200'){
					results.pop();
					console.log("client data fetched");
					res.send(results);
				}
				else{    
					console.log("Invalid Login");
					res.send({"client":"Fail"});
				}
			}  
		});
	});

router.post('/submitAlertPage',function(req,res) {
	var id=req.param("alertid");
	var name=req.param("type");
	var desc=req.param("desc");
	var sev=req.param("severe");

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

router.get('/CreateGuard',function(req,res) {
	res.render('CreateGuard');	
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
	var a=req.param("firstName");
	var msg_payload = { "firstName": a,"type":"searchGuard"};
	mq_client.make_request('guard_queue',msg_payload, function(err,results){

		if(results.affectedRows==1){ 
			console.log('The solution is: ', rows);

		}
		else {  console.log('Error while performing Query.');}

		res.send(results);	 
	}); 

});
router.post('/create',function(req,res) {
	console.log("in create guard");											
	var fname=req.param("firstname"),
	lname=req.param("lastname"),
	addr=req.param("address"),
	city=req.param("city"),
	state=req.param("state"),
	zip=req.param("zip"),
	phone=req.param("phone"),
	email=req.param("email"),
	guardid=req.param("guardid"),
	sdate=req.param("sdate"),
	ldate=req.param("ldate"),
	totalhours=req.param("totalhours"),
	buildingid=req.param("buildingid"),
	mon=req.param("mon"),
	tue=req.param("tue"),
	wed=req.param("wed"),
	thu=req.param("thu"),
	fri=req.param("fri"),
	sat=req.param("sat"),
	sun=req.param("sun"),
	password=req.param("password");
	console.log(fname);

	var msg_payload = { "type":"create","fname": fname, "lname": lname ,"addr":addr, "city":city,"state":state, "zip":zip,"phone":phone,"email":email,"guardid":guardid,"sdate":sdate,"ldate":ldate,"totalhours":totalhours,"buildingid":buildingid,"password":password};
	mq_client.make_request('guard_queue',msg_payload, function(err,results){

		if(results.affectedRows==1){ 
			console.log('The solution is: ', rows);

		}
		else {  console.log('Error while performing Query.');}

		res.send(results);	 
	}); 

});

router.post('/CreateGuard',function(req,res) {

	var guardid=req.param("first");
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


router.post('/update',function(req,res) {
	
	console.log("In update function");
	var fname=req.param("firstname"),
	lname=req.param("lastname"),
	addr=req.param("address"),
	city=req.param("city"),
	state=req.param("state"),
	zip=req.param("zip"),
	phone=req.param("phone"),
	email=req.param("email"),
	guardid=req.param("guardid"),
	sdate=req.param("sdate"),
	ldate=req.param("ldate"),
	totalhours=req.param("totalhours"),
	buildingid=req.param("buildingid"),
	mon=req.param("mon"),
	tue=req.param("tue"),
	wed=req.param("wed"),
	thu=req.param("thu"),
	fri=req.param("fri"),
	sat=req.param("sat"),
	sun=req.param("sun");
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

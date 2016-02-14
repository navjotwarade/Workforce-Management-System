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

router.get('/ListbuildingReport',function(req,res) {
	res.render('ListbuildingReport');
});

router.post('/populatebuildingReport',function(req,res){

	res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
	var ses=req.session;
	console.log("\nreport populate:"+ses.ssn);
	if(ses.ssn)
	{
		var msg_payload = {"type": "populatebuilding","Client_ID":ses.ssn};
		console.log("\nsess:"+ses.ssn);
		mq_client.make_request('report_queue',msg_payload, function(err,results){
			
			if(err){
				console.log("\nIn client"+err);
				throw err;
			}
			else 
			{
				console.log("\nBuilding result :"+results);
				console.log("\nTotal Builing :"+results[1][0].TotalBuilding);
				if(results[1][0].TotalBuilding>=1)
				{
					res.send({"data":results});


				}
				else{
					res.send({"data":"Failure"});
				}
			}  
		});

	}
	else{

		res.redirect('/');

	}
});

router.get('/ListAllReportsbyAllGuards/:id(\\d+)',function(req,res){
	ses=req.session;
	ses.BuildingID=req.params.id;
	console.log("\nBuildingID session:"+ses.BuildingID);
	console.log("\ssn session:"+ses.ssn);
	res.render('ListbuildingReport');
});

router.post('/populateAllReportsbyAllGuards',function(req,res){
	res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
	ses=req.session;
	if(ses.ssn)
	{
		console.log("\populate sess BuildingID:"+ses.BuildingID);
		var msg_payload = {"type": "populateAllReportsbyAllGuards","Client_ID":ses.ssn,"BuildingID":ses.BuildingID};
		console.log("\nsess:"+ses.ssn);
		mq_client.make_request('report_queue',msg_payload, function(err,results){
			if(err){
				throw err;
			}
			else 
			{
				console.log("\nBuilding Report result :"+results);
				console.log("\nTotal Report :"+results[1][0].TotalReports);
				if(results[1][0].TotalReports>=1)
				{
					res.send({"data":results});


				}
				else{
					res.send({"data":"Failure"});
				}
			}  
		});

	}
	else{

		res.redirect('/');

	}
});


router.get('/ViewReports/:reportdate/:guardid/:buildingid',function(req,res){
	ses=req.session;
	
	ses.bid=req.params.buildingid;
	ses.reportdate=req.params.reportdate;
	ses.guardid=req.params.guardid;
	console.log("\Viewreports sess reportdate:"+ses.reportdate);
	console.log("\ViewReports sess guardid:"+ses.guardid);
	
	res.render('ViewReports');
	
	

});
router.post('/viewreportbyguard',function(req,res){
	res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
	ses=req.session;
	if(ses.ssn)
	{
		console.log("\to queue sess id:"+ses.ssn);
		console.log("\to queue sess BuildingID:"+ses.bid);
		console.log("\to queue sess reportdate:"+ses.reportdate);
		console.log("\to queue sess guardid:"+ses.guardid);
		var msg_payload = {"type": "viewreportbyguard","Client_ID":ses.ssn,"BuildingID":ses.bid,"Guard_ID":ses.guardid,"Reportdate":ses.reportdate};
		mq_client.make_request('report_queue',msg_payload, function(err,results){
			if(err){
				throw err;
			}
			else 
			{
				console.log("\nBuilding Report result :"+results);
				res.send({"data":results});

			}  
		});

	}
	else{

		res.redirect('/');

	}
});


router.get('/SearchReport',function(req,res){
	
	res.render('SearchReport');
	

});


router.post('/populateSearchReportlist',function(req,res){
	res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
	ses=req.session;
	if(ses.ssn)
	{
		console.log("\sess id:"+ses.ssn);
		var msg_payload = {"type": "populateSearchReportlist","Client_ID":ses.ssn};
		mq_client.make_request('report_queue',msg_payload, function(err,results){
			if(err){
				throw err;
			}
			else 
			{
				res.send({"data":results});

			}  
		});

	}
	else{

		res.redirect('/');

	}
	
});

router.get('/SearchReportResult/:buildingid/:guardname/:reportdate(\\d+\/\\d+\/\\d+)/:IRdropdown/:PVdropdown/:MCdropdown/:CSdropdown',function(req,res){
	ses=req.session;
	ses.Building=req.params.buildingid;
	if(req.params.reportdate=='01/01/1900'){
		ses.reportdate=null;
	}
	else{
		ses.reportdate=req.params.reportdate;	
	}
	if(req.params.guardname=='np'){
		ses.guardname=null;
	}
	else{
		ses.guardname=req.params.guardname;	
	}
	ses.IRdropdown=req.params.IRdropdown;
	ses.PVdropdown=req.params.PVdropdown;
	ses.MCdropdown=req.params.MCdropdown;
	ses.CSdropdown=req.params.CSdropdown;

	console.log("\n Search Report sess buildingid:"+ses.Building);
	console.log("\n Search Report sess reportdate:"+ses.reportdate);
	console.log("\n Search Report sess guardid:"+ses.guardname);

	res.render('SearchReportResults');
	
	
});
router.post('/FindSearchReportResults',function(req,res){
	res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
	ses=req.session;
	if(ses.ssn)
	{
		console.log("\sess id:"+ses.ssn);
		var msg_payload = {"type": "FindSearchReportResults","Client_ID":ses.ID,"BuildingID":ses.Building,"Guard_ID":ses.guardname,"PV":ses.PVdropdown,"MC":ses.MCdropdown,"CS":ses.CSdropdown,"IR":ses.IRdropdown,"Reportdate":ses.reportdate};
		mq_client.make_request('report_queue',msg_payload, function(err,results){
			if(err){
				throw err;
			}
			else 
			{
				res.send({"data":results});

			}  
		});

	}
	else{

		res.redirect('/');

	}
});
router.get('/DisplayGuardlocation',function(req,res){
	
	res.render('DisplayGuardlocation');
	
});


router.post('/guardlocation',function(req,res){
	
	res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
	ses=req.session;
	if(ses.ssn)
	{
		console.log("\sess id:"+ses.ssn);
		var msg_payload = {"type": "guardlocation","Client_ID":ses.ssn};
		mq_client.make_request('report_queue',msg_payload, function(err,results){
			if(err){
				throw err;
			}
			else 
			{
				res.send({"data":results});

			}  
		});

	}
	else{

		res.redirect('/');

	}
	
	
});


router.get('/ViewClientGuardlocation',function(req,res){
	
	res.render('ViewClientGuardlocation');
	

});

router.post('/populateviewclientGuardlocation',function(req,res){
	console.log("here in populate");
	res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
	ses=req.session;
	if(ses.ssn)
	{
		console.log("\sess id:"+ses.ssn);
		var msg_payload = {"type": "populateviewclientGuardlocation"};
		mq_client.make_request('report_queue',msg_payload, function(err,results){
			if(err){
				throw err;
			}
			else 
			{
				console.log("\nClient result:"+results);
				console.log("\nTotal Client :"+results[1][0].TotalClient);
				if(results[1][0].TotalClient>=1)
				{
					res.send({"data":results});


				}
				else{
					res.send({"data":"Failure"});
				}
			}  
		});

	}
	else{

		res.redirect('/');

	}

});
router.get('/DisplayAdminGuardlocation/:Clientid',function(req,res){
	ses=req.session;
	ses.ClientIDGuardlocation=req.params.Clientid;

	res.render('DisplayAdminGuardlocation');
	

});


router.post('/Adminguardlocation',function(req,res){
	res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
	ses=req.session;
	if(ses.ID)
	{
		console.log("\sess id:"+ses.ClientIDGuardlocation);
		var msg_payload = {"type": "Adminguardlocation","Client_ID":ses.ClientIDGuardlocation};
		mq_client.make_request('report_queue',msg_payload, function(err,results){
			if(err){
				throw err;
			}
			else 
			{
				res.send({"data":results});

			}  
		});

	}
	else{

		res.redirect('/');

	}
});

module.exports = router;
/**
 * New node file
 */
var express = require('express');
var router = express.Router();
var mysql=require("./mysql_bldg");
var ejs=require("ejs");

var mq_client = require('../rpc/client');
var express2=require('express-session');
var path = require('path');
var ejs = require("ejs");
var sys = require ('sys');
var http = require('http');
var fs=require('fs');

router.post('/raiseAlert', function(req, res) {
	ses=req.session;
	var msg_payload = {
			"GuardID" : ses.ssn,
			"AlertID" :req.body.AlertID,
			"AlertDesc" : req.body.AlertDesc,
	        "Type": "RaiseAlert"
	    };

	
	
	   mq_client.make_request('alert_queue', msg_payload, function(err, results) {

	        if (err) {
	            throw err;
	        } else {


	            if (results.Reply == "Success")
	            	res.send("Success");
	            else
	            	res.send("Fail");
	        }
	    });

});

router.post('/submitIncident', function(req, res) {
	ses=req.session;
	var msg_payload = {
	        "GuardID": ses.ssn,
	        "EventDesc": req.body.EventDesc ,
	        "Severity" : req.body.Severity ,
	        "EventType" : req.body.EventType ,
	        "Type": "SubmitIncident"
	    };
	    mq_client.make_request('alert_queue', msg_payload, function(err, results) {

	        if (err) {
	            throw err;
	        } else {


	            if (results.Reply == "Success")
	                res.send("Success");
	            else
	            	res.send("Fail");
	        }
	    });
	
	
});


router.get('/submitAlert', function(req, res) {
	
	 var msg_payload = {
		        "Type": "SubmitAlert"
		    };
		    mq_client.make_request('alert_queue', msg_payload, function(err, results) {

		        if (err) {
		            throw err;
		        } else {


		            if (results.Reply == "Success")
		            	 res.render('submitAlert',{"AlertList": results.AlertList});
		            else
		            	res.send("Fail");
		        }
		    });
});


router.get('/alerts', function(req, res) {
	 
	 var msg_payload = {
		        "Type": "ListAlert"
		    };
	 
		    mq_client.make_request('alert_queue', msg_payload, function(err, results) {
		    	
		        if (err) {
		            throw err;
		        } else {
		        	res.render('displayAlerts',results);

		        }
		    });
	
});



router.post('/createAlert', function(req, res) {
	var msg_payload = {
	        "AlertName": req.body.AlertName,
	        "AlertDesc": req.body.AlertDesc,
	        "AlertSeverity" : req.body.AlertSeverity,
	        "Type": "CreateAlert"
	        
	    };
	console.log(msg_payload);
	    mq_client.make_request('alert_queue', msg_payload, function(err, results) {

	        if (err) {
	            throw err;
	        } else {


	            if (results.Reply == "Success")
	                
	            res.send("Success");
	            else
	            	res.send("Fail");
	        }
	    });
		
});


router.get('/viewalerts', function(req, res) {
	var msg_payload = {
	        "Type": "ViewAlert"
	    };
	    mq_client.make_request('alert_queue', msg_payload, function(err, results) {

	        if (err) {
	            throw err;
	        } else {
	            if (results.Reply == "Success"){
	            console.log(results);
	            res.render('viewAlerts',results);
	            }
	            else
	            	res.send("Fail");
	        }
	    });
});

router.get('/viewclientalerts',function(req,res){
	ses=req.session;
	var msg_payload = {
			"Client_SSN" : ses.ssn,
	        "Type": "ViewAlertClient"
	    };
	    mq_client.make_request('alert_queue', msg_payload, function(err, results) {

	        if (err) {
	            throw err;
	        } else {
	            if (results.Reply == "Success"){
	            console.log(results);
	            res.render('viewAlerts-clientpage',results);
	            }
	            else
	            	res.send("Fail");
	        }
	    });
});

module.exports = router; 

/**
 * Alert Service
 */


var mysql = require('./mysql');

function createAlert(message, callback) {
	var query="INSERT INTO Alerts (AlertName,AlertDescription,Severity) VALUES ('" + message.AlertName+ "','"+ message.AlertDesc+"','"+ message.AlertSeverity+"')";
	console.log(query); 
	mysql.handle_database(function(err, results) {
         if (err) {
        	 
             throw err;
         } else {
        	 
        	 callback(null,{"Reply": "Success"});
         }
     }, query);
}

function  showAlerts (message,callback){
	var query="SELECT * FROM Alerts";

mysql.handle_database(function(err, results) {
    if (err) {
        throw err;
    } else {
   	 var AlertList= {'AlertList' : results };
   	 console.log(results);
   	 callback(null,AlertList);
    }
}, query);

}


function submitIncident(message,callback){
	var query="INSERT INTO PatrolEvents (Guard_ID, Building_ID,Client_ID,Description,DateSubmitted,Severity,EventType) select " + message.GuardID+ ",Building_ID,Client_ID,'"+ message.EventDesc+"',NOW(),'"+ message.Severity+"','"+message.EventType +"' FROM GUARD WHERE GUARD_ID="+message.GuardID;
	console.log(query);
	mysql.handle_database(function(err, results) {
         if (err) {
             throw err;
         } else {
        	 
        	 callback(null,{"Reply" : "Success"});
         }
     }, query);
}

function submitAlert(message,callback){
	var query="SELECT alerts_id,alertname FROM Alerts";
	 mysql.handle_database(function(err, results) {
         if (err) {
             throw err;
         } else {
        	 var AlertList= {'AlertList' : results,"Reply" :"Success" };
        	 callback(null,AlertList);
         }
     }, query);
}



function raiseAlert(message,callback){

	console.log(message.GuardID);
	var GuardID=message.GuardID;
	var AlertID=message.AlertID;
	var Building_ID="";
	var ClientID="";
	var ClientEmailID="";
	var query="";
	var AlertName="";
	var Address="";
	var email   = require("emailjs/email");
	var server  = email.server.connect({
		   user:    "alert.workflowmanagment@gmail.com", 
		   password: "team062015", 
		   host:    "smtp.gmail.com",
		   ssl:     true
		});
	
	
	var guardQuery= "select gt.building_id as Building_ID, bt.Address as Address,gt.client_id as Client_ID,pt.EmailID as EmailID,atb.AlertName as AlertName From guard gt,clients ct,person pt,alerts atb,Building bt where gt.client_id=ct.client_ssn AND gt.Building_ID=bt.Building_ID AND pt.ssn=ct.client_ssn AND gt.Guard_ID="+GuardID +" AND atb.Alerts_id="+AlertID;
	console.log("Guard Query: " +guardQuery);
	
	mysql.handle_database(function(err, results) {
        if (err) {
            throw err;
        } else {
       	console.log(results);
       	Building_ID=results[0].Building_ID;
       	Client_ID=results[0].Client_ID;
       	ClientEmailID=results[0].EmailID;  
       	AlertName=results[0].AlertName;
       	Address=results[0].Address;
    	
    	server.send({
    		text: " Building ID: "+ Building_ID +" \n Address: "+Address+ " \n AlertDesciption : "+ message.AlertDesc +"\n Submitted by GuardID : "+GuardID,
    		from:    "alert.workflowmanagment@gmail.com", 
    		to:      "shrutiadarshjoshi@gmail.com,Client<"+ClientEmailID+">",
    		subject: "ALERT : " + AlertName
    	}, function(err, message) { console.log(err || message); });
    
    	query="INSERT INTO AlertsRaised(Alert_ID, Guard_ID, Building_ID, AlertRaiseTime,Description) values ("+AlertID +","+GuardID+", "+Building_ID+",NOW(),'"+ message.AlertDesc+"')";
    	console.log("Insert Query : "+query);
    	mysql.handle_database(function(err, results) {
            if (err) {
            	console.log(err)
                throw err;
            } else {
           	 console.log(results);        	
           	callback(null,{"Reply" :"Success"});
           	 
            }
        }, query);
    
        }
    }, guardQuery);
	
}


function viewAlert(msg,callback){
	var queryClients="Select Client_SSN from CLIENTS";
	var queryBuildings="SELECT building_id,client_id FROM Building;";
	var queryAlertsRaised="SELECT * FROM AlertsRaised,alerts where alerts.Alerts_ID=alertsraised.alert_id";
	mysql.handle_database(function(err, results) {
         if (err) {
             throw err;
         } else {
        	 var ViewAlertList= {'ClientList' : results };
        	 console.log("nest1");
        	 mysql.handle_database(function(err, results) {
                 if (err) {
                     throw err;
                 } else {
                	 ViewAlertList.BuildingList=results;
                	 
                	 
                	 mysql.handle_database(function(err, results) {
                         if (err) {
                             throw err;
                         } else {
                        	 ViewAlertList.AlertRaisedList=results;
                        	 ViewAlertList.Reply="Success";
                        	 console.log(ViewAlertList);
                        	 callback(null,ViewAlertList);
                         }
                     }, queryAlertsRaised);
                 }
             }, queryBuildings);
         }
     }, queryClients);
	
}

function viewAlertClientPage(msg,callback){
	var queryBuildings="SELECT building_id FROM Building where client_id="+msg.Client_SSN;
	var queryAlertsRaised="SELECT * FROM AlertsRaised,alerts where alerts.Alerts_ID=alertsraised.alert_id AND alertsraised.client_id="+msg.Client_SSN;
	var ViewAlertList={};
	mysql.handle_database(function(err, results) {
         if (err) {
             throw err;
         } else {
        	 ViewAlertList.BuildingList=results;
        	 
        	 console.log("Inside view alert client");
        	 mysql.handle_database(function(err, results) {
                 if (err) {
                     throw err;
                 } else {
                	 ViewAlertList.AlertRaisedList=results;
                	 ViewAlertList.Reply="Success";
                	 console.log(ViewAlertList);
                	 callback(null,ViewAlertList);
                 }
             }, queryAlertsRaised);
         }
     }, queryBuildings);
}

//Export the functions
exports.createAlert=createAlert;
exports.showAlerts=showAlerts;
exports.submitIncident=submitIncident
exports.raiseAlert=raiseAlert;
exports.submitAlert=submitAlert; 
exports.viewAlertClientPage=viewAlertClientPage;
exports.viewAlert=viewAlert;
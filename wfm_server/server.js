var amqp = require('amqp')
, util = require('util');

var login = require('./services/login');
var client = require('./services/Client');
var building = require('./services/building');
var guard = require('./services/Guard');
var report = require('./services/report');
var alert = require('./services/alert');

var connection = amqp.createConnection({host:'localhost'});
var guardconnection = amqp.createConnection({host:'localhost'});
var reportconnection = amqp.createConnection({host:'localhost'});
var alertconnection = amqp.createConnection({host:'localhost'});

connection.on('ready', function(){
	console.log("listening on login_queue");

	connection.queue('login_queue', function(q){
		q.subscribe(function(message, headers, deliveryInfo, m){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			login.handle_request(message, function(err,res){

				//return index sent
				connection.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		});
	});
	connection.queue('client_queue', function(q){
		q.subscribe(function(message, headers, deliveryInfo, m){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			if(message.type=="ClientList"){

				client.ClientList(message, function(err,res){

					//return index sent
					connection.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
			}
			else if(message.type=="ClientDetails2"){

				client.ClientDetails2(message, function(err,res){

					//return index sent
					connection.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
			}
			else if(message.type=="DeleteClient"){

				client.DeleteClient(message, function(err,res){

					//return index sent
					connection.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
			}
			else if(message.type=="EditPersonalDetails"){

				client.EditPersonalDetails(message, function(err,res){

					//return index sent
					connection.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
			}
			else if(message.type=="EditClientDetails"){

				client.EditClientDetails(message, function(err,res){

					//return index sent
					connection.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
			}
			else if(message.type=="requestbuildingform"){

				client.requestbuildingform(message, function(err,res){

					//return index sent
					connection.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
			}
			

		});

	});

	connection.queue('guard_queue', function(q){
		console.log('listening on guard queue');
		q.subscribe(function(message, headers, deliveryInfo, m){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			if(message.type=="submitAlertPage"){

				guard.submitAlertPage(message, function(err,res){

					//return index sent
					connection.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
			}
			else if(message.type=="listGuard"){

				guard.listGuard(message, function(err,res){

					//return index sent
					connection.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
			}
			else if(message.type=="searchGuard"){

				guard.searchGuard(message, function(err,res){

					//return index sent
					connection.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
			}
			else if(message.type=="create"){
				console.log("in create serverside");
				guard.create(message, function(err,res){

					//return index sent
					connection.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
			}
			else if(message.type=="CreateGuard"){

				guard.CreateGuard(message, function(err,res){

					//return index sent
					connection.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
			}
			else if(message.type=="deleteGuard"){

				guard.deleteGuard(message, function(err,res){

					//return index sent
					connection.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
			}
			else if(message.type=="update"){

				guard.update(message, function(err,res){

					//return index sent
					connection.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
			}
			else if(message.type=="PopulateBuildingClient"){

				guard.PopulateBuildingClient(message, function(err,res){

					//return index sent
					connection.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
			}
			
			else if(message.type=="GuardList"){

				guard.GuardList(message, function(err,res){

					//return index sent
					connection.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
			}
			else if(message.type=="GuardDetails"){

				guard.GuardDetails(message, function(err,res){

					//return index sent
					connection.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
			}
			else if(message.type=="signup"){

				guard.signup(message, function(err,res){

					//return index sent
					connection.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
			}
			else if(message.type=="DeleteGuard"){

				guard.DeleteGuard(message, function(err,res){

					//return index sent
					connection.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
			}
			else if(message.type=="EditGuardDetails"){

				guard.EditGuardDetails(message, function(err,res){

					//return index sent
					connection.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
			}
			else if(message.type=="EditGuardPersonalDetails"){

				guard.EditGuardPersonalDetails(message, function(err,res){

					//return index sent
					connection.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
			}
		});
	});

});




guardconnection.on('ready', function(){
	console.log("listening on building_queue")
	guardconnection.queue('building_queue', function(q){
		q.subscribe(function(message, headers, deliveryInfo, m){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			
			if(message.type=="building"){

				building.building(message, function(err,res){

					//return index sent
					guardconnection.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
			}
			else if(message.type=="building1"){

				building.building1(message, function(err,res){

					//return index sent
					guardconnection.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
			}
			else if(message.type=="acceptBuilding1"){
				building.acceptBuilding1(message, function(err,res){

					//return index sent
					guardconnection.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
			}
			else if(message.type=="rejectBuilding1"){
				building.rejectBuilding1(message, function(err,res){
					//return index sent
					guardconnection.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
			}
			else if(message.type=="buildingDetails"){
				building.buildingDetails(message, function(err,res){
					console.log("Inside Building Details Server.");
					guardconnection.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
			}
			else if(message.type=="deleteBuilding"){
				building.deleteBuilding(message, function(err,res){
					console.log("Inside deleteBuilding Server.");
					guardconnection.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
			}
			else if(message.type=="editBuildingDetails"){
				building.editBuildingDetails(message, function(err,res){
					console.log("Inside editBuildingDetails Server Queue.");
					guardconnection.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
			}
			else if(message.type=="updateBuildingDetails"){
				building.updateBuildingDetails(message, function(err,res){
					console.log("Inside updateBuildingDetails Server Queue.");
					guardconnection.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
			}
		});
	});
});



reportconnection.on('ready', function(){


	reportconnection.queue('report_queue', function(q){
		console.log("listening on report_queue");
		q.subscribe(function(message, headers, deliveryInfo, m){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			if(message.type=="populatebuilding"){
				console.log("calling populatebuilding");
				report.populatebuilding(message, function(err,res){
					reportconnection.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
			}
			else if(message.type=="populateAllReportsbyAllGuards"){
				report.populateAllReportsbyAllGuards(message, function(err,res){
					reportconnection.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
			}
			else if(message.type=="viewreportbyguard"){
				report.viewreportbyguard(message, function(err,res){
					reportconnection.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
			}
			else if(message.type=="populateSearchReportlist"){
				report.populateSearchReportlist(message, function(err,res){
					reportconnection.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
			}
			else if(message.type=="FindSearchReportResults"){
				report.FindSearchReportResults(message, function(err,res){
					reportconnection.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
			}
			else if(message.type=="guardlocation"){
				report.guardlocation(message, function(err,res){
					reportconnection.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
			}
			else if(message.type=="populateviewclientGuardlocation"){
				report.populateviewclientGuardlocation(message, function(err,res){
					reportconnection.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
			}
			else if(message.type=="Adminguardlocation"){
				report.Adminguardlocation(message, function(err,res){
					reportconnection.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
			}
		});
	});



});



alertconnection.on('ready', function(){
	console.log("listening on alert_queue");

	alertconnection.queue('alert_queue', function(q){
		
		 q.bind('#');
		q.subscribe(function(message, headers, deliveryInfo, m){
			console.log("Inside function");
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			
			
			//Create Alerts
			if(message.Type == "CreateAlert"){
				console.log("Check3");
				alert.createAlert(message, function(err,res){
					
					//return index sent
					alertconnection.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
			}
			//View Alerts
			if(message.Type == "ViewAlert"){
				alert.viewAlert(message, function(err,res){
					console.log("Inside view alert admin server");
					//return index sent
					alertconnection.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
			}
			
			
			//View Alerts Clients
			if(message.Type == "ViewAlertClient"){
				alert.viewAlertClientPage(message, function(err,res){
					console.log("Inside view alert client server");
					//return index sent
					alertconnection.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
			}
			
			//Display Alerts
			if(message.Type == "ListAlert"){
				alert.showAlerts(message, function(err,res){
						
					//return index sent
					alertconnection.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
			}
			
			//Submit an incident 		
			if(message.Type == "SubmitIncident"){
				alert.submitIncident(message, function(err,res){
					
					//return index sent
					alertconnection.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
			}
			
			
			
			//Submit an alert 		
			if(message.Type == "SubmitAlert"){
				alert.submitAlert(message, function(err,res){
					
					//return index sent
					alertconnection.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
			}
			
			
			//RaiseAlert 		
			if(message.Type=="RaiseAlert"){
				alert.raiseAlert(message, function(err,res){
					
					//return index sent
					alertconnection.publish(m.replyTo, res, {
						contentType:'application/json',
						contentEncoding:'utf-8',
						correlationId:m.correlationId
					});
				});
			}
			
		});
	});
});
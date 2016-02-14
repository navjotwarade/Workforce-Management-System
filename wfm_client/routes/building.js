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



router.get('/building', function(req, res) {	


	var msg_payload = { "type": "building"};
	mq_client.make_request('building_queue',msg_payload, function(err,results){

		console.log(results);
		if(err)
		{
			throw err;
		}
		else 
		{			
			if(results.length > 0){
				var x=[];
				var y=[];
				var client=[];
				var building=[];
				var address=[];

				for(var i=0; i<results.length; i++)
				{
					x.push(results[i].X);
					y.push(results[i].Y);
					client.push(results[i].Client_ID);
					building.push(results[i].Building_name);
					address.push(results[i].description);
				}
				x.toString();y.toString();

				console.log("X: "+x+" Y: "+y);
				
				var msg_payload1 = { "type": "building1"};
				mq_client.make_request('building_queue',msg_payload1, function(err,results){
					console.log(results);
					if(err)
					{
						throw err;
					}
					else 
					{
						if(results.length > 0)
						{

							var clientList=[];

							for(var j=0;j<results.length;j++)
							{
								clientList.push(results[j].Client_ID);
							}

							ejs.renderFile('./views/buildingHomePage.ejs',{x:x, y:y, client:client, building:building, address:address, noResult:null, cList:clientList},function(err, result) 
									{
								if (!err) {
									res.end(result);
								}
								else {
									res.end('An error occurred');
									console.log(err);
								}
									});
						}

					}


				});
			}
			else {
				
				var noResult="No Building Requests are pending";
				var x1=null, y1=null, client1=null, building1=null, address1=null;
				console.log("X: "+x1+" Y: "+y1);
				var msg_payload1 = { "type": "building1"};
				mq_client.make_request('building_queue',msg_payload1, function(err,results){
					console.log(results);
					if(err)
					{
						throw err;
					}
					else 
					{
						if(true)
						{ 
							console.log("success");
							var clientList=[];
							for(var j=0;j<results.length;j++)
							{
								clientList.push(results[j].Client_ID);
							}
							if (clientList.length==0)
							{clientList=null;}
							ejs.renderFile('./views/buildingHomePage.ejs',{x:x1, y:y1, client:client1, building:building1, address:address1, noResult:noResult, cList:clientList},function(err, result) 
									{
								if (!err) {
									res.end(result);
								}
								else {
									res.end('An error occurred');
									console.log(err);
								}
									});
						}

					}


				});
				
			}



		}  
	});

	
});



router.post('/acceptBuilding', function(req, res) {

	var client=req.param('client');
	var building=req.param('building');
	
	var input={c: client, b:building};
	
	var msg_payload = { "type": "acceptBuilding1","input":input};

	console.log("Inside Accept Building");

	mq_client.make_request('building_queue',msg_payload, function(err,results){
		
		console.log("After Accept Building\nResults: "+results+"\n");
		if(err){
			throw err;
		}
		else 
		{
			var msg_payload = { "type": "building"};
			mq_client.make_request('building_queue',msg_payload, function(err,results){

				console.log(results);
				if(err){
					throw err;
				}
				else 
				{
					if(results.length > 0){

						var x=[];
						var y=[];
						var client=[];
						var building=[];
						var address=[];

						for(var i=0; i<results.length; i++)
						{
							x.push(results[i].X);
							y.push(results[i].Y);
							client.push(results[i].Client_ID);
							building.push(results[i].Building_name);
							address.push(results[i].Address);
						}
						x.toString();y.toString();

						console.log("X: "+x+" Y: "+y);

						var msg_payload1 = { "type": "building1"};
						mq_client.make_request('building_queue',msg_payload1, function(err,results){
							console.log(results);

							if(err){
								throw err;
							}
							else 
							{
								if(results.length > 0)
								{

									var clientList=[];

									for(var j=0;j<results.length;j++)
									{
										clientList.push(results[j].Client_ID);
									}

									ejs.renderFile('./views/buildingHomePage.ejs',{x:x, y:y, client:client, building:building, address:address, noResult:null, cList:clientList},function(err, result) 
											{
										if (!err) {
											res.end(result);
										}
										else {
											res.end('An error occurred');
											console.log(err);
										}
											});
								}
							}


						});


					}
					else {

						var noResult="No Building Requests are pending";
						var x1=null, y1=null, client1=null, building1=null, address1=null;
						console.log("X: "+x1+" Y: "+y1);
						
						var msg_payload1 = { "type": "building1"};
						mq_client.make_request('building_queue',msg_payload1, function(err,results){
							console.log(results);
							if(err){
								throw err;
							}
							else 
							{
								if(true)
								{
									var clientList=[];
									for(var j=0;j<results.length;j++)
									{
										clientList.push(results[j].Client_ID);
									}
									
									if (clientList.length==0)
										{clientList=null;}
									
									ejs.renderFile('./views/buildingHomePage.ejs',{x:x1, y:y1, client:client1, building:building1, address:address1, noResult:noResult, cList:clientList},function(err, result) 
											{
										if (!err) {
											res.end(result);
										}
										else {
											res.end('An error occurred');
											console.log(err);
										}
											});
								}
							}

						});
					}
				}

			});	
		}  
	});	

});





router.post('/rejectBuilding', function(req, res) {

	var client=req.param('client');
	var building=req.param('building');
	
	var input={c: client, b:building};
	var msg_payload = { "type": "rejectBuilding1","input":input};
	console.log("Inside Reject Building");

	mq_client.make_request('building_queue',msg_payload, function(err,results){
		
		console.log("After Reject Building\nResults: "+results+"\n");
		if(err){
			throw err;
		}
		else 
		{
			var msg_payload1 = { "type": "building"};
			mq_client.make_request('building_queue',msg_payload1, function(err,results){
				console.log(results);
				if(err){
					throw err;
				}
				else 
				{
					if(results.length > 0){

						var x=[];
						var y=[];
						var client=[];
						var building=[];
						var address=[];

						for(var i=0; i<results.length; i++)
							{
							x.push(results[i].X);
							y.push(results[i].Y);
							client.push(results[i].Client_ID);
							building.push(results[i].Building_name);
							address.push(results[i].description);
							}
						x.toString();y.toString();

						console.log("X: "+x+" Y: "+y);
						console.log(results);

						var msg_payload2 = { "type": "building1"};
						mq_client.make_request('building_queue',msg_payload2, function(err,results){
							console.log(results);
							if(err){
								throw err;
							}
							else 
							{
								if(results.length > 0)
								{

									var clientList=[];

									for(var j=0;j<results.length;j++)
										{
											clientList.push(results[j].client_id);
										}

									ejs.renderFile('./views/buildingHomePage.ejs',{x:x, y:y, client:client, building:building, address:address, noResult:null, cList:clientList},function(err, result) 
											{
												if (!err) {
													res.end(result);
												}
												else {
													res.end('An error occurred');
													console.log(err);
												}
											});
								}
							}


						});


					}
					else {

						var noResult="No Building Requests are pending";
						var x1=null, y1=null, client1=null, building1=null, address1=null;
						console.log("X: "+x1+" Y: "+y1);
						
						var msg_payload3 = { "type": "building1"};
						mq_client.make_request('building_queue',msg_payload3, function(err,results){
							console.log(results);
							if(err){
								throw err;
							}
							else 
							{
								if(true)
								{
									var clientList=[];
									for(var j=0;j<results.length;j++)
										{
											clientList.push(results[j].client_id);
		    							}
									if (clientList.length==0)
										{clientList=null;}
									
									ejs.renderFile('./views/buildingHomePage.ejs',{x:x1, y:y1, client:client1, building:building1, address:address1, noResult:noResult, cList:clientList},function(err, result) 
										{
											if (!err) {
												res.end(result);
											}
											else {
												res.end('An error occurred');
												console.log(err);
											}
										});
								}
							}

						});
					}
				}  
			});	
		}  
	});	

});



router.post('/buildingDetails', function(req, res) {

	console.log("Redirected to Building Details.");

	var client=req.param('client');

	var msg_payload = { "type": "buildingDetails", "client":client};
	mq_client.make_request('building_queue',msg_payload, function(err,results){

		console.log(results);
		if(err){
			throw err;
		}
		else 
		{
			if(results.length > 0){

				var x=[];
				var y=[];
				var client=[];
				var building=[];
				var address=[];

				for(var i=0; i<results.length; i++)
					{
						x.push(results[i].X);
						y.push(results[i].Y);
						client.push(results[i].Client_ID);
						building.push(results[i].Building_name);
						address.push(results[i].description);
					}
				x.toString();y.toString();

				console.log("X: "+x+" Y: "+y);
				ejs.renderFile('./views/buildingDetails.ejs',{x:x, y:y, client:client, building:building, address:address, noResult:null},function(err, result) 
				{
					if (!err) {
						res.end(result);
					}
					else {
						res.end('An error occurred');
						console.log(err);
					}
				});
			}
			else {

				var noResult="No Buildings are allocated";
				var x1=null, y1=null, client1=null, building1=null, address1=null;

				console.log("X: "+x1+" Y: "+y1);
				ejs.renderFile('./views/buildingDetails.ejs',{x:x1, y:y1, client:client1, building:building1, address:address1, noResult:noResult},function(err, result) 
				{
					if (!err) {
						res.end(result);
					}
					else {
						res.end('An error occurred');
						console.log(err);
					}
				});
			}
		}  
	});	

});




router.post('/deleteBuilding', function(req, res) {

	console.log("Initiating Delete Building.");

	var client=req.param('client');
	var building=req.param('building');
	var input = {c:client, b:building};


		var msg_payload = { "type": "deleteBuilding", "input":input};
		
		mq_client.make_request('building_queue',msg_payload, function(err,results){
		console.log(results);
		if(err){
			throw err;
		}
		else 
		{
			console.log("Redirecting to Building Details.");

			var msg_payload1 = { "type": "buildingDetails", "client":client};
			mq_client.make_request('building_queue',msg_payload1, function(err,results){
				console.log(results);
				if(err){
					throw err;
				}
				else 
				{
					if(results.length > 0){

						var x=[];
						var y=[];
						var client=[];
						var building=[];
						var address=[];

						for(var i=0; i<results.length; i++)
							{
								x.push(results[i].X);
								y.push(results[i].Y);
								client.push(results[i].Client_ID);
								building.push(results[i].Building_name);
								address.push(results[i].description);
							}
						x.toString();y.toString();

						console.log("X: "+x+" Y: "+y);
						ejs.renderFile('./views/buildingDetails.ejs',{x:x, y:y, client:client, building:building, address:address, noResult:null},function(err, result) 
						{
							if (!err) {
								res.end(result);
							}
							else {
								res.end('An error occurred');
								console.log(err);
							}
						});
					}
					else {

						var noResult="No Buildings are allocated";
						var x1=null, y1=null, client1=null, building1=null, address1=null;

						console.log("X: "+x1+" Y: "+y1);
						ejs.renderFile('./views/buildingDetails.ejs',{x:x1, y:y1, client:client1, building:building1, address:address1, noResult:noResult},function(err, result) 
						{
							if (!err) {
								res.end(result);
							}
							else {
								res.end('An error occurred');
								console.log(err);
							}
						});
					}
				}  
			});	
		}  
	});	

});



router.post('/editBuilding', function(req, res) {

	console.log("Redirected to Edit Building.");

	var client=req.param('client');
	var building=req.param('building');
	var input = {c:client, b:building};
	
	console.log("Client: "+client+" Building: "+building);

	/*var editBuilding="select X(Point1) as XP1, Y(Point1) as YP1, X(Point2) as XP2, Y(Point2) as YP2, "+
	"X(Point3) as XP3, Y(Point3) as YP3, X(Point4) as XP4, Y(Point4) as YP4, address, ServiceFee "+
	"from building where Client_ID="+client+" and Building_ID="+building;*/

	var msg_payload = { "type": "editBuildingDetails", "input":input};
	mq_client.make_request('building_queue',msg_payload, function(err,results){

		console.log(results);
		if(err){
			throw err;
		}
		else 
		{
			if(results.length > 0){

				var x1=results[0].XP1;
				var x2=results[0].XP2;
				var x3=results[0].XP3;
				var x4=results[0].XP4;
				var y1=results[0].YP1;
				var y2=results[0].YP2;
				var y3=results[0].YP3;
				var y4=results[0].YP4;
				var address=building;
				var releaseDate=results[0].ReleaseDate;
				var fee=results[0].ServiceFee;
				var b_id=results[0].Building_ID;


				console.log("X: "+x1+" Y: "+y1);
				ejs.renderFile('./views/editBuilding.ejs',{x1:x1,x2:x2,x3:x3,x4:x4,y1:y1,y2:y2,y3:y3,y4:y4,address:address,fee:fee,client:client,building:b_id},function(err, result) 
				{
					if (!err) {
						res.end(result);
					}
					else {
						res.end('An error occurred');
						console.log(err);
					}
				});
			}
			else {

				ejs.renderFile('./views/error.ejs',function(err, result) 
				{
					if (!err) {
						res.end(result);
					}
					else {
						res.end('An error occurred');
						console.log(err);
					}
				});
			}
		}  
	});	

});




router.post('/updateBuilding', function(req,res){
	
	var x1=String(req.param("x1"));
	var y1=String(req.param("y1"));
	var x2=String(req.param("x2"));
	var y2=String(req.param("y2"));
	var x3=String(req.param("x3"));
	var y3=String(req.param("y3"));
	var x4=String(req.param("x4"));
	var y4=String(req.param("y4"));
	
	var client=req.param("client");
	var building=req.param("building");
	var address=req.param("address");
	
	var fee=req.param("fee");

	console.log("checking the values:\n");
	console.log("x1: "+x1+" type:"+typeof(x1));
	console.log("y1: "+y1);
	console.log("x2: "+x2+" type:"+typeof(x2));
	console.log("y2: "+y2);
	console.log("x3: "+x3);
	console.log("y3: "+y3);
	console.log("x4: "+x4);
	console.log("y4: "+y4);
	
	var input={
			x1: x1,
			y1: y1,
			x2: x2,
			y2: y2,
			x3: x3,
			y3: y3,
			x4: x4,
			y4: y4,
			c: client,
			b: building,
			a: address,
			fee: fee
	};


/*	var updateBuilding="update building set";
	if(x1!==null && y1!==null && x1!=="null" && y1!=="null")
		{updateBuilding+=" Point1=GeomFromText('POINT("+x1+" "+y1+")'),";}
	if(x2!==null && y2!==null && x2!=="null" && y2!=="null")
		{updateBuilding+=" Point2=GeomFromText('POINT("+x2+" "+y2+")'),";}
	if(x3!==null && y3!==null && x3!=="null" && y3!=="null")
		{updateBuilding+=" Point3=GeomFromText('POINT("+x3+" "+y3+")'),";}
	if(x4!==null && y4!==null && x4!=="null" && y4!=="null")
		{updateBuilding+=" Point4=GeomFromText('POINT("+x4+" "+y4+")'),";}

	updateBuilding+=" Address='"+address+"'";
	if(fee!==null && fee!==null && fee!=="null" && fee!=="null" && fee>0)
		{updateBuilding+=" ,ServiceFee='"+fee+"'";}

	updateBuilding+=" where Client_ID="+client+" and Building_ID='"+building+"'"; */

	var msg_payload = { "type": "updateBuildingDetails", "input":input};
	mq_client.make_request('building_queue', msg_payload, function(err,results){

		console.log(results);
		console.log("after updation");


		console.log("Redirected to Building Details.");

		//var client=req.param('client');

		var msg_payload1 = { "type": "buildingDetails", "client":client};
		mq_client.make_request('building_queue',msg_payload1, function(err,results){

			console.log(results);
			if(err){
				console.log("Inside update Error Client JS");
				throw err;
			}
			else 
			{
				if(results.length > 0){

					var x=[];
					var y=[];
					var client=[];
					var building=[];
					var address=[];

					for(var i=0; i<results.length; i++)
						{
							x.push(results[i].X);
							y.push(results[i].Y);
							client.push(results[i].Client_ID);
							building.push(results[i].Building_name);
							address.push(results[i].description);
						}
					x.toString();y.toString();

					console.log("X: "+x+" Y: "+y);
					ejs.renderFile('./views/buildingDetails.ejs',{x:x, y:y, client:client, building:building, address:address, noResult:null},function(err, result) 
					{
						if (!err) {
							res.end(result);
						}
						else {
							res.end('An error occurred');
							console.log(err);
						}
					});
				}
				else {

					var noResult="No Buildings are allocated";
					var x1=null, y1=null, client1=null, building1=null, address1=null;

					console.log("X: "+x1+" Y: "+y1);
					ejs.renderFile('./views/buildingDetails.ejs',{x:x1, y:y1, client:client1, building:building1, address:address1, noResult:noResult},function(err, result) 
					{
						if (!err) {
							res.end(result);
						}
						else {
							res.end('An error occurred');
							console.log(err);
						}
					});
				}
			}  
		});	

	});
});



/*




router.post('/buildingDetails', function(req, res) {

	console.log("Redirected to Building Details.");

	var client=req.param('client');

	var getMapPoint="select (X(Point1)+X(Point3))/2 as X, (Y(Point1)+Y(Point3))/2 as Y, Client_ID, Building_ID, Address from building"+
					" where Client_ID="+client+" and Request=1;";

	console.log("Query is:"+getMapPoint);

	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			if(results.length > 0){

				var x=[];
				var y=[];
				var client=[];
				var building=[];
				var address=[];

				for(var i=0; i<results.length; i++)
					{
						x.push(results[i].X);
						y.push(results[i].Y);
						client.push(results[i].Client_ID);
						building.push(results[i].Building_ID);
						address.push(results[i].Address);
					}
				x.toString();y.toString();

				console.log("X: "+x+" Y: "+y);
				ejs.renderFile('./views/buildingDetails.ejs',{x:x, y:y, client:client, building:building, address:address, noResult:null},function(err, result) 
				{
					if (!err) {
						res.end(result);
					}
					else {
						res.end('An error occurred');
						console.log(err);
					}
				});
			}
			else {

				var noResult="No Buildings are allocated";
				var x1=null, y1=null, client1=null, building1=null, address1=null;

				console.log("X: "+x1+" Y: "+y1);
				ejs.renderFile('./views/buildingDetails.ejs',{x:x1, y:y1, client:client1, building:building1, address:address1, noResult:noResult},function(err, result) 
				{
					if (!err) {
						res.end(result);
					}
					else {
						res.end('An error occurred');
						console.log(err);
					}
				});
			}
		}  
	},getMapPoint);	

});




router.post('/deleteBuilding', function(req, res) {

	console.log("Redirected to Delete Building.");

	var client=req.param('client');
	var building=req.param('building');

	var deleteBuilding="delete from building"+
					" where Client_ID="+client+" and Building_ID="+building;

	console.log("Query is:"+deleteBuilding);

	mysql.updateData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			console.log("Redirecting to Building Details.");

			var getMapPoint="select (X(Point1)+X(Point3))/2 as X, (Y(Point1)+Y(Point3))/2 as Y, Client_ID, Building_ID, Address from building"+
							" where Client_ID="+client+" and Request=1;";

			console.log("Query is:"+getMapPoint);

			mysql.fetchData(function(err,results){
				if(err){
					throw err;
				}
				else 
				{
					if(results.length > 0){

						var x=[];
						var y=[];
						var client=[];
						var building=[];
						var address=[];

						for(var i=0; i<results.length; i++)
							{
								x.push(results[i].X);
								y.push(results[i].Y);
								client.push(results[i].Client_ID);
								building.push(results[i].Building_ID);
								address.push(results[i].Address);
							}
						x.toString();y.toString();

						console.log("X: "+x+" Y: "+y);
						ejs.renderFile('./views/buildingDetails.ejs',{x:x, y:y, client:client, building:building, address:address, noResult:null},function(err, result) 
						{
							if (!err) {
								res.end(result);
							}
							else {
								res.end('An error occurred');
								console.log(err);
							}
						});
					}
					else {

						var noResult="No Buildings are allocated";
						var x1=null, y1=null, client1=null, building1=null, address1=null;

						console.log("X: "+x1+" Y: "+y1);
						ejs.renderFile('./views/buildingDetails.ejs',{x:x1, y:y1, client:client1, building:building1, address:address1, noResult:noResult},function(err, result) 
						{
							if (!err) {
								res.end(result);
							}
							else {
								res.end('An error occurred');
								console.log(err);
							}
						});
					}
				}  
			},getMapPoint);	
		}  
	},deleteBuilding);	

});




router.post('/editBuilding', function(req, res) {

	console.log("Redirected to Edit Building.");

	var client=req.param('client');
	var building=req.param('building');

	var editBuilding="select X(Point1) as XP1, Y(Point1) as YP1, X(Point2) as XP2, Y(Point2) as YP2, "+
	"X(Point3) as XP3, Y(Point3) as YP3, X(Point4) as XP4, Y(Point4) as YP4, address, ServiceFee "+
	"from building where Client_ID="+client+" and Building_ID="+building;

	console.log("Query is:"+editBuilding);

	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			if(results.length > 0){

				var x1=results[0].XP1;
				var x2=results[0].XP2;
				var x3=results[0].XP3;
				var x4=results[0].XP4;
				var y1=results[0].YP1;
				var y2=results[0].YP2;
				var y3=results[0].YP3;
				var y4=results[0].YP4;
				var address=results[0].address;
				var fee=results[0].ServiceFee;


				console.log("X: "+x1+" Y: "+y1);
				ejs.renderFile('./views/editBuilding.ejs',{x1:x1,x2:x2,x3:x3,x4:x4,y1:y1,y2:y2,y3:y3,y4:y4,address:address,fee:fee,client:client,building:building},function(err, result) 
				{
					if (!err) {
						res.end(result);
					}
					else {
						res.end('An error occurred');
						console.log(err);
					}
				});
			}
			else {

				ejs.renderFile('./views/error.ejs',function(err, result) 
				{
					if (!err) {
						res.end(result);
					}
					else {
						res.end('An error occurred');
						console.log(err);
					}
				});
			}
		}  
	},editBuilding);	

});



router.post('/updateBuilding', function(req,res){
	var x1=String(req.param("x1"));
	var y1=String(req.param("y1"));
	var x2=String(req.param("x2"));
	var y2=String(req.param("y2"));
	var x3=String(req.param("x3"));
	var y3=String(req.param("y3"));
	var x4=String(req.param("x4"));
	var y4=String(req.param("y4"));
	var address=req.param("address");
	var client=req.param("client");
	var building=req.param("building");
	var fee=req.param("fee");

	console.log("checking the values:\n");
	console.log("x1: "+x1+" type:"+typeof(x1));
	console.log("y1: "+y1);
	console.log("x2: "+x2+" type:"+typeof(x2));
	console.log("y2: "+y2);
	console.log("x3: "+x3);
	console.log("y3: "+y3);
	console.log("x4: "+x4);
	console.log("y4: "+y4);


	var updateBuilding="update building set";
	if(x1!==null && y1!==null && x1!=="null" && y1!=="null")
		{updateBuilding+=" Point1=GeomFromText('POINT("+x1+" "+y1+")'),";}
	if(x2!==null && y2!==null && x2!=="null" && y2!=="null")
		{updateBuilding+=" Point2=GeomFromText('POINT("+x2+" "+y2+")'),";}
	if(x3!==null && y3!==null && x3!=="null" && y3!=="null")
		{updateBuilding+=" Point3=GeomFromText('POINT("+x3+" "+y3+")'),";}
	if(x4!==null && y4!==null && x4!=="null" && y4!=="null")
		{updateBuilding+=" Point4=GeomFromText('POINT("+x4+" "+y4+")'),";}

	updateBuilding+=" Address='"+address+"'";
	if(fee!==null && fee!==null && fee!=="null" && fee!=="null" && fee>0)
		{updateBuilding+=" ,ServiceFee='"+fee+"'";}

	updateBuilding+=" where Client_ID="+client+" and Building_ID='"+building+"'"; 

	mysql.updateData(function(err,results){
		console.log("after updation");


		console.log("Redirected to Building Details.");

		var client=req.param('client');

		var getMapPoint="select (X(Point1)+X(Point3))/2 as X, (Y(Point1)+Y(Point3))/2 as Y, Client_ID, Building_ID, Address from building"+
						" where Client_ID="+client+" and Request=1;";

		console.log("Query is:"+getMapPoint);

		mysql.fetchData(function(err,results){
			if(err){
				throw err;
			}
			else 
			{
				if(results.length > 0){

					var x=[];
					var y=[];
					var client=[];
					var building=[];
					var address=[];

					for(var i=0; i<results.length; i++)
						{
							x.push(results[i].X);
							y.push(results[i].Y);
							client.push(results[i].Client_ID);
							building.push(results[i].Building_ID);
							address.push(results[i].Address);
						}
					x.toString();y.toString();

					console.log("X: "+x+" Y: "+y);
					ejs.renderFile('./views/buildingDetails.ejs',{x:x, y:y, client:client, building:building, address:address, noResult:null},function(err, result) 
					{
						if (!err) {
							res.end(result);
						}
						else {
							res.end('An error occurred');
							console.log(err);
						}
					});
				}
				else {

					var noResult="No Buildings are allocated";
					var x1=null, y1=null, client1=null, building1=null, address1=null;

					console.log("X: "+x1+" Y: "+y1);
					ejs.renderFile('./views/buildingDetails.ejs',{x:x1, y:y1, client:client1, building:building1, address:address1, noResult:noResult},function(err, result) 
					{
						if (!err) {
							res.end(result);
						}
						else {
							res.end('An error occurred');
							console.log(err);
						}
					});
				}
			}  
		},getMapPoint);	

	},updateBuilding);
});


 */

module.exports = router;


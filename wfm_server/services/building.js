var mysql = require('./mysql');
var bcrypt = require ('bcrypt');

function building(msg, callback){
	console.log("In Server building");
	var res = {};
	var getMapPoint="select (X(Point1)+X(Point3))/2 as X, (Y(Point1)+Y(Point3))/2 as Y, Client_ID, Building_name from building_requests" +
	" where req_fulfilled=1";
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
	},getMapPoint);
}
exports.building = building;



function building1(msg, callback){
	console.log("In Server building1");
	var res = {};
	var getClient="select distinct Client_ID from building_requests";
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
	},getClient);

}
exports.building1 = building1;



function acceptBuilding1(msg, callback){
	console.log("In Server acceptBuilding1");
	var res = {};
	var client=msg.input.c;
	var building=msg.input.b;
	var addBuilding="insert  building(Client_ID,Address,Point1,Point2,Point3,Point4) select Client_ID,Building_name,Point1,Point2,Point3,Point4" +
	" from building_requests where req_fulfilled=1 and Client_ID="+client+" and Building_name='"+building+"' " +
	"and Client_ID in (select client_SSN from clients); "+
	"update building_requests set req_fulfilled=0 " +
	" where Client_ID="+client+" and Building_name='"+building+"'";

	console.log("Query is: "+addBuilding);
	mysql.handle_database(function(err,results){

		if(err){
			console.log(err);
			throw err;
		}
		else 
		{
			console.log("In acceptBuilding1 Output");
			callback(null, results);

		}
	},addBuilding);

}
exports.acceptBuilding1 = acceptBuilding1;


function rejectBuilding1(msg, callback){
	console.log("In Server rejectBuilding1");
	var res = {};
	var client=msg.input.c;
	var building=msg.input.b;
	var removeBuilding="delete from building_requests where client_id="+client+" and Building_name='"+building+"'";

	console.log("Query is: "+removeBuilding);
	mysql.handle_database(function(err,results){
		if(err){
			console.log(err);
			throw err;
		}
		else 
		{
			console.log("In rejectBuilding1 Output");
			callback(null, results);

		}
	},removeBuilding);

}
exports.rejectBuilding1 = rejectBuilding1;




function buildingDetails(msg, callback){
	console.log("In Server buildingDetails");
	var res = {};
	var client=msg.client;
	var getMapPoint="select (X(Point1)+X(Point3))/2 as X, (Y(Point1)+Y(Point3))/2 as Y, Client_ID, Building_name, description from building_requests"+
	" where Client_ID="+client+" and req_fulfilled=0;";
	console.log("Building details query: "+getMapPoint);
	mysql.handle_database(function(err,results){

		if(err){
			console.log(err);
			throw err;
		}
		else 
		{
			console.log("In ClientList Output");
			console.log("Results from Server: "+results);
			callback(null, results);
		}
	},getMapPoint);
}
exports.buildingDetails = buildingDetails;




function deleteBuilding(msg, callback){
	console.log("In Server deleteBuilding");
	var res = {};
	var client=msg.input.c;
	var building=msg.input.b;

	var deleteBuildingQuery="delete from building"+
	" where Client_ID="+client+" and Address='"+building+"';" +
	"delete from building_requests where Client_ID="+client+" and Building_name='"+building+"' and req_fulfilled=0;";

	mysql.handle_database(function(err,results){

		if(err){
			console.log(err);
			throw err;
		}
		else 
		{
			console.log("In ClientList Output: delete building");
			console.log("Results from Server: "+results);
			callback(null, results);
		}
	},deleteBuildingQuery);
}
exports.deleteBuilding = deleteBuilding;



function editBuildingDetails(msg, callback){
	console.log("In Server editBuilding");
	var res = {};
	var client=msg.input.c;
	var building=msg.input.b;

	var editBuilding="select X(Point1) as XP1, Y(Point1) as YP1, X(Point2) as XP2, Y(Point2) as YP2, "+
	"X(Point3) as XP3, Y(Point3) as YP3, X(Point4) as XP4, Y(Point4) as YP4, ServiceFee, Release_Date as ReleaseDate, Building_ID "+
	"from building where Client_ID="+client+" and Address='"+building+"';";
	console.log("edit building query:\n"+editBuilding);
	mysql.handle_database(function(err,results){

		if(err){
			console.log(err);
			throw err;
		}
		else 
		{
			console.log("In ClientList Output: towards edit building page");
			console.log("Results from Server: "+results);
			callback(null, results);
		}
	},editBuilding);
}
exports.editBuildingDetails = editBuildingDetails;



function updateBuildingDetails(msg, callback){

	console.log("In Server updateBuildingDetails");
	var res = {};
	var client=msg.input.c;
	var building=msg.input.b;
	var address=msg.input.a;
	var x1=msg.input.x1;
	var x2=msg.input.x2;
	var x3=msg.input.x3;
	var x4=msg.input.x4;
	var y1=msg.input.y1;
	var y2=msg.input.y2;
	var y3=msg.input.y3;
	var y4=msg.input.y4;
	var fee=msg.input.fee;

	console.log("Printing values in Server:");
	console.log(client);
	console.log(building);
	console.log(address);
	console.log(x1);
	console.log(x2);
	console.log(x3);
	console.log(x4);
	console.log(y1);
	console.log(y2);
	console.log(y3);
	console.log(y4);
	console.log(fee);


	var updateBuilding="update building set";
	if(x1!==null && y1!==null && x1!=="null" && y1!=="null")
	{updateBuilding+=" Point1=GeomFromText('POINT("+x1+" "+y1+")')";}
	if(x2!==null && y2!==null && x2!=="null" && y2!=="null")
	{updateBuilding+=", Point2=GeomFromText('POINT("+x2+" "+y2+")')";}
	if(x3!==null && y3!==null && x3!=="null" && y3!=="null")
	{updateBuilding+=", Point3=GeomFromText('POINT("+x3+" "+y3+")')";}
	if(x4!==null && y4!==null && x4!=="null" && y4!=="null")
	{updateBuilding+=", Point4=GeomFromText('POINT("+x4+" "+y4+")')";}
	
	//updateBuilding+=" Address='"+address+"'";

	if(fee!==null && fee!==null && fee!=="null" && fee!=="null" && fee>0)
	{console.log("in fee");updateBuilding+=" ,ServiceFee='"+fee+"'";}

	updateBuilding+=" where Client_ID="+client+" and Building_ID='"+building+"';";
	console.log("5");
//	update building_requests set  where req_fulfilled=0 and Client_ID=1111111111 and Building_name='Engg'

	updateBuilding+="update building_requests set ";

	if(x1!==null && y1!==null && x1!=="null" && y1!=="null")
	{updateBuilding+=" Point1=GeomFromText('POINT("+x1+" "+y1+")')";}
	if(x2!==null && y2!==null && x2!=="null" && y2!=="null")
	{updateBuilding+=", Point2=GeomFromText('POINT("+x2+" "+y2+")')";}
	if(x3!==null && y3!==null && x3!=="null" && y3!=="null")
	{updateBuilding+=", Point3=GeomFromText('POINT("+x3+" "+y3+")')";}
	if(x4!==null && y4!==null && x4!=="null" && y4!=="null")
	{updateBuilding+=", Point4=GeomFromText('POINT("+x4+" "+y4+")')";}
	
	console.log("10");
	//updateBuilding+=" Building_name='"+address+"'";

	updateBuilding+=" where Client_ID="+client+" and Building_name='"+address+"' and req_fulfilled=0;";

	console.log("Update Query in Server:\n"+updateBuilding);



	mysql.handle_database(function(err,results){

		if(err){
			console.log("inside update error Server JS");
			console.log(err);
			throw err;
		}
		else 
		{
			console.log("In ClientList Output: update building");
			console.log("Results from Server: "+results);
			callback(null, results);
		}
	},updateBuilding);
}
exports.updateBuildingDetails = updateBuildingDetails;

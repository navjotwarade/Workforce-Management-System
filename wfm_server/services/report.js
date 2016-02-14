/**
 * New node file
 */
var mysql = require('./mysql');
function populatebuilding(msg, callback){
	console.log("In server popuate");
	var getUser="SET @outparameter=0; Call ListBuildingsforreport('"+msg.Client_ID+"',@outparameter); SELECT @outparameter";
	var res = {};
	mysql.handle_database(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			callback(null, results);

		}  
	},getUser);


}
exports.populatebuilding = populatebuilding;

function populateAllReportsbyAllGuards(msg, callback){

	var getUser="SET @outparameter=0; Call ListAllReportsbyAllGuards('"+msg.Client_ID+"','"+msg.BuildingID+"',@outparameter); SELECT @outparameter";
	var res = {};
	mysql.handle_database(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			callback(null, results);

		}  
	},getUser);


}
exports.populateAllReportsbyAllGuards = populateAllReportsbyAllGuards;

function viewreportbyguard(msg, callback){

	var getUser="SET @TotalIR=0;SET @TotalPV=0;SET @TotalMC=0;SET @TotalCS=0;SET @TotalPatrols=0;  Call ViewReportbyGuard('"+msg.Client_ID+"','"+msg.Guard_ID+"','"+msg.BuildingID+"','"+msg.Reportdate+"',@TotalIR,@TotalPV,@TotalMC,@TotalCS,@TotalPatrols); SELECT @TotalIR;SELECT @TotalPV;SELECT @TotalMC;SELECT @TotalCS;SELECT @TotalPatrols";

	var res = {};
	mysql.handle_database(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			callback(null, results);

		}  
	},getUser);


}
exports.viewreportbyguard = viewreportbyguard;

function populateSearchReportlist(msg, callback){

	var getUser="SET @Totalbuilding=0;SET @Totalguard=0; Call PopulateSearchReportlist('"+msg.Client_ID+"',@Totalbuilding,@Totalguard); SELECT @Totalbuilding;SELECT @Totalguard";

	var res = {};
	mysql.handle_database(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			callback(null, results);

		}  
	},getUser);


}
exports.populateSearchReportlist = populateSearchReportlist;

function FindSearchReportResults(msg, callback){

	console.log("\nmsg.Guard_ID:"+msg.Guard_ID);
	console.log("\nmsg.Reportdate:"+msg.Reportdate);
	var getUser;

	if(msg.Guard_ID!=null && msg.Reportdate!=null){
		console.log("\n1");
		getUser="SET @TotalReport=0;Call SearchReport('"+msg.Client_ID+"','"+msg.BuildingID+"','"+msg.Guard_ID+"','"+msg.PV+"','"+msg.MC+"','"+msg.CS+"','"+msg.IR+"','"+msg.Reportdate+"',@TotalReport); SELECT @TotalReport";
	}
	else if(msg.Guard_ID==null && msg.Reportdate!=null)
	{
		console.log("\n2");
		getUser="SET @TotalReport=0;Call SearchReport('"+msg.Client_ID+"','"+msg.BuildingID+"',null,'"+msg.PV+"','"+msg.MC+"','"+msg.CS+"','"+msg.IR+"','"+msg.Reportdate+"',@TotalReport); SELECT @TotalReport";
	}
	else if(msg.Guard_ID!=null && msg.Reportdate==null)
	{
		console.log("\n3");
		getUser="SET @TotalReport=0;Call SearchReport('"+msg.Client_ID+"','"+msg.BuildingID+"','"+msg.Guard_ID+"','"+msg.PV+"','"+msg.MC+"','"+msg.CS+"','"+msg.IR+"',null,@TotalReport); SELECT @TotalReport";
	}
	else {
		console.log("\n4");
		getUser="SET @TotalReport=0;Call SearchReport('"+msg.Client_ID+"','"+msg.BuildingID+"',null,'"+msg.PV+"','"+msg.MC+"','"+msg.CS+"','"+msg.IR+"',null,@TotalReport); SELECT @TotalReport";
	}
	var res = {};
	mysql.handle_database(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			callback(null, results);

		}  
	},getUser);


}
exports.FindSearchReportResults = FindSearchReportResults;

function guardlocation(msg, callback){

	var getUser="SET @TotalGuards=0; Call Displayguardlocation('"+msg.Client_ID+"',@TotalGuards); SELECT @TotalGuards";

	var res = {};
	mysql.handle_database(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			callback(null, results);

		}  
	},getUser);


}
exports.guardlocation = guardlocation;

function populateviewclientGuardlocation(msg, callback){

	var getUser="SET @TotalClient=0; Call GetClientCount(@TotalClient); SELECT @TotalClient";

	var res = {};
	mysql.handle_database(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			callback(null, results);

		}  
	},getUser);


}
exports.populateviewclientGuardlocation = populateviewclientGuardlocation;


function Adminguardlocation(msg, callback){

	var getUser="SET @TotalGuards=0; Call Displayguardlocation('"+msg.Client_ID+"',@TotalGuards); SELECT @TotalGuards";

	var res = {};
	mysql.handle_database(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			callback(null, results);

		}  
	},getUser);


}
exports.Adminguardlocation = Adminguardlocation;
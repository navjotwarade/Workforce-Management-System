/**
 * New node file
 */
var ejs = require("ejs");
var path = require("path");
var url=require('url');
var mysql = require('mysql');
function getConnection(req,res){
	
	var connection = mysql.createConnection({
		  host     : 'localhost',
		  user     : 'root',
		  password : 'navjot',
		  database : 'wfs'
		});
	
	return connection;
	
}
exports.Admin =function (req,res)
{

	var viewpath=path.join(__dirname, '../views', 'Admin.ejs');
	console.log(viewpath);
	var pathname = url.parse(req.url).pathname;         
	console.log("Request for " + pathname + " received.");
	ejs.renderFile(viewpath,function(err, result) {
		// render on success
		if (!err) {
			res.end(result);
		}
		// render or error
		else {
			res.end('An error occurred');
			console.log(err);
		}
	});
};

exports.Client =function (req,res)
{

	var viewpath=path.join(__dirname, '../views', 'Client.ejs');
	console.log(viewpath);
	var pathname = url.parse(req.url).pathname;         
	console.log("Request for " + pathname + " received.");
	ejs.renderFile(viewpath,function(err, result) {
		// render on success
		if (!err) {
			res.end(result);
		}
		// render or error
		else {
			res.end('An error occurred');
			console.log(err);
		}
	});
};
exports.Guard =function (req,res)
{

	var viewpath=path.join(__dirname, '../views', 'Guard.ejs');
	console.log(viewpath);
	var pathname = url.parse(req.url).pathname;         
	console.log("Request for " + pathname + " received.");
	ejs.renderFile(viewpath,function(err, result) {
		// render on success
		if (!err) {
			res.end(result);
		}
		// render or error
		else {
			res.end('An error occurred');
			console.log(err);
		}
	});
};
function CreateGuardPage(req,res){
	
	var viewpath=path.join(__dirname, '../views', 'CreateGuard.ejs');
	console.log(viewpath);
	var pathname = url.parse(req.url).pathname;         
	console.log("Request for " + pathname + " received.");
	ejs.renderFile(viewpath,function(err, result) {
		// render on success
		if (!err) {
			res.end(result);
		}
		// render or error
		else {
			res.end('An error occurred');
			console.log(err);
		}
	});
	
};
function ListGuard(req,res){
	console.log("this is it");
	
	console.log("till res 200");
	var connection = getConnection();
	connection.connect(function(err) {
		if(!err)
			console.log("Succesfully connected to database");
		else
			console.log("Database not connected");
			  });
	// SELECT guard.Guard ID,person.Firstname,person.Lastname,guard.Building_ID
	 qry="SELECT guard.Guard_ID,person.Firstname,person.Lastname,guard.Building_ID FROM guard JOIN person ON guard.Guard_ID=person.SSN;"
	connection.query(qry, function(err, rows, fields) {
		if(rows!=null){ 
		    console.log('The solution is: ', rows);
		 
		     }
		  else {  console.log('Error while performing Query.');}
		 
		  res.send(rows);	 
	
	});
	
};
function searchGuard(req,res){
	var a=req.param("firstName");
	console.log(a);
	//var msg_payload = { "a": a };
	var connection = getConnection();
	connection.connect(function(err) {
		if(!err)
			console.log("Succesfully connected to database");
		else
			console.log("Database not connected");
			  });
	 qry="SELECT * FROM guard JOIN person ON guard.Guard_ID=person.SSN WHERE person.Firstname='"+a+"'"
	connection.query(qry, function(err, rows, fields) {
		if(rows!=null){ 
		    console.log('The solution is: ', rows);
		 
		     }
		  else {  console.log('Error while performing Query.');}
		 
		  res.send(rows);	 
	
	});
}
function createGuard(req,res){
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
	
	//var msg_payload = { "fname": fname, "lname": lname ,"addr":addr, "city":city,"state":state, "zip":zip,"phone":phone,"email":email,"guardid":guardid,"sdate":sdate,"ldate":ldate,"totalhours":totalhours,"buildingid":buildingid,"password":password};
	
	var connection = getConnection();
	connection.connect(function(err) {
		if(!err)
			console.log("Succesfully connected to database");
		else
			console.log("Database not connected");
			  });
	qry1="INSERT INTO person (Firstname,Lastname,Person_Type_ID,SSN,Address,City,State,Zipcode,Phone_number,EmailID,LoginPassword) VALUES ('"+fname+"','"+lname+"',3,'"+guardid+"','"+addr+"','"+city+"','"+state+"','"+zip+"','"+phone+"','"+email+"','"+password+"')"

	qry2="INSERT INTO guard(Guard_ID,No_of_Hours_perday,Building_ID,DateofJoining,LastDay,BackGroundStatus) values('"+guardid+"','"+totalhours+"','"+buildingid+"','"+sdate+"','"+ldate+"',1)"

		connection.query(qry1, function(err, rows1, fields) {
		if(!err){ 
		    console.log('The solution is: ', rows1);
		    //-----------------------------------------------------------------------------------
		    connection.query(qry2, function(err, rows2, fields) {
				if(!err){ 
				    console.log('The solution is: ', rows2);
				  //  res.send(rows2);
				     }
				  else {  console.log('Error while performing Query.');}
				  //res.send(rows2);	 
				});
		    //-------------------------------------------------------------------------------------
		     }
		  else {  console.log('Error while performing Query.');}
		  //res.send(rows);	 
		});
	
	
	connection.end;
	res.send("insertComplete");
}
function editGuard(req,res){
	console.log("hi how r u ");
	var guardid=req.param("first");
	var msg_payload = { "guardid":guardid };
	console.log("jkl"+guardid+req.param("first"));
	var connection = getConnection();
	connection.connect(function(err) {
		if(!err)
			console.log("Succesfully connected to database");
		else
			console.log("Database not connected");
			  });
	/*
	SELECT person.Firstname ,person.Lastname,person.Address,person.City,person.Zipcode,person.Phone_number,person.EmailID,
	guard.Guard_ID,guard.Building_ID,guard.DateofJoining,guard.No_of_Hours_perday 
	FROM person 
	JOIN guard
	ON guard.Guard_ID=person.SSN
	WHERE guard.Guard_ID= ;*/
	qry="SELECT * FROM person JOIN guard	ON guard.Guard_ID=person.SSN WHERE guard.Guard_ID="+guardid+";"
	connection.query(qry, function(err, rows, fields) {
		if(rows!=null){ 
		    console.log('The solution is: ', rows);
		 
		     }
		  else {  console.log('Error while performing Query.');}
		 
		  res.send(rows);	 
	
	});
	connection.end;
}
function submitAlertPage(req,res){
	
	ejs.renderFile('./views/submitAlertPage.ejs',function(err, result) {
        // render on success
        if (!err) {
            res.end(result);
        }
        // render or error
        else {
            res.end('An error occurred');
            console.log(err);
        }
    });
	
};

function deleteGuard(req,res){
	
	var id=req.param("first");
	var msg_payload = { "id":id};
	console.log("delete guard with id"+ id);
	var connection = getConnection();
	connection.connect(function(err) {
		if(!err)
			console.log("Succesfully connected to database");
		else
			console.log("Database not connected");
			  });
	qry="DELETE FROM guard WHERE Guard_ID= '"+id+"'"
	connection.query(qry, function(err, rows, fields) {
		if(rows[0]!=null){ 
		    console.log('The solution is: ', rows);
		 
		     }
		  else {  console.log('Error while performing Query.');}
		 
		  res.send(rows);	 
	
	});
	connection.end;
}

function submitAlert(req,res){
	console.log("in thre");
	var id=req.param("alertid");
	var type=req.param("type");
	var desc=req.param("desc");
	var sev=req.param("severe");
	
	var msg_payload = { "id": id,"type":type,"desc":desc,"sev":sev}
	
	console.log(id+type+desc+sev);
	var connection = getConnection();
	connection.connect(function(err) {
		if(!err)
			console.log("Succesfully connected to database");
		else
			console.log("Database not connected");
			  });
	qry="INSERT INTO alerts(Alerts_ID,AlertName,AlertDescription,Severity) VALUES ('"+id+"','"+type+"','"+desc+"','"+sev+"')"
	connection.query(qry, function(err, rows, fields) {
		 
		if(rows.affectedRows==1){ 
		    console.log('The solution is: ', rows);
		 
		    }
		 else {  console.log('Error while performing Query.');}
		 
		  res.send(rows);	 
	
	});
	connection.end;
};
function updateGuard(req,res){
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

	//var msg_payload = { "fname": fname, "lname": lname ,"addr":addr, "city":city,"state":state, "zip":zip,"phone":phone,"email":email,"guardid":guardid,"sdate":sdate,"ldate":ldate,"totalhours":totalhours,"buildingid":buildingid};

	var connection = getConnection();
	connection.connect(function(err) {
		if(!err)
			console.log("Succesfully connected to database");
		else
			console.log("Database not connected");
			  });
	qry1="UPDATE person SET Firstname='"+fname+"',Lastname='"+lname+"',Address='"+addr+"',City='"+city+"',State='"+state+"',Zipcode='"+zip+"',Phone_number='"+phone+"',EmailID='"+email+"'  WHERE SSN='"+guardid+"'"
	qry2="UPDATE guard SET No_of_Hours_perday='"+totalhours+"',Building_ID='"+buildingid+"',DateofJoining='"+sdate+"',LastDay='"+ ldate+"' WHERE Guard_ID='"+guardid +"'" 

	
	connection.query(qry1, function(err, rows1, fields) {
		if(!err){ 
		    console.log('The solution is: ', rows1);
		    //-----------------------------------------------------------------------------------
		    connection.query(qry2, function(err, rows2, fields) {
				if(!err){ 
				    console.log('The solution is: ', rows2);
				     }
				  else {  console.log('Error while performing Query.');}
				  //res.send(rows);	 
				});
		    //-------------------------------------------------------------------------------------
		     }
		  else {  console.log('Error while performing Query.');}
		  //res.send(rows);	 
		});
	
	
	connection.end;
	res.send("updateComplete");
};
exports.CreateGuardPage=CreateGuardPage;
exports.ListGuard=ListGuard;
exports.searchGuard=searchGuard;
exports.createGuard=createGuard;
exports.editGuard=editGuard;
exports.submitAlertPage=submitAlertPage;
exports.submitAlert=submitAlert;
exports.deleteGuard=deleteGuard;
exports.updateGuard=updateGuard;



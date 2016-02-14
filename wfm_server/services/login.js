var mysql = require('./mysql');
var bcrypt = require ('bcrypt');

function handle_request(msg, callback){
	var res = {};
	var sqlFindUser = "select LoginPassword from Person where SSN='"+msg.ssn+"' and Person_Type_ID='"+msg.type+"'";
	if(msg.service == "login"){
		console.log('inside login');
		console.log("Query is:"+sqlFindUser);
		mysql.handle_database(function(err,results){
			if(err){
				console.log("error");
				throw err;
			}
			else{
				console.log(results);
				if(results.length > 0){			
					bcrypt.compare(msg.password, results[0].LoginPassword, function(err, response) {
					    console.log("output is " +response);
					    if(response){
					    	console.log("Valid user");
					    	res.code = "200";
					    	res.value = "Success Login";
					    	callback(null, res);
					    }
					    else{
					    	console.log("InValid Password");
							res.code = "401";
							res.value = "Failed Login";
							callback(null, res);
					    }
					});
				}
				else {  
					console.log("InValid user");
					res.code = "401";
					res.value = "Failed Login";
					callback(null, res);
				}
			}
		},sqlFindUser);
	}

else if (msg.service == "signup")
		{
		console.log('inside signup');
		console.log("Query is:"+sqlFindUser);
		mysql.handle_database(function(err,results){
			if(err){
				console.log("error");
				throw err;
			}
			else 
			{
				if(results.length > 0){
					console.log("User alreasy exists");
		    		res.code = "401";
		    		res.value = "Failed Signup";
		    		callback(null, res);
				}
				else {    
					console.log("New user");
					bcrypt.genSalt(10, function(err, salt) {
					    bcrypt.hash(msg.password, salt, function(err, hash) {
					    	var sqlNewUser = "insert into Person (Firstname,Lastname,Person_Type_ID,SSN,Address,City,State,Zipcode,Phone_number,EmailID,LoginPassword) values ('"+msg.firstname+"','"+msg.lastname+"','"+msg.type+"','"+msg.ssn+"','"+msg.address+"','"+msg.city+"','"+msg.state+"','"+msg.zip+"','"+msg.phonenumber+"','"+msg.email+"','"+hash+"')";
							console.log("Query is:"+sqlNewUser);							
							mysql.handle_database(function(err,results){
								console.log("inside");
								if(err){
									console.log("error");
									throw err;
								}
								else{
									if(msg.type == 2){
										var date= new Date(Date.now());
										console.log(date);
										var newdate=date.getFullYear()+'-'+(date.getMonth()+1) + '-' + date.getDate() ;
										var sqlInsertClient = "insert into Clients (Client_SSN,Start_Date) values ('"+msg.ssn+"','"+newdate+"')";
										mysql.handle_database(function(err,results){
											console.log("inside");
											if(err){
												console.log("error");
												throw err;
											}
											else{
												console.log("Valid user");
									    		res.code = "200";
												res.value = "Success Signup";
												callback(null, res);
												}
										},sqlInsertClient);
									}
									else if(msg.type == 3){
										console.log("Inside 3");
										var date= new Date(Date.now());
										console.log(date);
										var newdate=date.getFullYear()+'-'+(date.getMonth()+1) + '-' + date.getDate() ;
										var sqlInsertClient = "insert into guard (Guard_ID,DateOfJoining) values ('"+msg.ssn+"','"+newdate+"')";
										mysql.handle_database(function(err,results){
											console.log("inside");
											if(err){
												console.log("error");
												throw err;
											}
											else{
												console.log("Valid user");
									    		res.code = "200";
												res.value = "Success Signup";
												callback(null, res);
												}
										},sqlInsertClient);
									}
										else{
											console.log("Valid user");
								    		res.code = "200";
											res.value = "Success Signup";
											callback(null, res);
											}
									
								}
							},sqlNewUser);
					    	});
						});
					console.log("User added");
					}
			}
		},sqlFindUser);
	}
	
else if (msg.service == "admin"){
	var sqlFindAdmin = "select * from Person where SSN='"+msg.ssn+"' and Person_Type_ID='"+msg.type+"'";
		mysql.handle_database(function(err,results){
			if(err){
				console.log("error");
				throw err;
			}
			else{
				console.log(results);
				if(results.length > 0){			
					console.log("Admin data fetched");
					results.push({"code":"200"});
					console.log(JSON.stringify(results));
					callback(null, results);
						}
						else{
							console.log("InValid Password");
							res.code = "401";
							res.value = "Failed Login";
							callback(null, res);
						}
			}
		},sqlFindAdmin);
	}
else if (msg.service == "client"){
	var sqlFindClient = "select * from Person where SSN='"+msg.ssn+"' and Person_Type_ID='"+msg.type+"'";
		mysql.handle_database(function(err,results){
			if(err){
				console.log("error");
				throw err;
			}
			else{
				console.log(results);
				if(results.length > 0){			
					console.log("Client data fetched");
					results.push({"code":"200"});
					console.log(JSON.stringify(results));
					callback(null, results);
						}
						else{
							console.log("InValid Password");
							res.code = "401";
							res.value = "Failed Login";
							callback(null, res);
						}
			}
		},sqlFindClient);
	}

else if (msg.service == "clientdetail"){
	var sqlFindClientdetail = "select * from Clients where Client_SSN='"+msg.ssn+"'";
		mysql.handle_database(function(err,results){
			if(err){
				console.log("error");
				throw err;
			}
			else{
				console.log(results);
				if(results.length > 0){			
					console.log("Client data fetched");
					results.push({"code":"200"});
					console.log(JSON.stringify(results));
					callback(null, results);
						}
						else{
							console.log("InValid Password");
							res.code = "401";
							res.value = "Failed Login";
							callback(null, res);
						}
			}
		},sqlFindClientdetail);
	}

else if (msg.service == "guarddetails"){
	var sqlFindClient = "select * from Person where SSN='"+msg.ssn+"' and Person_Type_ID='"+msg.type+"'";
	console.log(sqlFindClient);
		mysql.handle_database(function(err,results){
			if(err){
				console.log("error");
				throw err;
			}
			else{
				console.log(results);
				if(results.length > 0){			
					console.log("Guard data fetched");
					results.push({"code":"200"});
					console.log(JSON.stringify(results));
					callback(null, results);
						}
						else{
							console.log("InValid Password");
							res.code = "401";
							res.value = "Failed Login";
							callback(null, res);
						}
			}
		},sqlFindClient);
	}
	
else if (msg.service == "guard"){
	var sqlFindClientdetail = "select * from guard where Guard_ID='"+msg.ssn+"'";
		mysql.handle_database(function(err,results){
			if(err){
				console.log("error");
				throw err;
			}
			else{
				console.log(results);
				if(results.length > 0){			
					console.log("Guard data fetched");
					results.push({"code":"200"});
					console.log(JSON.stringify(results));
					callback(null, results);
						}
						else{
							console.log("InValid Password");
							res.code = "401";
							res.value = "Failed Login";
							callback(null, res);
						}
			}
		},sqlFindClientdetail);
	}

}

exports.handle_request = handle_request;

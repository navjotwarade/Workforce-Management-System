
exports.abc = function(req, res){
	
	console.log("In ABC function");
	res.render('test1');
	
};


exports.getData = function(req, res){
	console.log("In getData function");
	var jData = {"name":"mahesh", "edu":"MS"};
	res.send(jData);
};
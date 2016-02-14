var amqp = require('amqp');

var connection = amqp.createConnection({host:'localhost'});
var rpc = new (require('./amqprpc'))(connection);


function make_request(queue_name, msg_payload, callback){
	
	rpc.makeRequest(queue_name, msg_payload, function(err, response){
		console.log('queuename: '+queue_name);
		console.log('msg_payload: '+msg_payload);
		console.log('client');
		if(err)
		{
			console.error("error" + err);
		}
		else
		{
			console.log("response" + JSON.stringify(response));
			
			callback(null, response);
		}
		//connection.end();
	});
}

exports.make_request = make_request;

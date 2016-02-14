var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var routes = require('./routes/index');
var Client = require('./routes/Client');
var building = require('./routes/building');
var report = require('./routes/report');
var Guard = require('./routes/Guard');
var alert = require('./routes/alert');
var freshguard = require('./routes/FreshGuard');
var app = express();

//view engine setup
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'donttellsession' ,saveUninitialized:true,resave:true,cookie: { maxAge: 160000 }}));

app.use('/', routes);
app.use('/', Client);
app.use('/',building);
app.use('/',report);
app.use('/',Guard); 
app.use('/',alert); 
app.use('/',freshguard); 



//catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

//error handlers

//development error handler
//will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

//production error handler
//no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});

module.exports = session;
module.exports = app;

var server=app.listen(app.get('port'), function() {
	console.log('Express server listening on port ' + server.address().port);
});

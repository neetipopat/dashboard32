var express = require('express');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride =  require('method-override');
//var logs = require('./routes/logs');

var app = express();

// static redirect for jquery and bootstrap
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));    // redirect to bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));          // redirect JS for jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));  //redirect to css bootstrap

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');


app.use(methodOverride());
// app.use(app.router); 
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
 
mongoose.connect("mongodb://localhost:27017/picodb", { useNewUrlParser: true });
 
var Schema = new mongoose.Schema({
	deviceId: String,
	source: String,
	port: Number,
	state: Number,
	}, {
	timestamps: true
});
var collectionName = 'picotest'
var logs = mongoose.model('picotest', Schema,collectionName);

app.get('/view', function(req, res){
	var mysort = {_id :-1};
	logs.find({deviceId:req.body.deviceID},function(err,docs){
	   if(err) 
	   res.json(err);
	   else  
	   res.render('index', {logs: docs});
	}).sort(mysort); 
});
 
app.post('/dashboard', function(req, res){
	// var mysort = {_id:-1};
    logs.find({deviceId:req.body.deviceID},function(err,docs){
		if(err) 
		res.json(err);
		else    
		res.render('index', {logs: docs});
	}).sort({_id:-1})
});
var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
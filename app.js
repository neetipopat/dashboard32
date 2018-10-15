var express = require('express');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride =  require('method-override');
//var logs = require('./routes/logs');

var app = express();


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


app.use(methodOverride());
// app.use(app.router); 
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
 
mongoose.connect("mongodb://localhost:27017/picodb", { useNewUrlParser: true });
 
//Routes declaration
const index = require('./routes/index') //contains routes used to get data from the mongo dump
app.use(index)



var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var mongoose = require('mongoose');

var db = mongoose.createConnection("mongodb://localhost:27017/picodb", { useNewUrlParser: true });
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  // all your database operations(CRUD) here 
  db.picotest.find({}).sort({_id:-1})
});

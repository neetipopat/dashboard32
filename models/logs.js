var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Log = new mongoose.Schema({
    deviceId: String,
    source: String,
    port: Number,
    state: Number
}, {
        timestamps: true
    });



module.exports = mongoose.model('Log', Log, 'picotest');



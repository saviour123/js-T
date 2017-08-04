var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var trackbus = new Schema({
    bus_id : String,
    bus_num : String,
    lat: Number,
    long: Number,
    alt: Number,
    accuracy: Number,
    date: { type: Date, dafault: Date.now() }
});

module.exports = mongoose.model('Bus', trackbus);

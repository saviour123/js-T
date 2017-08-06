var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var trackbus = new Schema({
    vehicle_id: String,
    bus_num: String,
    lat: Number,
    alt: Number,
    long: Number,
    status: String,
    nextStop: String,
    distanceToNextStop: Number,
    accuracy: Number,
    lastUpdateTime: { type: String, default: new Date().getTime() },
    date: { type: String, dafault: new Date() }
});

module.exports = mongoose.model('Bus', trackbus);
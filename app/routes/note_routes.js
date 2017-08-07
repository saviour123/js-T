var ObjectID = require('mongodb').ObjectID;
const Bus = require('../../config/models');
let db = Bus();

module.exports = function(app, db) {

    app.get('/api/v1/bus/:vehicle_id', (req, res) => {
        const vehicle_id = { "vehicle_id": req.params.vehicle_id };
        db.findOne(vehicle_id, (err, succces) => {
            if (!succces)
                return res.json({ "status": "bus not found!" });
                // return would stop the execution !vehicle_id
            const geoJson = {
                "type": "FeatureCollection",
                "features": [{
                    "type": "Feature",
                    "properties": {
                        "vehicle_id": succces.vehicle_id,
                        "status": succces.status,
                        "nextStop": succces.nextStop,
                        "bus_num": succces.bus_num,
                        "lastUpdateTime": succces.lastUpdateTime,
                        "accuracy": succces.accuracy
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [
                            succces.long,
                            succces.lat
                        ]
                    }
                }]
            }
            res.json(geoJson);
        });
    });
    
    // working as expected
    app.post('/api/v1/bus', (req, res) => {
        let bus = Bus(req.body);
        bus.save(function(err, succces) {
            if (err)
                return res.send({ "error" : "unable to post your request" });
            res.json(succces);
        });
    });
    
    // working as expected
    app.delete('/api/v1/bus/:vehicle_id', (req, res) => {
        const vehicle_id = { "vehicle_id": req.params.vehicle_id };
        db.findOneAndRemove(vehicle_id, (err, succces) => {
            if (!succces)
                return res.send({"error": "unable to complete delete"});
            res.json('Record ' + vehicle_id + ' deleted!');
        })
    });
    
    // working as expected
    app.put('/api/v1/bus/:vehicle_id', (req, res) => {
        const vehicle_id = { "vehicle_id": req.params.vehicle_id };
        const busUpdate = req.body;
        db.findOneAndUpdate(vehicle_id, busUpdate, (err, succces) => {
            if (!succces)
                res.send({ 'error': 'something strange happend' });
            res.send(succces);
        });
    });
};

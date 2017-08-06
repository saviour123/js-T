var ObjectID = require('mongodb').ObjectID;
const Bus = require('../../config/models');
let db = Bus();

module.exports = function(app, db) {

    app.get('/api/v1/bus/:vehicle_id', (req, res) => {
        const vehicle_id = req.params.vehicle_id;
        db.findOne({ "vehicle_id": vehicle_id }, (err, succces) => {
            if (err)
                res.json(err);
            console.log(succces.status);
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

    app.post('/api/v1/bus', (req, res) => {
        let bus = Bus(req.body);
        bus.save(function(err, succces) {
            if (err)
                res.send(err);
            res.json(succces);
        });
    });

    app.delete('/api/v1/bus/:vehicle_id', (req, res) => {
        const id = req.params.vehicle_id;
        db.deleteOne(id, (err, succces) => {
            if (err) {
                res.send(err);
            } else {
                res.json('Record ' + id + ' deleted!');
            }
        })
    });

    app.put('/api/v1/bus/:vehicle_id', (req, res) => {
        const id = { id: req.params.vehicle_id };
        const busUpdate = req.body;
        db.findOneAndupdate(id, busUpdate, (err, result) => {
            if (err) {
                res.send({ 'error': 'something strange happend' });
            } else {
                res.send(result);
            }
        });
    });
};

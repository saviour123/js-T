var ObjectID = require('mongodb').ObjectID;
const Bus = require('../../config/models');

module.exports = function(app, db) {
    // collection = db.collection('notes');
    app.get('/notes/:id', (req, res) => {
        const id = req.params.id;
        try {
            const details = { '_id': new ObjectID(id) };
            db.collection('notes').findOne(details, (err, item) => {
                if (err) {
                    res.send({ 'error': 'Something strange happened' });
                } else {
                    res.send(item);
                }
            });
        } catch (error) {
            res.send({ "error": "not found" });
        }
    });


    app.post('/notes', (req, res) => {
        const note = Bus({
            bus_id: req.body.bus_id,
            bus_num: req.body.bus_num,
            lat: req.body.lat,
            long: req.body.long,
            alt: req.body.alt,
            accuracy: req.body.accuracy,
            date: Date.now()
        });
        note.save(function(err, succces) {
            if (err) 
                res.send(err);
            res.json(succces);
        });
    });

    app.delete('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('notes').remove(details, (err, item) => {
            if (err) {
                res.send({ 'error': 'an error has occured' });
            } else {
                res.send('Note ' + id + ' deleted!');
            }
        })
    });

    app.put('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        const note = { 'text': req.body.name, 'title': req.body.title };

        db.collection('notes').update(details, note, (err, result) => {

            if (err) {
                res.send({ 'error': 'something strange happend' });
            } else {
                res.send(note);
            }
            console.log(req.params);
            console.log(res.body);
        });
    });
};

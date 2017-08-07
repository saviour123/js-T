const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dburl = require('./config/db');
const routes = require('./app/routes');
const db = require('./config/models');

mongoose.Promise = require('bluebird');
mongoose.connect(dburl.url, { useMongoClient: true });
const port = process.env.PORT || 3000


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
routes(app, db);

// build generic error handling
app.use((req, res) => {
    console.log(req.status);
});

app.listen(port, () => {
    console.log('DevServer running on ' + port);
});

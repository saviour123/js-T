const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dburl = require('./config/db');
const routes = require('./app/routes');
const Bus = require('./config/models');

mongoose.Promise = require('bluebird');
mongoose.connect(dburl.url, { useMongoClient: true });
const port = process.env.PORT || 3000


const app = express();
let db = Bus();

app.use(bodyParser.urlencoded({ extended: true }));
routes(app, db);

app.listen(port, () => {
    console.log('DevServer running on ' + port);
});

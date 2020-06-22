const express = require('express');
const bodyParser  = require('body-parser'); // with req.body
const cors = require('cors'); // front end needs this
const mongoose = require('mongoose');
const uriUtil = require('mongodb-uri');

// establishing connection
var mongodb = require('./api/demoEntries/model/mongoURI');
var mongodbURI = mongodb.URI;
// free sandbox version doesn't automatically provide mongooseURI, so format it
const mongooseURI = uriUtil.formatMongoose(mongodbURI);
const dbOptions = {};

const app = express();
app.use(bodyParser.json());
app.use(cors());

const hostname = 'localhost';
const dev_port = 3000;

var ENV = 'prod';

mongoose.connect(mongooseURI, dbOptions, (err) => {
    if (err) {
        console.log(err);
    };

    var server;

    if (ENV == 'prod') {
        var server = app.listen(process.env.PORT, function () {
            var port = server.address().port;
            console.log("App now running on port", port);
        });
    } else {
        var server = app.listen(dev_port, function () {
            // var port = server.address().port;
            console.log(`Server is running at http://${hostname}:${dev_port}`);
        });
    };
});

// changing which collection to point at
// var col = "entries"
// Collection.changeTo(col);

const conn = mongoose.createConnection(mongodbURI);

app.get("/", (req, res) => {
    res.send("Use /api/feedback to GET or POST.\n" +  
    "Use /api/feedback/:userID (example: /api/feedback/test03) to "+ 
    "GET specific userID, PUT or DELTE.");
});

app.get("/api/feedback", (req, res) => {
    res.send(conn.collections);
});

// app.use('/api/feedback', require('./api/demoEntries/routes/postEntry'));
// app.use('/api/feedback', require('./api/demoEntries/routes/getEntry'));
// app.use('/api/feedback', require('./api/demoEntries/routes/getSpecificEntry'));
// app.use('/api/feedback', require('./api/demoEntries/routes/deleteEntry'));
// app.use('/api/feedback', require('./api/demoEntries/routes/putEntry'));
app.use('/api/feedback', require('./api/demoEntries/routes/getCol'));
app.use('/api/feedback', require('./api/demoEntries/routes/getColEntry'));
app.use('/api/feedback', require('./api/demoEntries/routes/deleteColEntry'));
app.use('/api/feedback', require('./api/demoEntries/routes/postColEntry'));
app.use('/api/feedback', require('./api/demoEntries/routes/putColEntry'));
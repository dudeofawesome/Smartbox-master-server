var WEBSITE_PORT = (process.env.PORT || 8080);

var fs = require('fs');

var express = require('express');
var app = express();
var server;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var data = {};

module.exports = {
    init: function () {
        this.startServer();
        return this;
    },
    startServer: function () {
        app.get('/getData', function (req, res) {
            res.send("data=" + JSON.stringify(data));
        });
        app.post('/setData', function (req, res) {
            data = req.body.data;
        });

        server = app.listen(WEBSITE_PORT, function () {
            console.log('web server listening on *:' + WEBSITE_PORT);
        });
    },
    stopServer: function () {
        server.close();
        return true;
    },
    getApp: function () {
        return app;
    },
    getServer: function () {
        return server;
    }
};

module.exports.init();

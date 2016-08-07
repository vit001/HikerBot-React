var express = require('express');
var router = express.Router();

var thrift    = require('thrift');
var DataStore = require('./gen-nodejs/DataStore');

/* GET all selectors */
router.get('/', function(req, res, next) {

    var connection = thrift.createConnection( "api.hikerbot.com", 8084, {
        transport : thrift.TFramedTransport
    });
    connection.on('connect', function () {

        var client = thrift.createClient( DataStore, connection );
        client.getSelectors(null, 0, false, false, function (err, response) {
            if (err) {
                res.send('getSelectors error:', err);
            } else {
                var selectorlist = {};
                var selectors = []
                selectorlist.selectors = selectors;

                for (var j = 0; j < response.length; j++) {
                    var selector = {
                        "id": response[j].id.toString(),
                        "shortname": response[j].shortname,
                        "longname": response[j].longname
                    }

                    selectorlist.selectors.push(selector);
                }

                res.send( JSON.stringify(selectorlist) );
            }
            connection.end();
        });
    });

    connection.on('error', function (err) {
        res.send('connection error', err);
    });

});

module.exports = router;

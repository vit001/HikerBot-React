var express = require('express');
var router = express.Router();

var thrift    = require('thrift');
var DataStore = require('./gen-nodejs/DataStore');

/* GET all selectors */
router.get('/', function(req, res, next) {

    var connection = thrift.createConnection( "api.hikerbot.com", 8084, {
        transport : thrift.TFramedTransport
    });
    connection.on( 'connect', function () {

        var client = thrift.createClient( DataStore, connection );
        client.getAllPointsInBounds(4, -90000000, -180000000, 90000000, 180000000, function (err, response) {
            if (err) {
                res.send('getAllPointsInBounds error:', err);
            } else {
                var pointlist = {};
                var points = []
                pointlist.points = points;

                for ( var j = 0; j < response.length; j++ ) {

                    var point = {
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [response[j].late6*1e-6, response[j].lone6*1e-6]
                        },
                        "properties": {
                            "name":        response[j].name
                            //"description": response[j].description
                        }
                    };

                    pointlist.points.push(point);
                }

                res.send( JSON.stringify(pointlist) );
            }
            connection.end();
        });
    });

    connection.on('error', function (err) {
        res.send('connection error', err);
    });

});

module.exports = router;

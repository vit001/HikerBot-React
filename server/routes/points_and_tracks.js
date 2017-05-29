const express = require('express');
const router  = express.Router();

const thrift     = require('thrift');
const DataStore  = require('./gen-nodejs/DataStore');

/* GET all points and tracks */

const SelectorPCT = 4;

router.post('/getPointsAndTracks', ({body: {bounds, zoom}}, res) => {
    console.log(`getPoints was called, bounds: ${JSON.stringify(bounds)}, zoom: ${zoom}`);

    const connection = thrift.createConnection("api.hikerbot.com", 8084, {
        transport: thrift.TFramedTransport
    });
    connection.on('connect', () => {
        const client = thrift.createClient(DataStore, connection);

        let jsn = bounds;
        let swlate6 = jsn.south * 1e6;
        let swlone6 = jsn.west  * 1e6;
        let nelate6 = jsn.north * 1e6;
        let nelone6 = jsn.east  * 1e6;

        console.log(`grabbing from hamp server ${swlate6}, ${swlone6}, ${nelate6}, ${nelone6}, zoom: ${zoom}`);

        client.getAllObjectsInBounds( SelectorPCT, swlate6, swlone6, nelate6, nelone6, zoom, (err, response) => {

            console.log(`getPoints was called, received response len=${response.length} data=${response}`);

            // Just show 50 points max
            if( err ) {
                res.send('getAllPointsInBounds error:', err);
            } else {
                let features = [];
                for (let i = 0; i < response.markers.length; i++) {
                    let marker = response.markers[i];

                    let feature =
                        {
                            "type": "Feature",
                            "properties": {
                                "id": i,
                                "type": "point",
                                "name": marker.name,
                                "iconFileName": marker.iconFileName,
                                "description": marker.description
                            },
                            "geometry": {
                                "type": "Point",
                                "coordinates": [
                                    marker.late6 * 1e-6,
                                    marker.lone6 * 1e-6
                                ]
                            }
                        };

                    console.log(`received point ${JSON.stringify(feature)}`);

                    features.push(feature);
                }
                for (let i = 0; i < response.lines.length; i++) {
                    let line = response.lines[i];

                    // Create an array of lat/longs defining this line
                    let latlongs = [];
                    for (let j = 0; j < line.latlngs.length; j++) {
                        let ll = line.latlngs[j];
                        let latlong = [];
                        latlong.push( ll.late6 * 1e-6 );
                        latlong.push( ll.lone6 * 1e-6 );
                        latlongs.push( latlong );
                    }

                    let feature =
                        {
                            "type": "Feature",
                            "properties": {
                                "id": response.markers.length + i,
                                "type": "line",
                                "color": line.color,
                                "name": line.name,
                                "description": line.description
                            },
                            "geometry": {
                                "type": "LineString",
                                "coordinates": latlongs
                            }
                        };
                    console.log(`received line ${JSON.stringify(feature)}`);
                    features.push( feature );
                }

                const resJson = features;
                var len = features.length;
                console.log(`sending result length ${len} ${JSON.stringify(resJson)}`);
                res.status(200).send(resJson);
            }

            connection.end();
        });
    });

    connection.on('error', err => {
        console.log(`connection error ${err}`);
        res.status(200).send(`connection error ${err}`);
    });

});

module.exports = router;

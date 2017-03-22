const express = require('express');
const router  = express.Router();

const thrift     = require('thrift');
const DataStore  = require('./gen-nodejs/DataStore');

/* GET all points */


const dummyJson = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -42.5390625,
                    78.97138592818217
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -34.1015625,
                    75.58493740869223
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -37.96875,
                    71.18775391813158
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "LineString",
                "coordinates": [
                    [
                        -51.67968749999999,
                        78.06198918665974
                    ],
                    [
                        -48.515625,
                        74.68325030051861
                    ],
                    [
                        -48.515625,
                        70.25945200030638
                    ],
                    [
                        -46.7578125,
                        66.79190947341796
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "id": 1,
                "type": "town",
                "name": "blah"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -107.57812499999999,
                    47.040182144806664
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "id": 2,
                "type": "town",
                "name": "a very long name indeed"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -87.890625,
                    39.095962936305476
                ]
            }
        }
    ]
};

router.post('/getPoints', ({body: {bounds, zoom}}, res) => {
    console.log(`getPoints was called, bounds: ${JSON.stringify(bounds)}, zoom: ${zoom}`);

    const connection = thrift.createConnection("api.hikerbot.com", 8082, {
        transport: thrift.TFramedTransport
    });
    connection.on('connect', () => {
        const client = thrift.createClient(DataStore, connection);

        var jsn = bounds;
        var swlate6 = jsn.south * 1e6;
        var swlone6 = jsn.west * 1e6;
        var nelate6 = jsn.north * 1e6;
        var nelone6 = jsn.east * 1e6;

        console.log(`grabbing from hamp server ${swlate6}, ${swlone6}, ${nelate6}, ${nelone6}, zoom: ${zoom}`);

        client.getAllPointsInBounds(4, swlate6, swlone6, nelate6, nelone6, (err, response) => {
            var len2 = response.length;
            console.log(`getPoints was called, received response len=${len2} data=${response}`);

            if (err) {
                res.send('getAllPointsInBounds error:', err);
            } else {
                var features = [];
                for (var i = 0; i < 1+0*len2; i++) {
                    var p = response[i];

                    var feature=
                        {
                            "type": "Feature",
                            "properties": {
                                "id": i,
                                "type": "town",
                                "name": p.name
                            },
                            "geometry": {
                                "type": "Point",
                                "coordinates": [
                                    p.late6*1e-6,
                                    p.lone6*1e-6
                                ]
                            }};
                    features.push(feature);

                    console.log(`i=${i} feature=${JSON.stringify(feature)}`);
                    //Do something
                }

                const resJson = {
                    "type": "FeatureCollection",
                    "features": features };
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


    //console.log(`getPoints was called, bounds: ${JSON.stringify(bounds)}, zoom: ${zoom}`);
    //res.status(200).send(dummyJson);
});

module.exports = router;

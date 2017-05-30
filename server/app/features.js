const express = require('express');
const router  = express.Router();

const thrift     = require('thrift');
const DataStore  = require('./gen-nodejs/DataStore');

const PCT_SELECTOR_ID = 4;

router.get('/', (req, res) => {

    // @todo: fix this after the server api change
    const bounds = { 
        south: 31.703614704575227, 
        west: -126.580810546875, 
        north: 43.431962730842606, 
        east: -113.419189453125
    };
    const zoom = 9;

    console.log(`getPoints was called, bounds: ${JSON.stringify(bounds)}, zoom: ${zoom}`);

    const connection = thrift.createConnection("api.hikerbot.com", 8084, {
        transport: thrift.TFramedTransport
    });
    connection.on('connect', () => {

        const client = thrift.createClient(DataStore, connection);

        const swlate6 = bounds.south * 1e6;
        const swlone6 = bounds.west  * 1e6;
        const nelate6 = bounds.north * 1e6;
        const nelone6 = bounds.east  * 1e6;

        console.log(`grabbing from hamp server ${swlate6}, ${swlone6}, ${nelate6}, ${nelone6}, zoom: ${zoom}`);

        client.getAllObjectsInBounds( PCT_SELECTOR_ID, swlate6, swlone6, nelate6, nelone6, zoom, (err, response) => {

            if( err ) {
                res.send('getAllPointsInBounds error:', err);
                return;
            }

            if(response) {
                
                console.log("Recieved response from HAPM-server:", response);

                const markers = response.markers.map(m => 
                    {
                        return {
                            "type": "point",
                            "id": m.id,
                            "name": m.name,
                            "iconFileName": m.iconFileName,
                            "description": m.description,
                            "coordinates": [
                                m.late6 * 1e-6,
                                m.lone6 * 1e-6
                            ]
                        }
                    });
                
                const lines = response.lines.map(l => {
                        return {
                            "type": "line",
                            "id": l.id,
                            "color": l.color,
                            "name": l.name,
                            "description": l.description,
                            "coordinates": l.latlngs.map(ll => [ll.late6 * 1e-6, ll.lone6 * 1e-6])
                        }
                    });

                const resJson = markers.concat(lines);
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

const express = require('express');
const router  = express.Router();

const thrift     = require('thrift');
const DataStore  = require('./gen-nodejs/DataStore');

const PCT_SELECTOR_ID = 4;

router.get('/bounds/:south/:west/:north/:east/zoom/:zoom', (req, res) => {

    const bounds = { 
        south: req.params.south, 
        west: req.params.west, 
        north: req.params.north, 
        east: req.params.east
    };
    const zoom = req.params.zoom;

    console.log(`getPoints was called, bounds: ${JSON.stringify(bounds)}, zoom: ${zoom}`);

    const connection = thrift.createConnection("api.hikerbot.com",  8084, {
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
                
                console.log("Recieved response from HAMP-server:", response);

                const markers = response.markers.map(m => 
                    {
                        return {
                            "type": "point",
                            "id": m.id.toString(),
                            "showFromZoom": m.showZoomMin / 1e3,
                            "showToZoom": m.showZoomMax / 1e3,
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
                            "id": l.id.toString() ,
                            "color": l.color,
                            "name": l.name,
                            "description": l.description,
                            "points": l.linePoints.map(lp => [{
                                id: lp.seq_number.toString(),
                                lat: lp.late6 * 1e-6, 
                                lng: lp.lone6 * 1e-6,
                                showFromZoom: lp.zlfo,
                            }])
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

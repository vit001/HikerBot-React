const express = require('express');
const router  = express.Router();

const thrift     = require('thrift');
const DataStore  = require('./gen-nodejs/DataStore');

/* GET all selectors */
router.get('/', (req, res, next) => {
  const connection = thrift.createConnection("api.hikerbot.com", 8084, {
    transport: thrift.TFramedTransport
  });
  connection.on('connect', () => {
    const client = thrift.createClient(DataStore, connection);

    var swlate6 = req.body.swlate6;
    var swlone6 = req.body.swlone6;
    var nelate6 = req.body.nelate6;
    var nelone6 = req.body.nelone6;

    
    client.getAllPointsInBounds(4, swlate6, swlone6, nelate6, nelone6, (err, response) => {
      if (err) {
        res.send('getAllPointsInBounds error:', err);
      } else {
        const pointlist = {
          points: response.map(({late6, lone6, name/*, description*/}) => ({
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [late6 * 1e-6, lone6 * 1e-6]
            },
            properties: {
              name,
              // description
            }
          }))
        };

        res.send(JSON.stringify(pointlist));
      }

      connection.end();
    });
  });

  connection.on('error', err => {
    res.send('connection error', err);
  });

});

module.exports = router;

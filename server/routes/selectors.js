const express = require('express');
const router = express.Router();

const thrift = require('thrift');
const DataStore = require('./gen-nodejs/DataStore');

/* GET all selectors */
router.get('/', (req, res, next) => {
  const connection = thrift.createConnection("api.hikerbot.com", 8084, {
    transport: thrift.TFramedTransport
  });
  connection.on('connect', () => {
    const client = thrift.createClient(DataStore, connection);
    client.getSelectors(null, 0, false, false, (err, response) => {
      if (err) {
        res.send('getSelectors error:', err);
      } else {
        const selectorlist = {
          selectors: response.map(({id, shortname, longname}) => ({
            id: id.toString(),
            shortname,
            longname
          }))
        };

        res.send(JSON.stringify(selectorlist));
      }

      connection.end();
    });
  });

  connection.on('error', function (err) {
    res.send('connection error', err);
  });
});

module.exports = router;

const express = require('express');
const router  = express.Router();

const thrift     = require('thrift');
const DataStore  = require('./gen-nodejs/DataStore');

/* GET details for a point */

const SelectorPCT = 4;
const AuthToken   = null;

router.get('/', ({body: {id, version}}, res) => {
    console.log(`getDetailPoint was called, id=${id}, version=${version}`);

    const connection = thrift.createConnection("api.hikerbot.com", 8084, {
        transport: thrift.TFramedTransport
    });
    connection.on('connect', () => {
        const client = thrift.createClient(DataStore, connection);

        client.getPoint( AuthToken, id, version, false, false, (err, response) => {

            console.log(`getPoint was called, received response ${response}`);

            // Just show 50 points max
            if( err ) {
                res.send('getPoint error:', err);
            } else {
                let resJson =
                    {
                        "type": "Feature",
                        "properties": {
                            "id": response.id,
                            "name": response.name,
                            "description": response.description
                        }
                    };

                console.log(`sending result ${JSON.stringify(resJson)}`);
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
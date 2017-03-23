const express = require('express');
const router = express.Router();

const dummyJson = {
  "type": "FeatureCollection",
  "features": [
      {
          "type": "Feature",
          "properties": {
            "id": 1,
            "type": "town",
            "name": "Some Town 1"
          },
          "geometry": {
              "type": "Point",
                "coordinates": [
                    48.97138592818217,
                    -100.5390625
                ]
            }
      },
      {
          "type": "Feature",
          "properties": {
              "id": 2,
              "type": "town",
              "name": "Some Town 2"
          },
          "geometry": {
              "type": "Point",
              "coordinates": [
                  39.095962936305476,
                  -87.890625
              ]
          }
      },
      {
          "type": "Feature",
          "properties": {
              "id": 3,
              "type": "town",
              "name": "Some Town 3"
          },
          "geometry": {
              "type": "Point",
              "coordinates": [
                  35.095962936305476,
                  -100.890625
              ]
          }
      },
      {
          "type": "Feature",
          "properties": {
              "id": 4,
              "type": "point",
              "name": "Some Point 1"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [
                42.58493740869223,
                -90.1015625
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
            78.06198918665974,
            -51.67968749999999
          ],
          [
              74.68325030051861,
              -48.515625
          ],
          [
            70.25945200030638,
            -48.515625
          ],
          [
            66.79190947341796,
            -46.7578125
          ]
        ]
      }
    }
  ]
};

router.post('/getPoints', ({body: {bounds, zoom}}, res) => {
  console.log(`getPoints was called, bounds: ${JSON.stringify(bounds)}, zoom: ${zoom}`);
  res.status(200).send(dummyJson);
});

module.exports = router;

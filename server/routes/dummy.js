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
                    -100.5390625,
                    48.97138592818217
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
                  -87.890625,
                  39.095962936305476
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
                  -100.890625,
                  35.095962936305476
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
            -90.1015625,
            42.58493740869223
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
    }
  ]
};

router.post('/getPoints', ({body: {bounds, zoom}}, res) => {
  console.log(`getPoints was called, bounds: ${JSON.stringify(bounds)}, zoom: ${zoom}`);
  res.status(200).send(dummyJson);
});

module.exports = router;

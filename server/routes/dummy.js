const express = require('express');
const router = express.Router();

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
  res.status(200).send(dummyJson);
});

module.exports = router;

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
    }
  ]
};

/* GET all selectors */
router.get('/', (req, res) => {
  res.status(200).send(dummyJson);
});

module.exports = router;

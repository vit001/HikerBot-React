const express = require('express');
const router = express.Router();

const dummyJsonPoints = {
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
          "properties": {
              "id": 4,
              "type": "line",
              "name": "Some Line 1"
          },
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      25,
                      -80
                  ],
                  [
                      75,
                      -48
                  ],
                  [
                      70,
                      -48
                  ]
              ]
      }
    }
  ]
};

const dummyJsonTracks = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "LineString",
                "coordinates": [
                    [
                        25,
                        -80
                    ],
                    [
                        75,
                        -48
                    ],
                    [
                        70,
                        -48
                    ]
                ]
            }
        }
    ]
};

router.post('/getPoints', ({body: {bounds, zoom}}, res) => {
  console.log(`getPoints was called, bounds: ${JSON.stringify(bounds)}, zoom: ${zoom}`);
  res.status(200).send(dummyJsonPoints);
});

router.post('/getTracks', ({body: {bounds, zoom}}, res) => {
    console.log(`getTracks was called, bounds: ${JSON.stringify(bounds)}, zoom: ${zoom}`);
    res.status(200).send(dummyJsonTracks);
});

module.exports = router;

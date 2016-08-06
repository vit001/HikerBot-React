export function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(({coords}) => resolve(coords), error => reject(error), {
      timeout: 5000
    });
  });
}

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

export function getPoints() {
  return new Promise(resolve => {
    setTimeout(() => resolve(dummyJson), 200);
  });
}
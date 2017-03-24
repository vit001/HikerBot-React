export function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(({coords}) => resolve(coords), error => reject(error), {
      timeout: 5000
    });
  });
}

export function getPoints(bounds = 'asd', zoom = 12) {
  const body = JSON.stringify({bounds, zoom});
  return fetch('/server/points/getPoints', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body
  })
    .then(result => {
      if (!result.ok) {
        return Promise.reject(result.status);
      }

      return result.json();
    });
}

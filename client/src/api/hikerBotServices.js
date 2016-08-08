export function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(({coords}) => resolve(coords), error => reject(error), {
      timeout: 5000
    });
  });
}

export function getPoints() {
  return fetch('/server/dummy')
    .then(result => {
      if (!result.ok) {
        return Promise.reject(result.status);
      }

      return result.json();
    });
}
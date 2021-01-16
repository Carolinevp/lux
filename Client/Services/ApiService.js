const BASE_URL = 'http://localhost:3001';
export function getListsByUser() {
  return fetchRequest('/lists/:id');
}

function fetchRequest(path, options) {
  return fetch(BASE_URL + path, options)
    .then((res) => (res.status < 400 ? res : Promise.reject(res)))
    .then((res) => (res.status !== 204 ? res.json() : res))
    .catch((err) => {
      // console.log(path, options.method || 'GET');
      console.log('Error:', err);
    });
}

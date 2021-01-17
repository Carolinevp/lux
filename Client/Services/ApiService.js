const BASE_URL = 'http://192.168.1.12:3001';

export function getListsByUser() {
  return fetchRequest('/lists/:id');
}

export function addMovieToList(id, listName, movieToAdd) {
  fetch('http://192.168.1.12:3001/lists', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: id,
      listName: listName,
      movieToAdd: movieToAdd,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log('ERROR IS:', err);
    });
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

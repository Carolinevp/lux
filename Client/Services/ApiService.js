import { Alert } from 'react-native';

const BASE_URL = 'http://192.168.1.12:3001';

export function getListsByUser(id) {
  return fetchRequest(`/lists/${id}`);
}

export function addMovieToList(id, movieToAdd, movieList) {
  fetch(`http://192.168.1.12:3001/lists/${movieList}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: id,
      movieToAdd: movieToAdd,
    }),
  })
    .then((res) => (res.status < 400 ? res : Promise.reject(res)))
    .then((res) => (res.status !== 204 ? res.json() : res))
    .then(() => Alert.alert(`movie added to your ${movieList} list`))
    .catch((err) => {
      Alert.alert(`movie already in your ${movieList} list`);
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

import apiKey from '../assets/apikey';
import {PORT} from '../config';

export function fetchLists(list, setFunction, setLoading) {
  fetch(
    `https://api.themoviedb.org/3/movie/${list}?${apiKey}&language=en-US&page=1`,
  )
    .then((res) => res.json())
    .then((result) => setFunction(result.results))
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));
}

export function fetchUserList(listName, setFunction, setLoading) {
  fetch(`http://${PORT}/lists/5ff9c7cfdf2f636e9546fe1c/${listName}`)
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      const myPromises = res.map((item) =>
        fetch(
          `https://api.themoviedb.org/3/movie/${item}?${apiKey}&language=en-US`,
        ).then((res1) => {
          return res1.json();
        }),
      );
      Promise.all(myPromises).then((results) => {
        setFunction(() => results);
      });
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => setLoading(false));
}

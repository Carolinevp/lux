import apiKey from '../assets/apikey';

export function fetchLists(list, setFunction, setLoading) {
  fetch(
    `https://api.themoviedb.org/3/movie/${list}?${apiKey}&language=en-US&page=1`,
  )
    .then((res) => res.json())
    .then((result) => setFunction(result.results))
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));
}

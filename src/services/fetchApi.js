const API_KEY = 'd6cee6c96199ef2bba4fd1c34035d6d3';
const BASE_URL = 'https://api.themoviedb.org/3';

function fetchTrending() {
  return fetch(`${BASE_URL}/trending/all/day?api_key=${API_KEY}`).then(res => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(
      new Error(`Ooh no! Something went wrong, try again later`),
    );
  });
}

function fetchDetailedMovie(movieId) {
  return fetch(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`,
  ).then(res => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(
      new Error(`Ooh no! Something went wrong, try again later`),
    );
  });
}

function fetchByQuery(query = 'harry') {
  return fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&page=1&query=${query}`,
  ).then(res => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(
      new Error(`Ooh no! Something went wrong, try again later`),
    );
  });
}

export { fetchTrending, fetchDetailedMovie, fetchByQuery };

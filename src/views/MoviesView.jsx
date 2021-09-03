import { useState, useEffect } from 'react';
import { fetchByQuery } from '../services/fetchApi';

import Searchbar from '../components/Searchbar/Searchbar';
import MovieGridCard from '../components/MovieGridCard/MovieGridCard';
import { Route } from 'react-router';

export default function MoviesView() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query === '') {
      return;
    }

    fetchByQuery(query)
      .then(res => {
        if (res.results.length === 0) {
          alert('Ooh! Nothing was found for your query');
        } else {
          setResults(res.results);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, [query]);

  const handleFormSubmit = query => {
    setQuery(query);
  };
  return (
    <>
      <Searchbar onFormSubmit={handleFormSubmit} />
      <Route to={`/movies/${query}`}>
        <ul className="default-list">
          {results.map(result => (
            <li key={result.id}>
              <MovieGridCard result={result} />
            </li>
          ))}
        </ul>
      </Route>
    </>
  );
}

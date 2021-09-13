import { lazy, Suspense } from 'react';
import { useState, useEffect } from 'react';
import { fetchByQuery } from '../services/fetchApi';
import { Link, Route, useHistory, useLocation } from 'react-router-dom';

import Searchbar from '../components/Searchbar/Searchbar';
// import MovieGridCard from '../components/MovieGridCard/MovieGridCard';

const MovieGridCard = lazy(() =>
  import('../components/MovieGridCard/MovieGridCard'),
);

export default function MoviesView() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const history = useHistory();
  const location = useLocation();

  const queryFromUrl = new URLSearchParams(location.search).get('query') ?? '';

  useEffect(() => {
    if (queryFromUrl === '') {
      return;
    }

    fetchByQuery(queryFromUrl)
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
  }, [queryFromUrl]);

  const handleFormSubmit = query => {
    setQuery(query);
    history.push({ ...location, search: `query=${query}` });
  };

  return (
    <>
      <Searchbar onFormSubmit={handleFormSubmit} />
      <Suspense fallback={<p>Loading...</p>}>
        <Route to={`/movies${location.search}`}>
          <ul className="default-list">
            {results.map(result => (
              <li key={result.id}>
                <Link
                  to={{
                    pathname: `/movies/${result.id}`,
                    state: { from: location },
                  }}
                >
                  <MovieGridCard result={result} />
                </Link>
              </li>
            ))}
          </ul>
        </Route>
      </Suspense>
    </>
  );
}

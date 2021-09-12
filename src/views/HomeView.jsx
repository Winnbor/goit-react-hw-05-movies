import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { fetchTrending } from '../services/fetchApi';
import MovieGridCard from '../components/MovieGridCard/MovieGridCard';

import './HomeView.css';

export default function HomeView() {
  const [results, setResults] = useState([]);

  const location = useLocation();

  useEffect(() => {
    fetchTrending().then(res => setResults(res.results));
  }, []);

  return (
    <main className="HomeView">
      <h1>Trending today</h1>
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
    </main>
  );
}

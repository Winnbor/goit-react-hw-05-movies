import { useEffect, useState } from 'react';

import { fetchTrending } from '../services/fetchApi';
import MovieGridCard from '../components/MovieGridCard/MovieGridCard';

import './HomeView.css';

export default function HomeView() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetchTrending().then(res => setResults(res.results));
  }, []);

  return (
    <main className="HomeView">
      <h1>Trending today</h1>
      <ul className="default-list">
        {results.map(result => (
          <li key={result.id}>
            <MovieGridCard result={result} />
          </li>
        ))}
      </ul>
    </main>
  );
}

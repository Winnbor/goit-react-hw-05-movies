import { Link } from 'react-router-dom';

export default function MovieGridCard({ result }) {
  return (
    <>
      <Link to={`/movies/${result.id}`}>
        <img
          src={`https://image.tmdb.org/t/p/w300${result.poster_path}`}
          alt={result.title}
        />
        <p>{result.title ?? result.name}</p>
      </Link>
    </>
  );
}

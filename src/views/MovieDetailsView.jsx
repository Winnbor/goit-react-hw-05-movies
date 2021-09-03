import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';

import { fetchDetailedMovie } from '../services/fetchApi';

import './MovieDetailsView.css';

export default function MovieDetailsView() {
  const { movieId } = useParams();

  const [movie, setMovie] = useState({});

  const { url } = useRouteMatch();
  console.log(url);

  useEffect(() => {
    fetchDetailedMovie(movieId).then(res => setMovie(res));
  }, [movieId]);

  return (
    <div className="MovieDetailsView">
      <img
        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
        alt={movie.title ?? movie.name}
      />
      <div className="MovieDetailsView__info">
        <h2>{`${movie.title ?? movie.name} (${movie.release_date?.slice(
          0,
          4,
        )})`}</h2>
        <p>{movie.overview}</p>
        <p>Rating: {movie.vote_average}</p>
        <p>Genres: {movie.genres?.map(el => el.name).join(', ')}</p>
        <div className="MovieDetailsView__more">
          <p>jhjhhjjh</p>
        </div>
      </div>
    </div>
  );
}

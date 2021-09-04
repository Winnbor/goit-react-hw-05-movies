import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useRouteMatch, NavLink, Route } from 'react-router-dom';

import {
  fetchDetailedMovie,
  fetchMovieCast,
  fetchMovieReviews,
} from '../services/fetchApi';
import CastCard from '../components/CastCard/CastCard';
import ReviewCard from '../components/ReviewCard/ReviewCard';

import './MovieDetailsView.css';

export default function MovieDetailsView() {
  const { movieId } = useParams();

  const [movie, setMovie] = useState({});
  const [cast, setCast] = useState([]);
  const [reviews, setReviews] = useState([]);

  const { url } = useRouteMatch();
  console.log(url);

  useEffect(() => {
    fetchDetailedMovie(movieId).then(res => setMovie(res));
    fetchMovieCast(movieId).then(res => setCast(res.cast));
    fetchMovieReviews(movieId).then(res => setReviews(res.results));
  }, [movieId]);

  return (
    <div className="MovieDetailsView">
      <img
        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
        alt={movie.title ?? movie.name}
      />
      <div className="MovieDetailsView__info">
        <h1>{`${movie.title ?? movie.name} (${movie.release_date?.slice(
          0,
          4,
        )})`}</h1>
        <p>{movie.overview}</p>
        <p>Rating: {movie.vote_average}</p>
        <p>Genres: {movie.genres?.map(el => el.name).join(', ')}</p>
        <div className="MovieDetailsView__more">
          <h2>More information</h2>
          <ul>
            <li>
              <NavLink to={`${url}/cast`}>Cast</NavLink>
              <Route path={`${url}/cast`}>
                <ul>
                  {cast &&
                    cast.map((el, i) => (
                      <li key={i}>
                        <CastCard
                          name={el.name}
                          character={el.character}
                          src={el.profile_path}
                        />
                      </li>
                    ))}
                </ul>
              </Route>
            </li>
            <li>
              <NavLink to={`${url}/reviews`}>Reviews</NavLink>
              <Route path={`${url}/reviews`}>
                {reviews ? (
                  <p>No review here yet</p>
                ) : (
                  <ul>
                    {reviews.map((el, i) => (
                      <li key={i}>
                        <ReviewCard name={el.author} text={el.content} />
                      </li>
                    ))}
                  </ul>
                )}
              </Route>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

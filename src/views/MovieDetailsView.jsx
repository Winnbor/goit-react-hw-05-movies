import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  useRouteMatch,
  NavLink,
  Route,
  useLocation,
  useHistory,
} from 'react-router-dom';

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
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    fetchDetailedMovie(movieId)
      .then(res => setMovie(res))
      .then(
        fetchMovieCast(movieId)
          .then(res => setCast(res.cast))
          .catch(error => console.log(error)),
        fetchMovieReviews(movieId)
          .then(res => setReviews(res.results))
          .catch(error => console.log(error)),
      )
      .catch(error => alert(error));
  }, [movieId]);

  const onGoBack = () => {
    history.push(location?.state?.from ?? '/');
  };

  const getSrc = () =>
    movie?.poster_path
      ? `https://image.tmdb.org/t/p/w300${movie?.poster_path}`
      : 'https://image.tmdb.org/t/p/w300/AvgrHw6YEehlNxVZNVDoVz2Huht.jpg';

  return (
    <>
      <button type="button" className="back-btn" onClick={onGoBack}>
        Go Back
      </button>

      <div className="MovieDetailsView">
        <img src={getSrc()} alt={movie.title ?? movie.name} />
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
                <NavLink
                  to={{
                    pathname: `${url}/cast`,
                    state: { from: { ...location?.state?.from } },
                  }}
                >
                  Cast
                </NavLink>
                <Route path={`${url}/cast`}>
                  {cast.length === 0 ? (
                    <p>No information available</p>
                  ) : (
                    <ul>
                      {cast.map((el, i) => (
                        <li key={i}>
                          <CastCard
                            name={el.name}
                            character={el.character}
                            src={el.profile_path}
                          />
                        </li>
                      ))}
                    </ul>
                  )}
                </Route>
              </li>
              <li>
                <NavLink
                  to={{
                    pathname: `${url}/reviews`,
                    state: { from: { ...location?.state?.from } },
                  }}
                >
                  Reviews
                </NavLink>
                <Route path={`${url}/reviews`}>
                  {reviews.length === 0 ? (
                    <p>No reviews here yet</p>
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
    </>
  );
}

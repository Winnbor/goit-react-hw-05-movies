import { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import Container from './Container/Container';
import Header from './Header/Header';

const HomeView = lazy(() => import('../views/HomeView'));
const MoviesView = lazy(() => import('../views/MoviesView'));
const NotFoundView = lazy(() => import('../views/NotFoundView'));
const MovieDetailsView = lazy(() => import('../views/MovieDetailsView'));

function App() {
  return (
    <>
      <Container>
        <Header />
        <Suspense fallback={<p>Loading...</p>}>
          <Switch>
            <Route exact path="/">
              <HomeView />
            </Route>
            <Route path="/movies/:movieId">
              <MovieDetailsView />
            </Route>
            <Route path="/movies">
              <MoviesView />
            </Route>
            <Route>
              <NotFoundView />
            </Route>
          </Switch>
        </Suspense>
      </Container>
    </>
  );
}

export default App;

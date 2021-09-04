import { Route, Switch } from 'react-router-dom';

import Container from './Container/Container';
import Header from './Header/Header';
import HomeView from '../views/HomeView';
import MoviesView from '../views/MoviesView.jsx';
import NotFoundView from '../views/NotFoundView';
import MovieDetailsView from '../views/MovieDetailsView';

function App() {
  return (
    <>
      <Container>
        <Header />
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
      </Container>
    </>
  );
}

export default App;

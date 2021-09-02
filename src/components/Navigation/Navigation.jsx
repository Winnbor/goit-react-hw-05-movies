import { NavLink } from 'react-router-dom';
import './Navigation.css';

export default function Navigation() {
  return (
    <nav>
      <NavLink to="/" className="nav-link" activeClassName="nav-link--active">
        Home
      </NavLink>
      <NavLink
        to="/movies"
        className="nav-link"
        activeClassName="nav-link--active"
      >
        Movies
      </NavLink>
    </nav>
  );
}

import React from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import Home from './components/home/home';
import MovieDetails from './components/movieDetails/movieDetails';
import './App.css'
function App() {
  return (
    <div className="container-fluid">
      <Router>
        <div className="header">
          <nav className="nav-bar">
            <NavLink to="/" exact={true}
              className="Nav_link"
              activeClassName="activeRoute "
              activeStyle={{ color: 'red'}}
            > Home  </NavLink>
            <NavLink to="/movie" exact={true}
              className="Nav_link"
              activeClassName="activeRoute"
              activeStyle={{ color: 'red' }}
            >  Movie Details</NavLink>
          </nav>
        </div>
        <div className="parent-wrapper">
          <Route path="/" exact component={Home} />
          <Route path="/movie" exact component={MovieDetails} />
        </div>
      </Router>
    </div>
  );
}

export default App;
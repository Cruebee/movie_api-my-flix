import React from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';


import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from "react-router-dom";

import { RegistrationView } from "../registration-view/registration-view";
import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";

import "./main-view.scss";

export class MainView extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      user: null,
      register: null,
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user"),
      });
      this.getMovies(accessToken);
    }
  }

  // Authentication

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
    });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }

  // Log Out
  handleLogOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    this.setState({
      user: null,
    });
    console.log("logged out");
  }

  // Get Movies
  getMovies(token) {
    axios
      .get("https://cruebeeflix.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          movies: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // Registration
  onNeedRegistration(registration) {
    this.setState({
      registration,
    });
  }

  render() {
    const { movies, user } = this.state;
    if (!movies) return <Container className="main-view" fluid="true" />;

    return (
      <Router>
        <Container className="main-view" fluid="true">
          <Navbar className="navbar navbar-dark">
            <h1 className="main-view-title">myFlix</h1>
            <Link to={`/users/${localStorage.getItem("user")}`}>
              <Button className="profile-button" variant="primary">
                Profile
              </Button>
            </Link>
            <Button
              className="log-out-button"
              variant="info"
              onClick={() => this.handleLogOut()}
            >
              Log Out
            </Button>
          </Navbar>
          <Row>
            <Route exact path="/" render={() => {
              if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              return movies.map(m => <MovieCard key={m._id} mocie={m} />)
            }} />
            <Route path="/register" render={() => <RegistrationView />} />
            <Route path="/movies/:MovieId" render={({ match }) => <MovieView movie={movies.find(m => m._id === match.params.MovieId)} />} />
            <Route path="/genres/:Name" render={({ match }) => {
              if (movies.length === 0) return <Container className="main-view" />;
              return <GenreView genre={movies.find(m => m.genre.Name === match.params.Name).genre} />
            }} />
            <Route path="directors/:Name" render={({ match }) => {
              if (movies.length === 0) return <Container className="main-view" />;
              return <DirectorView director={movies.find(m => m.director.Name === match.params.Name).director} />
            }} />
            <Route path="/users/:Username" render={() => {
              if (movies.length === 0) return <Container className="main-view" />;
              return <ProfileView movies={movies} />
            }} />
          </Row>
        </Container>
      </Router>
    );
  }
}

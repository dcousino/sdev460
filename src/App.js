import React, { Component } from 'react';
import { Container } from 'reactstrap';
import './App.css';
import Login from './components/Login';
import AppNavbar from './components/AppNavbar';
import Safe from './components/Safe';
import { BrowserRouter as Router, Route } from 'react-router-dom';
class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <AppNavbar />
          <Container>
            <Route exact path="/" component={Login} />
            <Route exact path="/safe" component={Safe} />
          </Container>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;

import React, { Component } from 'react';
import './App.css';
import LoginForm from './LoginForm';
import axios from 'axios';

axios.defaults.baseURL = `http://localhost:5000`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        loggedIn: false
    };
  }
  handleLogin(user) {
    axios.post('/auth/login', {user: user})
      .then(response => {
        console.log(response.data);
      }, (err) => {
        console.error(err);
      });
  }
  render() {
    return (
      <div className="App">
        <h1>Let's go</h1>
        <LoginForm handleLogin={this.handleLogin} />
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.user = {};
  }
  render() {
    return (
      <form>
        <fieldset>
          <div>
            <label>Username</label> <br />
            <input type="text" name="username" onChange={(event) => {this.onFieldChange(event)}} />
          </div>
          <div>
            <label>Password</label> <br />
            <input type="password" name="password" onChange={(event) => {this.onFieldChange(event)}} />
          </div>
          <div>
            <button type="submit" onClick={(event) => {this.onSubmit(event)}}>Login</button>
          </div>
        </fieldset>
      </form>
    );
  }
  onFieldChange(event) {
    this.user[event.target.name] = event.target.value;
  }
  onSubmit(event) {
    event.preventDefault();
    this.props.handleLogin({
      username: this.user.username,
      password: this.user.password
    });
  }
}
console.log("HEEEE");

export default LoginForm;
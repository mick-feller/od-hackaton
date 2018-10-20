import React, { Component } from 'react';
import { connect } from 'react-redux';
import { auth } from 'firebase/auth';
import './Login.scss';

class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
  }

  login() {
    auth.signInWithPopup(provider)
      .then((result) => {
        const { user } = result;
        this.setState({
          user
        });
      });
  }

  render() {
    return (
      <div>
        <button type="button" onClick={this.login}>
          Login
        </button>
      </div>
    )
  }
}

const mapStateToProps = ({auth}) => {
  return {
    auth
  };
};

export default connect(mapStateToProps)(Logout);

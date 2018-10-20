import React, { Component } from 'react';
import { connect } from 'react-redux';
import { auth } from 'firebase/firebase';
import './Logout.scss';

class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    auth.signOut()
      .then(() => {
        this.setState({
          user: null
        });
      });
  }

  render() {
    return (
      <div>
        <button type="button" onClick={this.logout}>
          Logout
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

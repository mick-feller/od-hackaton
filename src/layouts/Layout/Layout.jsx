import React, { Component } from 'react';
import { connect } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import PropTypes from 'prop-types';
import firebase, { auth, provider } from 'firebase/firebase';
import './Layout.scss';

class Layout extends Component {
  constructor() {
    super();
    this.state = {
      user: null
    };

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      }
    });
  }

  logout() {
    auth.signOut()
      .then(() => {
        this.setState({
          user: null
        });
      });
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
    const { user } = this.state;
    const { route: { routes } = {} } = this.props;
    return (
      <div className="is-fluid od-layout-class-placeholder">
        {user
          ? (
            <div>
              <div className="user-profile">
                <img src={this.state.user.photoURL} alt={this.state.user.displayName} />
              </div>
              <button onClick={this.logout} type="button">Log Out</button>
            </div>
          )
          : <button onClick={this.login} type="button">Log In</button>
        }
        { renderRoutes(routes) }
      </div>
    );
  }
}

Layout.propTypes = {
  route: PropTypes.object
};

Layout.defaultProps = {
  route: undefined
};

const mapStateToProps = () => {
  return { };
};

export default connect(mapStateToProps)(Layout);

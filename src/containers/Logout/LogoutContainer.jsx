import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import * as userActionCreators from 'reducers/user';
import { connect } from 'react-redux';
import { auth } from 'firebase/firebase';
import { Button } from 'components';
import './Logout.scss';

class LogoutContainer extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    const { resetUser } = this.props;
    auth.signOut()
      .then(() => {
        resetUser();
      });
  }

  render() {
    return (
      <Button type="button" events={{
        onClick: () => {
          this.logout()
        }
      }}>
      Logout
      </Button>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(userActionCreators, dispatch)
};

export default connect(null, mapDispatchToProps)(LogoutContainer);

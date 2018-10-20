import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActionCreators from 'reducers/user';
import { renderRoutes } from 'react-router-config';
import { auth } from 'firebase/firebase';
import { LoginContainer, LogoutContainer} from 'containers';
import './Layout.scss';

class Layout extends React.Component {
  constructor(props) {
    super(props);
    const { history, updateUser } = this.props;
    auth.onAuthStateChanged((user) => {
      if (!user) {
        history.push('/welcome');
      }else{
        updateUser({
          userid: user.email,
          displayName: user.displayName,
          isnew: true,
          photoURL: user.photoURL,
          phoneNumber: user.phoneNumber
        });
      }
    });
  }
  componentDidUpdate(prevProps){
    const { location, history, auth: {isAuth}} = this.props;
    const { location: prevLocation } = prevProps;
    if(isAuth && prevLocation.pathname === prevLocation.pathname && location.pathname !== "/"){
      history.push('/');
    }
  }

  render() {
    const {
      props,
    } = this;

    const { route: { routes } = {}, auth: { isAuth = false } } = props;
    return (
      <Fragment>
        { renderRoutes(routes) }
      { isAuth ? <LogoutContainer {...props} /> : <LoginContainer /> }
      </Fragment>
    )
  }
}

const mapStateToProps = ({auth}) => {
  return {
    auth
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(userActionCreators, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);

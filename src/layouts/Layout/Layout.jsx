import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActionCreators from 'reducers/user';
import * as navigationActionCreators from 'reducers/navigation';
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
        history.push('/signin');
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
    const { history, navigation, doResetRedirect} = this.props;

    if(navigation.redirect && navigation.url !== '') {
      history.push(navigation.url);
      doResetRedirect();
    }
  }

  render() {
    const {
      props,
    } = this;

    const { route: { routes } = {}, auth: { isAuth } } = props;
    return (
      <Fragment>
        { renderRoutes(routes) }
        { isAuth === true ? <LogoutContainer /> : isAuth !== null ? <LoginContainer /> : null }
      </Fragment>
    )
  }
}

const mapStateToProps = ({auth, navigation}) => {
  return {
    auth,
    navigation
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ ...userActionCreators, ...navigationActionCreators }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);

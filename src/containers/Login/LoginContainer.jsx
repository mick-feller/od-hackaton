import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActionCreators from 'reducers/user';
import firebase, { auth, provider } from 'firebase/firebase';
import { Button } from 'components';
import './Login.scss';

class Logout extends Component {
  constructor(props) {
    super(props);
    
    this.db = firebase.firestore();
    this.db.settings({
      timestampsInSnapshots: true
    });

    this.dbCollection = this.db.collection('users');
    this.login = this.login.bind(this);
  }

  createQuery(email) {
    return this.dbCollection.where('userid', '==', email);
  }

  storeInRedux(userData) {
    const { updateUser } = this.props;
    updateUser(userData);
  }

  getUserData(querySnapshot) {
    return querySnapshot.forEach((docRef) => {
      this.storeInRedux({
        id: docRef.id,
        ...docRef.data()
      });
    });
  }

  storeData(user) {
    this.createQuery(user.email).get()
      .then((querySnapshot) => {
          if(querySnapshot.docs.length === 0) {
            this.dbCollection.add({
              userid: user.email,
              displayName: user.displayName,
              isnew: true,
              photoURL: user.photoURL,
              phoneNumber: user.phoneNumber
            }).then(() => {
              this.createQuery(user.email).get().then((querySnapshot) => this.getUserData(querySnapshot));
            });
          }
          this.getUserData(querySnapshot);
      })
      .catch((error) => {
          console.log('Error getting documents: ', error);
      });    
  }

  login() {
    auth.signInWithPopup(provider)
      .then((result) => {
        const { user } = result;
        this.storeData(user)
      });
  }

  render() {
    return (
        <Button type="button" ctaType="primary" events={
          {
            onClick:(e) => {
              e.preventDefault();
              this.login()
            }
          }
        }>
          Sign-up Width Google
        </Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Logout);

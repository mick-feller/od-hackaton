import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase, { auth, provider } from 'firebase/firebase';
import './Login.scss';

class Logout extends React.Component {
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
    console.log(userData);
    /* @TODO: set in redux store */
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

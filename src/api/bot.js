import firebase from 'firebase/firebase';

class DBConnection {
  constructor() {
    const db = firebase.firestore();
    db.settings({
      timestampsInSnapshots: true
    });

    this.dbCollection = db.collection('users');
  }

  createQuery(email) {
    return this.dbCollection.where('userid', '==', email);
  }

  storeInRedux(userData) {
    console.log(userData);
    /* @TODO: set in redux store */
  }

  storeData(question, answer) {
    this.createQuery('mick.feller@gmail.com').get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const db = firebase.firestore();
          db.collection('users').doc(doc.id).set({
            questions: firebase.firestore.FieldValue.arrayUnion({
              question: question,
              answer: answer
            })
          }, { merge: true });
        });
      })
      .catch((error) => {
          console.log('Error getting documents: ', error);
      });    
  }
}

const processResponse = (response) => {
  return response.map((item) => {
    return {
      name: item.name,
      type: item.type
    }
  });
};

export const question = (question) => {
  const db = new DBConnection();
  return new Promise((resolve) => {
    fetch(`https://us-central1-od-hackaton.cloudfunctions.net/ml?text=${question}`,{
      credentials: 'same-origin',
      method: 'GET'
    }).then((response) => {
      return response.json();
    }).then((response) => {
      const formattedResponse = processResponse(response);

      db.storeData(question, formattedResponse);

      resolve({
        answer: formattedResponse
      })
    });
  })
} 
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import * as serviceWorker from './serviceWorker';
import 'semantic-ui-css/semantic.min.css'

import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyD8O78xVGclD89yOdKjwc2Ff00MgcZfjSo",
  authDomain: "venturedb-f74f4.firebaseapp.com",
  databaseURL: "https://venturedb-f74f4.firebaseio.com",
  projectId: "venturedb-f74f4",
  storageBucket: "venturedb-f74f4.appspot.com",
  messagingSenderId: "208134622090",
  appId: "1:208134622090:web:db9523081e5bb661585673",
  measurementId: "G-KGBSLSF7DS"
};

export const fbapp = firebase.initializeApp(firebaseConfig);



firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    firebase.auth().currentUser.getIdToken(true)
      .then(token => {
        window.user = user
        window.uid = user.uid
        window.token = `Bearer ${token}`
      })
    // ...
  }
  else {
    console.log(user);
    window.user = null
    window.uid = null
    window.token = null
  }
});


ReactDOM.render(
  <App />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

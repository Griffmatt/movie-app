import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDz37lh31rWWGmF5tnbAgtjr3S7Nqu9Bnw",
    authDomain: "movie-review-netflix-style.firebaseapp.com",
    projectId: "movie-review-netflix-style",
    storageBucket: "movie-review-netflix-style.appspot.com",
    messagingSenderId: "680986776315",
    appId: "1:680986776315:web:a6a09653cd0607898b965e",
    measurementId: "G-3XLQ4DSZKH"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebaseApp.auth();
const db = firebaseApp.firestore();



export { auth };
export default db;
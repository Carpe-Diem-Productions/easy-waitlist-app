import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGWQjgeoiIMJ9OWC055u7sowyKy9o3gCQ",
  authDomain: "easy-waitlist.firebaseapp.com",
  databaseURL: "https://easy-waitlist-default-rtdb.firebaseio.com",
  projectId: "easy-waitlist",
  storageBucket: "easy-waitlist.appspot.com",
  messagingSenderId: "681742178576",
  appId: "1:681742178576:web:d2a5b0764aacd381bf6d95",
  measurementId: "G-38CSHK03N0",
};

firebase.initializeApp(firebaseConfig);

export default firebase;

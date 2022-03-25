import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBGSo8LPok2S6BavxeEzXKl9JEr0HvW6iA",
  authDomain: "finance-tracker-3ea88.firebaseapp.com",
  projectId: "finance-tracker-3ea88",
  storageBucket: "finance-tracker-3ea88.appspot.com",
  messagingSenderId: "506612726324",
  appId: "1:506612726324:web:b6757cecf33cea7786e861",
};

firebase.initializeApp(firebaseConfig);

const financeFirestore = firebase.firestore();
const financeAuth = firebase.auth();

const timestamp = firebase.firestore.Timestamp;

export { financeFirestore, financeAuth, timestamp };

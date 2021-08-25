import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA_zqyAb5wbrUILilRHJcByyLFqrqsOyvg",
  authDomain: "quicksnap-58e9a.firebaseapp.com",
  projectId: "quicksnap-58e9a",
  storageBucket: "quicksnap-58e9a.appspot.com",
  messagingSenderId: "1053191696710",
  appId: "1:1053191696710:web:517e270876599b24587547",
  measurementId: "G-3LCVBTMFYY",
};

firebase.initializeApp(firebaseConfig);
// firebase.analytics(); TODO: Re-enable analytics

const auth = firebase.auth();
const firestore = firebase.firestore();

export { auth, firestore };
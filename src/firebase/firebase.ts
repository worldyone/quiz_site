import firebase from "firebase/app";
import "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyA__nrC3lJ3emYNnt9SGh5ExQ3uQR5mR-c",
    authDomain: "quiz-site-ce799.firebaseapp.com",
    projectId: "quiz-site-ce799",
    storageBucket: "quiz-site-ce799.appspot.com",
    messagingSenderId: "637821761471",
    appId: "1:637821761471:web:1127822ecfe4c314e9530a"
});

export const db = firebaseApp.firestore();
export const auth = firebase.auth();

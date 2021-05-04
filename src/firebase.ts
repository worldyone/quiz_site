import firebase from "firebase/app";
import "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCNUysQz5DALgLiIc_dfpXuFCQ7axNOMLc",
    // apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
    authDomain: "udemy-todo-b7ad6.firebaseapp.com",
    // authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
    databaseURL: "https://udemy-todo-b7ad6.firebaseio.com",
    // databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
    projectId: "udemy-todo-b7ad6",
    // projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: "udemy-todo-b7ad6.appspot.com",
    // storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: "913344749301",
    // messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
    appId: "1:913344749301:web:192f5694e8a1dc408aafbc"
    // appId: process.env.REACT_APP_FIREBASE_APP_ID,
});

export const db = firebaseApp.firestore();
export const auth = firebase.auth();

/**
 * firebase初期化ファイル
 */
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCH10tVePTIfywA_EdwiZnyJEM3gWaP8D8",
  authDomain: "harunbu-dev.firebaseapp.com",
  databaseURL: "https://harunbu-dev.firebaseio.com",
  projectId: "harunbu-dev",
  storageBucket: "harunbu-dev.appspot.com",
  messagingSenderId: "567756684294",
  appId: "1:567756684294:web:0c6f298e05203f33755787",
  measurementId: "G-1S4ENHLTEX"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const provider = new firebase.auth.GoogleAuthProvider();

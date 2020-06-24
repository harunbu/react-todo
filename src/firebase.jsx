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

const db = firebase.firestore();

export const provider = new firebase.auth.GoogleAuthProvider();

export function addTask(userId, task) {
  db.collection('users').doc(userId).collection('tasks').add({
    value: task,
    created: firebase.firestore.Timestamp.fromDate(new Date()),
  })
  .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
  })
  .catch(function(error) {
      console.error("Error adding document: ", error);
  });
}

export function getTask(userId, callBack) {
  var colRef = db.collection('users').doc(userId).collection('tasks').orderBy('created');
  colRef.onSnapshot((querySnapshot) => {
    let docs = [];
    querySnapshot.forEach(function(doc) {
      docs.push(doc.data());
    });
    callBack(docs);
  })
}
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

/**
 * タスクを追加する
 * @param userId 
 * @param task 
 */
export function addTask(userId, task) {
  db.collection('users').doc(userId).collection('tasks').add({
    value: task,
    created_at: firebase.firestore.FieldValue.serverTimestamp(),
    modified_at:  firebase.firestore.FieldValue.serverTimestamp(),
    list: 'main',
  })
  .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
  })
  .catch(function(error) {
      console.error("Error adding document: ", error);
  });
}

/**
 * タスクを削除する（アーカイブに入れる）
 * @param userId 
 * @param taskId 
 */
export function deleteTask(userId, taskId) {
  db.collection('users').doc(userId).collection('tasks').doc(taskId).update({
    list: 'archived',
  }).then(() => {
    console.log('delete success. ' + taskId);
  }).catch(() => {
    console.log('delete failure. ' + taskId);
  });
}

let unsubscribeFunction = null;
let onSnapshotHandler = null;

/**
 * タスクリストのデータが更新された際のコールバックを指定する
 * @param callback 
 */
export function onSnapshot(callback) {
  onSnapshotHandler = callback;
}

/**
 * タスクリストを購読する
 * @param userId 
 * @param list
 */
export function subscribe(userId, list) {
  var colRef = db.collection('users').doc(userId).collection('tasks').where('list', '==', list).orderBy('created_at');
  //すでに別の購読をしていた場合は解除する
  if (unsubscribeFunction) {
    unsubscribeFunction();
    unsubscribeFunction = null;
  }
  return new Promise((resolve, reject) => {
    unsubscribeFunction = colRef.onSnapshot((querySnapshot) => {
      let docs = [];
      querySnapshot.forEach(function(doc) {
        docs.push(Object.assign(doc.data(), {
          id: doc.id,
        }));
      });
      onSnapshotHandler && onSnapshotHandler(docs);
      resolve();
    })
  });
}

/**
 * タスクリストのサブスクライブを解除する
 */
export function unsubscribe() {
  if (unsubscribeFunction) {
    unsubscribeFunction();
    unsubscribeFunction = null;
  }
}

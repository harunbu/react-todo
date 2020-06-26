import * as firebase from 'firebase/app';
import { provider } from './firebase.jsx';

/**
 * ログイン
 */
export function signIn() {
  firebase.auth().signInWithRedirect(provider);
}

/**
 * ログアウト
 */
export function signOut () {
  firebase.auth().signOut();
}

/**
 * ログイン状態が変わった際のリスナを登録
 * @param callback 
 */
export function onAuthStateChanged(callback) {
  firebase.auth().onAuthStateChanged(callback);
}

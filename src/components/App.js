import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { MenuBar } from './MenuBar.jsx'
import { Toolbar, Card } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { InputForm } from './InputForm.jsx'
import { TodoList } from './TodoList.jsx'
import { connect } from 'react-redux';
import { increament, endLoading } from '../actions.js';

// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
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

const provider = new firebase.auth.GoogleAuthProvider();



/**
 * ログイン画面
 */
const Login = (props) => {
  if (props.user) {
    props.history.push('/');
  }
  return <Button variant="contained" onClick={props.onClickLogin}>ログイン</Button>
}

/**
 * ホーム画面
 */
class Home extends React.Component {
  constructor(props) {
    super(props);
    if (! props.user) {
      props.history.push('/login');
    }
    this.state = {
      user: props.user,
      todoList: [],
      isSignined: true,
    };
    this.onClickLogout = this.props.onClickLogout;
    this.handleClickAddTask = this.handleClickAddTask.bind(this);
  }
  handleClickAddTask(task) {
    const todoList = this.state.todoList;
    this.setState({
      todoList: todoList.concat([task]),
    });
  }
  render() {
    return (
      <Container maxWidth="sm">
        <Box py={2}>
          <InputForm onClickAddTask={this.handleClickAddTask} />
        </Box>
        <TodoList todoList={this.state.todoList} />
        <Button variant="contained" onClick={this.onClickLogout}>ログアウト</Button>
      </Container>
    );
  }
}

class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        user: null,
      };
      this.componentDidMount = this.componentDidMount.bind(this);
    }
    componentDidMount() {
      firebase.auth().onAuthStateChanged(user => {
        this.setState({
          user: user,
        });
        this.props.endLoading();
      });
      this.logout = this.logout.bind(this);
    }
    login() {
      firebase.auth().signInWithRedirect(provider);
    }
    logout() {
      firebase.auth().signOut();
    }
    render() {
      if (this.props.isLoading) {
        return (
          <span>ロード中...</span>
        );
      }
      const user = this.state.user;
      return (
        <React.Fragment>
          <Router>
            <CssBaseline />
            {/* メニューバー */}
            <MenuBar />
            <Toolbar />

            <Switch>
              {/* ログイン画面 */}
              <Route path="/login" render={(props) => <Login onClickLogin={this.login} user={user} {...props} />} />
              {/* ホーム画面 */}
              <Route path="/"      render={(props) => <Home onClickLogout={this.logout} user={user} {...props} />} />
            </Switch>
          </Router>
          <Button onClick={() => this.props.dispatchIncreament(1)}>カウントアップ</Button>
          <Box>{this.props.value}</Box>
        </React.Fragment>
      );
    }
  }

export default connect(
  state => ({isLoading: state.isLoading, value: state.value}),
  dispatch => ({
    dispatchIncreament: amount => dispatch(increament(amount)),
    endLoading: () => dispatch(endLoading()),
  }),
)(App);
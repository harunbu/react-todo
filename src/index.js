import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import { MenuBar } from './components/MenuBar.jsx'
import { Toolbar } from '@material-ui/core';

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

var provider = new firebase.auth.GoogleAuthProvider();

class InputForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleClick() {
    this.props.onClickAddTask(this.state.value);
    this.setState({value:''});
  }
  handleChange(event) {
    this.setState({value:event.target.value});
  }
  render() {
    return (
      <Card elevation={3}>
        <CardContent>
          <Box display="flex" alignItems="center">
            <Box gbcolor="gray.300" flexGrow={1}>
              <TextField fullWidth id="standard-basic" label="タスクの内容を入力"
                value={this.state.value}
                onChange={this.handleChange}
              />
            </Box>
            <Button variant="contained" onClick={this.handleClick}>タスク追加</Button>
          </Box>
        </CardContent>
      </Card>
    );
  }
}

function TodoList(props) {
  const todoList = props.todoList.map((todo, index) => {
    return (
      <Box mb={1} key={index}>
        <Card elevation={3}>
          <CardContent>
            {todo}
          </CardContent>
        </Card>
      </Box>
    );
  });
  return (
    <React.Fragment>
      {todoList}
    </React.Fragment>
  );
}

class LoginButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isLogin: false,
    };
    this.logout = this.logout.bind(this);
  }
  logout() {
    firebase.auth().signOut();
    this.setState({
      isLoading: true,
    });
  }
  login() {
    firebase.auth().signInWithRedirect(provider);
  }
  componentDidMount () {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({
        isLoading: false,
      });
      if (user) {
        this.setState({
          isLogin: true,
        });
      } else {
        this.setState({
          isLogin: false,
        });
      }
    });
  }
  render() {
    if (this.state.isLoading) {
      return <Box>ログイン状態確認中...</Box>;
    }
    if (this.state.isLogin){
      return <Button variant="contained" onClick={this.logout}>ログアウト</Button>;
    }
    return <Button variant="contained" onClick={this.login}>ログイン</Button>;
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: [],
    };
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
      <React.Fragment>
        <CssBaseline />
        {/* メニューバー */}
        <MenuBar />
        <Toolbar />

        {/* ToDoList */}
        <Container maxWidth="sm">
          <Box py={2}>
            <InputForm onClickAddTask={this.handleClickAddTask} />
          </Box>
          <TodoList todoList={this.state.todoList} />
        </Container>
        <LoginButton />
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#app'));
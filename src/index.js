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
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

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
      isLoading: true,
      user: null,
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({
        user: user,
        isLoading: false,
      });
    });
    this.logout = this.logout.bind(this);
  }
  login() {
    firebase.auth().signInWithRedirect(provider);
  }
  logout() {
    firebase.auth().signOut();
    this.setState({
      isLoading: true,
    });
  }
  render() {
    if (this.state.isLoading) {
      return <span>ロード中...</span>
    }
    const user = this.state.user;
    return (
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
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#app'));
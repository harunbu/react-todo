import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

//MaterilUI
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

//自前コンポーネント
import Login from './Login.jsx';
import Home from './Home.jsx';
import MenuBar from './MenuBar.jsx'

//redux関係
import { connect } from 'react-redux';
import * as actions from '../actions.js';

//firebase関連
import * as firebase from 'firebase/app';
import { provider } from '../firebase.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.logout = this.logout.bind(this);
    this.addTask = this.addTask.bind(this);
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.props.setUser(user);
      this.props.endLoading();
    });
  }
  login() {
    firebase.auth().signInWithRedirect(provider);
  }
  logout() {
    firebase.auth().signOut();
  }
  addTask(task) {
    this.props.addTask(task);
  }
  render() {
    console.log('App rendered');
    if (this.props.isLoading) {
      return (
        <span>ロード中...</span>
      );
    }
    const user = this.props.user;
    return (
      <React.Fragment>
        <Router>
          <CssBaseline />
          {/* メニューバー */}
          <MenuBar />

          <Switch>
            {/* ログイン画面 */}
            <Route path="/login" render={(props) => <Login onClickLogin={this.login} user={user} {...props} />} />
            {/* ホーム画面 */}
            <Route path="/"      render={(props) => <Home onClickLogout={this.logout} user={user} addTask={this.addTask} {...props} />} />
          </Switch>
        </Router>
        <Button onClick={() => this.props.dispatchIncreament(1)}>カウントアップ</Button>
        <Box>{this.props.value}</Box>
      </React.Fragment>
    );
  }
}

export default connect(
  state => ({
    isLoading: state.isLoading,
    value: state.value,
    user: state.user
  }),
  dispatch => ({
    dispatchIncreament: amount => dispatch(actions.increament(amount)),
    endLoading: () => dispatch(actions.endLoading()),
    setUser: (user) => dispatch(actions.setUser(user)),
    addTask: task => dispatch(actions.addTask(task)),
  }),
)(App);

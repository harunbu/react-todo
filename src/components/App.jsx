import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

//MaterilUI
import CssBaseline from '@material-ui/core/CssBaseline';

//自前コンポーネント
import Login from './Login.jsx';
import Home from './Home.jsx';
import MenuBar from './MenuBar.jsx';

//redux関係
import { connect } from 'react-redux';
import * as actions from '../actions.js';

//firebase関連
import * as firebase from 'firebase/app';
import { provider, getTask, unsubscribe } from '../firebase.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.logout = this.logout.bind(this);
    this.changeMode = this.changeMode.bind(this);
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.props.setUser(user);
      if (user) {
        getTask(user.uid, 'main', (docs) => {
          this.props.initTasks(docs);
          this.props.endLoading();
        });
      } else {
        this.props.endLoading();
      }
    });
  }
  login() {
    firebase.auth().signInWithRedirect(provider);
  }
  logout() {
    unsubscribe();
    firebase.auth().signOut();
  }
  changeMode() {
    const nextMode = this.props.mode === 'main' ? 'archived' : 'main';
    this.props.changeMode(nextMode);
    
    getTask(this.props.user.uid, nextMode, (docs) => {
      this.props.initTasks(docs);
    });
  }
  render() {
    if (this.props.isLoading) {
      return (
        <span>ロード中...</span>
      );
    }
    const user = this.props.user;
    return (
      <Router>
        <CssBaseline />
        {/* メニューバー */}
        <MenuBar onClickLogout={this.logout} />

        <Switch>
          {/* ログイン画面 */}
          <Route path="/login" render={(props) => <Login onClickLogin={this.login} user={user} {...props} />} />
          {/* ホーム画面 */}
          <Route path="/"      render={(props) => {
            return <Home user={user} onClickChangeMode={this.changeMode} {...props} />
          }} />
        </Switch>
      </Router>
    );
  }
}

export default connect(
  state => ({
    isLoading: state.isLoading,
    value: state.value,
    user: state.user,
    mode: state.mode,
  }),
  dispatch => ({
    endLoading: () => dispatch(actions.endLoading()),
    setUser: (user) => dispatch(actions.setUser(user)),
    initTasks: (tasks) => dispatch(actions.initTasks(tasks)),
    changeMode: (mode) => dispatch(actions.changeMode(mode)),
  }),
)(App);

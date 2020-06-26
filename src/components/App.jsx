import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

//MaterilUI
import CssBaseline from '@material-ui/core/CssBaseline';
import LinearProgress from '@material-ui/core/LinearProgress';

//自前コンポーネント
import Login from './Login.jsx';
import Home from './Home.jsx';
import MenuBar from './MenuBar.jsx';

//redux関係
import { connect } from 'react-redux';
import * as actions from '../actions.js';

//firebase関連
import * as auth from '../auth';
import * as firebase from '../firebase.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.logout = this.logout.bind(this);
    this.changeMode = this.changeMode.bind(this);
  }
  componentDidMount() {
    auth.onAuthStateChanged(user => {
      this.props.setUser(user);
      if (user) {
        //タスクリストをfirestoreから購読する（更新を同期する）
        firebase.onSnapshot(this.props.updateTasks);
        firebase.subscribe(user.uid, 'main').then(() => this.props.endLoading());
      } else {
        this.props.endLoading();
      }
    });
  }
  login() {
    auth.signIn();
  }
  logout() {
    firebase.unsubscribe();
    auth.signOut();
  }
  changeMode() {
    const nextMode = this.props.mode === 'main' ? 'archived' : 'main';
    this.props.changeMode(nextMode);
    
    firebase.subscribe(this.props.user.uid, nextMode);
  }
  render() {
    if (this.props.isLoading) {
      return (
        <React.Fragment>
          <CssBaseline />
          <LinearProgress />
        </React.Fragment>
      );
    }
    const user = this.props.user;
    return (
      <Router>
        <CssBaseline />
        {/* メニューバー */}
        <MenuBar logout={this.logout} />

        <Switch>
          {/* ログイン画面 */}
          <Route path="/login" render={(props) => <Login onClickLogin={this.login} {...props} />} />
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
    updateTasks: (tasks) => dispatch(actions.updateTasks(tasks)),
    changeMode: (mode) => dispatch(actions.changeMode(mode)),
  }),
)(App);

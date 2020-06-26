/**
 * ログイン画面コンポーネント
 */

import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import * as auth from '../auth';

function Login(props) {
  if (props.user) {
    return <Redirect to="/"></Redirect>
  }
  return (
    <Container maxWidth="sm">
      <IconButton aria-label="login" onClick={auth.signIn} m="auto">
        <img src="/images/btn_google_signin_light_normal_web.png"></img>
      </IconButton>
    </Container>
  );
}

export default connect(
  state => ({
    user: state.user
  }),
  dispatch => ({
  })
)(Login);

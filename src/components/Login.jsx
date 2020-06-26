/**
 * ログイン画面コンポーネント
 */

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../actions.js';
import { Redirect } from "react-router-dom";
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/Button';
import * as auth from '../auth';

export default function Login(props) {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  if (user) {
    return <Redirect to="/"></Redirect>
  }
  const googleLogin = () => {
    dispatch(actions.startLoading());
    auth.signIn();
  };
  return (
    <Container maxWidth="sm">
      <IconButton aria-label="login" onClick={googleLogin}>
        <img src="/images/btn_google_signin_light_normal_web.png"></img>
      </IconButton>
    </Container>
  );
};

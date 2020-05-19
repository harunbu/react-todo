/**
 * ログイン画面コンポーネント
 */

import React from 'react';
import { Redirect } from "react-router-dom";
import Button from '@material-ui/core/Button';

const Login = (props) => {
  if (props.user) {
    return <Redirect to="/"></Redirect>
  }
  return <Button variant="contained" onClick={props.onClickLogin}>ログイン</Button>
}

export default Login;

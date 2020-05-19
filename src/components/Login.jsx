/**
 * ログイン画面コンポーネント
 */

import React from 'react';
import Button from '@material-ui/core/Button';

const Login = (props) => {
  if (props.user) {
    props.history.push('/');
  }
  return <Button variant="contained" onClick={props.onClickLogin}>ログイン</Button>
}

export default Login;

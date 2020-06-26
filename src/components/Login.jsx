/**
 * ログイン画面コンポーネント
 */

import React from 'react';
import { Redirect } from "react-router-dom";
import Container from '@material-ui/core/Container';

export default function Login(props) {
  if (props.user) {
    return <Redirect to="/"></Redirect>
  }
  return (
    <Container maxWidth="sm">
      <p>ログインしてください！</p>
    </Container>
  );
}

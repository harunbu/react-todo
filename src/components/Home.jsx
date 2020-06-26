/**
 * ホーム画面
 */

import React from 'react';
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import InputForm from './InputForm.jsx';
import TaskList from './TaskList.jsx';

export default function Home(props) {
  const tasks = useSelector(state => state.tasks);
  const user = useSelector(state => state.user);
  if (! user) {
    return <Redirect to="/login"></Redirect>
  }
  return (
    <Container maxWidth="sm">
      <InputForm />
      <TaskList tasks={tasks} />
      <Button variant="contained" onClick={props.onClickChangeMode}>モード切替</Button>
    </Container>
  );
}

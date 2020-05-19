/**
 * ホーム画面
 */

import React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import InputForm from './InputForm.jsx';
import TodoList from './TodoList.jsx';

//redux関係
import { connect } from 'react-redux';
import * as actions from '../actions.js';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickAddTask = this.handleClickAddTask.bind(this);
  }
  handleClickAddTask(task) {
    this.props.addTask(task);
  }
  componentDidUpdate() {
    if (! this.props.user) {
      this.props.history.push('/login');
    }
  }
  render() {
    return (
      <Container maxWidth="sm">
        <Box py={2}>
          <InputForm onClickAddTask={this.handleClickAddTask} />
        </Box>
        <TodoList todoList={this.props.todoList} />
        <Button variant="contained" onClick={this.props.onClickLogout}>ログアウト</Button>
      </Container>
    );
  }
}

export default connect(
  state => ({todoList: state.todoList}),
  dispatch => ({addTask: task => dispatch(actions.addTask(task))})
)(Home);

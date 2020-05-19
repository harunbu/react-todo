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

class Home extends React.Component {
  componentDidUpdate() {
    if (! this.props.user) {
      this.props.history.push('/login');
    }
  }
  render() {
    return (
      <Container maxWidth="sm">
        <Box py={2}>
          <InputForm onClickAddTask={this.props.addTask} />
        </Box>
        <TodoList todoList={this.props.todoList} />
        <Button variant="contained" onClick={this.props.onClickLogout}>ログアウト</Button>
      </Container>
    );
  }
}

export default connect(
  state => ({todoList: state.todoList}),
  null
)(Home);

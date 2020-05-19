/**
 * ホーム画面
 */

import React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import InputForm from './InputForm.jsx';
import TodoList from './TodoList.jsx';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: [],
    };
    this.handleClickAddTask = this.handleClickAddTask.bind(this);
  }
  handleClickAddTask(task) {
    const todoList = this.state.todoList;
    this.setState({
      todoList: todoList.concat([task]),
    });
  }
  componentDidUpdate() {
    if (! this.props.user) {
      this.props.history.push('/login');
    }
  }
  render() {
    console.log('Home rendered');
    return (
      <Container maxWidth="sm">
        <Box py={2}>
          <InputForm onClickAddTask={this.handleClickAddTask} />
        </Box>
        <TodoList todoList={this.state.todoList} />
        <Button variant="contained" onClick={this.props.onClickLogout}>ログアウト</Button>
      </Container>
    );
  }
}

export default Home;

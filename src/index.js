import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import { MenuBar } from './components/MenuBar.jsx'
import { Toolbar } from '@material-ui/core';
import { spacing } from '@material-ui/system';

class InputForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleClick() {
    this.props.onClickAddTask(this.state.value);
    this.setState({value:''});
  }
  handleChange(event) {
    this.setState({value:event.target.value});
  }
  render() {
    return (
      <Card elevation={3}>
        <CardContent>
          <Box display="flex" alignItems="center">
            <Box gbcolor="gray.300" flexGrow={1}>
              <TextField fullWidth id="standard-basic" label="タスクの内容を入力"
                value={this.state.value}
                onChange={this.handleChange}
              />
            </Box>
            <Button variant="contained" onClick={this.handleClick}>タスク追加</Button>
          </Box>
        </CardContent>
      </Card>
    );
  }
}

function TodoList(props) {
  const todoList = props.todoList.map((todo, index) => {
    return (
      <Box mb={1}>
        <Card elevation={3}>
          <CardContent>
            {todo}
          </CardContent>
        </Card>
      </Box>
    );
  });
  return (
    <React.Fragment>
      {todoList}
    </React.Fragment>
  );
}

class App extends React.Component {
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
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        {/* メニューバー */}
        <MenuBar />
        <Toolbar />

        {/* ToDoList */}
        <Container maxWidth="sm">
          <Box py={2}>
            <InputForm onClickAddTask={this.handleClickAddTask} />
          </Box>
          <TodoList todoList={this.state.todoList} />
        </Container>
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#app'));
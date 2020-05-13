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

function InputForm(props) {
  return (
    <Card elevation={3}>
      <CardContent>
        <Box display="flex" alignItems="center">
          <Box gbcolor="gray.300" flexGrow={1}>
            <TextField fullWidth id="standard-basic" label="タスクの内容を入力" />
          </Box>
          <Button variant="contained">タスク追加</Button>
        </Box>
      </CardContent>
    </Card>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  handleButtonClick() {
    alert('click!');
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
          <Box p={2}>
            <InputForm />
          </Box>
        </Container>
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#app'));
import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export class InputForm extends React.Component {
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
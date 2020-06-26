/**
 * Todoリストコンポーネント
 */
import React from 'react';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Box from '@material-ui/core/Box';
import { useSelector } from "react-redux";

import { deleteTask } from '../firebase.jsx';

function TodoList(props) {
  const tasks = useSelector(state => state.tasks);
  const todoListDom = tasks.map((todo) => {
    return (
    <Box mb={1} key={todo.id}>
      <Card elevation={3}>
        <CardContent>
            {todo.value}
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="delete" onClick={() => deleteTask(props.user.uid, todo.id)}>
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Box>
    );
  });
  return (
    <React.Fragment>
      {todoListDom}
    </React.Fragment>
  );
}

export default connect(
  state => ({
    user: state.user
  }),
  dispatch => ({
  })
)(TodoList);

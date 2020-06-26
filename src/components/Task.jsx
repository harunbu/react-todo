/**
 * Taskコンポーネント
 */
import React from 'react';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import * as firebase from '../firebase.jsx';
import { useSelector } from "react-redux";

export default function(props){
  const user = useSelector(state => state.user);
  return (
    <Box mb={1}>
      <Card elevation={3}>
        <CardContent>
            {props.task.value}
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="delete" onClick={() => firebase.deleteTask(user.uid, props.task.id)}>
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Box>
  );
}

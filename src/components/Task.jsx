import React from 'react';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

export default function(props){
  return (
    <Box mb={1}>
      <Card elevation={3}>
        <CardContent>
            {props.task.value}
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="delete" onClick={() => props.onClickDeleteTask(props.task.id)}>
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Box>
  );
}

import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';

export function TodoList(props) {
  const todoList = props.todoList.map((todo, index) => {
    return (
    <Box mb={1} key={index}>
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
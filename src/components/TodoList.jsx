/**
 * Todoリストコンポーネント
 */
import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import { useSelector } from "react-redux";

export default function TodoList(props) {
  const todoList = useSelector(state => state.todoList);
  const todoListDom = todoList.map((todo, index) => {
    return (
    <Box mb={1} key={index}>
      <Card elevation={3}>
        <CardContent>
            {todo.value}
        </CardContent>
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

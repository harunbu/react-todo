/**
 * TaskListコンポーネント
 */
import React from 'react';
import { useSelector } from "react-redux";
import * as firebase from '../firebase.jsx';
import Task from './Task';

export default function TaskList(props) {
  const user = useSelector(state => state.user);
  const tasks = useSelector(state => state.tasks);
  const deleteTask = function(taskId) {
    firebase.deleteTask(user.uid, taskId);
  };
  const todoListDom = tasks.map((task) => {
    return <Task task={task} onClickDeleteTask={deleteTask} key={task.id} />
  });
  return (
    <React.Fragment>
      {todoListDom}
    </React.Fragment>
  );
}

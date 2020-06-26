/**
 * TaskListコンポーネント
 */
import React from 'react';
import Task from './Task';

export default function TaskList(props) {
  const todoListDom = props.tasks.map((task) => {
    return <Task task={task} key={task.id} />
  });
  return (
    <React.Fragment>
      {todoListDom}
    </React.Fragment>
  );
}

import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ tasks, toggleTaskStatus, deleteTask }) => {
  return (
    <div className="tasks">
      {tasks.map(task => (
        <TodoItem
          key={task.id}
          task={task}
          toggleTaskStatus={toggleTaskStatus}
          deleteTask={deleteTask}
        />
      ))}
    </div>
  );
};

export default TodoList;

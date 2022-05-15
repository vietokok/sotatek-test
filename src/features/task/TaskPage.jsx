import React from 'react';
import AddNewTask from './components/AddNewTask';
import TaskList from './components/TaskList';

export default function TaskPage() {
  return (
    <div className="container">
      <div className="left-panel">
        <AddNewTask />
      </div>
      <div className="right-panel">
        <TaskList />
      </div>
    </div>
  );
}

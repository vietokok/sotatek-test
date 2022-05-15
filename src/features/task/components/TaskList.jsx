import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeTasks, selectTasks } from '../taskSlice';
import TashItem from './TaskItem';

export default function TaskList() {
  const dispatch = useDispatch();

  const [searchFilter, setSearchFilter] = useState('');

  const tasks = useSelector(selectTasks(searchFilter));
  const checkedTasks = useSelector((state) => {
    return state.task.taskList.filter((task) => task.checked === true);
  });

  const handleSearchChange = (e) => {
    setSearchFilter(e.target.value);
  };

  const handleRemoveBulkAction = () => {
    dispatch(removeTasks());
  };

  return (
    <div className="h-100 d-flex flex-column">
      <div className="task-list">
        <div className="panel-title">To Do List</div>
        <div className="w-100 mb-2">
          <div className="mb-2">
            <input
              className="w-100"
              placeholder="Search..."
              value={searchFilter}
              onChange={(e) => handleSearchChange(e)}
            />
          </div>
          {tasks.length > 0 ? (
            tasks.map((task) => <TashItem key={task.id} task={task} />)
          ) : (
            <div>Task not found</div>
          )}
        </div>
      </div>
      {checkedTasks.length > 0 && (
        <div className="bulk-panel">
          <div className="bulk-panel-grid">
            <div className="bulk-title">Bulk Action:</div>
            <button className="bulk-done-btn">Done</button>
            <button
              className="bulk-remove-btn"
              onClick={handleRemoveBulkAction}
            >
              Remove
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

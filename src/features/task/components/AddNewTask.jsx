import moment from 'moment';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { addTask } from '../taskSlice';

export default function AddNewTask() {
  const dispatch = useDispatch();
  const [newTask, setNewTask] = useState({
    id: uuid(),
    title: '',
    description: '',
    dueDate: moment().format('YYYY-MM-DD'),
    priority: 'normal',
    checked: false,
  });

  const handleInputChange = (e) => {
    setNewTask((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleAddNewTask = (e) => {
    e.preventDefault();
    dispatch(addTask(newTask));
    setNewTask((prevState) => {
      return {
        ...prevState,
        id: uuid(),
        title: '',
        description: '',
        dueDate: moment().format('YYYY-MM-DD'),
        priority: 'normal',
      };
    });
  };

  return (
    <React.Fragment>
      <div className="panel-title">New Task</div>
      <form className="w-100" onSubmit={(e) => handleAddNewTask(e)}>
        <div className="mb-2">
          <input
            required
            className="w-100"
            name="title"
            value={newTask.title}
            onChange={(e) => handleInputChange(e)}
            placeholder="Add new task..."
          />
        </div>
        <div className="mb-2">
          <label>Description</label>
          <textarea
            className="w-100"
            name="description"
            value={newTask.description}
            onChange={(e) => handleInputChange(e)}
            rows={10}
          />
        </div>
        <div className="d-flex mb-4">
          <div className="w-50">
            <label>Due Date</label>
            <input
              className="w-100"
              name="dueDate"
              value={newTask.dueDate}
              min={moment().format('YYYY-MM-DD')}
              onChange={(e) => handleInputChange(e)}
              type="date"
            />
          </div>
          <div className="w-50 pl-2">
            <label>Priorty:</label>
            <select
              className="w-100"
              name="priority"
              value={newTask.priority}
              onChange={(e) => handleInputChange(e)}
            >
              <option value="low">Low</option>
              <option value="normal">Normal</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
        <div>
          <button type="submit" className="submit-btn">
            Add
          </button>
        </div>
      </form>
    </React.Fragment>
  );
}

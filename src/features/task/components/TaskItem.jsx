import moment from 'moment';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editTask, removeTask, setCheckedTask } from '../taskSlice';

export default function TashItem({ task }) {
  const [openDetail, setOpenDetail] = useState(false);
  const [taskData, setTaskData] = useState({
    id: task.id,
    title: task.title,
    description: task.description,
    dueDate: task.dueDate,
    priority: task.priority,
    checked: task.checked,
  });
  const dispatch = useDispatch();

  const handleOpenTaskDetail = () => {
    setOpenDetail(!openDetail);
  };

  const handleRemoveTask = () => {
    dispatch(removeTask(task.id));
  };

  const handleEditTask = (e) => {
    e.preventDefault();
    const actionObj = {
      id: task.id,
      data: taskData,
    };
    dispatch(editTask(actionObj));
    setOpenDetail(false);
  };

  const handleInputChange = (e) => {
    setTaskData((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleCheckboxChange = (e) => {
    const actionObj = {
      id: task.id,
      checked: e.target.checked,
    };
    dispatch(setCheckedTask(actionObj));
  };

  return (
    <div className="mb-1">
      <div className="task-item">
        <input
          className="task-item-checkbox"
          type="checkbox"
          checked={task.checked}
          onChange={(e) => handleCheckboxChange(e)}
        />
        <div className="task-item-title">{task.title}</div>
        <button className="task-item-detail-btn" onClick={handleOpenTaskDetail}>
          Detail
        </button>
        <button className="task-item-remove-btn" onClick={handleRemoveTask}>
          Remove
        </button>
      </div>
      <div
        className="task-item-detail"
        style={{
          display: openDetail ? 'block' : 'none',
        }}
      >
        <form className="w-100" onSubmit={(e) => handleEditTask(e)}>
          <div className="mb-2">
            <input
              required
              className="w-100"
              name="title"
              value={taskData.title}
              onChange={(e) => handleInputChange(e)}
              placeholder="Add new task..."
            />
          </div>
          <div className="mb-2">
            <label>Description</label>
            <br />
            <textarea
              className="w-100"
              name="description"
              value={taskData.description}
              onChange={(e) => handleInputChange(e)}
              rows={10}
            />
          </div>
          <div className="d-flex mb-4">
            <div className="w-50">
              <label>Due Date</label>
              <br />
              <input
                className="w-100"
                name="dueDate"
                value={taskData.dueDate}
                min={moment().format('YYYY-MM-DD')}
                onChange={(e) => handleInputChange(e)}
                type="date"
              />
            </div>
            <div className="w-50 pl-2">
              <label>Priorty:</label>
              <br />
              <select
                className="w-100"
                name="priority"
                value={taskData.priority}
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
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

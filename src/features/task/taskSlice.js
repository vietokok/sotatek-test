import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  taskList:
    localStorage.getItem('taskList') !== null
      ? JSON.parse(localStorage.getItem('taskList'))
      : [],
};

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.taskList.push(action.payload);
      localStorage.setItem('taskList', JSON.stringify(state.taskList));
    },
    removeTask: (state, action) => {
      const index = state.taskList.findIndex(
        (task) => task.id === action.payload
      );
      state.taskList.splice(index, 1);
      localStorage.setItem('taskList', JSON.stringify(state.taskList));
    },
    removeTasks: (state) => {
      for (let i = 0; i < state.taskList.length; i++) {
        if (state.taskList[i].checked === true) {
          state.taskList.splice(i, 1);
          i--;
        }
      }

      localStorage.setItem('taskList', JSON.stringify(state.taskList));
    },
    editTask: (state, action) => {
      const index = state.taskList.findIndex(
        (task) => task.id === action.payload.id
      );
      state.taskList[index] = action.payload.data;

      localStorage.setItem('taskList', JSON.stringify(state.taskList));
    },
    setCheckedTask: (state, action) => {
      const index = state.taskList.findIndex(
        (task) => task.id === action.payload.id
      );
      state.taskList[index].checked = action.payload.checked;

      localStorage.setItem('taskList', JSON.stringify(state.taskList));
    },
  },
});

export const { addTask, removeTask, removeTasks, editTask, setCheckedTask } =
  taskSlice.actions;

export const selectTasks = (searchFilter) => (state) => {
  const searchValue = searchFilter.trim();
  if (!searchValue) {
    return state.task.taskList
      .slice()
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  } else {
    return state.task.taskList
      .filter((task) => task.title.includes(searchFilter))
      .slice()
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  }
};

export default taskSlice.reducer;

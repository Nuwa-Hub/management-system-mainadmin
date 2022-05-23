import { createSlice } from "@reduxjs/toolkit";

export const taskSlice = createSlice({
  name: "task",
  initialState: {
    tasks: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getTaskStart: (state) => {
      state.isFetching = true;
      state.tasks=[]
      state.error = false;
    },
    getTaskSuccess: (state, action) => {
      state.isFetching = false;
      state.tasks = action.payload;
      console.log(action.payload)
    },
    getTaskFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //DELETE
    deleteTaskStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteTaskSuccess: (state, action) => {
      state.isFetching = false;
      state.tasks.splice(
        state.tasks.findIndex((item) => item._id === action.payload),
        1
      );
    },
    deleteTaskFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    updateTaskStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateTaskSuccess: (state, action) => {
      state.isFetching = false;
      state.tasks[
        state.Tasks.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.Task;
    },
    updateTaskFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    addTaskStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addTaskSuccess: (state, action) => {
      state.isFetching = false;
      state.tasks.push(action.payload);
    },
    addTaskFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getTaskStart,
  getTaskSuccess,
  getTaskFailure,
  deleteTaskStart,
  deleteTaskSuccess,
  deleteTaskFailure,
  updateTaskStart,
  updateTaskSuccess,
  updateTaskFailure,
  addTaskStart,
  addTaskSuccess,
  addTaskFailure,
} = taskSlice.actions;

export default taskSlice.reducer;

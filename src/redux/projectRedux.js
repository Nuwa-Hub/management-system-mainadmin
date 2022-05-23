import { createSlice } from "@reduxjs/toolkit";

export const projectSlice = createSlice({
  name: "project",
  initialState: {
    projects: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getProjectStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getProjectSuccess: (state, action) => {
      state.isFetching = false;
      state.projects = action.payload;
    },
    getProjectFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //DELETE
    deleteProjectStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteProjectSuccess: (state, action) => {
      state.isFetching = false;
      state.projects.splice(
        state.projects.findIndex((item) => item._id === action.payload),
        1
      );
    },
    deleteProjectFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    updateProjectStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateProjectSuccess: (state, action) => {
      state.isFetching = false;
      state.projects[
        state.projects.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.project;
    },
    updateProjectFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    addProjectStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addProjectSuccess: (state, action) => {
      state.isFetching = false;
      state.projects.push(action.payload);
    },
    addProjectFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getProjectStart,
  getProjectSuccess,
  getProjectFailure,
  deleteProjectStart,
  deleteProjectSuccess,
  deleteProjectFailure,
  updateProjectStart,
  updateProjectSuccess,
  updateProjectFailure,
  addProjectStart,
  addProjectSuccess,
  addProjectFailure,
} = projectSlice.actions;

export default projectSlice.reducer;

import {
  changePasswordFailure,
  changePasswordStart,
  changePasswordSuccess,
  loginFailure,
  loginStart,
  loginSuccess,
  logout,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "./userRedux";
import { publicRequest, userRequest } from "../requestMethods";
import {
  getProjectFailure,
  getProjectStart,
  getProjectSuccess,
  deleteProjectFailure,
  deleteProjectStart,
  deleteProjectSuccess,
  updateProjectFailure,
  updateProjectStart,
  updateProjectSuccess,
  addProjectFailure,
  addProjectStart,
  addProjectSuccess,
} from "./projectRedux";
import {
  deleteDeveloperFailure,
  deleteDeveloperStart,
  deleteDeveloperSuccess,
  getDeveloperFailure,
  getDeveloperStart,
  getDeveloperSuccess,
  getManagerFailure,
  getManagerStart,
  getManagerSuccess,
  registerFailure,
  registerStart,
  registerSuccess,
  updateDeveloperFailure,
  updateDeveloperStart,
  updateDeveloperSuccess,
} from "./developerRedux";
import { getTaskFailure, getTaskStart, getTaskSuccess } from "./taskRedux";


//auth
export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    
    sessionStorage.setItem("accessToken", res.data.accessToken);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

//change password
export const changePassword = async (dispatch, data) => {
  dispatch(changePasswordStart());
  try {
    const res = await userRequest.post("/auth/changepassword", data);
    dispatch(changePasswordSuccess(res.data));
  } catch (err) {
    dispatch(changePasswordFailure());
  }
};

//update developer
export const updateCurrentUser = async (dispatch, user, id) => {
  dispatch(updateUserStart());
  try {
    const res = await userRequest.put(`/users/${id}`, user);
    console.log(res.data);
    dispatch(updateUserSuccess(res.data));
  } catch (err) {
    dispatch(updateUserFailure());
  }
};

export const logOut = async (dispatch) => {
  dispatch(logout());
};

//projects
export const getProjects = async (dispatch) => {
  dispatch(getProjectStart());
  try {
    const res = await userRequest.get("/projects");
    dispatch(getProjectSuccess(res.data));
  } catch (err) {
    dispatch(getProjectFailure());
  }
};

export const deleteProject = async (id, dispatch) => {
  dispatch(deleteProjectStart());
  try {
    // const res = await userRequest.delete(`/Projects/${id}`);
    dispatch(deleteProjectSuccess(id));
  } catch (err) {
    dispatch(deleteProjectFailure());
  }
};

export const updateProject = async (id, Project, dispatch) => {
  dispatch(updateProjectStart());
  try {
    // update
    dispatch(updateProjectSuccess({ id, Project }));
  } catch (err) {
    dispatch(updateProjectFailure());
  }
};
export const addProject = async (Project, dispatch) => {
  dispatch(addProjectStart());
  try {
    const res = await userRequest.post(`/Projects`, Project);
    dispatch(addProjectSuccess(res.data));
  } catch (err) {
    dispatch(addProjectFailure());
  }
};

// Developers

//GET ALL DEVELOPERS
export const getdevelopers = async (dispatch) => {
  dispatch(getDeveloperStart());
  try {
    const res = await userRequest.get("/users");

    dispatch(getDeveloperSuccess(res.data));
  } catch (err) {
    dispatch(getDeveloperFailure());
  }
};

//Add developer
export const addUser = async (dispatch, user) => {
  dispatch(registerStart());
  try {
    const res = await publicRequest.post("/auth/register", user);
    dispatch(registerSuccess(res.data));
  } catch (err) {
    dispatch(registerFailure());
  }
};

//update developer
export const updateUser = async (dispatch, user, id) => {
  dispatch(updateDeveloperStart());
  try {
    const res = await userRequest.put(`/users/${id}`, user);
    console.log(res.data._id);
    dispatch(updateDeveloperSuccess(res.data));
  } catch (err) {
    dispatch(updateDeveloperFailure());
  }
};

export const deleteDeveloper = async (id, dispatch) => {
  dispatch(deleteDeveloperStart());
  try {
    const res = await userRequest.delete(`/users/${id}`);
    dispatch(deleteDeveloperSuccess(id));
  } catch (err) {
    dispatch(deleteDeveloperFailure());
  }
};
//Manangers

//GET ALL Manangers
export const getmanagers = async (dispatch) => {
  dispatch(getManagerStart());
  try {
    const res = await userRequest.get("/users/manager");
  
    dispatch(getManagerSuccess(res.data));
  } catch (err) {
    dispatch(getManagerFailure());
  }
};

//TASKS

//GET TASK BY PROJEC ID
export const getTasks = async (dispatch, id) => {
  dispatch(getTaskStart());
  try {
    const res = await userRequest.get(`/tasks/${id}`);
    dispatch(getTaskSuccess(res.data));
  } catch (err) {
    dispatch(getTaskFailure());
  }
};

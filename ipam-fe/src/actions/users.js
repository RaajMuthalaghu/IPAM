import { CREATE_USER, RETRIEVE_USERS, UPDATE_USER, DELETE_USER, LOGIN_USER } from "./types";
  
//import CREATE_USER, RETRIEVE_USERS, UPDATE_USER, DELETE_USER  from "./types";

  import UserDataService from "../services/user.service";
  
  export const createUser = (username, password, admintype) => async (dispatch) => {
    try {
      const res = await UserDataService.create({ username, password, admintype });
  
      dispatch({
        type: CREATE_USER,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const loginuser = (username, password) => async (dispatch) => {
    try {
      const res = await UserDataService.signin(username, password);
  
      dispatch({
        type: LOGIN_USER,
        payload: res.data,
      });

      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const retrieveUsers = () => async (dispatch) => {
    try {
      const res = await UserDataService.getAll();
  
      dispatch({
        type: RETRIEVE_USERS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const updateUser = (username, data) => async (dispatch) => {
    try {
      const res = await UserDataService.update(username, data);
  
      dispatch({
        type: UPDATE_USER,
        payload: data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const deleteUser = (username) => async (dispatch) => {
    try {
      await UserDataService.delete(username);
  
      dispatch({
        type: DELETE_USER,
        payload: { username },
      });
    } catch (err) {
      console.log(err);
    }
  };
  
//   export const deleteAllUsers = () => async (dispatch) => {
//     try {
//       const res = await UserDataService.deleteAll();
  
//       dispatch({
//         type: DELETE_ALL_USERS,
//         payload: res.data,
//       });
  
//       return Promise.resolve(res.data);
//     } catch (err) {
//       return Promise.reject(err);
//     }
//   };
  
  export const findByUserName = (username) => async (dispatch) => {
    try {
      const res = await UserDataService.findByUserName(username);
  
      dispatch({
        type: RETRIEVE_USERS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
import { CREATE_IP, RETRIEVE_IPS, RETRIEVE_IP, UPDATE_IP } from "./types";
  
  import IPDataService from "../services/ip.service";
  
  export const createIP = (data) => async (dispatch) => {
    try {
      const res = await IPDataService.create(data);

        dispatch({
        type: CREATE_IP,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const findIPByNetwork = (network) => async (dispatch) => {
    try {
      const res = await IPDataService.get(network);
  
      dispatch({
        type: RETRIEVE_IPS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const findByip = (ip) => async (dispatch) => {
    try {
      const res = await IPDataService.findByip(ip);
  console.log(res.data);
      dispatch({
        type: RETRIEVE_IP,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const updateIP = (ip, data) => async (dispatch) => {
    try {
      const res = await IPDataService.update(ip, data);
  
      dispatch({
        type: UPDATE_IP,
        payload: data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  // export const deleteUser = (network) => async (dispatch) => {
  //   try {
  //     await IPDataService.delete(network);
  
  //     dispatch({
  //       type: DELETE_NETWORK,
  //       payload: { network },
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  
  // export const retrieveNetworks = () => async (dispatch) => {
  //   try {
  //     const res = await IPDataService.getAll();
  
  //     dispatch({
  //       type: RETRIEVE_NETWORKS,
  //       payload: res.data,
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  
//   export const deleteAllUsers = () => async (dispatch) => {
//     try {
//       const res = await IPDataService.deleteAll();
  
//       dispatch({
//         type: DELETE_ALL_NETWORKS,
//         payload: res.data,
//       });
  
//       return Promise.resolve(res.data);
//     } catch (err) {
//       return Promise.reject(err);
//     }
//   };
  

import { CREATE_NETWORK, RETRIEVE_NETWORKS, UPDATE_NETWORK, DELETE_NETWORK } from "./types";
  
//import CREATE_NETWORK, RETRIEVE_NETWORKS, UPDATE_NETWORK, DELETE_NETWORK  from "./types";

  import NetworkDataService from "../services/network.service";
  
  export const createNetwork = (network, vlan, subnet, netmask, gateway, fromip, toip) => async (dispatch) => {
    try {
      const res = await NetworkDataService.create({ network, vlan, subnet, netmask, gateway, fromip, toip });
  
      dispatch({
        type: CREATE_NETWORK,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const retrieveNetworks = () => async (dispatch) => {
    try {
      const res = await NetworkDataService.getAll();
  
      dispatch({
        type: RETRIEVE_NETWORKS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const updateNetwork = (network, data) => async (dispatch) => {
    try {
      const res = await NetworkDataService.update(network, data);
  
      dispatch({
        type: UPDATE_NETWORK,
        payload: data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const deleteUser = (network) => async (dispatch) => {
    try {
      await NetworkDataService.delete(network);
  
      dispatch({
        type: DELETE_NETWORK,
        payload: { network },
      });
    } catch (err) {
      console.log(err);
    }
  };
  
//   export const deleteAllUsers = () => async (dispatch) => {
//     try {
//       const res = await NetworkDataService.deleteAll();
  
//       dispatch({
//         type: DELETE_ALL_NETWORKS,
//         payload: res.data,
//       });
  
//       return Promise.resolve(res.data);
//     } catch (err) {
//       return Promise.reject(err);
//     }
//   };
  
  export const findByNetwork = (network) => async (dispatch) => {
    try {
      const res = await NetworkDataService.findByNetwork(network);
  
      dispatch({
        type: RETRIEVE_NETWORKS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
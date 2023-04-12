import { CREATE_IP, RETRIEVE_IPS, UPDATE_IP } from "../actions/types";
const initialState = [];

function ipReducer(ips = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_IP:
      return [...ips, payload];

    case RETRIEVE_IPS:
      //return payload;
      return ips.filter(({ network }) => network === payload.network);

    case UPDATE_IP:
      return ips.map((ip) => {
        if (ip.ip === payload.ip) {
          return {
            ...ip,
            ...payload,
          };
        } else {
          return ip;
        }
      });

    case DELETE_IP:
      return networks.filter(({ network }) => network !== payload.network);

    // case DELETE_ALL_IPS:
    //   return [];

    default:
      return ips;
  }
};

export default ipReducer;

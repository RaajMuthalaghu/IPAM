import { CREATE_NETWORK, RETRIEVE_NETWORKS, UPDATE_NETWORK, DELETE_NETWORK } from "../actions/types";
const initialState = [];

function networkReducer(networks = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_NETWORK:
      return [...networks, payload];

    case RETRIEVE_NETWORKS:
      return payload;

    case UPDATE_NETWORK:
      return networks.map((network) => {
        if (network.network === payload.network) {
          return {
            ...network,
            ...payload,
          };
        } else {
          return network;
        }
      });

    case DELETE_NETWORK:
      return networks.filter(({ network }) => network !== payload.network);

    // case DELETE_ALL_NETWORKS:
    //   return [];

    default:
      return networks;
  }
};

export default networkReducer;

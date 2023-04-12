import http from "../http-common";


class NetworkDataService {

  getAll() {
    return http.get("/networks");
  }

  get(network) {
    return http.get(`/networks/${network}`);
  }

  create(data) {
    return http.post("/networks", data);
  }

  update(network, data) {
    return http.put(`/networks/${network}`, data);
  }

  delete(network) {
    return http.delete(`/networks/${network}`);
  }

  findByNetwork(network) {
    return http.get(`/network/${network}`);
  }
}

export default new NetworkDataService();
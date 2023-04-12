import http from "../http-common";


class IPDataService {

  get(network) {
    return http.get(`/ips/${network}`);
  }

  create(data) {
    return http.post("/ips", data);
  }

  update(ip, data) {
    return http.put(`/ips/${ip}`, data);
  }

  findByip(ip) {
    return http.get(`/ip/${ip}`);
  }

  findIPByNetwork(network) {
    return http.get(`/ips/${network}`);
  }
}

export default new IPDataService();
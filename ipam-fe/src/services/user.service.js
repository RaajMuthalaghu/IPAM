import http from "../http-common";


class UserDataService {

  signin(username,password ) {
    http.defaults.auth= { username: username, password: password};
    return http.get("/auth/signin");
  }
  getAll() {
    return http.get("/users");
  }

  get(username) {
    return http.get(`/users/${username}`);
  }

  create(data) {
    return http.post("/auth/signup", data);
  }

  updatePassword(username, data) {
    return http.put(`/users/updatepassword/${username}`, data);
  }

  toggleadmintype(username, data) {
    return http.put(`/users/toggleadmintype/${username}`, data);
  }

  update(username, data) {
    return http.put(`/users/${username}`,data);
  }

  delete(username) {
    return http.delete(`/users/${username}`);
  }

//   deleteAll() {
//     return http.delete(`/users`);
//   }

  findByUserName(username) {
    return http.get(`/users/${username}`);
  }
}

export default new UserDataService();
import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-type": "application/json"
  },
  auth: {
    username: 'admin',
    password: 'admin'
  }
});
import axios from "axios";

export default axios.create({
  baseURL: "http://YOUR-IP:5000/api",
});
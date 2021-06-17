import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:9001/api",
  headers: {
    "Content-type": "application/json"
  }
});
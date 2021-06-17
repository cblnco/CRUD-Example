import http from "../utils/http-common";

const getAll = () => {
  return http.get("/person");
};

const get = id => {
  return http.get(`/person/${id}`);
};

const create = data => {
  return http.post("/person", data);
};

const update = (id, data) => {
  return http.put(`/person/${id}`, data);
};

const remove = id => {
  return http.delete(`/person/${id}`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
};
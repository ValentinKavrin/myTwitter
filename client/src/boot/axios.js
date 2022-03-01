import { boot } from "quasar/wrappers";
import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:3333" });


api.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');
  config.headers.authorization =  token ? `Bearer ${token}` : '';
  return config;
});

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;


});

export { api };

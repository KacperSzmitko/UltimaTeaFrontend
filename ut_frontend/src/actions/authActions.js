import { LOGIN, REGISTER, LOGOUT, REFRESH_TOKEN } from "./types";
import axios from "axios";

const createConfig = (token) => ({
  headers: {
    Authorization: "Bearer " + token,
  },
});

const login = (email, password) => async (dispach) => {
  let data = { email: email, password: password };
  const response = await axios
    .post("api/token/", data)
    .catch((err) => err.response);
  dispach({
    type: LOGIN,
    payload: { token: response.data.access, refresh: response.data.refresh },
  });
  localStorage.setItem("token", response.data.access);
  localStorage.setItem("refresh", response.data.refresh);
  return response;
};

const register = (data) => (dispach) => {
  axios
    .post("api/user/", data)
    .then(() => dispach({ type: REGISTER }))
    .catch((err) => console.log(err.response.data));
};

const reset_password = (data) => (dispach) => {
  axios.post("api/password_reset/", data).catch((e) => {});
};

const check_token = (data) => {
  return axios
    .get("api/check_token/", createConfig(data))
    .catch((e) => e.response);
};

const refresh_token = (data) => (dispach) => {
  axios
    .post("api/token/refresh/", data)
    .then((response) =>{
      dispach({
        type: REFRESH_TOKEN,
        payload: {
          token: response.data.access,
          refresh: response.data.refresh,
        },
      });   
      localStorage.setItem("token", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);}
    )
    .catch((e) => {;console.log(e.response.data)});
};

const logout = () => (dispach) => {
  localStorage.setItem("token", "");
  localStorage.setItem("refresh", "");
  dispach({ type: LOGOUT });
};

export {
  login,
  register,
  reset_password,
  createConfig,
  check_token,
  logout,
  refresh_token,
};

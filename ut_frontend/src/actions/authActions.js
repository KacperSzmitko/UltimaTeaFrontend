import { LOGIN, REGISTER, LOGOUT, REFRESH_TOKEN, REGISTER_FAIL, LOGIN_FAIL, NOTIFY } from "./types";
import axios from "axios";

const createConfig = (token) => ({
  headers: {
    Authorization: "Bearer " + token,
  },
});

const login = (email, password) => async (dispach) => {
  let data = { email: email, password: password };
  const response = await axios
    .post("/token/", data)
    .catch((err) => dispach({ type: LOGIN_FAIL, data: err.response }));
  dispach({
    type: LOGIN,
    payload: { token: response.data.access, refresh: response.data.refresh },
  });
  localStorage.setItem("token", response.data.access);
  localStorage.setItem("refresh", response.data.refresh);
  return response;
};

const register = (data) => (dispatch) => {
  axios
    .post("/user/", data)
    .then(() => dispatch({ type: REGISTER }))
    .catch((err) => {
      dispatch({ type: REGISTER_FAIL, data: err.response.data });

      for(var err_name in err.response.data) {
        if (err_name === "email") {
          dispatch({ type: NOTIFY, data: err.response.data[err_name]});
        }
        else if (err_name === "machine") {
          dispatch({ type: NOTIFY, data: err.response.data[err_name]});
        }
        else {
          dispatch({ type: NOTIFY, data: "Server connection error" });
        }
      }
    });
};

const reset_password = (data) => (dispach) => {
  axios.post("/password_reset/", data).catch((e) => {});
};

const check_token = (data) => {
  return axios
    .get("/check_token/", createConfig(data))
    .catch((e) => e.response);
};

const refresh_token = (data) => (dispach) => {
  axios
    .post("/token/refresh/", data)
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

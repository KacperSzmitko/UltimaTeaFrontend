import { LOGIN, REGISTER } from "./types";
import axios from "axios";

const login = (email, password) => async (dispach) => {
  let data = { email: email, password: password };
  const response = await axios
    .post("/token/", data)
    .catch((err) => err.response);
  dispach({ type: LOGIN, payload: response.data.access });
  return response;
};

const register = (data) => (dispach) => {
  axios
    .post("/user/", data)
    .then(() => dispach({ type: REGISTER }))
    .catch((err) => console.log(err.response.data));
};

const reset_password = (data) => (dispach) => {
  axios.post("/password_reset/", data).catch((e) => {});
};

export { login, register, reset_password };

import axios from "axios";
import { environment } from "../config/config";

function login({ email, password }) {
  return axios
    .post(`${environment}/account/login`, { email, password })
    .then((user) => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      if (user.data.success) {
        localStorage.setItem("user", JSON.stringify(user.data));
      }
      return user.data;
    });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("user");
}
async function getUser () {
  try {
    const user = await axios.get(`${environment}/user`);
    return user.data;
  } catch (error) {
    throw error;
  }
}

async function createProducer (data) {
  try {
    const user = await axios.post(`${environment}/account/producer_sign_up`, data);
    return user.data;
  } catch (error) {
    throw error;
  }
}


export const userService = {
    login,
    logout,
    createProducer
  };
  
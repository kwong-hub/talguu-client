import axios from "./axiosDefault";
import { environment } from "../config/config";
function login({ email, password }) {
  return axios.post(`${environment}/account/login`, { email, password }).then((user) => {
    // store user details and jwt token in local storage to keep user logged in between page refreshes
    if (user.data.success) {
      localStorage.setItem("user", JSON.stringify(user.data));
    }
    return user.data;
  });
}

function logout() {
  console.log("about to log user out");
  // remove user from local storage to log user out
  localStorage.removeItem("user");
  window.location.reload();
}

async function getUser() {
  try {
    const user = await axios.get(`${environment}/user`);
    return user.data;
  } catch (error) {
    throw error;
  }
}

function getLocalUser() {
  return JSON.parse(localStorage.getItem("user"));
}

/// this might help to do some intercept handle 403 401 request
function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        logout();
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}

async function createProducer(data) {
  try {
    const user = await axios.post(`${environment}/account/producer_sign_up`, data);
    return user.data;
  } catch (error) {
    throw error;
  }
}

async function createViewer(data) {
  try {
    const user = await axios.post(`${environment}/account/viewer_sign_up`, data);
    return user.data;
  } catch (error) {
    throw error;
  }
}

export const userService = {
  login,
  logout,
  createProducer,
  createViewer,
  getLocalUser,
};

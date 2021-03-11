import { useHistory } from "react-router-dom";
import { environment } from "../config/config";
import axios from "./axiosDefault";
import history from "./../routes/history";
import { checkResponse } from "./errorHandler";

function login({ email, password }) {
  return axios
    .post(`${environment}/account/login`, { email, password })
    .then((user) => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      if (user.data.success) {
        localStorage.setItem("user", JSON.stringify(user.data));
      }
      return user.data;
    })
    .catch((error) => {
      return checkResponse(error);
    });
}

function logout(redirect_url = "") {
  localStorage.removeItem("user");
  console.log(history.location);
  if (redirect_url) {
    history.push({ pathname: "/login", search: `?redirect_url=${redirect_url}` });
  } else {
    history.push({ pathname: "/login" });
  }
  history.go(0);
}

async function getUser() {
  try {
    const user = await axios.get(`${environment}/user`);
    return user.data;
  } catch (error) {
    return checkResponse(error);
  }
}
async function getUserProfile() {
  try {
    const user = await axios.get(`${environment}/account/profile`);
    return user.data;
  } catch (error) {
    throw error;
  }
}
async function updateUserProfile(body) {
  try {
    const user = await axios.put(`${environment}/account/profile`, body);
    return user.data;
  } catch (error) {
    throw error;
  }
}

async function updateCompanyProfile(body) {
  try {
    const user = await axios.put(`${environment}/account/profile/company`, body);
    return user.data;
  } catch (error) {
    throw error;
  }
}
async function forgotPassword(body) {
  try {
    const user = await axios.post(`${environment}/account/change_password_request`, body);
    return user.data;
  } catch (error) {
    throw error;
  }
}

async function updatePassword(body) {
  try {
    const user = await axios.put(`${environment}/account/update_password`, body);
    return user.data;
  } catch (error) {
    throw error;
  }
}

function getLocalUser() {
  return JSON.parse(localStorage.getItem("user"));
}

/// this might help to do some intercept handle 403 401 request
// function handleResponse(response) {
//   return response.text().then((text) => {
//     const data = text && JSON.parse(text);
//     if (!response.ok) {
//       if (response.status === 401) {
//         logout();
//       }

//       const error = (data && data.message) || response.statusText;
//       return Promise.reject(error);
//     }

//     return data;
//   });
// }

async function createProducer(data) {
  try {
    const user = await axios.post(`${environment}/account/producer_sign_up`, data);
    return user.data;
  } catch (error) {
    return checkResponse(error);
  }
}

async function createViewer(data) {
  try {
    const user = await axios.post(`${environment}/account/viewer_sign_up`, data);
    return user.data;
  } catch (error) {
    return checkResponse(error);
  }
}

export const userService = {
  login,
  logout,
  createProducer,
  createViewer,
  getLocalUser,
  getUser,
  getUserProfile,
  updateUserProfile,
  updateCompanyProfile,
  updatePassword,
  forgotPassword
};

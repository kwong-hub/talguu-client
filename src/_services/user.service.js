import axios from "axios";
import { apiUrl } from "../config/config";

function login({ email, password }) {
  return axios
    .post(`${apiUrl}/account/login`, { email, password })
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

/// this might help to do some intercepter handle 403 401 request 
function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        // location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}


export const userService = {
    login,
    logout,
  };
  
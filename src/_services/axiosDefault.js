import axios from "axios";
// axios.defaults.baseURL = 'http://localhost:1010/'
if (localStorage.getItem("user")) {
  let user = JSON.parse(localStorage.getItem("user"));

  // console.log(`bearer ${user.idToken}`);
  axios.defaults.headers.common = { Authorization: `Bearer ${user.idToken}` };
}
export default axios;

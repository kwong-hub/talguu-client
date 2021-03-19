import axios from 'axios'

// axios.defaults.baseURL = 'http://localhost:1010/'
// if (localStorage.getItem("user")) {
//   let user = JSON.parse(localStorage.getItem("user"));

//   console.log(`bearer user`, user);
//   axios.defaults.headers.common = { Authorization: `Bearer ${user.idToken}` };
// }

axios.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user) {
      config.headers.Authorization = 'Bearer ' + user.idToken
    }
    // config.headers['Content-Type'] = 'application/json';
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

export default axios

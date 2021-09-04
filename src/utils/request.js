import axios from 'axios'
import { Notify } from 'vant'
// import store from "@/store";
// import { getToken } from "@/utils/auth";

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
// service.interceptors.request.use(
//   (config) => {
//     if (store.getters.token) {
//       config.headers["X-Token"] = getToken();
//     }
//     return config;
//   },
//   (error) => {
//     console.log(error);
//     return Promise.reject(error);
//   }
// );

// response interceptor
service.interceptors.response.use(
  (response) => {
    const res = response.data
    // 文件流不需要验证code
    // if (
    //   response.status === 200 &&
    //   response.headers['content-type'] === 'application/octet-stream'
    // ) { return res }

    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 0) {
      Notify({
        type: 'danger',
        message: res.message || 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        // MessageBox.confirm(
        //   "You have been logged out, you can cancel to stay on this page, or log in again",
        //   "Confirm logout",
        //   {
        //     confirmButtonText: "Re-Login",
        //     cancelButtonText: "Cancel",
        //     type: "warning",
        //   }
        // ).then(() => {
        //   store.dispatch("user/resetToken").then(() => {
        //     location.reload();
        //   });
        // });
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Notify({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service

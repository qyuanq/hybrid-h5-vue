import axios from 'axios'
import axiosRetry from 'axios-retry'
import { addPendingRequest, removePendingRequest } from './cancelRepeatRquest'
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
service.interceptors.request.use(
  (config) => {
    // if (store.getters.token) {
    //   config.headers["X-Token"] = getToken();
    // }
    removePendingRequest(config)
    addPendingRequest(config)
    return config
  },
  (error) => {
    console.log(error)
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  (response) => {
    removePendingRequest(response.config)
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
    removePendingRequest(error.config || {})
    console.log('err' + error) // for debug
    Notify({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

// 请求失败自动请求
axiosRetry(service, { // 传入axios实例
  retries: 2, // 设置自动发送请求次数
  retryDelay: (retryCount) => {
    return retryCount * 1500 // 重复请求延迟（毫秒）
  },
  shouldResetTimeout: true, //  重置超时时间
  retryCondition: (error) => {
    // true为打开自动发送请求，false为关闭自动发送请求
    if (error.message.includes('timeout') || error.message.includes('status code')) {
      return true
    } else {
      return false
    }
  }
})

export default service

import axios from 'axios'
import store from '../store'
import router from '../router'
// import {getCookie} from '../utils/index.js'

axios.defaults.baseURL = 'http://61.155.169.77:10002/' // 接口地址
axios.defaults.timeout = 5000
axios.defaults.headers = {
  'Content-Type': 'application/json'
}
let cancel = ''
const CancelToken = axios.CancelToken
// 请求拦截器
axios.interceptors.request.use(
  config => {
    if (store.state.accessToken) { // 在请求头中加token
      config.headers['X-Access-Auth-Token'] = store.state.accessToken
    }
    return config
  }, error => {
    return Promise.reject(error)
  }
)
// 响应拦截器
axios.interceptors.response.use(
  response => {
    // console.log('响应拦截器 response', response)
    // response.data.errCode是我接口返回的值，如果值为2，说明Cookie丢失，然后跳转到登录页，这里根据大家自己的情况来设定
    /* if (response.) {
      router.push({
        path: '/login',
        query: {redirect: router.currentRoute.fullPath} // 从哪个页面跳转
      })
    } */
    return response
  },
  err => {
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.message = '错误请求'
          break
        case 401:
          err.message = '未授权，请重新登录'
          break
        case 403:
          err.message = '拒绝访问'
          break
        case 404:
          err.message = '请求错误,未找到该资源'
          break
        case 405:
          err.message = '请求方法未允许'
          break
        case 408:
          err.message = '请求超时'
          break
        case 500:
          err.message = '服务器端出错'
          break
        case 501:
          err.message = '网络未实现'
          break
        case 502:
          err.message = '网络错误'
          break
        case 503:
          err.message = '服务不可用'
          break
        case 504:
          err.message = '网络超时'
          break
        case 505:
          err.message = 'http版本不支持该请求'
          break
        default:
          err.message = `连接错误${err.response.status}`
      }
    } else {
      err.message = '连接到服务器失败'
    }
    /* if (err.response.status === 500 && err.response.message === '') {
      localStorage.removeItem('accessToken')
      router.push({
        path: '/login',
        query: {redirect: router.currentRoute.fullPath} // 从哪个页面跳转
      })
    } */
    console.log('err', err.response)
    return Promise.resolve(err.response)
  }
)

export default {
  get (url, param) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url,
        params: param,
        cancelToken: new CancelToken(c => {
          cancel = c
        })
      }).then(res => {
        resolve(res.data)
      }).catch(function (error) {
        reject(error.data)
      })
    })
  },
  post (url, param) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url,
        data: param,
        cancelToken: new CancelToken(c => {
          cancel = c
        })
      }).then(res => {
        resolve(res.data)
      }).catch(function (error) {
        reject(error.data)
      })
    })
  }
}

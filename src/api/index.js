import axios from 'axios'

// const apiRoot = 'http://www.ixuanmi.com/api/'
let cancel = ''
let promiseArr = {}
const CancelToken = axios.CancelToken
axios.interceptors.request.use(config => {
  if (promiseArr[config.url]) {
    promiseArr[config.url]('操作取消')
    promiseArr[config.url] = cancel
  } else {
    promiseArr[config.url] = cancel
  }
  config.headers = {
    'Content-Type': 'application/json'
  }
  return config
}, error => {
  return Promise.reject(error)
})
axios.interceptors.response.use(
  response => {
    return response
  }, err => {
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
    // message.err(err.message)
    return Promise.resolve(err.response)
  }
)
// axios.defaults.baseURL = '/api'
axios.defaults.headers = {
  'Content-Type': 'application/json'
}
axios.defaults.timeout = 10000
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

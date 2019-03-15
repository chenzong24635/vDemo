function timestampToTime (times) {
  if (times.lentgh > 10) { // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
    times *= 1000
  }
  let date = new Date(times)
  let Y = date.getFullYear() + '-'
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  let D = date.getDate() + ' '
  // let h = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()) + ':'
  // let m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes()) + ':'
  // let s = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds())
  return Y + M + D
}

let cookie = {
  set: function (key, val, time) { // 设置cookie方法
    let date = new Date() // 获取当前时间
    let expiresDays = time // 将date设置为n天以后的时间
    date.setTime(date.getTime() + expiresDays * 24 * 3600 * 1000) // 格式化为cookie识别的时间
    // document.cookie = key + '=' + val + ';expires=' + date.toGMTString();  //设置cookie
    document.cookie = key + '=' + val + ';expires=' + date.toGMTString() + '; path=/' // 设置cookie
  },
  get: function (key) { // 获取cookie方法
    /* 获取cookie参数 */
    let getCookie = document.cookie.replace(/[ ]/g, '') // 获取cookie，并且将获得的cookie格式化，去掉空格字符
    let arrCookie = getCookie.split(';') // 将获得的cookie以'分号'为标识 将cookie保存到arrCookie的数组中
    let tips // 声明变量tips
    for (let i = 0; i < arrCookie.length; i++) { // 使用for循环查找cookie中的tips变量
      let arr = arrCookie[i].split('=') // 将单条cookie用'等号'为标识，将单条cookie保存为arr数组
      if (key === arr[0]) { // 匹配变量名称，其中arr[0]是指的cookie名称，如果该条变量为tips则执行判断语句中的赋值操作
        tips = arr[1] // 将cookie的值赋给变量tips
        break // 终止for循环遍历
      }
    }
    return tips
  },
  delete: function (key) { // 删除cookie方法
    let date = new Date() // 获取当前时间
    date.setTime(date.getTime() - 10000) // 将date设置为过去的时间
    document.cookie = key + '=v; expires =' + date.toGMTString() // 设置cookie
  }
}

// 获取cookie、
function getCookie (name) {
  let arr = null
  let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  if (arr === document.cookie.match(reg)) {
    return (arr[2])
  } else {
    return null
  }
}

// 设置cookie,增加到vue实例方便全局调用
function setCookie (cName, value, expiredays) {
  let exdate = new Date()
  exdate.setDate(exdate.getDate() + expiredays)
  document.cookie = cName + '=' + escape(value) + ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString())
}

// 删除cookie
function delCookie (name) {
  let exp = new Date()
  exp.setTime(exp.getTime() - 1)
  let cval = getCookie(name)
  if (cval != null) {
    document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString()
  }
}

export {
  timestampToTime,
  cookie,
  getCookie,
  setCookie,
  delCookie
}

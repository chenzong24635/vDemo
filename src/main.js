// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueI18n from 'vue-i18n'
import store from './store'
import axios from './api/index.js'
// import 'lib-flexible/flexible.js'
import Mint from 'mint-ui'
import global from './components/Global' // 引用文件
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload)
/* Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading: require('./assets/images/loading.gif'),
  attempt: 1
}) */
Vue.config.productionTip = false
Vue.prototype.GLOBAL = global // 挂载到Vue实例上面
Vue.use(Mint)
Vue.use(VueI18n)
Vue.prototype.axios = axios
// 接口地址 http://61.155.169.77:10002/swagger-ui.html
Vue.prototype.base_url = 'http://61.155.169.77:10002/' // 接口地址
Vue.prototype.base_img = 'http://61.155.169.77:10005/'// 图片地址
/* Vue.prototype.base_url = '/static/json/' // 自定义接口地址
Vue.prototype.base_img = '/static/images/' // 自定义图片地址 */
Vue.config.productionTip = false
const i18n = new VueI18n({
  locale: 'en',
  messages: {
    en: {
      message: {
        hello: 'hello world'
      }
    },
    cn: {
      message: {
        hello: '你好、世界'
      }
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  store,
  components: { App },
  template: '<App/>'
})

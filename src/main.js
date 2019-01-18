// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueI18n from 'vue-i18n'
import axios from './api/index.js'
import 'lib-flexible/flexible.js'

Vue.use(VueI18n)
Vue.prototype.axios = axios
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
  components: { App },
  template: '<App/>'
})

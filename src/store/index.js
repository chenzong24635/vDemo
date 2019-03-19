import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    accessToken: localStorage.getItem('accessToken') ? localStorage.getItem('accessToken') : '',
    asideNavExpand: false, // 左侧栏是否展开
    headerShow: true, // 头部是否显示
    bottomShow: true, // 底部是否显示
    footerShow: true, // 底部导航是否显示
    defaultAddress: localStorage.getItem('defaultAddress') ? localStorage.getItem('defaultAddress') : '' // 结算页面默认地址
  },
  mutations: {
    // 修改token，并将token存入localStorage
    changeToken (state, user) {
      state.accessToken = user.accessToken
      localStorage.setItem('accessToken', user.accessToken)
    },
    clearToken (state) {
      state.accessToken = ''
      localStorage.removeItem('accessToken')
    },
    editAddress (state, data) { // 修改结算页面默认地址
      state.defaultAddress = data
      localStorage.setItem('defaultAddress', JSON.stringify(data))
    }
  },
  actions: {
    clearToken ({ commit }) {
      commit('clearToken')
    }
  }
})
export default store

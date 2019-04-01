import Vue from 'vue'
import {cookie} from '../utils'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    accessToken: localStorage.getItem('accessToken') ? localStorage.getItem('accessToken') : '',
    searchValue: '',
    asideNavExpand: false, // 左侧栏是否展开
    headerShow: true, // 头部是否显示
    bottomShow: true, // 底部是否显示
    footerShow: true, // 底部导航是否显示
    defaultAddress: localStorage.getItem('defaultAddress') ? localStorage.getItem('defaultAddress') : '', // 结算页面默认地址
    nofreight: localStorage.getItem('nofreight') ? localStorage.getItem('nofreight') : '', // 满多少免运费
    freight: localStorage.getItem('freight') ? localStorage.getItem('freight') : '', // 运费
    lists: [],
    lists1: []
  },
  mutations: {
    // 搜索值
    getSearchValue (state, val) {
      state.searchValue = val
    },
    // 头部、底部、底部导航显示隐藏
    components (state, arr) {
      state.headerShow = arr[0]
      state.bottomShow = arr[1]
      state.footerShow = arr[2]
      console.log(state)
    },
    // 修改token，并将token存入localStorage
    changeToken (state, user) {
      state.accessToken = user.accessToken
      cookie.set('accessToken', user.accessToken)
      localStorage.setItem('accessToken', user.accessToken)
    },
    clearToken (state) {
      state.accessToken = ''
      cookie.remove('accessToken')
      localStorage.removeItem('accessToken')
    },
    editAddress (state, data) { // 修改结算页面默认地址
      state.defaultAddress = data
      localStorage.setItem('defaultAddress', JSON.stringify(data))
    },
    getLists (state, lists) {
      state.lists = lists
    },
    getLists1 (state, lists) {
      state.lists1.push(lists)
    }
  },
  actions: {
    clearToken ({ commit }) {
      commit('clearToken')
    }
  }
})
export default store

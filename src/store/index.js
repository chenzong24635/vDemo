import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: '',
    asideNavExpand: false, // 左侧栏是否展开
    bottomShow: true // 底部是否显示
  }
})
export default store

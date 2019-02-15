import Vue from 'vue'
import Router from 'vue-router'
// import FooterBar from '@/components/FooterBar'
import Index from '@/pages/index'
import News from '@/pages/news/news'
import Trail from '@/pages/trail/trail'
import Shoppe from '@/pages/shoppe/shoppe'
import Cart from '@/pages/cart/cart'
import My from '@/pages/my/my'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      meta: {title: '首页'}
    },
    {
      path: '/News',
      name: 'News',
      component: News
    },
    {
      path: '/Trail',
      name: 'Trail',
      component: Trail
    },
    {
      path: '/Shoppe',
      name: 'Shoppe',
      component: Shoppe
    },
    {
      path: '/Cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/My',
      name: 'My',
      component: My
    }
  ]
})

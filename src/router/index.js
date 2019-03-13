import Vue from 'vue'
import Router from 'vue-router'
// import store from '../store'
import Login from '@/pages/logons/login'
import resetPassword from '@/pages/logons/resetPassword'
import Register from '@/pages/logons/register'

import Index from '@/pages/index'
import Trail from '@/pages/trail/trail'
import Test from '@/pages/trail/test'
import Shoppe from '@/pages/shoppe/shoppe'
import Cart from '@/pages/cart/cart'
import My from '@/pages/my/my'
import Order from '@/pages/order/order'
import News from '@/pages/news/news'
import newDetail from '@/pages/news/newDetail'
import Product from '@/pages/product/product'
import ProductDetail from '@/pages/product/detail'
import Story from '@/pages/static/story'
import Safe from '@/pages/static/safe'
import America from '@/pages/static/america'
import China from '@/pages/static/china'
import YunWen from '@/pages/static/yunwen'
import Facial from '@/pages/static/facial'
import Baby from '@/pages/static/baby'
import Faq from '@/pages/static/faq'
import QualityTest from '@/pages/static/qualityTest'

/* import {post} from '../api/index.js'
import {
  getCookie,
  delCookie
} from '../utils/index.js' */

Vue.use(Router)

const router = new Router({
  scrollBehavior(to, from, savedPosition) {
    return {
      x: 0,
      y: 0
    } // 路由跳转后页面回到顶部
  },
  routes: [
    {
      path: '/',
      redirect: '/index',
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      meta: {
        title: '首页'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        title: '登录'
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        title: '注册'
      }
    },
    {
      path: '/resetPassword',
      name: 'resetPassword',
      component: resetPassword,
      meta: {
        title: '密码重置'
      }
    },
    {
      path: '/order',
      name: 'order',
      component: Order,
      meta: {
        title: '订单'
      }
    },
    {
      path: '/news/:pid',
      name: 'news',
      component: News,
      meta: {
        title: '品牌新闻'
      }
    },
    {
      path: '/newDetail/:id',
      name: 'newDetail',
      component: newDetail,
      meta: {
        title: '新闻详情'
      }
    },
    {
      path: '/trail',
      name: 'trail',
      component: Trail,
      meta: {
        title: '试用中心'
      },
      children: [
        {
          path: 'test',
          name: 'test',
          component: Test,
        }
      ]
    },
    {
      path: '/shoppe',
      name: 'shoppe',
      component: Shoppe,
      meta: {
        title: '专柜导航'
      }
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart,
      meta: {
        title: '购物车'
      }
    },
    {
      path: '/my',
      name: 'my',
      component: My,
      meta: {
        title: '我的'
        // requiresAuth: true
      }
    },
    {
      path: '/product/:pid/:val',
      name: 'product',
      component: Product,
      meta: {
        title: '产品'
      }
    },
    {
      path: '/productDetail/:id',
      name: 'productDetail',
      component: ProductDetail,
      meta: {
        title: '产品详情'
      }
    },
    {
      path: '/product1/:pid/:val',
      name: 'product1',
      component: Product,
      meta: {
        title: '产品1'
      }
    },
    {
      path: '/story',
      name: 'story',
      component: Story,
      meta: {
        title: '品牌故事'
      }
    },
    {
      path: '/safe',
      name: 'safe',
      component: Safe,
      meta: {
        title: '安全筛选'
      }
    },
    {
      path: '/america',
      name: 'america',
      component: America,
      meta: {
        title: 'Belli在美国'
      }
    },
    {
      path: '/china',
      name: 'china',
      component: China,
      meta: {
        title: 'Belli中国'
      }
    },
    {
      path: '/yunwen',
      name: 'yunwen',
      component: YunWen,
      meta: {
        title: '孕纹护理'
      }
    },
    {
      path: '/facial',
      name: 'facial',
      component: Facial,
      meta: {
        title: '面部护理'
      }
    },
    {
      path: '/baby',
      name: 'baby',
      component: Baby,
      meta: {
        title: '婴幼儿'
      }
    },
    {
      path: '/faq',
      name: 'faq',
      component: Faq,
      meta: {
        title: '常见问题'
      }
    },
    {
      path: '/qualityTest',
      name: 'qualityTest',
      component: QualityTest,
      meta: {
        title: '正品验证'
      }
    }
  ]
})

//  全局前置守卫
router.beforeEach((to, from, next) => {
  /* router.beforeEach((to, from, next) => {
    let token = window.localStorage.getItem('token')
    if (to.matched.some(record => record.meta.requiresAuth) && (!token || token === null)) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  }) */
  // store.state.asideNavExpand = false
  // window.scrollTo(0,0)  // 切换页面时滚动条自动滚动到顶部
  if (to.meta.title) {
    /* 路由发生变化修改页面title */
    document.title = to.meta.title
  }
  next()
})

export default router

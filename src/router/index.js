import Vue from 'vue'
import Router from 'vue-router'
// import store from '../store'
import Login from '@/pages/logons/login'
import resetPassword from '@/pages/logons/resetPassword'
import changePassword from '@/pages/logons/changePassword'
import Register from '@/pages/logons/register'

import Index from '@/pages/index'
import Trail from '@/pages/trail/trail'
import Test from '@/pages/trail/test'
import Shoppe from '@/pages/shoppe/shoppe'
import Cart from '@/pages/cart/cart'
import My from '@/pages/my/my'
import Detail from '@/pages/my/detail'
import Order from '@/pages/order/order'
import orderDetail from '@/pages/order/detail'
import News from '@/pages/news/news'
import newDetail from '@/pages/news/newDetail'
import Product from '@/pages/product/product'
import ProductDetail from '@/pages/product/detail'
import Settle from '@/pages/product/settle'
import Address from '@/pages/address/address'
import addressEdit from '@/pages/address/edit'

import QualityTest from '@/pages/static/qualityTest'
// 静态页面
import Story from '@/pages/static/story'
import Safe from '@/pages/static/safe'
import America from '@/pages/static/america'
import China from '@/pages/static/china'
import YunWen from '@/pages/static/yunwen'
import Facial from '@/pages/static/facial'
import Baby from '@/pages/static/baby'
import Faq from '@/pages/static/faq'

/* import {post} from '../api/index.js'
import {
  getCookie,
  delCookie
} from '../utils/index.js' */

Vue.use(Router)

const router = new Router({
  scrollBehavior (to, from, savedPosition) {
    return {
      x: 0,
      y: 0
    } // 路由跳转后页面回到顶部
  },
  routes: [
    {
      path: '/',
      redirect: '/index'
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
      path: '/changePassword',
      name: 'changePassword',
      component: changePassword,
      meta: {
        title: '密码修改'
      }
    },
    { // 订单类型type: 0(全部)、1(我的订单)、2(积分订单)、3(试用订单) , 订单状态id: 0(全部)
      path: '/order/:type/:id',
      name: 'order',
      component: Order,
      meta: {
        title: '订单',
        requiresAuth: true
      }
    },
    {
      path: '/orderDetail/:type/:id',
      name: 'orderDetail',
      component: orderDetail,
      meta: {
        title: '订单详情',
        requiresAuth: true
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
          component: Test
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
        title: '购物车',
        requiresAuth: true
      }
    },
    {
      path: '/my',
      name: 'my',
      component: My,
      meta: {
        title: '我的',
        requiresAuth: true
      }
    },
    {
      path: '/detail',
      name: 'detail',
      component: Detail,
      meta: {
        title: '个人信息',
        requiresAuth: true
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
      path: '/product1/:pid/:val',
      name: 'product1',
      component: Product,
      meta: {
        title: '产品1'
      }
    },
    {
      path: '/productDetail/:type/:id',
      name: 'productDetail',
      component: ProductDetail,
      meta: {
        title: '产品详情'
      }
    },
    {
      path: '/settle/:type',
      name: 'Settle',
      component: Settle,
      meta: {
        title: '结算'
      }
    },
    {
      path: '/address/:type',
      name: 'address',
      component: Address,
      meta: {
        title: '地址'
      }
    },
    {
      path: '/addressEdit/:id',
      name: 'addressEdit',
      component: addressEdit,
      meta: {
        title: '地址编辑'
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
  if (to.meta.requiresAuth) {
    let token = localStorage.getItem('accessToken')
    if (!token) {
      next('/login')
    } else {
      next()
    }
  } else {
    next()
  }
  // window.scrollTo(0, 0)  // 切换页面时滚动条自动滚动到顶部
  if (to.meta.title) {
    /* 路由发生变化修改页面title */
    document.title = to.meta.title
  }
})

export default router

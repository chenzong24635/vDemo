
import Vue from 'vue'
import Router from 'vue-router'
const Login = () => import('@/pages/logons/login')
const resetPassword = () => import('@/pages/logons/resetPassword')
const changePassword = () => import('@/pages/logons/changePassword')
const Register = () => import('@/pages/logons/register')

const Index = () => import('@/pages/index')
const Trail = () => import('@/pages/trail/trail')
const Test = () => import('@/pages/trail/test')
const Shoppe = () => import('@/pages/shoppe/shoppe')
const Cart = () => import('@/pages/cart/cart')
const My = () => import('@/pages/my/my')
const Detail = () => import('@/pages/my/detail')
const Points = () => import('@/pages/my/points')
const Order = () => import('@/pages/order/order')
const orderDetail = () => import('@/pages/order/detail')
const News = () => import('@/pages/news/news')
const newDetail = () => import('@/pages/news/newDetail')
const Product = () => import('@/pages/product/product')
const ProductDetail = () => import('@/pages/product/detail')
const Settle = () => import('@/pages/product/settle')
const Address = () => import('@/pages/address/address')
const addressEdit = () => import('@/pages/address/edit')

const QualityTest = () => import('@/pages/others/qualityTest')
const Faq = () => import('@/pages/others/faq')

// 静态页面
const Story = () => import('@/pages/others/story')
const Safe = () => import('@/pages/others/safe')
const America = () => import('@/pages/others/america')
const China = () => import('@/pages/others/china')
const YunWen = () => import('@/pages/others/yunwen')
const Facial = () => import('@/pages/others/facial')
const Baby = () => import('@/pages/others/baby')

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  // base: './dist/', //
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) { // 当且仅当 popstate 导航 (通过浏览器的 前进/后退 按钮触发) 时才可用。
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
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
        title: '密码修改',
        requiresAuth: true
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
    { // val: 搜索产品值
      path: '/product/:pid/:val',
      name: 'product',
      component: Product,
      meta: {
        title: '全线产品'
      }
    },
    {
      path: '/productjs',
      name: 'productjs',
      component: Product,
      meta: {
        title: '积分商城'
      }
    },
    { // type: 1(普通产品) 、2(积分)、 3(试用)
      path: '/productDetail/:type/:id',
      name: 'productDetail',
      component: ProductDetail,
      meta: {
        title: '产品详情'
      }
    },
    { // type:1 详情页结算、2:积分详情页结算、 3：购物车结算、 4:试用下单
      path: '/settle/:type',
      name: 'Settle',
      component: Settle,
      meta: {
        title: '结算',
        requiresAuth: true
      }
    },
    {
      path: '/address/:type',
      name: 'address',
      component: Address,
      meta: {
        title: '地址',
        requiresAuth: true
      }
    },
    {// type:1 (结算页面跳转) type:0 (其他)
      path: '/addressEdit/:id/:type',
      name: 'addressEdit',
      component: addressEdit,
      meta: {
        title: '地址编辑',
        requiresAuth: true
      }
    },
    {
      path: '/points',
      name: 'points',
      component: Points,
      meta: {
        title: '我的积分',
        requiresAuth: true
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
      path: '/faq/:pid',
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
    },
    {
      path: '*',
      redirect: '/index'
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

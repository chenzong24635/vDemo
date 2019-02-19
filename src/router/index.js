import Vue from 'vue'
import Router from 'vue-router'
// import FooterBar from '@/components/FooterBar'
import Index from '@/pages/index'
import Trail from '@/pages/trail/trail'
import Shoppe from '@/pages/shoppe/shoppe'
import Cart from '@/pages/cart/cart'
import My from '@/pages/my/my'
import News from '@/pages/news/news'
import Story from '@/pages/static/story'
import Safe from '@/pages/static/safe'
import America from '@/pages/static/america'
import China from '@/pages/static/china'
import YunWen from '@/pages/static/yunwen'
import Facial from '@/pages/static/facial'
import Baby from '@/pages/static/baby'
import Faq from '@/pages/static/faq'
import QualityTest from '@/pages/static/qualityTest'

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
      path: '/news',
      name: 'News',
      component: News
    },
    {
      path: '/trail',
      name: 'Trail',
      component: Trail
    },
    {
      path: '/shoppe',
      name: 'Shoppe',
      component: Shoppe
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/my',
      name: 'My',
      component: My
    },
    {
      path: '/story',
      name: 'Story',
      component: Story
    },
    {
      path: '/safe',
      name: 'Safe',
      component: Safe
    },
    {
      path: '/america',
      name: 'America',
      component: America
    },
    {
      path: '/china',
      name: 'China',
      component: China
    },
    {
      path: '/yunwen',
      name: 'YunWen',
      component: YunWen
    },
    {
      path: '/facial',
      name: 'Facial',
      component: Facial
    },
    {
      path: '/baby',
      name: 'Baby',
      component: Baby
    },
    {
      path: '/faq',
      name: 'Faq',
      component: Faq
    },
    {
      path: '/qualityTest',
      name: 'QualityTest',
      component: QualityTest
    }
  ]
})

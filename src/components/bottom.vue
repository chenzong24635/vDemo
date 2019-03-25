<template>
  <footer class='tac' :style="$route.name === 'productDetail' ? 'margin-bottom: 100px;' : ''">
    <nav class='tal'>
      <ul>
        <li v-for='(item, index) in navs' :key='index'>
          <router-link
            v-if='item.url'
            :to='item.url'
            class='nav-title vux-1px-b nav-title1'
          >{{item.title}}</router-link>
          <p v-else v-bind:class='[item.status?"":"vux-1px-b","nav-title flex01"]'
            @click='navListsSHow(index)'
          >
            <span >{{item.title}}</span>
            <x-icon v-show="!item.status" type="ios-plus-empty" size="25" class="icon-white"></x-icon>
            <x-icon v-show="item.status" type="ios-close-empty" size="25" class="icon-white"></x-icon>
            <!-- <i v-bind:class='[item.status?"icon-cross":"","icon-plus"]'></i> -->
          </p>
          <ul class='nav-lists' v-show='item.status'>
            <li
              class='vux-1px-b'
              v-for='(item1, index1) in item.lists'
              :key='index1'
              @click='close'
            >
              <router-link :to='{name:item1.url, params:{pid:item1.pid}}'>{{item1.title}}</router-link>
              <!-- <a class='vux-1px-b' :href='item1.url'>{{item1.title}}</a> -->
            </li>
          </ul>
        </li>
      </ul>
    </nav>
    <section class='contact  vux-1px'>
      <p class='contact-title'>联系我们</p>
      <p>消费者热线：<a class='tel' href='tel:4006-210-310'>4006-210-310</a></p>
      <p>电子邮箱：<a class='mail'  href='mailto:beauty@belliskincare.cn'>beauty@belliskincare.cn</a></p>
      <div class='imgs'>
        <a href='#'><img src='../assets/images/common/wx.jpg' alt=''></a>
        <a href='#'><img src='../assets/images/common/wb.jpg' alt=''></a>
      </div>
    </section>
    <p class='mes-line'>
      <span>WHEN SAFETY MATTERS MOST</span>
    </p>
    <div class='back-top ' @click="backTop">返回顶部 <i class="icon-ctrl"></i></div>
    <div class='company-mes'>2015 Belli All Rights Reserved,沪ICP备14043077号-2 上海昭晗贸易有限公司</div>
    <ul class='foot-links tac'>
      <li><router-link to='usualProblem'>帮助中心</router-link></li>
      <li><router-link to='usualProblem'>隐私条款</router-link></li>
      <li><router-link to='usualProblem'>条款条件</router-link></li>
      <li><router-link to='usualProblem'>法律声明</router-link></li>
    </ul>
  </footer>
</template>
<script>
export default {
  name: '',
  components: {},
  data () {
    return {
      navs: [
        {
          title: '关于Belli',
          url: '',
          lists: [
            {
              title: '品牌故事',
              url: 'story'
            },
            {
              title: '安全筛选',
              url: 'safe'
            },
            {
              title: '品牌动态',
              url: 'news',
              pid: 1
            }
          ],
          status: false
        },
        {
          title: '全线产品',
          url: '/product/0/null',
          lists: [],
          status: false
        },
        {
          title: '客户服务',
          url: '',
          lists: [
            {
              title: '正品验证',
              url: 'qualityTest'
            },
            {
              title: '我的订单',
              url: 'order'
            },
            {
              title: '售后服务',
              url: 'faq'
            },
            {
              title: '配送服务',
              url: 'faq'
            }
          ],
          status: false
        }
      ]
    }
  },
  methods: {
    close () {
      console.log('close')
    },
    navListsSHow (navIndex) {
      // navBar 点击下拉
      this.navs.filter((item, index) => {
        if (index === navIndex) {
          let result = (item.status = !item.status)
          return result
        }
        console.log(item, index)
      })
    },
    backTop () {
      window.scrollTo(0, 0)
    }
  }
}
</script>
<style scoped lang='less'>
footer {
  background-color: #6a63aa;
  color: #fff;
  padding: 20px;
  margin-bottom: 0;
  // margin-bottom: 50px;
}
nav {
  margin-bottom: 30px;
}
.nav-title {
  height: 40px;
  line-height: 40px;
  width: 100%;
  font-size: 15px; /*px*/
  color: #fff;
  .icon-plus{font-size: 12px;/*no*/}

}
.nav-lists {
  padding-left: 10px;
}
.nav-lists li {
  padding: 8px 0;
  a {
    color: #fff;
    padding-left: 30px;
  }
}

.contact{
  position: relative;
  padding: 20px 0 10px;
  .contact-title{
    position: absolute;
    top: -10px;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 180px;
    height: 20px;
    font-size: 16px; /*px*/
    background-color: #6a63aa;
  }
  .tel,.mail{
    color:#fff;
  }
  .imgs{
    margin-top: 20px;
    img{
      width: 25px;
      height: 25px;
      margin: 0 5px;
    }
  }
}
.company-mes{color:rgba(255,255,255,.5)}
.mes-line{
  text-align: center;
  // border: 1px solid rgba(255,255,255,.5);/*no*/
  margin: 15px 0;
}
.back-top{
  height: 30px;
  line-height: 30px;
  border: 1px solid rgba(255,255,255,.1);/*no*/
  margin: 15px 0;
  i{vertical-align: middle;}
}
.foot-links{
  text-align: center;
  li{
    display: inline-block;
    &:not(:last-child) a{
      border-right: 1px solid rgba(255,255,255,.5);/*no*/
    }
    a{
      padding: 0 10px;
      color:rgba(255,255,255,.5);
      line-height: 1;
    }
  }
}
.icon-white{
  fill:#fff;
}
</style>

<template>
  <footer class='tac'>
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
              <router-link :to='item1.url'>{{item1.title}}</router-link>
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
        <a href='#'><img src='/static/images/common/wx.jpg' alt=''></a>
        <a href='#'><img src='/static/images/common/wb.jpg' alt=''></a>
      </div>
    </section>
    <p class='mes-line'>
      <span>WHEN SAFETY MATTERS MOST</span>
    </p>
    <div class='back-top '>返回顶部 <i class="icon-ctrl"></i></div>
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
              url: 'news'
            }
          ],
          status: false
        },
        {
          title: '全选产品',
          url: '000',
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
              url: 'usualProblem'
            },
            {
              title: '配送服务',
              url: 'usualProbleml'
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
    }
  }
}
</script>
<style scoped lang='less'>
footer {
  background-color: #6a63aa;
  color: #fff;
  padding: 20px 40px 40px;
}
nav {
  margin-bottom: 30px;
}
.nav-title {
  height: 70px;
  line-height: 70px;
  width: 100%;
  font-size: 28px; /*px*/
  color: #fff;
  .icon-plus{font-size: 12px;/*no*/}

}
.nav-lists {
  padding-left: 10px;
}
.nav-lists li {
  padding: 18px 0;
  a {
    color: #fff;
    padding-left: 40px;
  }
}

.contact{
  position: relative;
  padding: 40px 0 20px;
  .contact-title{
    position: absolute;
    top: -18px;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 180px;
    font-size: 28px; /*px*/
    background-color: #6a63aa;
  }
  .tel,.mail{
    color:#fff;
  }
  .imgs{
    margin-top: 20px;
    img{
      width: 40px;
      height: 40px;
      margin: 0 5px;
    }
  }
}
.company-mes{color:rgba(255,255,255,.5)}
.mes-line{
  text-align: center;
  // border: 1px solid rgba(255,255,255,.5);/*no*/
  margin: 30px 0;
}
.back-top{
  height: 60px;
  line-height: 60px;
  border: 1px solid rgba(255,255,255,.1);/*no*/
  margin: 30px 0;
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

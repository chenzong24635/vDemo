<template>
  <div class="container clearfix">
    <div class="cover" @click="close" v-show="asideNav"></div>
    <header class="flex01" id="header">
      <img class="tab" @click="aside" src="/static/images/common/bar.png" alt="">
      <router-link to="/"><img class="logo" src="/static/images/common/logo.png" alt=""></router-link>
      <div  class="search" @click="searchBox"><icon type="search"></icon></div>
      <!-- <img src="../assets/images/common/search.png" alt=""> -->
    </header>
    <div class="search-box vux-1px-t" v-if="searchShow">
      <input type="text">
    </div>
    <aside class="aside-nav" v-show="asideNav">
      <div class="close"><img src="/static/images/common/bar-close.jpg" alt=""  @click="close"></div>
      <div class="nav-top" @click="close"><router-link to="/shoppe">专柜导航</router-link></div>
      <nav>
        <ul>
          <li v-for="(item, index) in navs" :key="index" >
            <p class="nav-title vux-1px-b" @click="navListsSHow(index)"><x-icon type="ios-minus-empty" size="25"></x-icon>{{item.title}}</p>
            <ul class="nav-lists" v-show="item.status">
              <li v-for="(item1, index1) in item.lists" :key="index1" @click="close">
                <router-link :to="{name:item1.name, params:{pid:item1.pid}}" class="nav-link vux-1px-b" >{{item1.title}}</router-link>
                <!-- <router-link :to="{path:item1.name, query:{pid:item1.pid}}" class="nav-link vux-1px-b" >{{item1.title}}</router-link> -->
                <!-- <div class="nav-link vux-1px-b" @click="link(item1, index1)">{{item1.title}}</div> -->
                </li>
            </ul>
          </li>
        </ul>
      </nav>
    </aside>
  </div>
</template>
<script>
import {Icon} from 'vux'
export default {
  name: '',
  directives: {
  },
  components: {
    Icon
  },
  data () {
    return {
      searchShow: false,
      asideNav: false,
      navs: [
        {
          title: '关于Belli',
          lists: [
            {
              title: '品牌故事',
              name: 'story',
              path: 'story'
            },
            {
              title: '安全筛选',
              name: 'safe',
              path: 'safe'
            },
            {
              title: 'Belli在美国',
              name: 'america',
              path: 'america'
            },
            {
              title: 'Belli在中国',
              name: 'china',
              path: 'china'
            }
          ],
          status: false
        },
        {
          title: '全选产品',
          lists: [
            {
              title: '妈妈系列',
              name: 'product',
              path: 'product',
              pid: 105
            },
            {
              title: '婴幼儿系列',
              name: 'product1',
              path: 'product1',
              pid: 106
            }
          ],
          status: false
        },
        {
          title: '孕期护理',
          lists: [
            {
              title: '孕纹防护专题',
              name: 'yunwen',
              path: 'yunwen'
            },
            {
              title: '面部护理专题',
              name: 'facial',
              path: 'facial'
            }
          ],
          status: false
        },
        {
          title: '婴幼儿护理',
          lists: [
            {
              title: '宝宝洗护专题',
              name: 'baby',
              path: 'baby'
            }
          ],
          status: false
        },
        {
          title: '品牌动态',
          lists: [
            {
              title: '品牌资讯',
              name: 'news',
              path: 'news',
              pid: 1
            },
            {
              title: '优生优育',
              name: 'news',
              path: 'news',
              pid: 2
            },
            {
              title: '孕期百科',
              name: 'news',
              path: 'news',
              pid: 3
            }
          ],
          status: false
        },
        {
          title: '会员服务',
          lists: [
            {
              title: '正品验证',
              name: 'qualityTest',
              path: 'qualityTest'
            },
            {
              title: '试用中心',
              name: 'trail',
              path: 'trail'
            }
          ],
          status: false
        }
      ]
    }
  },
  methods: {
    link (item, index) { // 产品详情
      console.log(index, item)
      this.$router.push({name: item.name, params: {'pid': item.pid}})
    },
    searchBox () { // 搜索框
      this.searchShow = !this.searchShow
    },
    aside () { // 侧边栏显隐
      if (this.asideNav) {
        this.close()
      } else {
        this.open()
      }
    },
    open () { // 侧边栏打开
      this.asideNav = true
      // this.searchShow = true
      document.querySelector('html').style.cssText += 'overflow-y:auto;'
      document.querySelector('body').style.cssText += 'overflow-y:auto;'
      document.querySelector('#app').style.left = '6rem'
      document.querySelector('header').style.left = '6rem'
    },
    close () { // 侧边栏关闭
      this.asideNav = false
      this.searchShow = false
      document.querySelector('html').style.cssText += 'overflow-y:auto;'
      document.querySelector('body').style.cssText += 'overflow-y:auto;'
      document.querySelector('#app').style.left = 0
      document.querySelector('header').style.left = 0
    },
    navListsSHow (navIndex) { // navBar 点击下拉
      this.navs.filter((item, index) => {
        if (index === navIndex) {
          let result = item.status = !item.status
          return result
        }
        console.log(item, index)
      })
    }
  }
}
</script>
<style scoped lang="less">
@baseBgC:#6a63aa;
.cover{
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0);
}
header{
  box-sizing: border-box;
  position: fixed;
  top:0;
  left: 0;
  width: 100%;
  padding: 0 40px;
  height: 120px;
  background-color: #6a63aa;
  z-index: 99;
  .tab{
    width: 44px;
    height: 34px;
  }
  .logo{
    width: 160px;
    height: 58px;
  }
  .search /deep/{
    i{font-size: 40px;color:#fff;}
  }
}
.search-box{
  background-color: #6a63aa;
  padding: 20px 60px;
  input{
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-indent: 16px;
    border-radius: 30px;
    background-color: #fff;
  }
}
.aside-nav{
  position: fixed;
  top: 0;
  left: 0;
  width: 6rem;
  height: 100%;
  font-size: 30px;
  overflow-y: scroll;
  background-color: @baseBgC;
  color:#fff;
  z-index: 9999;
  .close{
    height: 120px;
    line-height: 120px;
    padding: 0 40px;
    img{
      width: 36px;
      height: 36px;
      vertical-align: middle;
    }
  }
}
.nav-top{
  height: 100px;
  line-height: 100px;
  padding-left:80px;
  background: url('/static/images/common/guide.jpg')#8882bb no-repeat 40px center;
  background-size: 30px 42px;
  a{color:#fff;}
}
nav{
  .nav-title{
    // padding-left:80px;
    height: 120px;
    line-height: 120px;
    .vux-x-icon-ios-minus-empty{
      vertical-align: middle;
      fill:#fff;
      margin: 0 10px 0 60px;
    }
/*     background:url("/static/images/common/bar-icon-1.jpg")40px center no-repeat;
    background-size: 20px 2px; */
  }
  .nav-lists{
    background-color: #8882bb;
    padding-left: 30px;
    li:last-child  a:after{border-bottom: none;}
    a,.nav-link{
      padding-left:70px;
      height: 120px;
      line-height: 120px;
      color:#fff;
      // border-color:
    }
  }
}
</style>

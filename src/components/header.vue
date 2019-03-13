<template>
  <div class="container clearfix">
    <div class="cover" @click="close" v-show="asideNav"></div>
    <header class="flex01" id="header">
      <img class="tab" @click="aside" src="../assets/images/common/bar.png" alt="">
      <router-link to="/"><img class="logo" src="../assets/images/common/logo.png" alt=""></router-link>
      <div  class="search" @click="searchBox"><icon type="search"></icon></div>
      <!-- <img src="../assets/images/common/search.png" alt=""> -->
    </header>
    <div class="search-box vux-1px-t" v-if="searchShow">
      <input type="text" autofocus  v-model="searchValue" @input="searchIpt" @keyup.enter="submit" />
    </div>
    <aside class="aside-nav" v-show="asideNav">
      <div class="close"><img src="../assets/images/common/bar-close.jpg" alt=""  @click="close"></div>
      <div class="nav-top" @click="close"><router-link to="/shoppe">专柜导航</router-link></div>
      <nav>
        <ul>
          <li v-for="(item, index) in navs" :key="index" >
            <p class="nav-title vux-1px-b" @click="navListsSHow(index)"><x-icon type="ios-minus-empty" size="25"></x-icon>{{item.title}}</p>
            <ul class="nav-lists" v-show="item.status">
              <li v-for="(item1, index1) in item.lists" :key="index1" @click="close">
                <router-link :to="{name:item1.name, params:{pid:item1.pid,val: 'null'}}" class="nav-link vux-1px-b" >{{item1.title}}</router-link>
                <!-- <router-link :to="{path:item1.name, query:{pid:item1.pid}}" class="nav-link vux-1px-b" >{{item1.title}}</router-link> -->
                <!-- <div class="nav-link vux-1px-b" @click="link(item1, index1)">{{item1.title}}</div> -->
                </li>
            </ul>
          </li>
        </ul>
      </nav>
    </aside>
    <toast v-model="toastShow" type="cancel" position="middle">请填写搜索内容</toast>
    <!-- <div v-transfer-dom>
      <alert v-model="alertShow" title="请填写搜索内容">请填写搜索内容1</alert>
    </div> -->
  </div>
</template>
<script>
import {Icon, Toast, Alert, TransferDomDirective as TransferDom} from 'vux'
export default {
  name: '',
  directives: {
    TransferDom
  },
  components: {
    Icon,
    Toast,
    Alert
  },
  data () {
    return {
      toastShow: false,
      alertShow: false,
      searchValue: '',
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
              pid: 105,
              val: ''
            },
            {
              title: '婴幼儿系列',
              name: 'product1',
              path: 'product1',
              pid: 106,
              val: ''
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
    searchIpt () { // 搜索
      console.log(this.searchValue)
    },
    submit () {
      if (this.searchValue === '') {
        // alert(1)
        this.toastShow = true
        return false
      }
      this.searchShow = false
      this.searchValue = ''
      this.$router.push({name: 'product', params: {'pid': 0, 'val': this.searchValue}})
      console.log('sumit')
    },
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
  padding: 0 20px;
  height: 60px;
  background-color: #6a63aa;
  z-index: 99;
  .tab{
    width: 20px;
    // height: 34px;
  }
  .logo{
    width: 90px;
    // height: 58px;
  }
  .search /deep/{
    i{font-size: 20px;color:#fff;}
  }
}
.search-box{
  background-color: #6a63aa;
  padding: 10px 30px;
  input{
    width: 100%;
    height: 30px;
    line-height: 30px;
    text-indent: 16px;
    border-radius: 30px;
    background-color: #fff;
  }
}
.aside-nav{
  position: fixed;
  top: 0;
  left: 0;
  width: 200px;
  height: 100%;
  font-size: 15px;
  overflow-y: scroll;
  background-color: @baseBgC;
  color:#fff;
  z-index: 9999;
  .close{
    height: 60px;
    line-height: 60px;
    padding: 0 30px;
    img{
      width: 18px;
      height: 18px;
      vertical-align: middle;
    }
  }
}
.nav-top{
  height: 40px;
  line-height: 40px;
  padding-left:40px;
  background: url('../assets/images/common/guide.jpg')#8882bb no-repeat 20px center;
  background-size: 16px 22px;
  a{color:#fff;}
}
nav{
  .nav-title{
    // padding-left:80px;
    height: 55px;
    line-height: 55px;
    .vux-x-icon-ios-minus-empty{
      vertical-align: middle;
      fill:#fff;
      margin: 0 10px 0 15px;
    }
  }
  .nav-lists{
    background-color: #8882bb;
    padding-left: 20px;
    li:last-child  a:after{border-bottom: none;}
    a,.nav-link{
      padding-left:40px;
      height: 48px;
      line-height: 48px;
      color:#fff;
      // border-color:
    }
  }
}
</style>

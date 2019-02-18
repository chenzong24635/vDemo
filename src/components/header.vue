<template>
  <div class="container clearfix">
    <!-- <div class="cover" @click="close" v-show="coverShow"></div> -->
    <header class="flex01">
      <img class="tab" @click="aside" src="../assets/images/bar.png" alt="">
      <router-link to="/"><img class="logo" src="../assets/images/logo.png" alt=""></router-link>
      <img class="search" @click="searchBox" src="../assets/images/search.png" alt="">
    </header>
    <div class="search-box vux-1px-t" v-if="searchShow">
      <input type="text">
    </div>
    <aside class="aside-nav" v-show="asideNav">
      <div class="close"><img src="../assets/images/bar-close.jpg" alt=""  @click="close"></div>
      <div class="nav-top"><p>专柜导航</p></div>
      <nav>
        <ul>
          <li v-for="(item, index) in navs" :key="index" >
            <p class="nav-title vux-1px-b" @click="navListsSHow(index)">{{item.title}}</p>
            <ul class="nav-lists" v-show="item.status">
              <li v-for="(item1, index1) in item.lists" :key="index1" @click="close">
                <router-link :to="item1.url" class="vux-1px-b" >{{item1.title}}</router-link>
                <!-- <a class="vux-1px-b" :href="item1.url">{{item1.title}}</a> -->
                </li>
            </ul>
          </li>
        </ul>
      </nav>
    </aside>
  </div>
</template>
<script>
// import {} from 'vux'
export default {
  name: '',
  directives: {
  },
  components: {
  },
  data () {
    return {
      coverShow: false,
      searchShow: false,
      asideNav: false,
      navs: [
        {
          title: '关于Belli',
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
              title: 'Belli在美国',
              url: 'america'
            },
            {
              title: 'Belli在中国',
              url: 'china'
            }
          ],
          status: false
        },
        {
          title: '全选产品',
          lists: [
            {
              title: '妈妈系列',
              url: 'product'
            },
            {
              title: '婴幼儿系列',
              url: 'product1'
            }
          ],
          status: false
        },
        {
          title: '孕期护理',
          lists: [
            {
              title: '孕纹防护专题',
              url: 'yunwen'
            },
            {
              title: '面部护理专题',
              url: 'facial'
            }
          ],
          status: false
        },
        {
          title: '婴幼儿护理',
          lists: [
            {
              title: '宝宝洗护专题',
              url: 'baby'
            }
          ],
          status: false
        },
        {
          title: '品牌动态',
          lists: [
            {
              title: '品牌资讯',
              url: 'news'
            },
            {
              title: '优生优育',
              url: 'news'
            },
            {
              title: '孕期百科',
              url: 'news?id=2'
            }
          ],
          status: false
        },
        {
          title: '会员服务',
          lists: [
            {
              title: '正品验证',
              url: 'qualityTest'
            },
            {
              title: '试用中心',
              url: 'trailCenter'
            }
          ],
          status: false
        }
      ]
    }
  },
  methods: {
    searchBox () { //  搜索框
      this.searchShow = !this.searchShow
    },
    aside () { // 侧边nav显隐
      let leftSzie = 0
      let txt = 'overflow-y:hidden;'
      this.asideNav = !this.asideNav
      this.coverShow = !this.coverShow
      if (this.asideNav) {
        leftSzie = '6rem'
      } else {
        txt = 'overflow-y:auto;'
      }
      document.querySelector('html').style.cssText += txt
      document.querySelector('body').style.cssText += txt
      document.querySelector('#app').style.left = leftSzie
      document.querySelector('header').style.left = leftSzie
    },
    close () {
      this.coverShow = false
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
  display: none;
  z-index: 999;
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
  .search{
    width: 40px;
    height: 44px;
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
  background: url('../assets/images/guide.jpg')#8882bb no-repeat 40px center;
  background-size: 30px 42px;
}
nav{
  .nav-title{
    padding-left:80px;
    height: 120px;
    line-height: 120px;
    background:url("../assets/images/bar-icon-1.jpg")40px center no-repeat;
    background-size: 20px 2px;
  }
  .nav-lists{
    background-color: #8882bb;
    padding-left: 30px;
    li:last-child  a:after{border-bottom: none;}
    a{
      padding-left:70px;
      height: 120px;
      line-height: 120px;
      color:#fff;
      // border-color:
    }
  }
}
</style>

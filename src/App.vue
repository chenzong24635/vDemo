<template>
  <div id="app" :style=" $store.state.footerShow ? 'margin: 60px 0 50px;' : ''">
    <header-nav v-if="$store.state.headerShow"></header-nav>
    <div class="content-div">
      <!-- <transition name="slide" mode="out-in"> -->
        <!-- <keep-alive> -->
          <router-view></router-view>
        <!-- </keep-alive> -->
      <!-- </transition> -->
    </div>
    <bottom-mes v-if="$store.state.bottomShow"></bottom-mes>
    <footer-nav v-if="$store.state.footerShow"></footer-nav>
    <toast v-model="showToast" type="warn" width="45vw" :time="1000" text="您的账号被迫下线，请重新登录" :is-show-mask="true" position="middle"></toast>
    <!-- <mytoast :showToast="toast.showToast" :type="toast.type" :text="toast.toastText" :is-show-mask="true" ></mytoast> -->
  </div>
</template>
<script>
import HeaderNav from '@/components/header.vue'
import BottomMes from '@/components/bottom.vue'
import FooterNav from '@/components/FooterBar.vue'
import {Toast} from 'vux'
export default {
  name: 'app',
  components: {
    Toast,
    HeaderNav,
    BottomMes,
    FooterNav
  },
  data () {
    return {
      showToast: false,
      lists: [],
      lists1: []
    }
  },
  async created () { // 运费
    {
      let result = await this.axios.post(this.base_url + '/config/syssetlist')
      if (result.success) {
        let data = result.data
        sessionStorage.setItem('nofreight', data[0].value) // 满多少免运费
        sessionStorage.setItem('freight', data[1].value) // 运费
        localStorage.setItem('nofreight', data[0].value) // 满多少免运费
        localStorage.setItem('freight', data[1].value) // 运费
      }
    }
    { // faq列表 存入vux
      let _this = this
      await this.axios.get('web/fagclasslist').then(res => {
        if (res.success) {
          this.lists = res.data
          this.lists.map((item, index) => {
            item.show = false
          })
          this.lists = res.data
          this.$store.commit('getLists', res.data)
          return res.data
        }
      }).then((dataLists) => {
        dataLists.map((item, index) => {
          this.getFaqList(item.id)
        })
      }).catch(err => {
        console.log(err)
      })
    }
  },
  methods: {
    async getFaqList (id) {
      let _this = this
      await this.axios.get('web/faqlist/' + id).then(res => {
        if (res.success) {
          let lists = res.data
          lists.map((item, index) => {
            item.checked = false
            /* this.$store.commit('getLists1', item)
            _this.lists1.push(item) */
          })
          this.lists.map((item, index) => {
            if (item.id === id) {
              item.lists = lists
            }
          })
          console.log('this.lists', this.lists, lists)
        }
      })
      // console.log(_this.lists1, this.title)
    }
  }
}
</script>
<style lang="less">
@import '~vux/src/styles/1px.less';
@import '../src/assets/fonts/icomoon.css';
</style>
<style lang="less">
@color:#6a63aa;
@color1:#4b376e;

/* .slide{
  position: absolute;
}
.slide-enter-active {
  transition: all 0.5s ease;
}
.slide-leave-active {
  transition: all .1s;
}
.slide-enter, .slide-leave-to
{
  transform: translateX(50px);
  opacity: 0;
} */

html,body,div,p,span,ul,li,ol,blockquote,
header,section,aside,footer,main,article,
h1,h2,h3,h4,h5,h6,
textarea,input,label
{padding: 0;margin: 0;box-sizing:border-box;}
html,body{
  font-family: 'Microsoft YaHei';
  // font-size: 14px;
  font-size: 62.5%;
  color:#494949;
  line-height: 1.5;
  overflow-x: hidden;
  background-color: transparent;
}

.tac{text-align: center;}
.tal{text-align: left;}
.tar{text-align: right;}
.fl{float: left;}
.fr{float: right;}
.clearfix{ zoom:1;}
.clearfix:before,
.clearfix:after{
  content: '';
  display: block;
  clear: both;
  overflow: hidden;
  height: 0;
  line-height: 0;
}
a{
  display: inline-block;
  text-decoration: none;
  tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  -webkit-tap-highlight-color:transparent;
  cursor: pointer;
  color:#494949;
  span{color:#494949;}
}
#app{position: relative;}
ul{list-style: none;a{display: block;}}
input,button{
  padding: 0;
  border: 1px solid #eee;/*no*/
  &:focus{
    border: none;
    outline-offset: 0;
    outline: none;
  }
}
input,input:focus{
  border: 1px solid #eee;/*no*/
}
input.no,input.no:focus{
  border: none
}
::-webkit-input-placeholder {/* WebKit, Blink, Edge */
  color: #d3d2d2;
}
:-moz-placeholder {/* Mozilla Firefox 4 to 18 */
  color: #d3d2d2;
}
::-moz-placeholder { /* Mozilla Firefox 19+ */
  color: #d3d2d2;
}
:-ms-input-placeholder {/* Internet Explorer 10-11 */
  color: #d3d2d2;
}
button{
  border: none;
}
.flex01{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.flex01-1{
  display: flex;
  flex-direction: row;
  justify-content:flex-start;
  align-items: center;
}
.flex02{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.img-title{width: 100%;vertical-align: top;display: inline-block;}
.bb10{border-bottom: 10px solid #f7f7f7;}
.bt10{border-top: 10px solid #f7f7f7;}
.p10{padding: 10px;}
// 单行省略号
.ov1{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
// 多行省略号
.ov2{
  position: relative;
  /* height: 48px; */
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  /* 只适用于webkit内核*/
    -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  display: -moz-box;
  -moz-line-clamp: 2;
  /*! autoprefixer: off */
  -moz-box-orient: vertical;
  /* autoprefixer: on */
}

#lists{
  img[lazy=loading] {
    width: 10px!important;
    height: 10px!important;
  }
}

#check{
  margin: 20px 0;
  font-size: 12px;
  /deep/ .vux-check-icon > .weui-icon-success:before,
  /deep/ .vux-check-icon > .weui-icon-success-circle:before{
    color:@color;
  }
}
.vux-swiper .vux-swiper-item{
  overflow: hidden;
  .vux-img{
    transform:scale(1.1,1.1);
    -webkit-transition: all 0.4s ease 1.2s;
    -moz-transition: all 0.4s ease 1.2s;
    -ms-transition: all 0.4s ease 1.2s;
    -o-transition: all 0.4s ease 1.2s;
    transition: all 0.4s ease 1.2s;
  }
  &.active .vux-img{
    transition-delay: 0.4s;
    transform: scale(1,1);
    -webkit-transition: all 7.0s ease;
    -moz-transition: all 7.0s ease;
    -ms-transition: all 7.0s ease;
    -o-transition: all 7.0s ease;
    transition: all 7.0s ease;
  }
}
#swiper /deep/ .vux-img{
  background-size: 100% 100%;
}
#swiper /deep/ .dot0,
#swiper1 /deep/ .dot1{
  left: 0;
  right: 0;
  margin: 0 auto;
  text-align: center;
}
#swiper /deep/ .dot0 a,#swiper1 /deep/ .dot1 a{float: none;margin-left: 12px;}
#swiper /deep/  .vux-icon-dot{
  width: 30px;
  height: 1px;
  background-color: #f1f1f1;
}
#swiper /deep/  .vux-icon-dot.active{
  background-color: @color;
}
.swiper-hide{display: none;}
// .banner{width: 100%;vertical-align: top;}

.form-list{
  font-size: 15px;
  padding: 2px 0;
  /deep/ .weui-cells{
    margin-top: 10px;
    font-size: 15px;
    &:before{border-top: none;}
    &:after{
      border-bottom-color:@color1;
    }
    .weui-label{
      color:#595959;
    }
    .weui-cell{
      padding-left: 0;
      padding-right: 0;
    }
    .weui-input,.weui-input:focus{
      border: none;
      color:#595959;
    }
  }
}
div /deep/{
  .weui-dialog__btn_primary{color:@color;}
  .vux-flex-row{
    .img-title{
      max-width: 100%;
      max-height: 100%;
    }
  }
  .weui-loadmore{
    width: 98%;
  }
  .weui-cells{
    margin-top: 0;
    /deep/ .weui-textarea{
      font-size: 12px;
      font-family: 'Microsoft YaHei';
    }
  }
  .weui-icon_toast.weui-icon-success-no-circle:before{
    font-size: 40px;
  }
  .vux-tab-container{
    height:32px;
    .vux-tab{ height: 32px;}
    .vux-tab-item{
      line-height: 32px;
    }
  }
  .weui-btn_primary,.weui-btn_default{
    background-color: @color;
    border-radius:0;
    color: #fff;
    &:not(.weui-btn_disabled):active{
      background-color: @color;
      color: #fff;
    }
  }
  .weui-btn_disabled.weui-btn_primary{
    opacity: .6;
  }
  .weui-icon-success{
    color:@color;
  }
  .weui-icon-success,.weui-icon-circle{
    font-size: 18px;
  }
}
</style>

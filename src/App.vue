<template>
  <div id="app">
    <Header></Header>
    <div class="content-div">
      <router-view/>
    </div>
    <Bottom v-if="$store.state.bottomShow"></Bottom>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from '@/components/FooterBar.vue'
import Header from '@/components/header.vue'
import Bottom from '@/components/bottom.vue'
export default {
  name: 'app',
  components: {
    Footer,
    Bottom,
    Header
  }
}
</script>
<style lang="less">
@import '~vux/src/styles/1px.less';
@import '../src/assets/fonts/icomoon.css';
</style>
<style lang="less">
@baseBgC:#6a63aa;
html,body,div,p,span,ul,li,ol,blockquote,
header,section,aside,footer,main,article
{padding: 0;margin: 0;}
html,body{
  font-size: 62.5%;
  color:#000;
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
  text-decoration: none;
  tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  -webkit-tap-highlight-color:transparent;
  cursor: pointer;
}
#app{ margin: 120px 0 90px;position: relative;}
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
  -moz-box-orient: vertical;
}
div  /deep/ .weui-loadmore{
  width: 98%;
  font-size: 16px/*no*/;
  .weui-loading{
    width: 40px;
    height: 40px;
  }
}

.img-title{width: 100%;vertical-align: top;}
.swiper img{
  width: 100%;
  height: 100%;
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
  width: 50px;
  height: 2px;
  background-color: #f1f1f1;
}
#swiper /deep/  .vux-icon-dot.active{
  background-color: @baseBgC;
}
.swiper-hide{display: none;}
// .banner{width: 100%;vertical-align: top;}
</style>

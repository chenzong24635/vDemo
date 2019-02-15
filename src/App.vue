<template>
  <div id="app">
    <header-bar></header-bar>
    <div class="content-div">
      <router-view/>
    </div>
    <footer-bar></footer-bar>
  </div>
</template>

<script>
import Footer from './components/FooterBar.vue'
import Header from './components/header.vue'
export default {
  name: 'app',
  components: {
    'footer-bar': Footer,
    'header-bar': Header
  }
}
</script>
<style lang="less">
@import '~vux/src/styles/1px.less';
</style>
<style lang="less">
@baseBgC:#6a63aa;
html,body,div,p,span,ul,li,ol,
header,section,aside,footer,main,article
{padding: 0;margin: 0;}
html,body{
  font-size: 62.5%;
}
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
a{text-decoration: none;}
#app{ margin-bottom: 80px;position: relative;}
ul{list-style: none;a{display: block;}}
input{
  border: none;
  &:focus{
    border: none;
    outline-offset: 0;
    outline: none;
  }
}
.flex01{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.flex02{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
</style>

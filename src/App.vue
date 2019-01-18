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

<style >
html,body,div,p,span
{padding: 0;margin: 0;}
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
.content-div {
  margin-bottom: 0.5rem;
}
</style>

<template>
  <tabbar id="foot-bar" class="clearfix" >
    <tabbar-item link="/" :selected="$route.path == '/'">
      <img slot="icon" src="../assets/icon/01.png">
      <img slot="icon-active" src="../assets/icon/01-2.png">
      <span slot="label">首页</span>
    </tabbar-item>
    <tabbar-item link="/trail" :selected="$route.path == '/trail'">
      <img slot="icon" src="../assets/icon/02.png">
      <img slot="icon-active" src="../assets/icon/02-2.png">
      <span slot="label">试用</span>
    </tabbar-item>
    <tabbar-item link="/shoppe" :selected="$route.path == '/shoppe'">
      <img slot="icon" src="../assets/icon/03.png">
      <img slot="icon-active" src="../assets/icon/03-2.png">
      <span slot="label">专柜导航</span>
    </tabbar-item>
    <tabbar-item link="/cart" :selected="$route.path == '/cart'">
      <img slot="icon" src="../assets/icon/04.png">
      <img slot="icon-active" src="../assets/icon/04-2.png">
      <span slot="label">购物袋</span>
    </tabbar-item>
    <tabbar-item link="/my" :selected="$route.path == '/my'">
      <img slot="icon" src="../assets/icon/05.png">
      <img slot="icon-active" src="../assets/icon/05-2.png">
      <span slot="label">我的</span>
    </tabbar-item>
  </tabbar>
</template>
<style>
</style>
<script>
import { Tabbar, TabbarItem, Group, Cell } from 'vux'

export default {
  components: {
    Tabbar,
    TabbarItem,
    Group,
    Cell
  }
}
</script>
<style lang="less" scoped>
  #foot-bar{
    position: fixed;
    box-sizing: border-box;
    padding: 8px 10px;
    background: url(../assets/images/common/b-bg.jpg) no-repeat center;
    background-size: 100% 100%;
    span{
      color:#7d7d7d;
    }
    /deep/ .weui-tabbar__icon{
      width: 30px;
      height: 30px;
    }
    .weui-bar__item_on{
      span{color:#655fa1}
    }
  }
</style>

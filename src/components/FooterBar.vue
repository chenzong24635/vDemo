<template>
  <tabbar id="foot-bar" class="clearfix" >
    <tabbar-item link="/" selected>
      <img slot="icon" src="../assets/icon/01.png">
      <img slot="icon-active" src="../assets/icon/01-2.png">
      <span slot="label">首页</span>
    </tabbar-item>
    <tabbar-item link="/trail">
      <img slot="icon" src="../assets/icon/02.png">
      <img slot="icon-active" src="../assets/icon/02-2.png">
      <span slot="label">试用</span>
    </tabbar-item>
    <tabbar-item link="/shoppe">
      <img slot="icon" src="../assets/icon/03.png">
      <img slot="icon-active" src="../assets/icon/03-2.png">
      <span slot="label">专柜导航</span>
    </tabbar-item>
    <tabbar-item link="/cart">
      <img slot="icon" src="../assets/icon/04.png">
      <img slot="icon-active" src="../assets/icon/04-2.png">
      <span slot="label">购物袋</span>
    </tabbar-item>
    <tabbar-item link="/my">
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
    padding: 4px 20px;
    background: url(../assets/images/b-bg.jpg) no-repeat center;
    background-size: 100% 100%;
    span{
      color:#7d7d7d;
    }
    .weui-tabbar__icon{
      width: 20px;
      height: 20px;
    }
    .weui-bar__item_on{
      span{color:#655fa1}
    }
  }
</style>

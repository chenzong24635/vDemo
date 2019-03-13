<template>
  <div class="">
    <router-link to="/login">login</router-link>
    <section class="avatar tac">
      <div class="avatar-img">
        <img src="../../assets/images/my/avatar.png" alt="">
      </div>
      <p class="fakename">会员88888</p>
      <p class="gradeid"><span>一级</span></p>
    </section>
    <section class="tab">
      <tab bar-active-color="#522d6d" :line-width="2" >
        <tab-item @on-item-click="tab(item, index)" v-for="(item, index) in tabs" :key="index" :selected="index===0"> <!--  -->
          {{item}}
        </tab-item>
      </tab>
    </section>
  </div>
</template>
<script>
import {Tab, TabItem} from 'vux'
export default {
  name: '',
  components: {
    Tab,
    TabItem
  },
  data () {
    return {
      tabs: ['我的订单', '积分订单', '试用订单']
    }
  },
  methods: {}
}
</script>
<style scoped lang="less">
.avatar{
  background: url(../../assets/images/my/top-bg.png)center no-repeat;
  background-size: contain;
  padding: 20px 0;
  height: 140px;
  color: #fff;
  text-align: center;
  .avatar-img img{
    width: 80px;
    height: 80px;
  }
  .fakename{
    font-size: 16px;
    margin: 6px 0;
  }
  .gradeid{
    span{
      background: #6a63aa;
      padding: 2px 8px;
      border-radius: 6px;
      color: #fff;
    }
  }
}
</style>

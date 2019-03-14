<template>
  <div class="">
    <router-link to="/login">login</router-link>
    <!-- <router-link to="/resetPassword">resetPassword</router-link> -->
    <section class="avatar tac">
      <div class="avatar-img">
        <img src="../../assets/images/my/avatar.png" alt="">
      </div>
      <p class="fakename">会员88888</p>
      <p class="gradeid"><span>一级</span></p>
    </section>
    <section class="tabs vux-1px-b clearfix">
      <ul class="flex01-1">
        <li :class="[tabIndex === index ? 'active' : '', 'tab']" v-for="(item, index) in tabs" :key="index" @click="tab(index)">{{item}}</li>
      </ul>
    </section>
    <section class="tabs1 tac clearfix">
      <grid :show-vertical-dividers="false" :show-lr-borders="false">
        <grid-item  v-for="(item, index) in tabs1" :key="index">
          <img :src="item.img" alt="">
          <p><span>{{item.title}}</span><span class="nums">{{item.nums}}</span></p>
        </grid-item>
      </grid>
    </section>
    <section class="lists">
      <group>
        <cell :border-intent="false" :title="item.title" :link="item.url" is-link v-for="(item, index) in lists" :key="index">
          <!-- <router-link :to="item.url"> -->
            <img slot="icon" width="30" style="display:block;margin-right:10px;" :src="item.icon">
          <!-- </router-link> -->
        </cell>
      </group>
    </section>
  </div>
</template>
<script>
import {Tab, TabItem, Grid, GridItem, Group, Cell} from 'vux'
export default {
  name: '',
  components: {
    Tab,
    TabItem,
    Grid,
    GridItem,
    Group,
    Cell
  },
  data () {
    return {
      tabIndex: 0,
      tabs: ['我的订单', '积分订单', '试用订单'],
      tabs1: [
        {
          img: require('../../assets/images/my/vip1-1.png'),
          title: '代付款',
          nums: 11
        },
        {
          img: require('../../assets/images/my/vip1-2.png'),
          title: '待发货',
          nums: 0
        },
        {
          img: require('../../assets/images/my/vip1-3.png'),
          title: '待收货',
          nums: 0
        },
        {
          img: require('../../assets/images/my/vip1-4.png'),
          title: '已完成',
          nums: 0
        }
      ],
      lists: [
        {
          icon: require('../../assets/images/my/vip2-1.png'),
          title: '我的订单',
          url: 'order'
        },
        {
          icon: require('../../assets/images/my/vip2-2.png'),
          title: '试用订单',
          url: 'order'
        },
        {
          icon: require('../../assets/images/my/vip2-3.png'),
          title: '我的购物车',
          url: 'cart'
        },
        {
          icon: require('../../assets/images/my/vip2-4.png'),
          title: '我的积分',
          url: 'points'
        },
        {
          icon: require('../../assets/images/my/vip2-5.png'),
          title: '个人信息',
          url: 'detail'
        },
        {
          icon: require('../../assets/images/my/vip2-6.png'),
          title: '地址管理',
          url: 'address'
        },
        {
          icon: require('../../assets/images/my/vip2-7.png'),
          title: '修改密码',
          url: 'setPasword'
        }
      ]
    }
  },
  async created () {
    let result = await this.axios.post(this.base_url + 'member/detail')
    if (result.success) {

    } else {
      this.$router.path({})
    }
  },
  methods: {
    tab (index) {
      console.log(index)
      this.tabIndex = index
    }
  }
}
</script>
<style scoped lang="less">
@color:#6a63aa;
@color1:#4b376e;
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
.tabs{
  padding-top: 10px;
  &.vux-1px-b:after{
    border-bottom-color: @color1;
  }
  .tab{
    font-size: 15px;
    margin: 0 20px;
    padding: 4px 0;
    border-bottom: 2px solid transparent;
    &.active{
      color: @color;
      border-bottom-color: @color;
    }
  }
}
.tabs1{
  border-bottom: 10px solid #f7f7f7;
  .weui-grid{
    padding: 10px;
  }
  img{
    width: 38px;
    height: 38px;
  }
  span{
    color:#494949;
    &.nums{
      color:@color;
    }
  }
}
.lists{
  /deep/ .weui-cells{
    margin-top: 0;
    .vux-label{
      font-size: 15px;
    }
  }
}
</style>

<template>
  <div class="">
    <!-- <router-link to="/login">login</router-link> -->
    <!-- <router-link to="/resetPassword">resetPassword</router-link> -->
    <section class="avatar tac">
      <div class="avatar-img">
        <img :src="detail.pic" alt="">
      </div>
      <p class="fakename">{{detail.gradeName}}</p>
      <p class="gradeid"><span>{{detail.gradeid}}级</span></p>
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
        <cell :border-intent="false" :title="item.title" :link="{name: item.url, params: {type: item.type, id: item.id}}" is-link v-for="(item, index) in mylists" :key="index">
          <!-- <router-link :to="item.url"> -->
            <img slot="icon" width="30" style="display:block;margin-right:10px;" :src="item.icon">
          <!-- </router-link> -->
        </cell>
      </group>
    </section>
    <toast v-model="toastData.isShow" :type="toastData.type" :text="toastData.text" width="130px" :time="1000"  :is-show-mask="true" position="middle"></toast>
    <!-- <mytoast :showToast="toast.showToast" :type="toast.type" :text="toast.toastText" :is-show-mask="true" ></mytoast> -->
  </div>
</template>
<script>
import {Toast, Tab, TabItem, Grid, GridItem, Group, Cell} from 'vux'
// import mytoast from '@/components/toast.vue'

export default {
  name: '',
  components: {
    Toast,
    Tab,
    TabItem,
    Grid,
    GridItem,
    Group,
    Cell
  },
  data () {
    return {
      toastData: {
        isShow: false,
        type: 'warn',
        text: '您的账号被迫下线，请重新登录'
      },
      json: {
        order: 'ASC',
        pageNum: 1,
        pageSize: 100,
        status: 0,
        typeid: 1
      },
      orderUrl: 'order/orderlist',
      tabIndex: 0,
      tabs: ['我的订单', '积分订单', '试用订单'],
      tabs1: [
        {
          id: 1,
          img: require('../../assets/images/my/vip1-1.png'),
          title: '代付款',
          nums: 11
        },
        {
          id: 3,
          img: require('../../assets/images/my/vip1-2.png'),
          title: '待发货',
          nums: 0
        },
        {
          id: 4,
          img: require('../../assets/images/my/vip1-3.png'),
          title: '待收货',
          nums: 0
        },
        {
          id: 5,
          img: require('../../assets/images/my/vip1-4.png'),
          title: '已完成',
          nums: 0
        }
      ],
      orderLens: [],
      mylists: [
        {
          icon: require('../../assets/images/my/vip2-1.png'),
          title: '我的订单',
          url: 'order',
          type: 1,
          id: 0
        },
        {
          icon: require('../../assets/images/my/vip2-2.png'),
          title: '试用订单',
          url: 'order',
          type: 3,
          id: 0
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
          url: 'address/0'
        },
        {
          icon: require('../../assets/images/my/vip2-7.png'),
          title: '修改密码',
          url: 'changePassword'
        }
      ],
      detail: {}
    }
  },
  async created () {
    let result = await this.axios.post('member/detail')
    if (result.success) {
      this.detail = result.data
    } else {
      this.toastData.isShow = true
      // this.toast.toastText = result.message
      setTimeout(() => {
        this.$router.push({name: 'login'})
      }, 1000)
    }
    this.getOrderLens()
  },
  methods: {
    tab (index) {
      console.log(index)
      this.tabIndex = index
      if (index === 0) { // 我的订单
        this.orderUrl = 'order/orderlist'
        this.json.typeid = 1
      } else if (index === 1) { // 积分订单
        this.orderUrl = 'order/orderintegrallist'
        this.json.typeid = 1
      } else if (index === 2) { // 试用订单
        this.orderUrl = 'order/orderlist'
        this.json.typeid = 3
      }
      this.getOrderLens()
    },
    async getOrderLens () {
      // typeid 分类 1普通订单（我的订单、积分订单）、 3试用订单、 0全部 、(2经销商
      // status: 订单状态（0全部，1待付款，2已付款，3已配货，4已发货，5确认收货，10取消订单）
      // status只用到 1、2、4、5
      console.log(this.orderUrl)
      let result = await this.axios.post(this.orderUrl, this.json)
      if (result.success) {
        let lists = result.data.list // 0全部
        console.log(lists)
        this.tabs1.map((item, index) => {
          item.nums = 0
        })
        lists.map((item, index) => {
          switch (item.status) {
            case 1:
              this.tabs1[0].nums++
              break
            case 2:
              this.tabs1[1].nums++
              break
            case 4:
              this.tabs1[2].nums++
              break
            case 5:
              this.tabs1[3].nums++
              break
            default: break
          }
        })
        console.log(this.tabs1)
        /* this.lists.map((item, index) => {
          switch (item.status){
            case 1:

              break
          }
        }) */
        /* console.log('1普通订单:', list1, list2, list3)
        console.log('2经销商:', list1, list2, list3)
        console.log(this.orderLens) */
      }
    }
  }
}
</script>
<style scoped lang="less">
@color:#6a63aa;
@color1:#4b376e;
.avatar{
  background: url(../../assets/images/my/top-bg.png)center no-repeat;
  background-size: cover;
  padding: 20px 0;
  color: #fff;
  text-align: center;
  .avatar-img img{
    width: 80px;
    height: 80px;
    border-radius: 50%;
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

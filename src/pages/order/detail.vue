<template>
  <div class="">
    <section class="status tac flex01 bb10">
      <img src="../../assets/images/order/order-status.png" alt="">
      <span>订单状态：</span>
      <span v-if="data.status === 1">未付款，请尽快去付款！</span>
      <span v-else-if="data.status === 2">已付款，等待卖家配货！</span>
      <span v-else-if="data.status === 3">已配货，等待卖家发货！</span>
      <span v-else-if="data.status === 4">已发货，等待买家确认收货！</span>
      <span v-else-if="data.status === 5">已确认收货！</span>
      <span v-else-if="data.status === 10">订单已被取消！</span>
    </section>
    <section class="bb10">
      <p class="p5-20 vux-1px-b">订单编号：{{data.orderid}}</p>
      <div class=" p5-20">
        <p class="flex01">
          <span>收件人：{{data.recive}}</span>
          <span>{{data.mobile}}</span>
        </p>
        <p>{{data.pname}}{{data.cname}}{{data.rname}}{{data.address}}</p>
      </div>
    </section>
    <section class="bb10" v-if="data.invoice">
      <p class="p5-20 vux-1px-b">发票类型：{{data.invoicebank}}</p>
      <p class="p5-20 vux-1px-b">发票抬头：{{data.invoicetitle}}</p>
      <p class="p5-20">发票内容：{{data.invoicecontext}}</p>
    </section>
    <section class="bb10">
      <ul class="">
        <li v-for="(item, index) in data.orderprolist" :key="index" class="list1 vux-1px-b">
          <flexbox>
            <flexbox-item :span="3">
              <router-link  class="flex-demo" :to="{name: 'productDetail', params: {type: type, id: item.pid}}">
                <img class="img-title" :src="item.pic" onerror="this.src='static/images/errorImg.jpg'">
              </router-link>
            </flexbox-item>
            <flexbox-item :span="7">
              <p class="ptitle">{{item.ptitle}}</p>
              <p class="type">{{item.type}}</p>
            </flexbox-item>
            <flexbox-item :span="2">
              <div class="flex-demo">
                <p v-if="type === 2">{{item.amount / item.num}}积分</p>
                <p v-else>￥{{item.amount / item.num}}</p>
                <p class="flex01-1"><x-icon type="ios-close-empty" size="20"></x-icon>{{item.num}}</p>
              </div>
            </flexbox-item>
          </flexbox>
        </li>
      </ul>
      <p  class="p5-20 tar">
        共{{data.orderLength}}件商品 实付
        <span v-if="type === 2">积分</span>
        <span v-else>金额</span>：{{data.payamount}}
        <span v-if="data.amount <= nofreight ">(含运费：{{freight}})</span>
      </p>
    </section>
    <section class="bb10">
      <p class="p5-20">买家留言：{{data.buyer}}</p>
    </section>
    <section class="createDate">
      <p class="p5-20">成交时间：<span>{{data.createDate}}</span></p>
    </section>
  </div>
</template>
<script>
import { dateFormat, Toast, TransferDomDirective as TransferDom, Confirm, Flexbox, FlexboxItem, Checker, CheckerItem, XButton, XInput, Group, XTextarea, Icon, LoadMore } from 'vux'
export default {
  directives: {
    TransferDom
  },
  components: {
    dateFormat,
    Toast,
    Confirm,
    Flexbox,
    FlexboxItem,
    Checker,
    CheckerItem,
    XButton,
    XInput,
    Group,
    XTextarea,
    Icon,
    LoadMore
  },
  data () {
    return {
      nofreight: localStorage.getItem('nofreight') || '',
      freight: localStorage.getItem('freight') || '',
      type: '',
      id: '',
      url: '',
      data: {}
    }
  },
  created () {
    let type = this.$route.params.type / 1 // 订单类型: 1(普通产品) 、2(积分)、 3(试用
    let id = this.$route.params.id // 订单id
    let url = ''
    this.type = type
    if (type === 2) { // 积分订单
      url = 'order/orderintegraldetail/'
    } else {
      url = 'order/orderdetail/'
    }
    this.getDetail(url, id)
  },
  methods: {
    getDetail (url, id) {
      this.axios.get(url + id).then((response) => {
        if (response.success) {
          let data = response.data
          data.createDate = dateFormat(data.createDate, 'YYYY-MM-DD HH:mm:ss')
          if (this.type !== 2) {
            if (data.orderprolist.length > 0) {
              data.orderLength = data.orderprolist.length
              data.orderprolist.map((item, index) => {
                item.pic = this.base_img + item.pic
                switch (item.types / 1) {
                  case 0: item.type = ''
                    break
                  case 1: item.type = '满赠'
                    break
                  case 2: item.type = '买赠'
                    break
                  default: break
                }
              })
            }
          } else { // 积分
            data.orderLength = 1
            data.payamount = data.integral
            data.orderprolist = [{
              pid: data.proid,
              pic: this.base_img + data.propic,
              num: data.pronumber,
              ptitle: data.proname,
              amount: data.integral
            }]
          }
          this.data = data
        }
      })
    }
  }
}
</script>
<style scoped lang="less">
.p5-20{
  padding: 5px 20px;
}
.status{
  padding: 16px 0;
  justify-content: center;
  img{
    width: 32px;
    height: 32px;
    margin-right: 15px;
  }
}
.createDate{
  padding: 10px 0;
  min-height: 80px;
  span{color:#a5a5a5}
}
.list1{
  padding: 8px 10px;
}
</style>

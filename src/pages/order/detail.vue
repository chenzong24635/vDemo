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
  </div>
</template>
<script>
export default {
  name: '',
  components: {},
  data () {
    return {
      type: '',
      id: '',
      url: '',
      data: {}
    }
  },
  created () {
    let type = this.$route.params.type / 1 // 订单类型：产品订单、积分订单
    let id = this.$route.params.id // 订单id
    let url = ''
    if (type === 2) { // 积分订单
      url = 'order/orderintegraldetail/'
    } else {
      url = 'order/orderdetail/'
    }
    this.getDetail (url, id)
  },
  methods: {
    getDetail (url, id) {
      this.axios.get(url + id).then((response) => {
        if (response.success) {
          this.data = response.data
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
</style>

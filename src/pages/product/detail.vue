<template>
  <div class="">
    <img :src="data.pic" alt="" class="img-title">
    <h1 class="title">{{data.title}}</h1>
    <div class="top-mes">
      <p class="subtitle ov1">功效：{{data.subtitle}}</p>
      <p class="gg">规格：{{data.gg}}</p>
      <p class="amount">价格：￥{{data.amount}}</p>
      <div class="activity">活动：
        <p v-if="data.actcommgiftList.length <= 0">暂无</p>
        <ul v-else>
          
        </ul>
      </div>
      <p class="server">服务：满{{nofreight}}包邮</p>
    </div>
    <x-number title="" v-model="changeValue" :min="0" @on-change="change"></x-number>
  </div>
</template>
<script>
import {XNumber, Group} from 'vux'

export default {
  name: '',
  components: {
    XNumber,
    Group
  },
  data () {
    return {
      nofreight: '',
      changeValue: 0,
      data: {},
    }
  },
  created () {
    let id = this.$route.params.id / 1
    this.id = id
    this.nofreight = sessionStorage.getItem('nofreight')
    this.getDetail(id)
  },
  methods: {
    async getDetail (id) {
      let result = await this.axios.get(this.base_url + '/product/productdetail/' + id)
      if (result.success) {
        let data = result.data
        data.pic = this.base_img + data.pic
        this.data = data
      }
    },
    change (val) {
      console.log('change', val)
    }
  }
}
</script>
<style scoped lang="less">
.title{
  font-size: 46px;/*px*/
  font-weight: normal;
  padding: 0 40px;
  color:#4b376e;
}
.top-mes{
  padding: 10px 40px;
  color:#7c728d;
  &>p,&>div{
    margin-top: 8px;
  }
}
</style>

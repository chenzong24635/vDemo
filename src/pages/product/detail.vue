<template>
  <div class="" id="detail">
    <img :src="data.pic" alt="" class="img-title">
    <h1 class="title">{{data.title}}</h1>
    <div class="top-mes">
      <p class="subtitle ov1">功效：{{data.subtitle}}</p>
      <p class="gg">规格：{{data.gg}}</p>
      <p class="amount">价格：￥{{data.amount}}</p>
      <div class="activity">活动：
        <p class="zw" v-if="len <= 0">暂无</p>
        <ul v-else>

        </ul>
      </div>
      <p class="server">服务：满{{nofreight}}包邮</p>
      <group class="nums">
        <cell title="数量：">
          <inline-x-number style="display:block;" :min="0" width="50px" button-style="square"></inline-x-number>
        </cell>
        <!-- <x-number title="" v-model="changeValue" :min="0" @on-change="change"></x-number> -->
      </group>
    </div>
  </div>
</template>
<script>
import {Cell, InlineXNumber, Group} from 'vux'

export default {
  name: '',
  components: {
    Cell,
    Group,
    InlineXNumber
  },
  data () {
    return {
      nofreight: '',
      changeValue: 0,
      len: 0,
      data: {}
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
        this.len = data.actcommgiftList.length
        console.log(data.actcommgiftList.length)
      }
    },
    change (val) {
      console.log('change', val)
    }
  }
}
</script>
<style  lang="less">
@color:#6a63aa;
@color1:#4b376e;
#detail{
  .title{
    font-size: 20px;/*px*/
    font-weight: normal;
    padding: 0 20px;
    color:#4b376e;
  }
  .top-mes{
    padding: 5px 20px;
    color:#7c728d;
    &>p,&>div{
      margin-top: 5px;
    }
  }
  .zw{
    display: inline-block;
    padding: 0 0.1rem;
    margin: 0 0.14rem;
    color: #7c728d;
    border: 1px solid #7c728d;
  }
  .nums /deep/ {
    .vux-cell-primary{flex:none}
    .weui-cells:before,
    .weui-cells:after{
      border: none
    }
    .weui-cells{
      margin: 0;
      font-size: 12px;
      .weui-cell{
        padding: 0;
      }
    }
    .vux-number-input{
      font-size: 16px;
      padding: 0;
    }
    .vux-number-selector{
      padding: 0 4px;
      svg{
        fill:@color;
        width: 12px;
        height: 12px;
        line-height: 14px;
      }
    }
  }
}
</style>

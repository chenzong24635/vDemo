<template>
  <div class="" id="detail">
    <img :src="data.img" alt="" class="img-title">
    <h1 class="title">{{data.title}}</h1>
    <section class="top-mes">
      <p class="subtitle ov1">功效：{{data.subtitle}}</p>
      <p class="gg">规格：{{data.gg}}</p>
      <p v-if="type === 2" class="amount">积分兑换：<span>{{data.integral}}</span>分, 积分兑换不享受商城活动</p>
      <p v-else class="amount">价格：￥{{data.amount}}</p>
      <div v-if="type !== 2" class="activity">活动：
        <p class="zw" v-if="len <= 0">暂无</p>
        <ul v-else>
        </ul>
      </div>
      <p v-if="type !== 2" class="server">服务：满{{nofreight}}包邮</p>
      <group class="nums">
        <cell title="数量：">
          <inline-x-number @on-change="changeNumber" v-model="number" :min="1" width="50px" button-style="square"></inline-x-number>
        </cell>
        <!-- <x-number title="" v-model="changeValue" :min="0" @on-change="change"></x-number> -->
      </group>
    </section>
    <section class="detail">
      <h3 class="vux-1px-b">产品详情</h3>
      <ul>
        <li class="detail-list">
          <p class="detail-head"><span>主要功效</span></p>
          <div class="detail-mes" v-html="data.wap"></div>
        </li>
        <li class="detail-list">
          <p class="detail-head"><span>使用方法</span></p>
          <div class="detail-mes" v-html="data.usagemethod"></div>
        </li>
        <li class="detail-list">
          <p class="detail-head"><span>主要成分：</span></p>
          <div class="detail-mes" v-html="data.component"></div>
        </li>
        <li class="detail-list">
          <p class="detail-head"><span>全部成分：</span></p>
          <div class="detail-mes" v-html="data.ingredients"></div>
        </li>
      </ul>
      <div class="tip tip1">
        <div class="tip-box">
          <p class="tip-title">
            <span class="p1">健康贴士</span>
            <span class="p2">Health tips</span>
          </p>
          <div class="tip-mes" v-html="data.tips"></div>
        </div>
      </div>
      <div class="tip tip2">
        <div class="tip-box">
          <p class="tip-title">
            <span class="p1">美容提示</span>
            <span class="p2">Beauty tips</span>
          </p>
          <div class="tip-mes" v-html="data.beauty"></div>
        </div>
      </div>
    </section>
    <section v-if="type !== 2" class="btns flex01">
      <router-link to="/cart" class="btn btn1 flex02">
        <img src="../../assets/images/common/shop.jpg" alt="购物袋" title="购物袋">
        <p>购物袋</p>
      </router-link>
      <div @click="addCart(true)" class="btn btn2">加入购物袋</div>
      <div @click="buy" class="btn btn3">立即购买 </div>
    </section>
    <section v-else class="btns flex01"> <!-- 积分 -->
      <router-link to="/cart" class="btn btn1 flex02">
        <img src="../../assets/images/common/shop.jpg" alt="购物袋" title="购物袋">
        <p>购物袋</p>
      </router-link>
      <div @click="buyJf" class="btn btn3">立即购买 </div>
    </section>
    <toast v-model="toastData.isShow" :type="toastData.type" :text="toastData.text" width="45vw" :time="1000"  :is-show-mask="true" position="middle"></toast>
  </div>
</template>
<script>
import {Toast, Cell, InlineXNumber, Group} from 'vux'

export default {
  name: '',
  components: {
    Cell,
    Group,
    InlineXNumber,
    Toast
  },
  data () {
    return {
      type: '',
      url: 'product/productdetail/',
      toastData: {
        isShow: false,
        type: 'success',
        text: '已加入购物车'
      },
      id: '',
      number: 1,
      nofreight: '',
      changeValue: 0,
      len: 0,
      data: {}
    }
  },
  created () {
    console.log(this.$route)
    let id = this.$route.params.id
    let type = this.$route.params.type
    this.type = type
    if (type === 2) { // 积分
      this.url = 'product/prointegraldetail/'
    } else {
      this.url = 'product/productdetail/'
    }
    this.id = id
    this.nofreight = sessionStorage.getItem('nofreight')
    this.getDetail(id)
    console.log(this.type)
  },
  methods: {
    getDetail (id) {
      this.axios.get(this.url + id).then((result) => {
        if (result.success) {
          let data = result.data
          data.img = this.base_img + data.pic
          this.data = data
          if (this.type !== 2) {
            this.len = data.actcommgiftList.length
          } else { // 积分
            data.gg = data.ggvalue
          }
          console.log(result)
        }
      })
    },
    changeNumber (val) {
      this.number = val
      console.log('change', val)
    },
    addCart (isShowToast) { // 添加到购物车
      let data = this.data
      if (data.number > 0) {
        let json = {
          mid: localStorage.getItem('username'),
          number: this.number,
          proid: data.id,
          remarks: 2
        }
        this.axios.post('cart/cartInsert', json).then((result) => {
          console.log(result)
          if (result.success && isShowToast) { // 加入购物车btn
            this.toastData.isShow = true
          } else { // 立即购买btn
            this.data.proscar = result.data.id // 结算页面的json id参数值
            // 同步 详情页下单的数据与购物车下单 数据格式一致
            this.data.proname = this.data.title
            this.data.proskuname = this.data.ggvalue
            this.data.proamount = this.data.amount
            this.data.number = this.number
            sessionStorage.setItem('settleLists', JSON.stringify([this.data]))
            this.$router.push({name: 'Settle', params: {type: 1}})
          }
        })
      } else {
        console.log('售完')
      }
    },
    buy () { // 立即购买
      this.addCart(false)
    },
    buyJf () { // 积分购买
      let data = this.data
      console.log(data)
      if (data.number > 0) {
        data.proscar = data.id // 结算页面的json id参数值
        // 同步 详情页下单的数据与购物车下单 数据格式一致
        data.proname = data.title
        data.proskuname = data.ggvalue
        data.proamount = data.integral
        data.num = this.number
        data.number = this.number
        sessionStorage.setItem('settleLists', JSON.stringify([data]))
        console.log(data)
        this.$router.push({name: 'Settle', params: {type: 2}})
      } else {
        console.log('售完')
      }
    }
  }
}
</script>
<style lang="less">
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
      height: 22px;
      padding: 0;
    }
    .vux-number-selector{
      line-height: 14px;
      padding: 0 4px;
      svg{
        fill:@color;
        width: 12px;
        height: 12px;
        line-height: 14px;
      }
    }
  }
  .detail{
    border-top: 10px solid rgb(247,247,247);
    padding: 0 20px;
    h3{
      padding: 6px 0;
      font-weight: normal;
      color: @color;
    }
    .detail-head{
      margin-bottom: 6px;
      span{
        position: relative;
        padding-left: 6px;
        color: #494949;
        &:before{
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          margin: auto 0;
          height: 70%;
          width: 2px;
          background: #6a63aa;
        }
      }
    }
    .detail-list{
      margin: 10px 0 20px;
    }
    .detail-mes{
      white-space:normal;
      word-break:break-all;
      word-wrap:break-word;
      padding-left: 6px;
      line-height: 1.5;
    }
    .tip1:before{background: url('../../assets/images/product/en_03.png')no-repeat center;}
    .tip2:before{background: url('../../assets/images/product/r_03.png')no-repeat center;}
    .tip{
      position: relative;
      box-sizing: border-box;
      padding: 6px;
      background-color: #f3f3f8;
      margin-bottom: 20px;
      &:before{
        content: '';
        position: absolute;
        top: -10px;
        left: -10px;
        width: 30px;
        height: 30px;
        background-size: 100%;
      }
      .tip-title{margin-bottom: 6px;}
      .p1{
        color:@color;
      }
      .p2{
        font-size: 12px;
        color:#b0b1af;
      }
      .tip-box{
        padding: 10px;
        border: 1px solid  #a097c2;
      }
      .tip-mes{
        font-size: 13px;
        color: #717171;
      }
    }
  }

  .btns{
    position: fixed;
    left: 0;
    bottom: 50px;
    z-index: 9;
    width: 100%;
    background: #f9f9f9;
    text-align: center;
    .btn{display: block;}
    .btn1{
      flex: 1;
      font-size: 12px;
      img{
        width: 20px;
        height: 20px;
      }
    }
    .btn2{
      height: 50px;
      line-height: 50px;
      flex: 2;
      font-size: 15px;
      color: #6a63aa;
      background: #d6cfe4;
    }
    .btn3{
      height: 50px;
      line-height: 50px;
      flex: 2;
      font-size: 15px;
      color: #fff;
      background: #6a63aa;
    }
  }
}
</style>

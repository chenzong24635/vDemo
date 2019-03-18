<template>
  <div class="">
    <!-- type:1 详情页结算、 2：购物车结算 -->
    <router-link to="/address" id="address" class="flex01">
      <div class="address-l">
        <p class="flex01">
          <span class="name">姓名</span>
          <span class="phone">17855832016</span>
        </p>
        <p class="address">登出的发达</p>
      </div>
      <x-icon type="ios-arrow-right" size="25"></x-icon>
    </router-link>
    <div><img class="img-title" src="../../assets/images/common/bg1.png" alt=""></div>
    <section class="bb10">
      <ul id="lists">
        <li v-for="(item, index) in lists" :key="index" class="list vux-1px-b">
          <flexbox>
            <flexbox-item :span="3">
              <div class="flex-demo">
                <img class="img-title" :src="item.img" alt="">
              </div>
            </flexbox-item>
            <flexbox-item :span="7">
              <p>{{item.proname}}</p>
              <p class="gg">规格：{{item.proskuname}}</p>
            </flexbox-item>
            <flexbox-item :span="2">
              <div class="flex-demo">
                <p>￥{{item.proamount}}</p>
                <p class="flex01-1"><x-icon type="ios-close-empty" size="20"></x-icon>{{item.number}}</p>
              </div>
            </flexbox-item>
          </flexbox>
        </li>
      </ul>
    </section>
    <section id="invoice" class=" bb10">
      <div class='invoice vux-1px-b flex01-1'>
        <span>开具发票：</span>
        <checker v-model="json.invoice" radio-required default-item-class="selected0" selected-item-class="selected1">
          <checker-item value="yes">是</checker-item>
          <checker-item value="no">否</checker-item>
        </checker>
      </div>
      <div  v-show="json.invoice === 'yes'" >
        <div class='invoice vux-1px-b flex01-1'>
          <span>发票类型：</span>
          <checker v-model="billType" radio-required default-item-class="selected0" selected-item-class="selected1">
            <checker-item value="个人发票">个人发票</checker-item>
            <checker-item value="企业普通发票">企业普通发票</checker-item>
            <checker-item value="企业增值发票">企业增值发票</checker-item>
          </checker>
        </div>
        <div class='invoice vux-1px-b flex01-1'>
          <span>发票抬头：</span>
          <input class="no" type="text" :value="json.invoicetitle" placeholder="请输入发票抬头">
          <!-- <group>
            <x-input title="发票抬头：" v-model="json.invoicetitle" placeholder="请输入发票抬头"></x-input>
          </group> -->
        </div>
        <div class='invoice flex01-1'>
          <span>发票内容：</span>
          <input class="no" :value="json.invoicecontext" readonly type="text"  placeholder="请输入发票抬头">
        </div>
      </div>
      <group class="bt10">
        <x-textarea title="买家留言：" v-model="json.buyer"></x-textarea>
      </group>
    </section>
    <section class="js tar">
      <p class="p10 vux-1px-b">共{{lists.length}}件商品 合计：￥{{amounts}}</p>
      <p class="p10 vux-1px-b">运费：{{yunfei}}</p>
    </section>
    <section class="bottom1 flex01">
      <p class="flex01">
        <icon type="warn" ></icon>
        提示：实付满{{nofreight}}元 即赠免物流费
      </p>
      <router-link class="cd flex01" :to="{name: 'product', params:{pid: 0,val: 'null'}}">
        去凑单
        <x-icon type="ios-arrow-right" size="15"></x-icon>
      </router-link>
    </section>
    <section class="bottom2 flex01">
      <p class="amouts">
        合计￥<span>{{amouts}}</span>
      </p>
      <div class="settle flex01" >结算</div>
    </section>
  </div>
</template>
<script>
import { Flexbox, FlexboxItem, Checker, CheckerItem, XInput, Group, XTextarea } from 'vux'
export default {
  name: '',
  components: {
    Flexbox,
    FlexboxItem,
    Checker,
    CheckerItem,
    XInput,
    Group,
    XTextarea
  },
  data () {
    return {
      lists: [],
      amounts: 0,
      yunfei: 0,
      isBill: 'yes',
      billType: '个人发票',
      json: {
        addressid: '',
        buyer: '',
        invoice: 'yes',
        invoicebank: '',
        invoicecode: '',
        invoicetitle: '',
        invoicecontext: '化妆品',
        proid: '',
        proscar: '',
        source: 2
      }
    }
  },
  destroyed () { // 销毁时显示
    this.componentsShow(true)
  },
  mounted () { // 隐藏
    this.componentsShow(false)
  },
  created () {
    let lists = JSON.parse(sessionStorage.getItem('settleLists'))
    this.lists = lists
    this.amounts = lists.reduce((sum, item, index, array) => {
      console.log(sum, item, index, array)
      sum += item.proamount * item.number
      return sum
    }, 0)
    let nofreight = sessionStorage.getItem('nofreight') / 1
    if (this.amounts >= nofreight) {
      this.yunfei = 0
    } else {
      this.yunfei = nofreight
    }
    console.log(lists)
  },
  methods: {
    componentsShow (bool) {
      this.$store.state.bottomShow = bool
    },
    change (val) {
      console.log(val)
    }
  }
}
</script>
<style scoped lang="less">
@color:#6a63aa;
@color1:#4b376e;
#address{
  position: relative;
  font-size: 15px;
  padding:12px 20px;
  span{ font-size: 15px;}
  .address-l{width: 88%;}
  .address{
    font-size: 13px;
    margin-top: 8px;
  }
}
#lists{
  .list{
    padding: 0 10px;
    .gg{
      font-size: 12px;
    }
  }
}
.selected0{
  padding-left: 15px;
  margin-right: 6px;
  background: url('../../assets/images/common/radio1.jpg')no-repeat left center;
  background-size: 12px 12px;
  &.vux-tap-active:active{background-color: transparent;}
}
.selected1{
  background-image: url('../../assets/images/common/radio2.jpg');
}
#invoice{
  .invoice{
    font-size: 12px;
    padding: 10px 15px;
    input{width: 80%;}
  }
}
/deep/ .weui-label{
  font-size: 12px;
}
.js{margin-bottom: 128px;}
.bottom1{
  position: fixed;
  left: 0;
  bottom: 90px;
  box-sizing: border-box;
  width: 100%;
  padding: 10px;
  background-color: #fbf9fc;
  font-size: 12px;
  .cd {
    color: #f58989;
    path{fill: #f58989;}
  }
}
.bottom2{
  position: fixed;
  left: 0;
  bottom: 50px;
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  padding-left: 10px;
  background-color: #fbf9fc;
  .amouts span{
    font-size: 18px;
    color: @color;
  }
  .settle {
    text-align: center;
    color: #fff;
    height: 100%;
    padding: 0 50px;
    background: #6a63aa;
  }
}
</style>

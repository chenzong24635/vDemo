<template>
  <div class="">
    <!-- type:1 详情页结算、 2：购物车结算 3:试用下单-->
    <router-link :to="{name: 'address', params: {type: type}}" id="address" class="flex01">
      <div class="address-l">
        <p class="flex01">
          <span class="name">{{defaultAddress.recive}}</span>
          <span class="phone">{{defaultAddress.mobile}}</span>
        </p>
        <p class="address">{{defaultAddress.pname}}{{defaultAddress.cname}}{{defaultAddress.rname}}{{defaultAddress.address}}</p>
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
            <flexbox-item :span="6">
              <p>{{item.proname}}</p>
              <p class="gg">规格：{{item.proskuname}}</p>
            </flexbox-item>
            <flexbox-item :span="3">
              <div class="flex-demo">
                <p v-if="type !== 2">￥{{item.proamount}}</p>
                <p v-else>{{item.integral}}积分</p>
                <p class="flex01-1"><x-icon type="ios-close-empty" size="20"></x-icon>{{item.number}}</p>
              </div>
            </flexbox-item>
          </flexbox>
        </li>
      </ul>
    </section>
    <section v-if="type !== 2" id="invoice" class=" bb10"> <!--  -->
      <div class='invoice vux-1px-b flex01-1'>
        <span>开具发票：</span>
        <checker v-model="json.invoice" radio-required default-item-class="selected0" selected-item-class="selected1">
          <checker-item :value="1">是</checker-item>
          <checker-item :value="0">否</checker-item>
        </checker>
      </div>
      <div  v-show="json.invoice" >
        <div class='invoice vux-1px-b flex01-1'>
          <span>发票类型：</span>
          <checker v-model="json.invoicebank" radio-required default-item-class="selected0" selected-item-class="selected1">
            <checker-item value="个人发票">个人发票</checker-item>
            <checker-item value="企业普通发票">企业普通发票</checker-item>
            <checker-item value="企业增值发票">企业增值发票</checker-item>
          </checker>
        </div>
        <div class='invoice vux-1px-b flex01-1'>
          <span>发票抬头：</span>
          <input class="no" type="text" v-model="json.invoicetitle" placeholder="请输入发票抬头">
          <!-- <group>
            <x-input title="发票抬头：" v-model="json.invoicetitle" placeholder="请输入发票抬头"></x-input>
          </group> -->
        </div>
        <div class='invoice flex01-1'>
          <span>发票内容：</span>
          <input class="no" v-model="json.invoicecontext" readonly type="text"  placeholder="请输入发票内容">
        </div>
      </div>
    </section>
    <group class="">
      <x-textarea title="买家留言：" v-model="json.buyer"></x-textarea>
    </group>
    <section class=" js tar">
      <p class="bt10 bb10 p10">共{{lists.length}}件商品 合计：
        <span v-if="type !== 2">￥{{amounts}}</span>
        <span v-else>{{amounts}}积分</span>
      </p>
      <p v-if="type !== 2" class="bb10 p10 ">运费：{{freight}}</p>
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
      <p v-if="type !== 2" class="amounts">
        应付金额：￥<span>{{amounts}}</span>
      </p>
      <p v-else class="amounts">
        应付积分：<span>{{amounts}}</span>
      </p>
      <div @click="settle" class="settle flex01" >提交订单</div>
    </section>
    <toast v-model="toastData.isShow" :type="toastData.type" :text="toastData.text" width="45vw" :time="1000"  :is-show-mask="true" position="middle"></toast>
  </div>
</template>
<script>
import { Toast, Flexbox, FlexboxItem, Checker, CheckerItem, XInput, Group, XTextarea, Icon } from 'vux'
export default {
  name: '',
  components: {
    Toast,
    Flexbox,
    FlexboxItem,
    Checker,
    CheckerItem,
    XInput,
    Group,
    XTextarea,
    Icon
  },
  data () {
    return {
      type: '',
      ids: [],
      toastData: {
        isShow: false,
        type: 'success',
        text: '购买成功'
      },
      defaultAddress: {},
      lists: [],
      amounts: 0,
      freight: 0,
      nofreight: 0,
      isBill: 0,
      billType: '',
      json: {
        addressid: '',
        buyer: '',
        invoice: 0,
        invoicebank: '个人发票',
        invoicecode: '',
        invoicetitle: '',
        invoicecontext: '化妆品',
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
    // type:1 详情页结算、2:积分详情页结算、 3：购物车结算、 4:试用下单
    let type = this.$route.params.type / 1
    console.log(type, 'type')
    let lists = JSON.parse(sessionStorage.getItem('settleLists'))
    let address0 = JSON.parse(localStorage.getItem('defaultAddress'))
    this.type = type
    if (address0) {
      this.defaultAddress = address0
    } else {
      this.getAddressList()
    }
    this.lists = lists
    if (type === 1 || type === 2) { // 详情页结算
      this.ids = [lists[0].proscar]
    } else if (type === 3) { // 购物车结算
      lists.map((item, index) => {
        this.ids.push(item.id) // 产品ids
      })
    }
    this.amounts = lists.reduce((sum, item, index, array) => {
      sum += item.proamount * item.number
      return sum
    }, 0)
    if (type !== 2) { // 非积分
      console.log(this.ids)
      let nofreight = sessionStorage.getItem('nofreight') / 1
      let freight = sessionStorage.getItem('freight') / 1
      this.nofreight = nofreight
      if (this.amounts >= nofreight) {
        this.freight = 0
      } else {
        this.amounts += freight
        this.freight = freight
      }
    } else {
      console.log(lists)
      // this.amounts =
    }
  },
  methods: {
    componentsShow (bool) {
      this.$store.state.bottomShow = bool
    },
    change (val) {
      console.log(val)
    },
    getAddressList () { // 获取所有地址
      this.axios.post('member/addresslist', {
        order: 'ASC',
        pageNum: 1,
        pageSize: 100
      }).then((response) => {
        this.defaultAddress = response.data[0]
        localStorage.setItem('defaultAddress', JSON.stringify(response.data[0]))
      })
    },
    settle () { // 下单
      let orderType = 1
      let url = ''
      this.json.addressid = this.defaultAddress.id
      //  type:1 详情页结算、2:积分详情页结算、 3：购物车结算、 4:试用下单
      if (this.type === 2) {
        orderType = 2
        url = 'account/accountintegral'
        this.json.pros = this.ids.join()
        this.json.nubmer = this.lists[0].num
      } else if (this.type === 4) {
        url = 'account/accountsmall'
      } else {
        orderType = 1
        this.json.proscar = this.ids.join()
        url = 'account/account'
      }
      this.axios.post(url, this.json).then((response) => {
        if (response.success) {
          sessionStorage.removeItem('settleLists')
          this.toastData = {
            isShow: true,
            type: 'success',
            text: '购买成功'
          }
          let timer = setTimeout(() => {
            this.$router.push({name: 'order', params: {type: orderType, id: 0}})
            clearTimeout(timer)
          }, 1000)
        } else {
          this.toastData = {
            isShow: true,
            type: 'warn',
            text: response.message
          }
        }
      })
    }
  }
}
</script>
<style scoped lang="less">
@color:#6a63aa;
@color1:#4b376e;
/deep/ .weui-icon-warn{
  font-size: 14px;
  color:@color;
}
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
    padding: 8px 10px;
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
  justify-content: flex-end;
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  padding-left: 10px;
  background-color: #fbf9fc;
  .amounts{
    margin-right: 20px;
    span{
      font-size: 18px;
      color: @color;
    }
  }
  .settle {
    text-align: center;
    color: #fff;
    height: 100%;
    padding: 0 40px;
    background: #6a63aa;
  }
}
</style>

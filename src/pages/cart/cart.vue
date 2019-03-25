<template>
  <div class="">
    <section v-if="len > 0" class="lists">
      <ul>
        <li  v-for="(item, index) in lists" :key="item.id" class="list" >
          <div class="list-box flex01-1  vux-1px-b">
            <div class="list-div" @click="check(item, index)">
              <icon v-show="item.checked" type="success"></icon>
              <icon v-show="!item.checked" type="circle"></icon>
            </div>
            <div class="list-div">
              <router-link :to="{name: 'productDetail', params: {type: 1, id: item.proid}}">
                <img class="img" :src="item.img" :alt="item.proname"
              onerror="this.src='static/images/errorImg.jpg'" />
              </router-link>
            </div>
            <div class="list-div">
              <p class="proname">{{item.proname}}</p>
              <div class="flex01 ">
                <p class="price">￥{{item.proamount}}/{{item.proskuname}}</p>
                <div id ="number" class="vux-1px flex01">
                  <x-icon  @click="reduceNum(item.id)"  type="ios-minus-empty"></x-icon>
                  <input v-model="item.number" type="number" readonly />
                  <x-icon @click="addNum(item.id)" type="ios-plus-empty"></x-icon>
                  <!-- <group class="nums" > 无法判断加减
                    <x-number @on-change="changeNumber(index, item.id)"    :min="1" width="50px" button-style="square"></x-number>
                  </group> -->
                </div>
              </div>
            </div>
          </div>
          <div @click="del(item.id)" class="delete-btn flex01-1">
            <img src="../../assets/images/common/del.jpg" alt="">
            <span>删除</span>
          </div>
        </li>
      </ul>
    </section>
    <p class="no" v-else><divider>暂无商品</divider></p>
    <section class="bottom1 flex01">
      <p class="flex01">
        <icon type="warn" ></icon>
        提示：实付满{{nofreight}}元 免物流费
      </p>
      <router-link class="cd flex01" :to="{name: 'product', params:{pid: 0,val: 'null'}}">
        去凑单
        <x-icon type="ios-arrow-right" size="15"></x-icon>
      </router-link>
    </section>
    <section class="bottom2 flex01">
      <label class="list-div" @click="checkAll()">
        <icon v-show="checked" type="success"></icon>
        <icon v-show="!checked" type="circle"></icon>
        全选
      </label>
      <p class="amouts">
        合计￥<span>{{amouts}}</span>
      </p>
      <div @click="settle" class="settle flex01" >结算</div>
    </section>
    <toast v-model="toastData.isShow" :type="toastData.type" :text="toastData.text" width="45vw" :time="1000"  :is-show-mask="true" position="middle"></toast>
    <div v-transfer-dom>
      <confirm v-model="confirmShow"
      title="是否删除？"
      @on-confirm="onConfirm">
      </confirm>
    </div>
  </div>
</template>
<script>
import {Divider, Toast, Confirm, Icon, Cell, XNumber, Group, TransferDomDirective as TransferDom} from 'vux'
export default {
  name: '',
  directives: {
    TransferDom
  },
  components: {
    Divider,
    Icon,
    Cell,
    XNumber,
    Group,
    Toast,
    Confirm
  },
  destroyed () { // 销毁时显示
    this.componentsShow(true)
  },
  mounted () { // 隐藏
    this.componentsShow(false)
  },
  data () {
    return {
      confirmShow: false,
      len: 1,
      toastData: {
        isShow: false,
        type: 'warn',
        text: '已成功删除'
      },
      checked: true,
      nofreight: '',
      lists: [],
      delId: '',
    }
  },
  computed: {
    amouts () { // 金额计算
      let s = 0
      this.lists.map((item) => {
        if (item.checked) {
          s += Number(item.proamount) * Number(item.number)
        }
      })
      return s
    }
  },
  async created () {
    this.nofreight = sessionStorage.getItem('nofreight')
    this.getLists()
  },
  methods: {
    componentsShow (bool) {
      this.$store.state.bottomShow = bool
    },
    checkAll () { // 全选
      this.checked = !this.checked
      this.lists.map((item, index) => {
        item.checked = this.checked
      })
      // this.accounts(this.lists) // 计算总额
    },
    check (item, index) { // 单选
      this.lists.some((item1, index1) => {
        if (index === index1) {
          item1.checked = !item1.checked
          return true
        }
      })
      let bool = this.lists.every((item1, index1) => { // 全选
        return item1.checked
      })
      this.checked = bool
      // this.accounts(this.lists) // 计算总额
    },
    async getLists () {
      let result = await this.axios.post('cart/cartlist')
      if (result.success) {
        result.data.map((item, index) => {
          item.checked = true
          item.img = this.base_img + item.propic
        })
        this.lists = result.data
        this.len = result.data.length
        // this.accounts(result.data) // 计算总额
      }
    },
    /* accounts (lists) { // 计算总额 proamount * number
      this.amouts = 0
      lists.map((item) => {
        if (item.checked) {
          this.amouts += Number(item.proamount) * Number(item.number)
        }
      })
    }, */
    settle () { // 结算
      let settleLists = [] // 下单列表
      this.lists.map((item, index) => {
        if (item.checked) {
          settleLists.push(item)
        }
      })
      if (settleLists.length > 0) {
        settleLists = JSON.stringify(settleLists)
        console.log(settleLists)
        sessionStorage.setItem('settleLists', settleLists)
        this.$router.push({name: 'Settle', params: {type: 3}})
      } else {
        this.toastData = {
          isShow: true,
          type: 'warn',
          text: '请选择商品'
        }
      }
    },
    async del (id) { // 删除
      this.confirmShow = true
      this.delId = id
    },
    async onConfirm () {
      let _this = this
      let result = await this.axios.get('cart/cartdel/' + this.delId)
      if (result.success) {
        this.toastData = {
          isShow: true,
          type: 'success',
          text: '已成功删除'
        }
        _this.lists.some((item, index) => {
          if (item.id === _this.delId) {
            _this.lists.splice(index, 1)
          }
        })
        // _this.accounts(_this.lists) // 计算总额
      } else {
        this.toastData = {
          isShow: true,
          type: 'warn',
          text: '删除失败'
        }
      }

    },
    async addNum (id) { // 加
      this.lists.some((item, index) => {
        if (item.id === id) {
          item.number++
          return true
        }
      })
      let result = await this.axios.get('cart/cartnumberadd/' + id)
      if (result.success) {
      }
    },
    async reduceNum (id) { // 减
      let bool = true
      this.lists.some((item, index) => {
        if (item.id === id && item.number > 1) { // 最少一个
          item.number--
          return true
        } else {
          bool = false
          this.toastData = {
            isShow: true,
            type: 'warn',
            text: '不能再少了'
          }
          return false
        }
      })
      if (bool) {
        let result = await this.axios.get('cart/cartnumbersub/' + id)
        if (result.success) {
        }
      }
    }
  }
}
</script>
<style scoped lang="less">
@color:#6a63aa;
@color1:#4b376e;
#number {
  svg{
    position: relative;
    z-index: 9;
    fill:@color1;
  }
  input{
    border-top: none;
    border-bottom: none;
    text-align: center;
    width: 50px;
    height: 24px;
  }
}
/deep/ .weui-icon-warn{
  font-size: 14px;
  color:@color;
}
.no{
  margin: 50px 0;
  font-size: 22px;
}
.lists{margin-bottom: 150px;}
.list{
  .list-box{padding: 2px 10px;}
  .proname{
    margin-bottom: 6px;
  }
  .price{
    color:@color;
    margin-right: 45px;
    width: 90px;
  }
  .img{
    width: 85px;
    height: 85px;
    margin-right: 6px;
  }
  /deep/ .nums{
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
      padding: 0 4px;
      line-height: 14px;
      svg{
        fill:@color;
        width: 12px;
        height: 12px;
        line-height: 14px;
      }
    }
  }
  .delete-btn{
    justify-content: flex-end;
    padding: 8px 40px;
    text-align: right;
    border-bottom: 8px solid #f7f7f7;
    img{
      width: 15px;
    }
  }
}
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

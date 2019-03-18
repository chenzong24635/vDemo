<template>
  <div class="">
    <section class="lists">
      <ul>
        <li v-for="(item, index) in lists" :key="index" class="list" >
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
                <group class="nums">
                  <!-- <x-number @on-change="changeNumber(index, item.id)" :value="item.number" :min="1" width="50px" button-style="square"></x-number> -->
                  <x-number @on-change="changeNumber(index, item.id)" v-model="item.number"  :min="1" width="50px" button-style="square"></x-number>
                </group>
              </div>
            </div>
          </div>
          <div @click="del(index, item.id)" class="delete-btn flex01-1">
            <img src="../../assets/images/common/del.jpg" alt="">
            <span>删除</span>
          </div>
        </li>
      </ul>
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
    <toast v-model="toastData.isShow" :type="toastData.type" :text="toastData.text" width="130px" :time="1000"  :is-show-mask="true" position="middle"></toast>
  </div>
</template>
<script>
import {Toast, Icon, Cell, XNumber, Group} from 'vux'
export default {
  name: '',
  components: {
    Icon,
    Cell,
    XNumber,
    Group,
    Toast
  },
  destroyed () { // 销毁时显示
    this.componentsShow(true)
  },
  mounted () { // 隐藏
    this.componentsShow(false)
  },
  data () {
    return {
      toastData: {
        isShow: false,
        type: 'warn',
        text: '已成功删除'
      },
      checked: true,
      nofreight: '',
      lists: [],
      amouts: 0
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
      this.accounts(this.lists) // 计算总额
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
      this.accounts(this.lists) // 计算总额
    },
    async changeNumber (index, id) { // 增减
      this.accounts(this.lists) // 计算总额
      /* let result = await this.axios.get(this.base_url + 'cart/cartnumberadd/' + id)
      if (result.success) {
      }  */
    },
    async del (index, id) { // 删除
      let _this = this
      let result = await this.axios.get(this.base_url + 'cart/cartdel/' + id)
      if (result.success) {
        this.toastData.isShow = true
        let timer = setTimeout(() => {
          // _this.getLists()
          _this.lists.some((item1, index1) => {
            if (item1.id === id) {
              _this.lists.splice(index1, 1)
            }
          })
          _this.accounts(_this.lists) // 计算总额
          clearTimeout(timer)
        }, 100)
      }
    },
    async getLists () {
      let result = await this.axios.post(this.base_url + 'cart/cartlist')
      if (result.success) {
        result.data.map((item, index) => {
          item.checked = true
          item.img = this.base_img + item.propic
        })
        this.lists = result.data
        this.accounts(result.data) // 计算总额
      }
    },
    accounts (lists) { // 计算总额 proamount * number
      this.amouts = 0
      lists.map((item) => {
        if (item.checked) {
          this.amouts += Number(item.proamount) * Number(item.number)
        }
      })
    },
    settle () { // 结算
      let settleLists = [] //下单列表
      this.lists.map((item, index) => {
        if (item.checked)
          settleLists.push(item)
      })
      settleLists = JSON.stringify(settleLists)
      console.log(settleLists)
      sessionStorage.setItem('settleLists', settleLists)
      this.$router.push({name: 'Settle', params: {type: 2}})
      // this.$router.push({name: 'Settle', params: {type: 2, array: settleLists}})
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

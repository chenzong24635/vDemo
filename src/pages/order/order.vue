<template>
  <div class="">
    <scrollTop></scrollTop>
    <section class="vux-1px-b ">
      <ul class="tabs">
        <li  :class="[tabIndex === index ? 'active' : '', 'tab']" v-for="(item, index) in tabs" :key="index" @click="tab(index)">
          <span>{{item.title}}</span>
        </li>
      </ul>
    </section>
    <section>
      <ul  id="lists"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10">
        <li v-for="(item, index) in lists" :key="index" class="list bb10">
          <p class='list-top flex01 vux-1px-b'>
            <span>订单编号：{{item.orderid}}</span>
            <span class="status">{{item.statusText}}</span>
          </p>
          <ul class="">
            <li v-for="(item1, index1) in item.orderprolist" :key="index1" class="list1 vux-1px-b">
              <flexbox>
                <flexbox-item :span="3">
                  <router-link  class="flex-demo flex-demo-img" :to="{name: 'productDetail', params: {type: type, id: item1.pid}}">
                    <img class="img-title" :src="item1.pic" onerror="this.src='static/images/errorImg.jpg'">
                  </router-link>
                </flexbox-item>
                <flexbox-item :span="7">
                  <p class="ptitle">{{item1.ptitle}}</p>
                  <p class="type">{{item1.type}}</p>
                </flexbox-item>
                <flexbox-item :span="2">
                  <div class="flex-demo">
                    <p v-if="type ===2">{{item1.amount / item1.num}} 积分</p>
                    <p v-else>￥{{item1.amount / item1.num}}</p>
                    <p class="flex01-1"><x-icon type="ios-close-empty" size="20"></x-icon>{{item1.num}}</p>
                  </div>
                </flexbox-item>
              </flexbox>
            </li>
          </ul>
          <p v-if="type ===2" class="total tar">
            共{{item.orderprolist.length}}件商品, 合计：<span>{{item.amount}} 积分</span>
          </p>
          <p v-else class="total tar">
            共{{item.orderprolist.length}}件商品, 合计:￥<span>{{item.payamount}}</span>
            (含运费：{{item.amount > nofreight ? 0 : freight}})
          </p>
          <div class="x-btns tar">
            <x-button @click.native="cancle(item.id)" v-show="item.status === 1" mini type="default" plain>取消订单</x-button>
            <x-button @click.native="detailLink(item.id)"  mini type="default" plain>订单详情</x-button>
            <x-button @click.native="pay(item.id)"  v-show="item.status === 1" mini type="default" plain>付款</x-button>
          </div>
        </li>
      </ul>
      <load-more v-if="lists.length===0" :show-loading="false" tip="暂无数据" ></load-more>
      <div>
        <load-more  v-if="!isLastPage" tip="正在加载"></load-more>
        <load-more v-if="isLastPage&&lists.length!==0" :show-loading="false" tip="到底了" ></load-more>
      </div>
    </section>
    <div v-transfer-dom>
      <confirm v-model="confirmShow" title="确认删除?"  @on-confirm="onConfirm"></confirm>
    </div>
    <toast v-model="toastData.isShow" :type="toastData.type" :text="toastData.text" width="130px" :time="1000"  :is-show-mask="true" position="middle"></toast>
  </div>
</template>
<script>
import { Toast, TransferDomDirective as TransferDom, Confirm, Flexbox, FlexboxItem, Checker, CheckerItem, XButton, XInput, Group, XTextarea, Icon, LoadMore } from 'vux'
import scrollTop from '@/components/scrollTop.vue'
export default {
  directives: {
    TransferDom
  },
  components: {
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
    scrollTop,
    LoadMore
  },
  data () {
    return {
      type: '',
      btnId: '',
      confirmShow: false,
      toastData: {
        isShow: false,
        type: 'success',
        text: '订单已取消'
      },
      tabIndex: 0,
      tabs: [
        {
          title: '全部订单',
          status: 0
        },
        {
          title: '代付款',
          status: 1
        },
        {
          title: '待发货',
          status: 2
        },
        {
          title: '待收货',
          status: 4
        },
        {
          title: '已完成',
          status: 5
        }
      ],
      json: {
        order: 'ASC',
        pageNum: 1,
        pageSize: 6,
        status: '',
        typeid: ''
      },
      orderUrl: 'order/orderlist',
      lists: [],
      loading: false,
      isLastPage: false,
      nofreight: localStorage.getItem('nofreight'),
      freight: localStorage.getItem('freight')
    }
  },
  created () {
    // typeid 分类 1普通订单（我的订单、积分订单）、 3试用订单、 0全部 、(2经销商
    // status: 订单状态（0全部，1待付款，2已付款，3已配货，4已发货，5确认收货，10取消订单）
    // status只用到 1、2、4、5
    let type = this.$route.params.type / 1
    let id = this.$route.params.id / 1
    let status = null
    this.tabIndex = id
    this.type = type
    if (type === 1) { // 我的订单
      this.orderUrl = 'order/orderlist'
      this.json.typeid = 1
    } else if (type === 2) { // 积分订单
      this.orderUrl = 'order/orderintegrallist'
      this.json.typeid = 1
    } else if (type === 3) { // 试用订单
      this.orderUrl = 'order/orderlist'
      this.json.typeid = 3
    }
    switch (id) {
      case 0:
        status = 0
        break
      case 1:
        status = 1
        break
      case 2:
        status = 2
        break
      case 3:
        status = 4
        break
      case 4:
        status = 5
        break
      default:
        break
    }
    this.getLists(status)
  },
  methods: {
    tab (index) {
      this.tabIndex = index
      this.reset()
      this.getLists(this.tabs[index].status)
    },
    getLists (status) {
      this.json.status = status
      this.axios.post(this.orderUrl, this.json).then((response) => {
        if (response.success) {
          let data = response.data
          if (this.isLastPage) { return }
          if (data.isLastPage) {
            this.isLastPage = true
          }
          let lists = data.list
          lists.map((item, index) => { // 订单状态: 0全部，1待付款，2已付款，3已配货，4已发货，5确认收货，10取消订单
            switch (item.status / 1) {
              case 1:
                item.statusText = '待付款'
                break
              case 2:
                item.statusText = '待发货'
                break
              case 3:
              case 4:
                item.statusText = '待收货'
                break
              case 5:
                item.statusText = '已完成'
                break
              case 10:
                item.statusText = '取消订单'
                break
              default:
                break
            }
            if (item.orderprolist) {
              console.log(item.orderprolist.length)
              if (item.orderprolist.length > 0) {
                item.orderprolist.map((item1, index1) => {
                  let type = '' // 活动类型 0:无、 1：满赠、 2：买赠
                  if (item1.types === 0) {
                    type = ''
                  } else if (item1.types === 1) {
                    type = '满赠'
                  } else if (item1.types === 2) {
                    type = '买赠'
                  }
                  item1.type = type
                  item1.pic = this.base_img + item1.pic
                })
              }
            } else { // 积分
              // 同步积分订单、产品订单 数据格式
              if (item.status === status || status === 0) {
                item.pic = this.base_img + item.propic
                item.pid = item.proid
                item.num = item.pronumber
                item.ptitle = item.proname
                item.amount = item.integral
                item.orderprolist = [item]
              } else {
                lists = []
                item.orderprolist = []
              }
              console.log(item)
            }
          })
          if (this.json.pageNum / 1 === 1) {
            this.lists = lists
          } else {
            this.lists = this.lists.concat(lists)
          }
          this.loading = false
          this.json.pageNum++
        }
      })
      console.log(this.lists)
    },
    loadMore () { // 上拉加载更多
      if (this.isLastPage) {
        return
      }
      this.loading = true
      this.getLists(this.json.status)
    },
    cancle (id) {
      this.confirmShow = true
      this.btnId = id
      console.log(id)
    },
    detailLink (id) {
      this.$router.push({name: 'orderDetail', params: {type: this.type, id: id}})
      console.log(id)
    },
    pay (id) {
      console.log(id)
    },
    reset () {
      this.lists = []
      this.json.pageNum = 1
      this.loading = false
      this.isLastPage = false
    },
    onConfirm () { // order/ordercancel/
      let id = this.btnId
      this.axios.get('order/ordercancel/' + id).then((response) => {
        if (response.success) {
          this.toastData.isShow = true
          this.lists.some((item, index) => {
            if (item.id === id) {
              this.lists.splice(index, 1)
            }
          })
        }
      })
      console.log('on confirm', id)
    }
  }
}
</script>
<style scoped lang="less">
@color:#6a63aa;
@color1:#4b376e;
.tabs{
  display: flex;
  padding: 10px 4px 6px;
  &.vux-1px-b:after{
    border-bottom-color: @color1;
  }
  .tab{
    flex: 1;
    text-align: center;
    span{
      padding: 4px;
      border-bottom: 3px solid transparent;
    }
    &.active span{
      color: @color;
      border-bottom-color: @color;
    }
  }
}
.list{
  // &>ul{padding: 10px 0;}
  .list-top{
    font-size: 13px;
    padding: 5px 20px;
  }
  .pic{
    width: 85px;
    height: 85px;
  }
  .list1{
    padding: 2px 20px;
    .flex-demo-img{
      width: 80px;
      height: 80px;
      line-height: 80px;
      img{vertical-align: middle;}
    }
  }
  .status{color:@color;}
  .ptitle{color:#000}
  .type{color: #f58989;}
  .total{
    font-size: 13px;
    padding: 5px 20px;
    background-color: #f7f7f7;
    color: #787878;
    span{color: #787878;}
  }
}
.x-btns{
  padding-bottom: 15px;
  padding-right: 20px;
  /deep/ .weui-btn_mini{
    margin-left: 10px;
    line-height: 1.5;
    font-size: 12px;
    border-radius: 10px;
    color: #797979;
    border-color:#797979;
    &:focus{border:1px solid #797979;}
    &:last-child{
      color: @color;
      border-color:@color;
    }
  }
}
</style>

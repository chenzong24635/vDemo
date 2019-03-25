<template>
  <div class="">
    <scrollTop></scrollTop>
    <swiper height="45vw" loop  :list="banners" id="swiper" :dots-class="banners.length >=2 ? 'dot0' : 'swiper-hide'" :show-desc-mask="false"></swiper>
    <tab bar-active-color="#522d6d" :line-width="2" >
      <tab-item @on-item-click="tab(item, index)" v-for="(item, index) in tabs" :key="item.title" > <!-- :selected="index===0" -->
        {{item.title}}
        <!-- <router-link :to="{name:'product',params:{pid:item.pid, id:item.id}}" >{{item.title}}</router-link> -->
      </tab-item>
    </tab>
    <div class="lists">
      <section v-if="!isJf">
        <ul class="lists-top flex01-1">
          <li @click="sel(item, index)" v-for="(item, index) in listsTop"
          :key="item.id" :class="[item.sel && item.click?'sel'+item.status:'', index===0?'':'vux-1px-l', item.click?'click':'']">
          {{item.name}}</li>
        </ul>
        <div class="price-range flex01" v-show="range">
          <input class="vux-1px" type="number" v-model="price1" >
          <span>-</span>
          <input class="vux-1px" type="number" v-model="price2" >
          <!-- <button type="text" @click="price"></button> -->
          <x-button @click.native="price('middle')" type="primary">确认</x-button>
        </div>
      </section>
      <ul  id="lists" class="flex01-1"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10">
        <li @click="link(item, index)" v-for="(item, index) in products" :key="item.id" :data-id="item.id" class="list vux-1px">
          <!-- <router-link :to="'productDetail' + item.id "> -->
            <div class="pic"><img :src="item.pic" alt="" onerror="this.src='static/images/errorImg.jpg'"></div>
            <p class="title ov1">{{item.title}}</p>
            <p class="subtitle ov2">功效：{{item.subtitle}}</p>
            <p class="ggvalue ov1">规格：{{item.ggvalue}}</p>
            <p v-if="isJf" class="amount">{{item.integral}}分</p> <!-- 积分 -->
            <p v-else class="amount">￥{{item.amount}}</p>
            <img v-if="!isJf" @click.stop="addCart(item, index)" src="../../assets/images/common/addto-cart.png" alt="" class="add-cart">
          <!-- </router-link> -->
        </li>
      </ul>
      <load-more v-if="products.length===0" :show-loading="false" tip="暂无数据" ></load-more>
      <div>
        <load-more  v-if="!isLastPage" tip="正在加载"></load-more>
        <load-more v-if="isLastPage&&products.length!==0" :show-loading="false" tip="到底了" ></load-more>
      </div>
    </div>
    <toast v-model="toastData.isShow" :type="toastData.type" :text="toastData.text" width="40vw" :time="1000"  :is-show-mask="true" position="middle"></toast>
  </div>
</template>
<script>
import {Swiper, Tab, TabItem, XButton, LoadMore, Toast} from 'vux'
import scrollTop from '@/components/scrollTop.vue'

const json01 = {code: 'slide4'} // 轮播图
const json02 = { // 产品
  // cid:cid,
  order: '',
  pageNum: 1,
  pageSize: 4,
  sort: '',
  minamount: '',
  maxamount: ''
}
const json03 = { // 积分
  cid: '',
  order: 'ASC',
  pageNum: 1,
  pageSize: 4
}

export default {
  name: '',
  components: {
    scrollTop,
    Swiper,
    Tab,
    TabItem,
    XButton,
    LoadMore,
    Toast
  },
  data () {
    return {
      isJf: false,
      pid: '',
      type: '',
      toastData: {
        isShow: false,
        type: 'warn',
        text: ''
      },
      searchVal: '',
      banners: [],
      tabs: [],
      listsTop: [
        {
          id: 0,
          name: '默认',
          status: 0,
          sel: false,
          click: false
        },
        {
          id: 1,
          name: '价格',
          status: 0, // 图标切换
          sel: true, // 是否有图标
          click: false // 当前筛选项
        },
        {
          id: 2,
          name: '销量',
          status: 0,
          sel: true,
          click: false
        },
        {
          id: 3,
          name: '价格区间',
          status: 0,
          sel: false,
          click: false
        }
      ],
      range: false,
      price1: '',
      price2: '',
      products: [],
      loading: false,
      isLastPage: false
    }
  },
  watch: {
    '$route': function (to, from) {
      this.loadFunc()
    }
  },
  async created () {
    this.loadFunc()
  },
  methods: {
    async loadFunc () {
      console.log(this.$route)
      if (this.$route.name === 'productjs') {
        this.isJf = true // 是否积分商城 页面
        json03.cid = ''
        json03.pageNum = 1
        // this.getProductsJf()
      } else {
        this.isJf = false
        this.pid = this.$route.params.pid / 1
        this.type = this.$route.params.type / 1
        let value = this.$route.params.val
        this.searchVal = value === 'null' ? '' : value // 搜索内容
        this.reset()
      }
      this.getBanners()
      this.getTabs()
      this.loadMore()
    },
    async getBanners () { // banners
      let result = await this.axios.post('web/adlist', json01)
      let data = result.data
      let lists = []
      data.map((item, index) => {
        if (item.status) {
          lists.push({
            url: item.linkurl,
            img: this.base_img + item.img,
            title1: item.title
          })
        }
      })
      this.banners = lists
    },
    async getTabs () { // 获取tab
      let lists = []
      if (!this.isJf) {
        let result = await this.axios.post('product/proclasslist')
        let data = result.data
        if (this.pid === 105 || this.pid === 106) { //
          lists = data.filter((item, index) => {
            let bool = (item.pid / 1) === this.pid
            return bool
          })
        } else {
          lists = data
        }
      } else { // 积分
        let result = await this.axios.post('product/prointegralclasslist')
        lists = result.data
      }
      this.tabs = lists
      console.log(lists)
    },
    tab (item, index) { // tab切换
      if (this.isJf) {
        json03.cid = item.id
        this.products = []
        this.isLastPage = false
        json03.pageNum = 1
        this.getProductsJf()
      } else {
        this.reset()
        this.searchVal = ''
        this.pid = item.id
        this.getProducts(item.id)
      }
    },
    async getProducts (cid) { // 加载产品
      console.log('getProducts', cid)
      if (cid === 0) {
        cid = ''
      }
      console.log(this.searchVal)
      if (this.searchVal) {
        json02.title = this.searchVal
        cid = ''
      }
      json02.cid = cid
      let result = await this.axios.post('product/productlist', json02)
      let data = result.data
      console.log(data)
      if (this.isLastPage) { return }
      if (data.isLastPage) {
        this.isLastPage = true
      }
      let lists = data.list
      lists = lists.filter((item, index) => {
        // 筛选 status=1 的产品，同时添加图片路径
        item.pic = this.base_img + item.pic
        return item.status / 1
      })
      if (json02.pageNum / 1 === 1) {
        this.products = lists
      } else {
        this.products = this.products.concat(lists)
      }
      this.loading = false
      json02.pageNum++
    },
    async getProductsJf () { // 加载积分
      let result = await this.axios.post('product/prointegrallist', json03)
      let data = result.data
      console.log(data)
      if (this.isLastPage) { return }
      if (data.isLastPage) {
        this.isLastPage = true
      }
      let lists = data.list
      lists = lists.filter((item, index) => {
        // 筛选 status=1 的产品，同时添加图片路径
        item.pic = this.base_img + item.pic
        return item.status / 1
      })
      if (json03.pageNum / 1 === 1) {
        this.products = lists
      } else {
        this.products = this.products.concat(lists)
      }
      this.loading = false
      json03.pageNum++
    },
    loadMore () { // 上拉加载更多
      if (this.isLastPage) {
        return
      }
      this.loading = true
      if (this.isJf) {
        this.getProductsJf()
      } else {
        this.getProducts(this.pid)
      }
    },
    reset () { // 筛选重置
      json02.pageNum = 1
      json02.minamount = ''
      json02.maxamount = ''
      json02.title = ''
      this.isLastPage = false
      this.range = false
      this.products = []
      this.toastData.text = ''
      this.toastData.isShow = false
      this.toastData.type = 'warn'
      this.listsTop.map((item, index) => {
        item.click = false
        if (item.sel) {
          item.status = 0
        }
      })
    },
    sel (item, index) { // 筛选
      this.toastData.text = ''
      this.toastData.isShow = false
      this.listsTop.map((key, val) => {
        key.click = false
        if (val === index) {
          key.click = true
        }
      })
      let text = ''
      switch (item.id) { // 排序
        case 0: // 默认
          text = ''
          this.range = false
          break
        case 1: // 价格
          switch (item.status) {
            case 0:
              item.status = 1
              text = 'a.amount asc,a.ordernum desc' // 升序
              break
            case 1:
              item.status = 2
              text = 'a.amount desc,a.ordernum asc' // 降序
              break
            case 2:
              item.status = 1
              text = 'a.amount asc,a.ordernum desc' // 升序
              break
            default: break
          }
          this.range = false
          break
        case 2: // 销量
          switch (item.status) {
            case 0:
              item.status = 1
              text = 'a.amount asc,a.ordernum asc' // 升序
              break
            case 1:
              item.status = 2
              text = 'a.amount asc,a.ordernum desc' // 降序
              break
            case 2:
              item.status = 1
              text = 'a.amount asc,a.ordernum asc' // 升序
              break
            default: break
          }
          this.range = false
          break
        case 3: // 价格区间
          this.range = true // 显示
          text = ''
          break
        default: break
      }
      if (item.id === 3) { return }
      json02.sort = text
      this.isLastPage = false
      json02.pageNum = 1
      this.products = []
      json02.minamount = ''
      json02.maxamount = ''
      this.getProducts(this.pid)
    },
    price () { // 价格区间筛选
      if (this.price1 && this.price2 && (this.price2 - this.price1) >= 0) {
        json02.minamount = this.price1 / 1
        json02.maxamount = this.price2 / 1
        json02.pageNum = 1
        this.isLastPage = false
        this.products = []
        this.getProducts(this.pid)
      } else {
        this.toastData.text = '请填写正确价格'
        this.toastData.type = 'warn'
        this.toastData.isShow = true
      }
    },
    addCart (item, index) {
      if (!localStorage.getItem('accessToken')) {
        this.toastData.text = '请先登录'
        this.toastData.type = 'warn'
        this.toastData.isShow = true
        let timer = setTimeout(() => {
          // this.$router.push({name: 'login'})
          clearTimeout(timer)
        }, 1000)
      }
      if (item.number > 0) {
        let json = {
          mid: localStorage.getItem('username'),
          number: 1,
          proid: item.id,
          remarks: 2
        }
        this.axios.post('cart/cartInsert', json).then((result) => {
          console.log(result)
          this.toastData.text = '已添加到购物车'
          this.toastData.type = 'success'
          this.toastData.isShow = true
        })
      } else {
        console.log('售完')
      }
      console.log(item, index)
    },
    link (item, index) { // 产品详情跳转
      // type: 1(普通产品) 、3(小样)、 2(积分)
      let target = this.products[index]
      let type = 1
      if (this.isJf) {
        type = 2
      } else {
        type = 1
      }
      console.log(type)
      this.$router.push({name: 'productDetail', params: {'type': type, 'id': target.id}})
    }
  }
}
</script>
<style scoped lang="less">
@color:#6a63aa;
@color1:#4b376e;
div /deep/ .vux-tab-wrap{
  .vux-tab-ink-bar{display: none!important;}
  margin-top: 10px;
  .vux-tab-container{
    // padding-left: 20px;
    height: auto;
    .vux-tab{
      padding: 0 10px;
      border-bottom: 1px solid #eee;/*no*/
      height: auto;
      padding-bottom: 10px;
      .vux-tab-item{
        line-height: 1.5;
        font-size: 15px;/*no*/
        width: auto;
        padding: 0 5px;
        padding-bottom: 3px;
        margin: 0 5px;
        flex: none;
        color: #000;
        a{color: #000;}
        &.vux-tab-selected{
          background: linear-gradient(180deg, @color1,  @color1, rgba(229, 229, 229, 0)) bottom left no-repeat;
          background-size: 100% 2px;
          // border-bottom: 2px solid @color1!important;
        }
      }
    }
  }
}
.lists{
  padding: 10px 20px;
  .lists-top{
    li{
      font-size: 14px;/*no*/
      padding: 0 15px 0 10px;
      &:first-child{padding-left: 0;}
    }
    .click{
      color:#4b376e;
    }
    li:nth-child(2),
    li:nth-child(3){
      margin-right: 5px;
      background: url('../../assets/images/common/sel-0.jpg')no-repeat right center;
      background-size: 8px 8px;
      &.sel1{
        background-image: url('../../assets/images/common/sel-1.jpg');
      }
      &.sel2{
        background-image: url('../../assets/images/common/sel-2.jpg');
      }
    }
  }
  .price-range{
    margin: 10px 0;
    justify-content: flex-end;
    input,button{
      height: 20px;
      line-height: 20px;
    }
    input{
      width: 80px;
      text-align: center;
    }
    span{margin: 0 10px;}
    button{
      font-size: 12px;
      margin: 0;
      margin-left: 10px;
      padding: 0 10px;
      width: auto;
      background-color: #6a63aa;
      color:#fff;
      border-radius: 6px;

    }
  }
}
#lists{
  margin-top: 16px;
  flex-wrap: wrap;
  .list{
    position: relative;
    box-sizing: border-box;
    width: 48%;
    // padding: 10px;
    // height: 550px;
    padding-bottom: 6px;
    margin-bottom: 4%;
    &:nth-child(2n){margin-left: 4%;}
    a:visited{color:gold}
    .add-cart{
      position: absolute;
      bottom: 6px;
      right: 6px;
      width: 25px;
      height: 25px;
    }
    .pic{
      width: 100%;
      height: 45vw;
      img{
        width: 100%;
        max-height: 100%;
        // vertical-align: middle;
        // height: 100%;
      }
    }
    &>p{
      padding: 0 10px;
      color:#000;
      font-size: 13px;/*no*/
    }
    .title{margin-bottom: 4px;}
    .title,.amount{font-size: 15px;/*no*/}
    .subtitle{height: 36px;}
    .subtitle,.ggvalue{color:#a3a3a3;font-size: 12px;/*no*/}
    .ggvalue{margin: 3px 0;}
  }
}
</style>

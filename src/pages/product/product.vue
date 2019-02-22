<template>
  <div class="">
    <scrollTop></scrollTop>
    <swiper height="4rem" loop  :list="banners" id="swiper" :dots-class="banners.length >=2 ? 'dot0' : 'swiper-hide'" :show-desc-mask="false"></swiper>
    <tab bar-active-color="#522d6d" :line-width="2" >
      <tab-item @on-item-click="tab(item, index)" v-for="(item, index) in tabs" :key="item.id" > <!-- :selected="index===0" -->
        {{item.title}}
        <!-- <router-link :to="{name:'product',params:{pid:item.pid, id:item.id}}" >{{item.title}}</router-link> -->
      </tab-item>
    </tab>
    <div class="lists">
      <ul class="lists-top flex01-1">
        <li @click="sel(item, index)" v-for="(item, index) in listsTop"
        :key="item.name" :class="[item.sel && item.click?'sel'+item.status:'', index===0?'':'vux-1px-l', item.click?'click':'']">
        {{item.name}}</li>
      </ul>
      <div class="price-range flex01" v-show="range">
        <input class="vux-1px" type="number" :value="price1">
        <span>-</span>
        <input class="vux-1px" type="number" :value="price2">
        <button type="text">确认</button>
      </div>
      <!-- <router-link to="/productDetail">productDetail</router-link> -->
      <ul  id="lists" class="flex01-1"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10">
        <li @click="link(item, index)" v-for="(item, index) in products" :key="item.id" :data-id="item.id" class="vux-1px">
          <!-- <router-link :to="'/productDetail' + item.id "> -->
            <img :src="item.pic" alt="" onerror="this.src='/static/images/common/errorImg.jpg'">
            <p class="title ov1">{{item.title}}</p>
            <p class="subtitle ov2">功效：{{item.subtitle}}</p>
            <p class="ggvalue ov1">规格：{{item.ggvalue}}</p>
            <p class="amount">￥{{item.amount}}</p>
          <!-- </router-link> -->
        </li>
      </ul>
      <load-more v-if="products.length===0" :show-loading="false" :tip="$t('暂无数据')" ></load-more>
      <div>
        <load-more  v-if="!isLastPage" :tip="$t('正在加载')"></load-more>
        <load-more v-if="isLastPage&&products.length!==0" :show-loading="false" :tip="$t('到底了')" ></load-more>
      </div>
    </div>
  </div>
</template>
<script>
import {Swiper, Tab, TabItem, XButton, LoadMore} from 'vux'
// import {InfiniteScroll} from 'mint-ui'
import scrollTop from '@/components/scrollTop.vue'

const json01 = {code: 'slide4'} // 轮播图
const json02 = { // 产品
  // cid:cid,
  order: '',
  pageNum: 0,
  pageSize: 2,
  sort: '',
  minamount: '',
  maxamount: ''
}

export default {
  name: '',
  components: {
    scrollTop,
    Swiper,
    Tab,
    TabItem,
    XButton,
    LoadMore
  },
  data () {
    return {
      data: {},
      pid: '',
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
      // let name = this.$route.name
      this.pid = this.$route.params.pid / 1
      console.log(this.pid)
      this.reset()
      this.getBanners()
      this.getTabs()
      this.getProducts(this.pid)
    }
  },
  async created () {
    // this.$store.state.bottomShow = false
    this.pid = this.$route.params.pid / 1
    this.getBanners()
    this.getTabs()
    // this.getProducts(this.pid)
  },
  methods: {
    async getBanners () { // banners
      let result = await this.axios.post(this.base_url + '/web/adlist', json01)
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
    async getTabs () {
      let result = await this.axios.post(this.base_url + '/product/proclasslist')
      let data = result.data
      let lists = []
      lists = data.filter((item, index) => {
        let bool = (item.pid / 1) === this.pid
        return bool
      })
      this.tabs = lists
    },
    async getProducts (cid) {
      json02.cid = cid
      console.log(json02, cid)
      let result = await this.axios.post(this.base_url + '/product/productlist', json02)
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
      console.log('this.products', this.products)
    },
    loadMore () {
      if (this.isLastPage) {
        return
      }
      console.log('load')
      this.loading = true
      // if (json02.pageNum / 1 === 1) {
      json02.pageNum++
      this.getProducts(this.pid)
      // }
      console.log('loadend')
    },
    tab (item, index) { // tab切换
      this.reset()
      json02.pageNum = 1
      this.pid = item.id
      this.getProducts(item.id)
      console.log(item, index)
    },
    reset () { // 筛选重置
      json02.pageNum = 1
      this.isLastPage = false
      this.products = []
      this.listsTop.map((item, index) => {
        item.click = false
        if (item.sel) {
          item.status = 0
        }
      })
    },
    sel (item, index) { // 筛选
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
      console.log(json02, text)
      this.getProducts(this.pid)
    },

    link (item, index) { // 产品详情跳转
      let target = this.products[index]
      this.$router.push({name: 'productDetail', params: {'id': target.id}})
    }
  }
}
</script>
<style scoped lang="less">
/deep/ .vux-tab-wrap{
  margin: 26px 0;
  .vux-tab-container{
    padding-left: 20px;
    height: auto;
    .vux-tab{
      border-bottom: 1px solid #eee;/*no*/
      height: auto;
      .vux-tab-item{
        color: #000;
        a{color: #000;}
        font-size: 15px;/*no*/
        padding-bottom: 10px;
      }
    }
  }
}
.lists{
  padding: 20px 40px;
  .lists-top{
    li{
      font-size: 14px;/*no*/
      padding: 0 30px 0 20px;
      &:first-child{padding-left: 0;}
    }
    .click{
      color:#4b376e;
    }
    li:nth-child(2),
    li:nth-child(3){
      margin-right: 18px;
      background: url('/static/images/common/sel-0.jpg')no-repeat right center;
      background-size: 16px 16px;
      &.sel1{
        background-image: url('/static/images/common/sel-1.jpg');
      }
      &.sel2{
        background-image: url('/static/images/common/sel-2.jpg');
      }
    }
  }
  .price-range{
    margin: 20px 0;
    justify-content: flex-end;
    input,button{
      height: 40px;
      line-height: 40px;
    }
    input{
      width: 160px;
      text-align: center;
    }
    span{margin: 0 10px;}
    button{
      margin: 0;
      margin-left: 20px;
      padding: 0 20px;
      background-color: #6a63aa;
      color:#fff;
      border-radius: 6px;
    }
  }
}
#lists{
  margin-top: 30px;
  flex-wrap: wrap;
  li{
    box-sizing: border-box;
    width: 48%;
    padding-bottom: 10px;
    // height: 550px;
    margin-bottom: 4%;
    &:nth-child(2n){margin-left: 4%;}
    a:visited{color:gold}
    img{
      width: 100%;
      height: 300px;
    }
    p{
      color:#000;
      padding: 0 20px;
      font-size: 13px;/*no*/
      line-height: 1.5;
    }
    .title,.amount{font-size: 15px;/*no*/}
    .subtitle{height: 80px;}
    .subtitle,.ggvalue{color:#a3a3a3;font-size: 13px;/*no*/}
    .ggvalue{margin: 10px 0;}
  }
}
</style>

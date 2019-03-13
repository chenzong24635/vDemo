<template>
  <div>
    <swiper height="5rem" auto loop   :list="banners" id="swiper" :dots-class="banners.length >=2 ? 'dot0' : 'swiper-hide'" :show-desc-mask="false"></swiper>
    <ul  id="lists"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10"> <!-- 滚动下拉mint-ui -->
      <li @click="link(item, index)" v-for="(item, index) in lists" :key="item.id" :data-id="item.id" class="vux-1px-b ">
        <!-- <router-link :to="{name: '/newDetail', params:{id:item.id}}"> -->
        <div class="clearfix">
          <img class="list-img fl" :src="item.pic" alt="" onerror="this.src='static/images/errorImg.jpg'">
          <div class="list-mes fr">
            <p class="title ov1">{{item.title}}</p>
            <div class="about">{{item.about}}</div>
            <p class="date">{{item.date}}</p>
          </div>
        </div>
        <!-- </router-link> -->
      </li>
    </ul>
    <load-more v-if="lists.length===0" :show-loading="false" tip="暂无数据" ></load-more>
    <div>
      <load-more  v-if="!isLastPage" tip="正在加载"></load-more>
      <load-more v-if="isLastPage&&lists.length!==0" :show-loading="false" tip="到底了" ></load-more>
    </div>
  </div>
</template>

<script>
import {Swiper, LoadMore} from 'vux'
// import {timestampToTime} from '@/utils/index.js'
const json = {code: 'b4'}
const json02 = {
  order: 'ASC',
  pageNum: 1,
  pageSize: 4
}
export default {
  components: {
    Swiper,
    LoadMore
  },
  data () {
    return {
      pid: '',
      banners: [],
      lists: [],
      loading: false,
      isLastPage: false
    }
  },
  watch: {
    '$route': function (to, from) {
      let pid = this.$route.params.pid / 1
      this.pid = pid
      console.log('watch')
      this.reset()
      this.loadMore()
    }
  },
  created () {
    this.pid = this.$route.params.pid / 1
    this.reset()
    this.getBanners()
    this.loadMore()
  },
  methods: {
    async getBanners () {
      let result = await this.axios.post(this.base_url + '/web/adlist', json)
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
    async getProducts (cid) { // 加载产品
      console.log('getProducts', cid)
      let _this = this
      if (cid / 1 === 1) {
        cid = ''
      }
      json02.cid = cid
      let result = await this.axios.post(this.base_url + '/web/newlist', json02)
      let data = result.data
      console.log(data)
      if (this.isLastPage) { return }
      if (data.isLastPage) {
        this.isLastPage = true
      }
      let lists = data.list
      lists = lists.filter((item, index) => {
        // 筛选 status=1 的产品，同时添加图片路径
        // item.pic = this.base_img + item.pic
        item.date = _this.GLOBAL.timestampToTime(item.createDate)
        return item.status / 1
      })
      if (json02.pageNum / 1 === 1) {
        this.lists = lists
      } else {
        this.lists = this.lists.concat(lists)
      }
      this.loading = false
      json02.pageNum++
    },
    loadMore () { // 上拉加载更多
      if (this.isLastPage) {
        return
      }
      this.loading = true
      this.getProducts(this.pid)
    },
    reset () {
      this.lists = []
      json02.pageNum = 1
      this.isLastPage = false
    },
    link (item, index) { // 产品详情跳转
      let target = this.lists[index]
      this.$router.push({name: 'newDetail', params: {'id': target.id}})
    }
  }
}
</script>
<style lang="less" scoped>
#lists{
  li{padding: 10px 15px;}
  li:last-child{
    border-bottom: none;
  }
  .list-img,.list-mes{
    width: 49%;
    height: 115px;
  }
  .about{
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    margin: 12px 0 4px 0;
  }
  .title{font-weight: bold;}
  .date{
    color:#a5a5a5;
  }
}
</style>

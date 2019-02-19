<template>
  <div class="clearfix">
    <!-- <router-link to="/News">news</router-link> -->
    <swiper height="9rem"  loop   :list="banners" id="swiper0" dots-class="dot0"></swiper>
    <div class="">
      <img class="img-title" src="/static/images/index/m-t.jpg" alt="">
      <ul class="mom">
        <li v-for="item in moms" :key="item.title">
          <a :href="item.url"><img  :src="item.img"></a>
        </li>
      </ul>
    </div>
    <div class="">
      <img class="img-title" src="/static/images/index/b-t.jpg" alt="">
      <ul class="baby">
        <li v-for="item in babies" :key="item.title">
          <a :href="item.url"><img  :src="item.img"></a>
        </li>
      </ul>
    </div>
    <div class="">
      <ul class="trail">
        <li v-for="item in trails" :key="item.title">
          <a :href="item.url"><img  :src="item.img"></a>
        </li>
      </ul>
    </div>
    <img class="img-title" src="/static/images/index/a12.jpg" alt="">
    <swiper height="3rem" loop auto  :list="banners1"  id="swiper1" dots-class="dot1"></swiper>
    <div class="video">
      <video controls="" width="100%" height="100%" >
        <source src="https://pan.baidu.com/s/16NfMAQF8Yz_p_r8XfXPi7A" type="video/mp4">
      </video>
    </div>
  </div>
</template>

<script>
import { Swiper, GroupTitle, SwiperItem, XButton, Divider } from 'vux'

const url = 'http://61.155.169.77:10002/'
const img = 'http://61.155.169.77:10005/'
const json01 = {code: 'slide1'}// 轮播0
const json05 = {code: 'slide3'}// 轮播1
const json02 = {code: 'p11'}//  妈妈
const json03 = {code: 'p13'}//  婴幼儿
const json04 = {code: 'p12'}//  试用中心

const json = '/static/json/'
const imgUrl = '/static/images/'
export default {
  components: {
    Swiper,
    SwiperItem,
    GroupTitle,
    XButton,
    Divider
  },
  data () {
    return {
      banners: [],
      banner_index: 0,
      banners1: [],
      banner_index1: 0,
      moms: [],
      babies: [],
      trails: []
    }
  },
  async created () {
      //  轮播图0
      let result = await this.axios.get(json + 'index.json')
      console.log(result)
      let banner1 = result.data.banner1
      this.banners = []
      banner1.map((item, index) => {
        this.banners.push({
          url: item.url,
          img: imgUrl + item.img,
          title1: item.title
        })
      })

      //  轮播图1
      let banner2 = result.data.banner2
      this.banners1 = []
      banner2.map((item, index) => {
        this.banners1.push({
          url: item.url,
          img: imgUrl + item.img,
          title1: item.title
        })
      })

      //  妈妈
      let mom = result.data.mom
      mom.map((item, index) => {
        this.moms.push({
          img: imgUrl + item.img,
          url: item.url,
          title: item.title
        })
      })
      //  婴幼儿
      let baby = result.data.baby
      baby.map((item, index) => {
        this.babies.push({
          img: imgUrl + item.img,
          url: item.url,
          title: item.title
        })
      })

      //  试用中心
      let trail = result.data.trail
      trail.map((item, index) => {
        this.trails.push({
          img: imgUrl + item.img,
          url: item.url,
          title: item.title
        })
      })
  },
  methods: {
  }
}
</script>
<style lang="less">
  @baseBgC:#6a63aa;
  .img-title{
    width: 100%;
    display: block;
  }
  .swiper0 img{
    width: 100%;
    height: 100%;
  }
  #swiper0 /deep/ .dot0,
  #swiper1 /deep/ .dot1{
    left: 0;
    right: 0;
    margin: 0 auto;
    text-align: center;
  }
  #swiper0 /deep/ .dot0 a,#swiper1 /deep/ .dot1 a{float: none;}
  #swiper0 /deep/  .vux-icon-dot{
    width: 50px;
    height: 2px;
    background-color: #f1f1f1;
  }
  #swiper0 /deep/  .vux-icon-dot.active{
    background-color: @baseBgC;
  }
  #swiper1 /deep/  .vux-icon-dot{
    width: 12px;
    height: 12px;
    border-radius: 50%;
  }
  #swiper1 /deep/ .dot1{
    // bottom: -20px;
  }
  .mom,.baby,.trail{
    li:not(:last-child){
      a{
        margin-bottom: 30px;
      }
    }
    img{
      width: 100%;
      display: block;
    }
  }
  .trail,.video{margin-top: 30px;}
  .video{margin-bottom: 30px;}
</style>

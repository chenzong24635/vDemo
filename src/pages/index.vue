<template>
  <div class="clearfix">
    <!-- <router-link to="/News">news</router-link> -->
    <swiper height="9rem" auto loop   :list="banners1" id="swiper" :dots-class="banners1.length >=2 ? 'dot0' : 'swiper-hide'" :show-desc-mask="false"></swiper>
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
    <swiper height="3rem" loop auto  :list="banners2"  id="swiper1" dots-class="dot1" :show-desc-mask="false"></swiper>
    <div class="video">
      <video controls="" width="100%" height="100%" >
        <source src="https://pan.baidu.com/s/16NfMAQF8Yz_p_r8XfXPi7A" type="video/mp4">
      </video>
    </div>
  </div>
</template>

<script>
import {Swiper} from 'vux'

const json01 = {code: 'slide1'}// 轮播0
const json05 = {code: 'slide3'}// 轮播1
const json02 = {code: 'p11'}//  妈妈
const json03 = {code: 'p13'}//  婴幼儿
const json04 = {code: 'p12'}//  试用中心

export default {
  components: {
    Swiper
  },
  data () {
    return {
      banners1: [],
      banners1Len: 0,
      banners2: [],
      banners2Len: 0,
      moms: [],
      babies: [],
      trails: []
    }
  },
  destroyed () {
    this.$store.state.bottomShow = true
  },
  created () {
    this.$store.state.bottomShow = false
    /* let result = await this.axios.get(this.base_url + 'index.json')
    let banner1 = result.data.banner1 */
    this.getData('banners1', json01)
    this.getData('banners2', json05)
    this.getData('moms', json02)
    this.getData('babies', json03)
    this.getData('trails', json04)
    this.getData('trails', json04)
    // 最后一个会报错 所有多执行一次
  },
  methods: {
    async getData (target, json) {
      let result = await this.axios.post(this.base_url + '/web/adlist', json)
      let data = result.data
      let lists = []
      // this.banners1Len = 0
      data.map((item, index) => {
        if (item.status) {
          lists.push({
            url: item.linkurl,
            img: this.base_img + item.img,
            title1: item.title
          })
        }
      })
      console.log(target, lists)
      switch (target) {
        case 'banners1':
          this.banners1 = lists
          break
        case 'banners2':
          this.banners2 = lists
          break
        case 'moms':
          this.moms = lists
          break
        case 'babies':
          this.babies = lists
          break
        case 'trails':
          this.trails = lists
          break
      }
    }
  }
}
</script>
<style lang="less" scoped>
  @baseBgC:#6a63aa;
  .img-title{
    width: 100%;
    display: block;
  }

  #swiper1 /deep/  .vux-icon-dot{
    width: 10px;
    height: 10px;
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

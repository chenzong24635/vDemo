<template>
  <div>
    <router-link to="/FooterBar">news</router-link>
    <!-- <swiper loop auto :list="banner_list1" :index="banner_index" @on-index-change="banner_onIndexChange"></swiper> -->
    <swiper height="9rem" loop auto :list="banner_list" :index="banner_index" dots-class="dot0" @on-index-change="banner_onIndexChange" @swiper-indicator-active-color="dot0-active"></swiper>
    <div class='t'>ttttt</div>
    <div class="one tac">
      <img class="img-title" src="../assets/images/m-t.jpg" alt="">
      <!-- <div class="mom"><a href="facialCare.html"><img class="m1" src="../assets/one-1.jpg"></a></div> -->
    </div>
    
  </div>
</template>

<script>
import { Swiper, GroupTitle, SwiperItem, XButton, Divider } from 'vux'

const url = 'http://61.155.169.77:10002/'
const img = 'http://61.155.169.77:10005/'
const json01 = {
  code: 'slide1'
}
let baseList = []

export default {
  components: {
    Swiper,
    SwiperItem,
    GroupTitle,
    XButton,
    Divider
  },
  async mounted () {
    let result = await this.axios.post(url + 'web/adlist', json01)
    let lists = result.data
    baseList = []
    console.log(lists)
    lists.map((item, index) => {
      // if (item)
      baseList.push({
        url: item.linkurl,
        img: img + item.img
      })
    })
    console.log(baseList)
  },
  methods: {
    banner_onIndexChange (index) {
      this.banner_index = index
    }
  },
  data () {
    return {
      banner_list: baseList,
      banner_index: 0
    }
  }
}
</script>

<style scoped>
  .img-title{
    width: 100%;
    height: 200px; 
  }
  .dot0{
    background-color: gold;
    color:gold
  }
  .dot0-active{
    background-color: red;
    color:red
  }
  .t{
    width: 200px;
    height: 10px;
    background-color: #ddd;
  }
</style>

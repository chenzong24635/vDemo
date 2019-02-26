<template>
  <div class="">
    <scrollTop></scrollTop>
    <div class="img"><img :src="bannerImg" alt="" class="img-title"></div>
    <h1>专柜导航</h1>
    <p class="p1">查询距离您最近的门店</p>
    <div class="address" @click="show">
      <p class="address2 a" v-if="onLoadShow" >
        <span>省</span>
        <span>市</span>
        <span>区</span>
      </p>
      <p class="address2 b" v-else >
        <span>{{pname}}</span>
        <span>{{cname}}</span>
        <span>{{rname}}</span>
      </p>
      <div class="address1">
        <group>
          <x-address @on-shadow-change="onShadowChange" @on-hide="onHide" title="" v-model="addressValue"
          raw-value :list="addressData" placeholder="省 市 区" value-text-align="left"></x-address>
        </group>
      </div>
    </div>
    <button class="search primary" @click='search'>搜索专柜</button>
    <section>
      <ul id="lists" v-if="lists.length > 0">
        <li  v-for="(item, index) in lists" :key="index" :data-id="item.id" class="vux-1px-b">
          <h3 class="title">{{item.title}}</h3>
          <div class='detail'>
            {{item.pname}}{{item.cname}}{{item.rname}}{{item.address}}
          </div>
        </li>
      </ul>
      <load-more v-else :show-loading="false" tip="暂无数据" ></load-more>
    </section>
  </div>
</template>
<script>
import {Group, XAddress, ChinaAddressData, LoadMore} from 'vux'
import scrollTop from '@/components/scrollTop.vue'
const json = {code: 'b2'}
let json01 = {
  pname: '',
  cname: '',
  rname: ''
}
export default {
  name: '',
  components: {
    Group,
    XAddress,
    LoadMore,
    scrollTop
  },
  data () {
    return {
      onLoadShow: true,
      bannerImg: '',
      lists: [],
      addressData: ChinaAddressData,
      addressValue: [],
      pname: '省',
      cname: '市',
      rname: '区'
    }
  },
  created () {
    this.getBanner()
    this.getLists()
  },
  methods: {
    async getBanner () {
      let result = await this.axios.post(this.base_url + '/web/adlist', json)
      this.bannerImg = this.base_img + result.data[0].img
    },
    async getLists () {
      let result = await this.axios.post(this.base_url + '/web/storelist', json01)
      if (result.success) {
        this.lists = result.data
      }
    },
    search () {
      json01 = {
        pname: this.addressValue[0],
        cname: this.addressValue[1],
        rname: this.addressValue[2]
      }
      this.getLists()
    },
    onShadowChange (ids, names) { // 省市区改变
      this.pname = names[0]
      this.cname = names[1]
      this.rname = names[2]
    },
    show () {
      this.onLoadShow = false
    },
    onHide (bool) {
      if (!bool && (this.pname === '省')) { // 如果取消
        this.onLoadShow = true
      }
    }
  }
}
</script>
<style scoped lang="less">
h1{
  font-size: 50px;/*px*/
  text-align: center;
  color: #767676;
  margin: 60px 0;
  font-weight: normal;
}
.p1{
  font-size: 30px;/*px*/
  color: #767676;
  text-align: center;
}
.address{
  position: relative;
  margin: 50px 0;
}
.address1{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  opacity: 0;
  z-index: 99;
}
.address2{
  text-align: center;
  span{
    display: inline-block;
    font-size: 28px;/*px*/
    min-width: 180px;
    padding: 10px 20px;
    border: 1px solid #ccc;/*no*/
    color:rgb(89, 89, 89);
  }
}
.search{
  width: 98%;
  padding: 20px 0;
  font-size: 28px;/*px*/
  display: block;
  margin: 0 auto 30px;
  text-align: center;
  color:#fff;
  background-color: #6a63aa;
}
#lists{
  li{
    padding: 20px 60px;
    background: url('/static/images/common/guide1.jpg')no-repeat 26px 28px;
    background-size: 26px 30px;
    .title{
      margin: 0;
      font-size: 30px;/*px*/
      color:#494949;
    }
    .detail{
      font-size: 26px;/*px*/
      letter-spacing: 1px;
      color: #848484;
      line-height: 1.4;
    }
  }
}
</style>

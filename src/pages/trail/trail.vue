<template>
  <div class="">
    <!-- <router-view ></router-view> -->
    <!-- <router-link to="/trail/test">的放大的</router-link> -->
    <img class="img-title" :src="banner" alt="" />
    <section>
      <p class="trail-top">请选择您要试用的产品</p>
      <ul id="lists" class="flex01-1">
        <li v-for="(item, index) in lists" class="list vux-1px" :key="item.id" >
          <p class="ck" @click="check(item, index)">
            <icon v-show="item.checked" type="success"></icon>
            <icon v-show="!item.checked" type="circle"></icon>
            <!-- <check-icon :value.sync="item.checked" type="plain"><span class="title fs22">{{item.title}}</span></check-icon> -->
            <!-- <x-icon type="ios-circle-outline" size="16"></x-icon> -->
            <span class="title fs22">{{item.title}}</span>
          </p>
          <div><img  :src="item.pic" onerror="this.src='static/images/errorImg.jpg'" alt="" /></div>
          <p class="subtitle ov2 ">功效：{{item.subtitle}}</p>
          <p class="ggvalue">规格：<span class="guige">{{item.smallggvalue}}{{item.gg}}</span></p>
        </li>
      </ul>
    </section>
    <div class="btn-link"><x-button @click.native="buy" type="default" >提交</x-button></div>
    <toast v-model="toastData.isShow" :type="toastData.type" :text="toastData.text" width="50vw" :time="1000"  :is-show-mask="true" position="middle"></toast>
  </div>
</template>
<script>
import { Toast, Icon, XButton } from 'vux'
const json = {code: 'b1'}
export default {
  name: '',
  components: {
    Toast,
    Icon,
    XButton
  },
  data () {
    return {
      ck: true,
      banner: '',
      toastData: {
        isShow: false,
        type: 'warn',
        text: '请选择您要试用的产品'
      },
      lists: []
    }
  },
  created () {
    this.axios.post('/web/adlist', json).then((result) => {
      if (result.success) {
        this.banner = this.base_img + result.data[0].img
      }
      this.lists.map((item, index) => {
        item.checked = true
      })
      this.lists = []
      console.log(result)
    })
  },
  methods: {
    check (item, index) {
      console.log(item, index)
      this.lists.filter((item1, index1) => {
        if (index === index1) {
          console.log(index, index1)
          item1.checked = !item1.checked
        }
      })
      console.log(this.lists)
    },
    buy () {
      this.toastData.isShow = true
    }
  }
}
</script>
<style scoped lang="less">
.trail-top{
  padding: 10px;
  padding-left: 40px;
  background: url('../../assets/images/common/icon_4.jpg')no-repeat 20px center;
  background-size: 15px 15px;
}
#lists{
  padding: 0 20px;
  flex-wrap: wrap;
  li{
    box-sizing: border-box;
    width: 48%;
    padding: 10px;
    margin-bottom: 12px;
    &:nth-child(2n){margin-left: 4%;}
    a:visited{color:gold}
    .ck {
      /deep/ .weui-icon-success, .weui-icon-circle{
        font-size: 16px;
      }
    }
    img{
      width: 100%;
      height: 120px
    }
    p{
      position: relative;
      color:#000;
      font-size: 13px;/*no*/
      line-height: 1.3;
    }
    .title{margin-bottom: 4px;}
    .title,.amount{font-size: 13px;/*no*/}
    .subtitle{max-height: 36px;}
    .subtitle,.ggvalue{color:#a3a3a3;font-size: 12px;/*no*/}
    .ggvalue{margin: 3px 0;}
  }
}
.btn-link{margin: 20px;}
</style>

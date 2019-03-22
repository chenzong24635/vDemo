<template>
  <div class="">
    <router-view ></router-view>
    <!-- <router-link to="/trail/test">的放大的</router-link> -->
    <img class="img-title" :src="banner" alt="">
    <p class="trail-top">请选择您要试用的产品</p>
    <ul id="lists" class="flex01-1">
      <li v-for="(item, index) in lists" class="list vux-1px" :key="index" :data-id="item.id">
        <p class="ck" @click="check(item, index)">
          <icon v-show="item.checked" type="success"></icon>
          <icon v-show="!item.checked" type="circle"></icon>
          <!-- <check-icon :value.sync="item.checked" type="plain"><span class="title fs22">{{item.title}}</span></check-icon> -->
          <!-- <x-icon type="ios-circle-outline" size="16"></x-icon> -->
          <span class="title fs22">{{item.title}}</span>
        </p>
        <div><img  :src="item.pic" onerror="this.src='static/images/errorImg.jpg'" alt=""></div>
        <p class="subtitle ov2 ">功效：{{item.subtitle}}</p>
        <p class="ggvalue">规格：<span class="guige">{{item.smallggvalue}}{{item.gg}}</span></p>
      </li>
    </ul>
  </div>
</template>
<script>
import { Icon } from 'vux'
const json = {code: 'b1'}
export default {
  name: '',
  components: {
    Icon
  },
  data () {
    return {
      ck: true,
      banner: '',
      lists: [
        {
          id: 359,
          checked: false,
          title: '面部滢润保湿套装',
          pic: this.base_img + 'c52a66e05bd947ee93302f4e8cc6c651.png',
          subtitle: '孕肌护理三部曲 清洁 补水孕肌护理三部曲 清洁 补水 保湿 保湿',
          ggvalue: '191ml，150ml，44ml',
          gg: 3
        },
        {
          id: 359,
          checked: true,
          title: '面部滢润保湿套装',
          pic: this.base_img + 'c52a66e05bd947ee93302f4e8cc6c651.png',
          subtitle: '孕肌护理三部曲 清洁 补水 保湿',
          ggvalue: '191ml，150ml，44ml',
          gg: 3
        },
        {
          id: 359,
          checked: false,
          title: '面部滢润保湿套装',
          pic: this.base_img + 'c52a66e05bd947ee93302f4e8cc6c651.png',
          subtitle: '孕肌护理三部曲 清洁 补水 保湿',
          ggvalue: '191ml，150ml，44ml',
          gg: 3
        }
      ]
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
    }
  }
}
</script>
<style scoped lang="less">

#lists{
  padding: 20px;
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
</style>

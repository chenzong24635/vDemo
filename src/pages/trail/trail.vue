<template>
  <div class="">
    <img class="img-title" :src="banner" alt="">
    <ul id="lists" class="flex01-1">
      <li v-for="(item, index) in lists" class="list vux-1px" :key="index" :data-id="item.id">
        <p class="ck"><x-icon type="ios-circle-outline" size="16"></x-icon><span class="title fs22">{{item.title}}</span></p>
        <div><img  :src="item.pic" onerror="this.src='static/images/errorImg.jpg'" alt=""></div>
        <p class="subtitle ov2 ">功效：{{item.subtitle}}</p>
        <p class="ggvalue">规格：<span class="guige">{{item.smallggvalue}}{{item.gg}}</span></p>
      </li>
    </ul>
  </div>
</template>
<script>
const json = {code: 'b1'}
export default {
  name: '',
  components: {
  },
  data () {
    return {
      banner: '',
      lists: [
        {
          id: 359,
          title: '面部滢润保湿套装',
          pic: this.base_img + 'c52a66e05bd947ee93302f4e8cc6c651.png',
          subtitle: '孕肌护理三部曲 清洁 补水孕肌护理三部曲 清洁 补水 保湿 保湿',
          ggvalue: '191ml，150ml，44ml',
          gg: 3
        },
        {
          id: 359,
          title: '面部滢润保湿套装',
          pic: this.base_img + 'c52a66e05bd947ee93302f4e8cc6c651.png',
          subtitle: '孕肌护理三部曲 清洁 补水 保湿',
          ggvalue: '191ml，150ml，44ml',
          gg: 3
        },
        {
          id: 359,
          title: '面部滢润保湿套装',
          pic: this.base_img + 'c52a66e05bd947ee93302f4e8cc6c651.png',
          subtitle: '孕肌护理三部曲 清洁 补水 保湿',
          ggvalue: '191ml，150ml，44ml',
          gg: 3
        }
      ]
    }
  },
  async created () {
    let result = await this.axios.post(this.base_url + '/web/adlist', json)
    if (result.success) {
      this.banner = this.base_img + result.data[0].img
    }
    console.log(result)
  },
  methods: {}
}
</script>
<style scoped lang="less">
#lists{
  padding: 0 40px;
  margin-top: 30px;
  flex-wrap: wrap;
  li{
    box-sizing: border-box;
    width: 48%;
    padding: 10px 0;
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

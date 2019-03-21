<template>
  <div class="">
    <section class="jf">
      <div class="jf-icon">
        <img src="../../assets/images/common/points.png" alt="">
        可用积分
        <span>{{integral}}</span>
      </div>
      <router-link to="productjs" class="shop flex01">
        <img src="../../assets/images/common/shop1.png" alt="">
        &nbsp;积分商城&nbsp;&gt;
      </router-link>
    </section>
    <section class="tabs vux-1px-b clearfix">
      <ul class="flex01-1">
        <li :class="[tabIndex === index ? 'active' : '', 'tab']" v-for="(item, index) in tabs" :key="index" @click="tab(index)">{{item}}</li>
      </ul>
    </section>
    <ul  id="lists"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10">
      <li v-for="(item, index) in lists" :key="index" class="list vux-1px-b">
        <p class="flex01">
          <span v-html="item.messageDetail"></span>
          <span :class="item.typeid === 1 ? 'color1' : 'color0'">{{item.typeid === 1 ? '+' : '-'}}{{item.integralval}}</span>
        </p>
        <p class="flex01">
          <span class="time">{{item.createDate1}}</span>
          <span :class="item.typeid === 1 ? 'color1' : 'color0'">{{item.context}}</span>
        </p>
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
import {dateFormat, LoadMore, Toast} from 'vux'
export default {
  name: '',
  components: {
    dateFormat,
    LoadMore,
    Toast
  },
  data () {
    return {
      tabIndex: 0,
      tabs: ['积分明细', '积分收入', '积分支出'],
      integral: '',
      lists: [],
      json: {
        order: 'ASC',
        pageNum: 1,
        pageSize: 10,
        typeid: 0
      },
      loading: false,
      isLastPage: false
    }
  },
  created () {
    let integral = localStorage.getItem('integral') || ''
    this.integral = integral
    if (!integral) {
      this.getDetail()
    }
    this.getLists()
  },
  methods: {
    tab (index) {
      console.log(index)
      this.tabIndex = index
      this.json.typeid = index
      this.json.pageNum = 1
      this.isLastPage = false
      this.lists = []
      this.getLists()
    },
    getDetail () {
      this.axios.post('member/detail').then((response) => {
        if (response.success) {
          this.detail = response.data
          this.integral = response.data.integral
          localStorage.setItem('integral', response.data.integral)
        }
      })
    },
    getLists () { // typeid:1积分收入、2积分支出
      this.axios.post('member/integrallist', this.json).then((response) => {
        if (response.success) {
          let data = response.data
          console.log(data)
          if (this.isLastPage) { return }
          if (data.isLastPage) {
            this.isLastPage = true
          }
          let lists = data.list
          lists.map((item, index) => {
            if (item.orderid) {
              item.messageDetail = `
              订单编号：${item.orderid}
              `
            } else {
              item.messageDetail = item.context
            }
            item.createDate1 = dateFormat(item.createDate, 'YYYY-MM-DD HH:mm:ss')
          })
          if (this.json.pageNum / 1 === 1) {
            this.lists = lists
          } else {
            this.lists = this.lists.concat(lists)
          }
          this.loading = false
          this.json.pageNum++
        }
      })
    },
    loadMore () { // 上拉加载更多
      if (this.isLastPage) {
        return
      }
      this.loading = true
      // this.getLists()
    }
  }
}
</script>
<style scoped lang="less">
@color:#6a63aa;
@color1:#4b376e;
.jf{
  position: relative;
  background: url(../../assets/images/my/top-bg.png)center no-repeat;
  // background-size: cover;
  padding: 40px 0 60px;
  color: #fff;
  text-align: center;
  img{
    width: 15px;
    height: 15px;
  }
  span{font-size: 40px;}
  .shop{
    box-sizing: border-box;
    justify-content: flex-end;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    padding: 5px 20px;
    text-align: right;
    color: #fff;
    background: rgba(255,255,255,0.4);
  }
}
.tabs{
  padding-top: 10px;
  &.vux-1px-b:after{
    border-bottom-color: @color1;
  }
  .tab{
    font-size: 15px;
    margin: 0 20px;
    padding: 4px 0;
    border-bottom: 2px solid transparent;
    &.active{
      color: @color;
      border-bottom-color: @color;
    }
  }
}
#lists{
  .list{
    padding: 8px 15px;
    &>p{margin-bottom: 8px;}
    span{font-size: 13px;}
    .time{color: #aeaeae;}
    .color1{
      color: #c97979;
    }
    .color0{
      color: #79c9a8;
    }
  }
}
</style>

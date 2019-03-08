<template>
  <div class="detail">
    oo
    <h1 class="title">{{title}}</h1>
    <time class="time">{{date}}</time>
    <div v-html="wap" class="wap"></div>
  </div>
</template>
<script>
import {timestampToTime} from '@/utils/index.js'
export default {
  name: '',
  components: {},
  data () {
    return {
      id: '',
      title: '',
      date: '',
      wap: ''
    }
  },
  async created () {
    let id = this.$route.params.id / 1
    this.id = id
    let result = await this.axios.get(this.base_url + '/web/newdetail/' + id)
    this.title = result.data.title
    this.date = timestampToTime(result.data.createDate)
    this.wap = result.data.wap
  },
  methods: {}
}
</script>
<style scoped lang="less">
  .detail{
    padding: 20px 40px;
    .title{
      font-weight: normal;
      font-size: 44px;/*px*/
    }
    .time{
      color:#a5a5a5;
      font-size: 12px;/*no*/
    }
    .wap{
      margin-top: 20px;
      font-size: 14px;/*no*/
      color:#595959;
    }
  }
</style>

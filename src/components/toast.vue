<template>
  <div class="">
    <toast v-model="showToast" :type="type" :width="width" :time="time" :text="text" :is-show-mask="true" position="middle"></toast>
  </div>
</template>
<script>
import {Toast} from 'vux'
export default {
  name: '',
  components: {Toast},
  props: {
    showToast: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'success'
    },
    width: {
      type: String,
      default: '130px'
    },
    text: String,
    time: {
      type: Number,
      default: 1000
    }
  },
  data () {
    return {}
  },
  created () {},
  methods: {}
}
</script>
<style scoped lang="less">
</style>

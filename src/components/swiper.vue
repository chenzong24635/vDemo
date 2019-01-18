<template>
  <div class="">
    <swiper height="9rem" loop auto :list="banner_list" :index="banner_index" dots-class="dot0" @on-index-change="banner_onIndexChange" @swiper-indicator-active-color="dot0-active"></swiper>
  </div>
</template>
<script>
export default {
  name: '',
  props: {
    list: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  components: {},
  data () {
    return {
      banner_list: []
    }
  },
  methods: {}
}
</script>
<style scoped>
</style>

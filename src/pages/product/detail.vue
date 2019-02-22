<template>
  <div class="">
    detail
  </div>
</template>
<script>
export default {
  name: '',
  components: {},
  data () {
    return {}
  },
  beforeRouteUpdate () {
    console.log('beforeRouteUpdate', this.$route.params.id)
  },
  mounted () {
    console.log('mounted', this.$route.params.id)
  },
  created () {
    console.log('created', this.$route.params.id)
  },
  methods: {}
}
</script>
<style scoped lang="less">
</style>

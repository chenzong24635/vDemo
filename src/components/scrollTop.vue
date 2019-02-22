<template>
  <div class="">
    <img @click="scroll" src="/static/images/common/scrolltop.png" alt="">
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
    }
  },
  methods: {
    scroll () {
      window.scrollTo(0, 0)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img{
  position: fixed;
  right: 20px;
  top: 0;
  bottom: 0;
  margin: auto 0;
  width: 50px;
  height: 50px;
  z-index: 3;
}
</style>

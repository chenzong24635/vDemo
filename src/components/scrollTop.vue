<template>
  <div class="">
    <img class="scroll" @click="scroll" src="../assets/images/common/scrolltop.png" alt="">
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

<style scoped>
img{
  position: fixed;
  right: 10px;
  top: 0;
  bottom: 0;
  margin: auto 0;
  width: 30px;
  height: 30px;
  z-index: 3;
}
</style>

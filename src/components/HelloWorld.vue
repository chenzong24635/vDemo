<template>
  <div class="">
dadsad
<p>dada</p>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
    }
  },
  async mounted () {
    let _this = this
    let json = {
      order:"ASC",
      pageNum:1,
      pageSize:100
    }
    let result = await this.axios.post('http://61.155.169.77:10002/web/newlist', json)
    console.log(result)
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

<template>
  <div class="">
  </div>
</template>
<script>
function timestampToTime (times) {
  if (times.lentgh > 10) { // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
    times *= 1000
  }
  let date = new Date(times)
  let Y = date.getFullYear() + '-'
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  let D = date.getDate() + ' '
  // let h = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()) + ':'
  // let m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes()) + ':'
  // let s = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds())
  return Y + M + D
}

export default {
  timestampToTime
}
</script>
<style scoped lang="less">
</style>

<template>
  <div class="header-title">
    <p>{{title}}</p>
  </div>
</template>

<script>
export default {
  data () {
    const title = this.$('systemname')
    return {
      title: title
    }
  }
}
</script>

<style scoped lang='less'>
.header-title {
  p {
    height: 60px;
    line-height: 76px;
    font-size: 20px;
    color: #fff;
    padding: 0 20px;
    cursor: pointer;
    white-space: nowrap;
    text-align: center;
  }
}
</style>

<template>
  <div class="header-title">
    <p>{{title}}</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: "内容分发平台"
    }
  }
}
</script>

<style scoped lang='less'>
.header-title {
  p {
    height: 60px;
    line-height: 60px;
    font-size: 20px;
    color: #fff;
    padding: 0 20px;
    cursor: pointer;
    white-space: nowrap;
    text-align: center;
  }
}
</style>

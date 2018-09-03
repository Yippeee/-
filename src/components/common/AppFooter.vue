<template>
  <div>
    <div class="app-footer">
      <div></div>
      <div>
        <p>版权所有 © {{ COPYRIGHT.createYear }}-{{ nowYear }} {{ COPYRIGHT.companyName }}  {{ COPYRIGHT.recordNumber }}</p>
        <p>Copyright © {{ COPYRIGHT.createYear }}-{{ nowYear }} {{ COPYRIGHT.companyEnglishName }},All Rights Reserved</p>
      </div>
    </div>
  </div>
</template>

<script>
let COPYRIGHT = window.COPYRIGHT ? window.COPYRIGHT : {productName: "homed家裕", companyName: "深圳市茁壮网络股份有限公司", companyEnglishName: "iPanel.TV Inc.", recordNumber: "粤ICP备12069260", createYear: "1999"}

export default {
  data () {
    return {
      COPYRIGHT: COPYRIGHT
    }
  },
  computed: {
    nowYear () {
      return new Date().getFullYear()
    }
  }
}
</script>

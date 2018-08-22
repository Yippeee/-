<template>
  <div>
    <image-editor
      :options="{
          systemType: 'news',
          index: 1,
      }" 
      @callback="afterEditPoster">
      </image-editor>
  </div>
</template>
<script>
export default {
  methods:{
    afterEditPoster (arr,index) {
      console.log(index)
    }
  }
}
</script>

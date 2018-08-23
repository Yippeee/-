<template>
  <div>
    <!-- <image-editor
      :options="{
          systemType: 'news',
          index: 1,
      }" 
      @callback="afterEditPoster">
    </image-editor> -->
    <canvas id="canvas">浏览器不支持HTML5</canvas>
    <img src="../../assets/logo.png" alt="">
    <img id="demo" alt="">
  </div>
</template>
<script>
export default {
  methods:{
    afterEditPoster (arr,index) {
      console.log(index)
    }
  },
  mounted () {
    var canvas = document.getElementById('canvas')
    let demo = document.getElementById('demo')
    console.log(canvas)
    var ctx = canvas.getContext('2d');
      // ctx.beginPath();
      // ctx.moveTo(30,96);
      // ctx.lineTo(70,66);
      // ctx.lineTo(103,76);
      // ctx.lineTo(170,15);
      // ctx.stroke();
    var img = new Image();
    console.log('dsfffffffffff')
    img.onload = function(){
      console.log('dsfffffffffff')

      ctx.drawImage(img,10,10,200,200);
      console.log('dsfffffffffff')
      ctx.beginPath();
      ctx.moveTo(30,96);
      ctx.lineTo(70,66);
      ctx.lineTo(103,76);
      ctx.lineTo(170,15);
      ctx.stroke();
    }
    console.log('dsfffffffffff')
    img.src = require("../../assets/logo.png")
        
    console.log('dsfffffffffff')
    demo.src = require("../../assets/logo.png")
  }
}
</script>

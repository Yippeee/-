<template>
  <div class="posterEditor">
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
    <el-button @click="dialogVisible = true,nowStep = 1"></el-button>
    <el-dialog
      :visible.sync="dialogVisible"
      width="800px"
      :title="title">
      <div class="poster-content">
        <el-scrollbar style="height:100%">
          <!-- 海报 -->
          <div ref="firstStep" v-if="nowStep == 1" class=" el-scrollbar" @click="turnToActive($event)">
              <p>320x400竖版海报尺寸 <i class="icon-pencil icon"></i> </p>
              <div class="imgDiv" @click="">
                <img src="../../assets/example.jpg" alt="">
                <span>320x400</span>
              </div>
              <div class="imgDiv">
                <img src="../../assets/logo.png" alt="">
                <span>320x400</span>
              </div>
              <div class="imgDiv">
                <img src="../../assets/logo.png" alt="">
                <span>320x400</span>
              </div>
              <p>500x280竖版海报尺寸 <i class="icon-pencil icon"></i></p>
              <div class="imgDiv">
                <img src="../../assets/example.jpg" alt="">
                <span>500x280</span>
              </div>
              <p>1280x720 <i class="icon-pencil icon"></i></p>
              <div class="imgDiv">
                <img src="../../assets/logo.png" alt="">
                <span>1280x720</span>
              </div> 
          </div>
          <!-- 本地上传-上传图片 -->
          <div v-if="nowStep == 2">
            <span class="alter">批量上传前，请检查图片是否已按照规则命好名，如‘500x280’</span>
            <el-upload
              class="el-upload2"
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :on-remove="handleRemove"
              :on-change="change"
              :auto-upload="false">
              <i class="el-icon-plus" @click="demo" style="padding:40%"></i>
            </el-upload>
          </div>
          <!-- 选择尺寸（图片裁剪界面） -->
          <div v-if="nowStep == 4" class="choose-size">
            <div class="left-preview">
              水电费第三个
            </div>
            <div class="center-editor">
              cccccccccccccccc
            </div>
            <div class="right-handle">
              rrrrrrrrrrr
            </div>
          </div>
        </el-scrollbar>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button v-show="nowStep == 1" type="primary" @click="nowStep = 5">截取帧画</el-button>
        <el-button v-show="nowStep == 1" type="primary" @click="nowStep = 2">本地上传</el-button>
        <el-button v-show="nowStep == 1" @click="dialogVisible = false">确认</el-button>
        <el-button v-show="nowStep == 2||nowStep == 5" @click="nowStep++">下一步</el-button>
        <el-button v-show="nowStep == 3||nowStep == 4||nowStep == 6" @click="nowStep = 1">完成</el-button>
        <el-button v-show="nowStep == 2||nowStep == 3||nowStep == 4||nowStep == 5||nowStep == 6" @click="dialogVisible = false">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      steps : ['','海报','本地上传-上传图片','本地上传-设配尺寸','选择尺寸','截取帧画','截取帧画-设配尺寸','编辑','海报上传'],
      nowStep : 1,
      title: "海报",
      dialogVisible: true,
      dialogImageUrl: '',
      dialogVisible2: true
    };
  },
  methods: {
    handleRemove(file, fileList) {
      let nodes = document.getElementsByClassName('el-upload-list__item')
      Array.from(nodes).forEach((element,index) => {
        if (index < nodes.length-1) {
          element.setAttribute('imgName',fileList[index].name.match(/([^;]*)\./)[1])
        }
      });
    },
    change(){
      this.$nextTick( () => {
        console.log('change')
        let dom = document.getElementsByClassName('el-upload__input')[0]
        let imageName = dom.files[0].name.match(/([^;]*)\./)[1]
        let nodes = document.getElementsByClassName('el-upload-list__item')
        let node = nodes[nodes.length-1]
        node.setAttribute('imgName',imageName)
      }) 
    },
    demo () {},
    turnToActive (e) {
      let target = e.target.nodeName
      console.log(target.nodeName)
      if(target == 'IMG'){
        let a = this.$refs['firstStep'].getElementsByClassName('active')[0]
        if(a){
          a.className = ''
        }
        e.target.className = 'active'
        console.log(e.target.className)
      }else if(target == "I"){
        this.nowStep = 4
      }
    }
  },
  watch:{
    nowStep (v) {
      this.title = this.steps[v]
    }
  },
  mounted() {
    var canvas = document.getElementById("canvas")
    let demo = document.getElementById("demo")
    console.log(canvas)
    var ctx = canvas.getContext("2d");
    var img = new Image();
    img.onload = function() {
      ctx.drawImage(img, 10, 10, 200, 200)
      ctx.beginPath()
      ctx.moveTo(30, 96)
      ctx.lineTo(70, 66)
      ctx.lineTo(103, 76)
      ctx.lineTo(170, 15)
      ctx.stroke()
    };
    img.src = require("../../assets/logo.png")
    demo.src = require("../../assets/logo.png")
  }
};
</script>
<style lang="less" scoped>
.poster-content {
  height: 420px;
  overflow-y: auto;
  .imgDiv {
    display: inline-block;
    width: 140px;
    text-align: center;
    font-size: 14px;
    color: #909399;
    margin-bottom: 30px;
    margin-right: 10px;
    // border: 1px dashed #eef1f6;
    img {
      width: 140px;
      height: 140px;
      &.active{
        border: 3px solid #22a2ff;
        border-radius: 6px;
      }
    }
  }
  p {
    color: #909399;
    font-size: 16px;
  }
}
.alter{
  color: red;
  font-size: 14px;
  box-sizing: border-box;
  display: inline-block;
  height: 30px;
}
.choose-size{
  display: inline-block;
  height: 100%;
  .left-preview{
    display: inline-block;
    width: 160px;
    background-color: #fff;
  }
  .center-editor{
    display: inline-block;
    height: 100%;
    width: 480px;
    background-color: red;
  }
  .right-handle{
    display: inline-block;
    width: 180px;
    height: 100%;
    background-color: blue;
  }
}
</style>

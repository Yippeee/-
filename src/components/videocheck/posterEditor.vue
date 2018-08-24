<template>
  <div class="posterEditor">
    <img id="demo" alt="" style="width:100px;height:100px">
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
              ref="upload"
              class="el-upload2"
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
        <el-button v-show="nowStep == 2||nowStep == 5" @click="nextStep">下一步</el-button>
        <el-button v-show="nowStep == 3||nowStep == 4||nowStep == 6" @click="nowStep = 1">完成</el-button>
        <el-button v-show="nowStep == 2||nowStep == 3||nowStep == 4||nowStep == 5||nowStep == 6" @click="dialogVisible = false">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Axios from "axios";

export default {
  data() {
    return {
      steps: [
        "",
        "海报",
        "本地上传-上传图片",
        "本地上传-设配尺寸",
        "选择尺寸",
        "截取帧画",
        "截取帧画-设配尺寸",
        "编辑",
        "海报上传"
      ],
      nowStep: 1,
      title: "海报",
      dialogVisible: true,
      dialogImageUrl: "",
      dialogVisible2: true,
      uploadData: {},
      fileArray: []
    };
  },
  methods: {
    handleRemove(file, fileList) {
      let nodes = document.getElementsByClassName("el-upload-list__item");
      Array.from(nodes).forEach((element, index) => {
        if (index < nodes.length - 1) {
          element.setAttribute(
            "imgName",
            fileList[index].name.match(/([^;]*)\./)[1]
          );
        }
      });
    },
    change(file, fileList) {
      this.$nextTick(() => {
        console.log("change");
        let dom = document.getElementsByClassName("el-upload__input")[0];
        this.fileArray.push(dom.files[0])
        let imageName = dom.files[0].name.match(/([^;]*)\./)[1];
        let nodes = document.getElementsByClassName("el-upload-list__item");
        let node = nodes[nodes.length - 1];
        node.setAttribute("imgName", imageName);
      });
    },
    demo() {},
    turnToActive(e) {
      let target = e.target.nodeName;
      console.log(target.nodeName);
      if (target == "IMG") {
        let a = this.$refs["firstStep"].getElementsByClassName("active")[0];
        if (a) {
          a.className = "";
        }
        e.target.className = "active";
        console.log(e.target.className);
      } else if (target == "I") {
        this.nowStep = 4;
      }
    },
    nextStep() {
      // this.nowStep++;
      let formData = new FormData();
      // let file = this.fileArray[0]
      let url = ''
      if(this.fileArray.length === 1){
        url = 'http://192.168.21.29:8099/poster/poster/upload'
      }else if(this.fileArray.length > 1){
        url = 'http://192.168.21.29:8099/poster/posters/upload'
      }
      this.fileArray.forEach(item => {
        formData.append("file", item);
      })
      formData.append("widthList", 400);
      formData.append("heightList", 400);
      formData.append("seriesId", 1);
      formData.append("videoNumber", 1);

      let config = {
          headers:{'Content-Type':'multipart/form-data'}
      }; 
      Axios.post(url,formData,config).then((response) => {
        console.log(response.data.msg)
      })
    }
  },
  watch: {
    nowStep(v) {
      this.title = this.steps[v];
    }
  },
  mounted() {
    let demo = document.getElementById("demo");
    Axios.get("http://192.168.21.29:8099/poster/posters/page", {
      params: {
        seriesId: 1,
        videoNumber: 1,
        pageNum: 1,
        pageSize: 1
      }
    })
      .then(function(response) {
        // console.log(response.data.rows[0].base64String)
        demo.src =
          "data:image/png;base64," + response.data.rows[0].base64String;
        demo.style.width = response.data.rows[0].width;
        demo.style.height = response.data.rows[0].height;
      })
      .catch(function(error) {
        console.log(error);
      });
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
      &.active {
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
.alter {
  color: red;
  font-size: 14px;
  box-sizing: border-box;
  display: inline-block;
  height: 30px;
}
.choose-size {
  display: inline-block;
  height: 100%;
  .left-preview {
    display: inline-block;
    width: 160px;
    background-color: #fff;
  }
  .center-editor {
    display: inline-block;
    height: 100%;
    width: 480px;
    background-color: red;
  }
  .right-handle {
    display: inline-block;
    width: 180px;
    height: 100%;
    background-color: blue;
  }
}
</style>

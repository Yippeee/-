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
              <div class="imgDiv">
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
          <div v-if="nowStep == 4" class="choose-size" ref="forthStep">
            <!-- 海报预览 -->
            <div class="left-preview">
              <p class="p-header">海报预览</p>
              <div class="preview-content-wrap">
                <el-scrollbar style="height:100%">
                <div class="preview-content" @click="showToEditor($event)">
                  <el-collapse v-model="activeNames" @change="handleChange" >
                    <el-collapse-item title="320x400横版海报" name="1">
                      <img src="../../assets/logo.png" >
                      <img src="../../assets/example.jpg" > 
                    </el-collapse-item>
                    <el-collapse-item title="250x400横版海报" name="2">
                      <img src="../../assets/logo.png" >
                      <img src="../../assets/logo.png" > 
                    </el-collapse-item>
                    <el-collapse-item title="420x300横版海报" name="3">
                      <div>简化流程：设计简洁直观的操作流程；</div>
                      <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
                      <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
                    </el-collapse-item>
                    <el-collapse-item title="1320x900横版海报" name="4">
                      <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
                      <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
                    </el-collapse-item>
                  </el-collapse>
                </div>
                </el-scrollbar>
              </div>
            </div>
            <!-- 图片编辑器区域 -->
            <div class="center-editor">
              <canvas class="canvas1" ref="canvas1" width="300" height="300"></canvas>
            <div style="" class="photo-clip-mask">
              <div class="photo-clip-mask-left"></div>
              <div class="photo-clip-mask-right"></div>
              <div class="photo-clip-mask-top"></div>
              <div class="photo-clip-mask-bottom"></div>
              <div class="photo-clip-area">
                <span class="photo-clip-area-bottom-right"></span>
                <span class="photo-clip-area-bottom-left"></span>
                <span class="photo-clip-area-top-left"></span>
                <span class="photo-clip-area-top-right"></span>
              </div>
            </div>
            </div>
            <!-- 选择设配尺寸区域 -->
            <div class="right-handle">
              <p class="p-header">设配尺寸</p>
                <el-checkbox-group v-model="sizecheckList">
                  <el-checkbox label="250x250"></el-checkbox>
                  <el-checkbox label="320x400"></el-checkbox>
                  <el-checkbox label="1280x980"></el-checkbox>
                </el-checkbox-group>
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
      fileArray: [],
      activeNames: ["1", "2"],
      sizecheckList: []
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
        this.fileArray.push(dom.files[0]);
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
      if (this.nowStep == 2) {
        let formData = new FormData();
        // let file = this.fileArray[0]
        let url = "";
        if (this.fileArray.length === 1) {
          url = "http://192.168.21.29:8099/poster/poster/upload";
        } else if (this.fileArray.length > 1) {
          url = "http://192.168.21.29:8099/poster/posters/upload";
        }
        this.fileArray.forEach(item => {
          formData.append("file", item);
        });
        formData.append("widthList", 400);
        formData.append("heightList", 400);
        formData.append("seriesId", 1);
        formData.append("videoNumber", 1);

        let config = {
          headers: { "Content-Type": "multipart/form-data" }
        };
        Axios.post(url, formData, config).then(response => {
          console.log(response.data.msg);
        });
      }

      this.nowStep++;
    },
    showToEditor(e) {
      if (e.target.nodeName == "IMG") {
        let a = this.$refs["forthStep"].getElementsByClassName("active")[0];
        if (a) {
          a.className = "";
        }
        e.target.className = "active";
        let canvas1 = this.$refs.canvas1;
        let ctx1 = canvas1.getContext("2d");
        let img = new Image();
        //绘制的时候，图片的高度要读取一下
        img.onload = function() {
          ctx1.clearRect(0, 0, 300, 300);
          ctx1.drawImage(img, 0, 0, 300, 300);
        };
        img.src = e.target.src;
      }
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
  height: 460px;
  overflow-y: hidden;
  .imgDiv {
    display: inline-block;
    width: 140px;
    text-align: center;
    font-size: 14px;
    color: #909399;
    margin-bottom: 30px;
    margin-right: 10px;
    img {
      width: 140px;
      height: 140px;
      margin: 3px;
      &.active {
        margin: 0px;
        border: 3px solid #22a2ff;
        border-radius: 6px;
      }
    }
  }
  p {
    color: #909399;
    font-size: 16px;
    i {
      cursor: pointer;
    }
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
  height: 450px;
  font-size: 0;
  .left-preview {
    display: inline-block;
    width: 160px;
    background-color: #fff;
    font-size: 16px;
    height: 100%;
    .preview-content-wrap {
      display: inline-block;
      width: 100%;
      height: 434px;
      // overflow-y: scroll;
      .preview-content {
        display: inline-block;
        height: 600px;
      }
    }
    img {
      width: 150px;
      height: 150px;
      margin: 3px;
      &.active {
        margin: 0px;
        border: 3px solid #22a2ff;
        border-radius: 6px;
      }
    }
    .p-header {
      margin-bottom: 10px;
    }
  }
  .center-editor {
    position: relative;
    display: inline-block;
    height: 100%;
    width: 440px;
    font-size: 16px;
    vertical-align: top;
    text-align: center;
    background-image: url("../../assets/bc.jpg");
    .canvas1 {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    .photo-clip-mask {
      position: absolute;
      left: 0px;
      top: 0px;
      width: 100%;
      height: 100%;
      .photo-clip-mask-left {
        position: absolute;
        left: 0px;
        right: 50%;
        top: 50%;
        bottom: 50%;
        width: auto;
        background-color: rgba(0, 0, 0, 0.5);
        margin-right: 130px;
        margin-top: -130px;
        margin-bottom: -130px;
      }
      .photo-clip-mask-right {
        position: absolute;
        left: 50%;
        right: 0px;
        top: 50%;
        bottom: 50%;
        background-color: rgba(0, 0, 0, 0.5);
        margin-left: 130px;
        margin-top: -130px;
        margin-bottom: -130px;
      }
      .photo-clip-mask-top {
        position: absolute;
        left: 0px;
        right: 0px;
        top: 0px;
        bottom: 50%;
        background-color: rgba(0, 0, 0, 0.5);
        margin-bottom: 130px;
      }
      .photo-clip-mask-bottom {
        position: absolute;
        left: 0px;
        right: 0px;
        top: 50%;
        bottom: 0px;
        background-color: rgba(0, 0, 0, 0.5);
        margin-top: 130px;
      }
      .photo-clip-area {
        border: 2px dashed rgb(221, 221, 221);
        position: absolute;
        left: 50%;
        top: 50%;
        width: 260px;
        height: 260px;
        transform: translate(-50%, -50%);
        span {
          position: absolute;
          height: 8px;
          width: 8px;
          border-radius: 4px;
          border: red;
          background-color: white;
        }
        .photo-clip-area-bottom-right {
          bottom: -4px;
          left: 100%;
          margin-left: -4px;
          cursor: nwse-resize;
        }
        .photo-clip-area-bottom-left {
          bottom: -4px;
          left: 0%;
          margin-left: -4px;
          cursor: nesw-resize;
        }
        .photo-clip-area-top-left {
          top: -4px;
          left: 0%;
          margin-left: -4px;
          cursor: nwse-resize;
        }
        .photo-clip-area-top-right {
          top: -4px;
          left: 100%;
          margin-left: -4px;
          cursor: nesw-resize;
        }
      }
    }
  }
  .right-handle {
    display: inline-block;
    width: 160px;
    height: 100%;
    font-size: 16px;
    vertical-align: top;
    .p-header {
      margin-bottom: 15px;
    }
    .el-checkbox {
      box-sizing: border-box;
      padding-left: 10px;
      margin-left: 0px;
      width: 100%;
      margin-bottom: 10px;
    }
  }
  .p-header {
    padding-left: 20px;
  }
}
</style>

<template>
  <div class="tocheck">
    <div class="left-table">
      <div class="table-wrap">
        <div class="table-content">
          <div class="table-header">
            <el-checkbox label="节目名称" v-model="allSelect"></el-checkbox>
            <el-button @click="passAll" type="primary" size='small'>一键通过</el-button>
          </div>
          <div class="block">
            <el-tree
              :data="data5"
              label='id'
              ref="tree"
              show-checkbox
              empty-text='待审核节目为空'
              node-key="id"
              @current-change='currentChange'
              :expand-on-click-node="false">
            </el-tree>
          </div>
        </div>
      </div>

    </div>
    <div class="right-table">
      <div class="right-table-content">
        <!-- 信息检查 节目：series 视频：video-->
        <el-collapse v-model="activeNames">
          <!-- 节目信息 -->
          <el-collapse-item title="节目信息" name="0" v-show="selectType === 'series'">
            <div class="info-content">
              <span class="info-name">中文名称</span>
              <div class="info-value">中文名称</div>
              <span class="info-name">英文名称</span>
              <div class="info-value">中文名称</div>
              <span class="info-name">导演</span>
              <div class="info-value">中文名称</div>
              <span class="info-name">主演</span>
              <div class="info-value">中文名称</div>
              <span class="info-name">年份</span>
              <div class="info-value">中文名称</div>
              <span class="info-name">国家/地区</span>
              <div class="info-value">中文名称</div>
              <span class="info-name">清晰度</span>
              <div class="info-value">中文名称</div>
              <span class="info-name">视频大小</span>
              <div class="info-value">中文名称</div>
              <span class="info-name">视频时长</span>
              <div class="info-value">中文名称</div>
              <span class="info-name">视频简介</span>
              <div class="info-value">特别是元素可能太窄，以至于每行只能放下几个单词。当然，特别是元素可能太窄，以至于每行只能放下几个单词。当然，特别是元素可能太窄，以至于每行只能放下几个单词。当然，特别是元素可能太窄，以至于每行只能放下几个单词。当然，使用窄设计元素是可以的，不过要当心相应的缺点。特别是元素可能太窄，以至于每行只能放下几个单词。当然，特别是元素可能太窄，以至于每行只能放下几个单词。当然，特别是元素可能太窄，以至于每行只能放下几个单词。当然，特别是元素可能太窄，以至于每行只能放下几个单词。当然，使用窄设计元素是可以的，不过要当心相应的缺点。</div>
            </div>
            <div class="checksuggest">
              <span>检查意见</span>
              <div class="line"></div>
              <el-checkbox v-model="programChecked">信息填写错误</el-checkbox>
            </div>
          </el-collapse-item>
          <!-- 视频信息 -->
          <el-collapse-item title="视频信息" name="1" v-show="selectType === 'video'">
            <div class="info-content">
              <span class="info-name">中文名称</span>
              <div class="info-value">中文名称</div>
              <span class="info-name">英文名称</span>
              <div class="info-value">中文名称</div>
              <span class="info-name">导演</span>
              <div class="info-value">中文名称</div>
              <span class="info-name">主演</span>
              <div class="info-value">中文名称</div>
              <span class="info-name">年份</span>
              <div class="info-value">中文名称</div>
              <span class="info-name">国家/地区</span>
              <div class="info-value">中文名称</div>
              <span class="info-name">清晰度</span>
              <div class="info-value">中文名称</div>
              <span class="info-name">视频大小</span>
              <div class="info-value">中文名称</div>
              <span class="info-name">视频时长</span>
              <div class="info-value">中文名称</div>
              <span class="info-name">视频简介</span>
              <div class="info-value">特别是元素可能太窄，以至于每行只能放下几个单词。当然，特别是元素可能太窄，以至于每行只能放下几个单词。当然，特别是元素可能太窄，以至于每行只能放下几个单词。当然，特别是元素可能太窄，以至于每行只能放下几个单词。当然，使用窄设计元素是可以的，不过要当心相应的缺点。特别是元素可能太窄，以至于每行只能放下几个单词。当然，特别是元素可能太窄，以至于每行只能放下几个单词。当然，特别是元素可能太窄，以至于每行只能放下几个单词。当然，特别是元素可能太窄，以至于每行只能放下几个单词。当然，使用窄设计元素是可以的，不过要当心相应的缺点。</div>

            </div>
            <div class="checksuggest">
              <span>检查意见</span>
              <div class="line"></div>
              <el-checkbox v-model="videoInfoChecked">信息填写错误</el-checkbox>
            </div>
          </el-collapse-item>
          <!-- 视频检查 -->
          <el-collapse-item title="视频检查" name="2" v-show="selectType === 'video'">
            <video width="320" height="240" controls>
              <source src="../../assets/demo.mp4" type="video/mp4">
              您的浏览器不支持 HTML5 video 标签。
            </video>
            <div class="checksuggest">
              <span>检查意见</span>
              <div class="line"></div>
              <el-checkbox-group v-model="videoChecked">
                <el-checkbox label="预览图数据有误"></el-checkbox>
                <el-checkbox label="预览图数据丢失"></el-checkbox>
              </el-checkbox-group>
            </div>
          </el-collapse-item>
          <!-- 节目海报 -->
          <el-collapse-item title="节目海报" name="3" v-show="selectType === 'series'">
            <div class="poster-content el-scrollbar">
              <el-scrollbar style="height:100%">
                <p>320x400竖版海报尺寸  </p>
                <div class="imgDiv">
                  <div class="img-wrap">
                    <img src="../../assets/example.jpg" alt="">
                  </div>
                  <span>320x400</span>
                </div>
                <div class="imgDiv">
                  <div class="img-wrap">
                    <img src="../../assets/logo.png" alt="">
                  </div>
                  <span>320x400</span>
                </div>
                <div class="imgDiv">
                  <div class="img-wrap">
                    <img src="../../assets/logo.png" alt="">
                  </div>
                  <span>320x400</span>
                </div>
                <p>500x280竖版海报尺寸 </p>
                <div class="imgDiv">
                  <div class="img-wrap">
                    <img src="../../assets/example.jpg" alt="">
                  </div>
                  <span>500x280</span>
                </div>
                <p>1280x720 </p>
                <div class="imgDiv">
                  <div class="img-wrap">
                    <img src="../../assets/logo.png" alt="">
                  </div>
                  <span>1280x720</span>
                </div>
              </el-scrollbar>
            </div>
            <div class="checksuggest">
              <span>检查意见</span>
              <div class="line"></div>
              <el-checkbox-group v-model="programPosterChecked">
                <el-checkbox label="预览图数据有误"></el-checkbox>
                <el-checkbox label="预览图数据丢失"></el-checkbox>
              </el-checkbox-group>
            </div>
          </el-collapse-item>
          <!-- 视频海报 -->
          <el-collapse-item title="视频海报" name="4" v-show="selectType === 'video'">
            <div class="poster-content el-scrollbar">
              <el-scrollbar style="height:100%">
                <p>320x400竖版海报尺寸  </p>
                <div class="imgDiv">
                  <div class="img-wrap">
                    <img src="../../assets/example.jpg" alt="">
                  </div>
                  <span>320x400</span>
                </div>
                <div class="imgDiv">
                  <div class="img-wrap">
                    <img src="../../assets/logo.png" alt="">
                  </div>
                  <span>320x400</span>
                </div>
                <div class="imgDiv">
                  <div class="img-wrap">
                    <img src="../../assets/logo.png" alt="">
                  </div>
                  <span>320x400</span>
                </div>
                <p>500x280竖版海报尺寸 </p>
                <div class="imgDiv">
                  <div class="img-wrap">
                    <img src="../../assets/example.jpg" alt="">
                  </div>
                  <span>500x280</span>
                </div>
                <p>1280x720 </p>
                <div class="imgDiv">
                  <div class="img-wrap">
                    <img src="../../assets/logo.png" alt="">
                  </div>
                  <span>1280x720</span>
                </div>
              </el-scrollbar>
            </div>
            <div class="checksuggest">
              <span>检查意见</span>
              <div class="line"></div>
              <el-checkbox-group v-model="videoPosterChecked">
                <el-checkbox label="预览图数据有误"></el-checkbox>
                <el-checkbox label="预览图数据丢失"></el-checkbox>
              </el-checkbox-group>
            </div>
          </el-collapse-item>
        </el-collapse>
        <div class="emptyDiv" v-show="!selectType">暂无信息~点击左侧选择节目/视频</div>
      </div>
      <div class="button-wrap" v-show="selectType">
        <el-button type="primary">通过</el-button>
        <el-button>驳回</el-button>
      </div>
    </div>
    <transition name="fade">
      <div v-show="top" class="page-component-up" @click="toTop"><i class="el-icon-caret-top"></i></div>
    </transition>
  </div>
</template>
<script>
const c = console.log
const j = JSON.stringify
export default {
  data () {
    return {
      top: false,
      videoPosterChecked: [],
      selectType: '',
      programPosterChecked: [],
      videoChecked: [],
      videoInfoChecked: '',
      programChecked: '',
      activeNames: [],
      data5: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1'
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }],
      allSelect: '',
      selectedItem: '',
      dom: ''
    }
  },
  methods: {
    // 获取现在选中的界面或者视频节点
    currentChange (data, node) {
      this.selectedItem = data
      c(j(data))
      if (data.children) {
        this.selectType = 'series'
      } else {
        this.selectType = 'video'
      }
    },
    passAll () {
      let ids = this.$refs.tree.getCheckedKeys()
      c(ids)
    },
    srcoll () {
      this.top = true
      if (this.dom.scrollTop < 10) {
        this.top = false
      }
    },
    toTop () {
      let time = 15
      let step = this.dom.scrollTop / time
      let Interval = setInterval(() => {
        this.dom.scrollTop -= step
        if (this.dom.scrollTop <= 0) {
          clearInterval(Interval)
        }
      }, time)
    }
  },
  watch: {
    allSelect (value) {
      console.log(value)
      let arr = []
      this.data5.forEach((ele, index) => {
        arr.push(index + 1)
      })
      // 全选
      if (value) {
        this.$refs.tree.setCheckedKeys(arr)
      } else {
        this.$refs.tree.setCheckedKeys([])
      }
    }
  },
  mounted () {
    this.dom = document.querySelector('.tocheck').parentNode
    this.dom.onscroll = this.srcoll
  }
}
</script>

<style lang="less" scoped>
.tocheck{
  padding: 20px;
  display: flex;
  .left-table{
    display: inline-block;
    flex: 0 0 230px;
    .table-wrap{
      border: 1px solid #eef1f6;
      .table-header{
        height: 40px;
        line-height: 40px;
        padding-left: 15px;
        background-color: #eef1f6;
      }
      .el-button{
        height: 28px;
        line-height: 10px;
        margin-left: 45px;
      }
    }
  }
  .right-table{
    display: inline-block;
    vertical-align: top;
    flex: 1;
    margin-left: 12px;
    height: 100%;
    .right-table-content{
      height: 100%;
      border: 1px solid #eef1f6;
      .info-content{
        padding: 20px 30px 20px 14px;
        font-size: 14px;
        .info-name{
          display: block;
          width: 80px;
          text-align: justify;
          color: #909399;
          height: 40px;
          &::after{
            content: " ";
            padding-left: 100%;
            display: inline-block;
          }
        }
        .info-value{
          display: inline-block;
          position: relative;
          width: calc(~"100% - 100px");
          left: 100px;
          top:-40px;
        }
      }
      .checksuggest{
        span{
          line-height: 42px;
          margin-left: 15px;
          height: 42px;
          font-weight: 700;
        }
        .line{
          border-bottom:1px solid #eef1f6;
          position: relative;
          left: 80px;
          top: -21px;
        }
        .el-checkbox{
          padding: 22px 0 22px 12px;
        }
      }
      .poster-content{
        padding: 30px;
        height: 420px;
        overflow-y: auto;
        .imgDiv {
          display: inline-block;
          width: 160px;
          text-align: center;
          font-size: 14px;
          color: #909399;
          .img-wrap{
            margin-right: 5px;
            position: relative;
            display: inline-block;
            width: 154px;
            height: 154px;
            margin: 2px;
            border: 1px dashed rgba(144,147,153,.5);
            border-radius: 6px;
            text-align: center;
            img {
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate(-50%,-50%);
              box-sizing: border-box;
              max-width: 150px;
              max-height: 150px;
            }
          }
        }
        p{
          color: #909399;
          font-size: 16px;
        }
      }
    }
    .button-wrap{
      margin-top: 24px;
      text-align: right;
      .el-button{
        width: 92px;
      }
    }
    .emptyDiv{
      text-align: center;
      min-height: 300px;
      line-height: 300px;
      color: #000;
    }
  }
  video{
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    width:710px;
    height: 400px;
  }
  .page-component-up{
    position: fixed;
    right: 80px;
    bottom: 180px;
    opacity: 0.8;

    background-color: #58b7ff;
    width: 50px;
    height: 50px;
    border-radius: 25px;
    cursor: pointer;
    opacity: .4;
    transition: .3s;
  }
  .page-component-up:hover{
      cursor: pointer;
      opacity: 1;
  }
  .page-component-up i{
      color: #fff;
      display: block;
      line-height: 50px;
      text-align: center;
      font-size: 22px;
  }
  .fade-enter, .fade-leave-to{
    opacity: 0;
    transform: translateY(-30px);
  }
}
</style>

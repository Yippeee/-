<template>
  <div class="tocheck">
    <div class="left-table">
      <div class="table-wrap">
        <div class="table-content">
          <el-table
            style="width: 100%;min-height:400px">
            <el-table-column
              type="selection"
              width="30">
            </el-table-column>
            <el-table-column
              label="节目名称"
              width="200"
            ></el-table-column>
          </el-table>
        </div>
      </div>

    </div>
    <div class="right-table">
      <div class="right-table-content">
        <!-- 信息检查 -->
        <p class="header">信息检查</p>
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
          <el-checkbox v-model="checked">信息填写错误</el-checkbox>
        </div>
        <!-- 视频检查 -->
        <p class="header">视频检查</p>
        <video src=""></video>
        <div class="checksuggest">
          <span>检查意见</span>
          <div class="line"></div>
          <el-checkbox v-model="checked">包含不宜播放的内容</el-checkbox>
          <el-checkbox v-model="checked">内容与名称不对应</el-checkbox>
        </div>
        <!-- 海报检查 -->
        <p class="header">海报检查</p>
        <div class="poster-content el-scrollbar">
          <el-scrollbar style="height:100%">
            <p>320x400竖版海报尺寸</p>
            <div class="imgDiv">
              <img src="../../assets/logo.png" alt="">
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
            <p>500x280竖版海报尺寸</p>
            <div class="imgDiv">
              <img src="../../assets/logo.png" alt="">
              <span>500x280</span>
            </div>
            <p>1280x720</p>
            <div class="imgDiv">
              <img src="../../assets/logo.png" alt="">
              <span>1280x720</span>
            </div> 
          </el-scrollbar>
        </div>
        <div class="checksuggest">
          <span>检查意见</span>
          <div class="line"></div>
          <el-checkbox v-model="checked">预览图数据有误</el-checkbox>
          <el-checkbox v-model="checked">预览图数据丢失</el-checkbox>
        </div>
      </div>
      <div class="button-wrap">
        <el-button type="primary">通过</el-button>
        <el-button>驳回</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      checked:''
    }
  }
}
</script>

<style lang="less" scoped>
.tocheck{
  padding: 30px;
  display: flex;
  .left-table{
    display: inline-block;
    flex: 0 0 230px;
    border: 1px solid #eef1f6;
  }
  .right-table{
    display: inline-block;
    vertical-align: top;
    flex: 1;
    margin-left: 12px;
    .right-table-content{
      border: 1px solid #eef1f6;
      p.header{
        display: inline-block;
        box-sizing: border-box;
        height: 42px;
        width: 100%;
        line-height: 42px;
        font-weight: 700;
        padding-left: 10px;
        background-color: #eef1f6;
      }
      .info-content{
        padding: 20px 30px 20px 14px;
        .info-name{
          display: block;
          width: 80px;
          text-align: justify;
          color: #909399;
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
          top:-32px;
        }
      }
      .checksuggest{
        span{
          line-height: 42px;
          margin-left: 15px;
          height: 42px;
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
        .imgDiv{
          display: inline-block;
          width: 140px;
          text-align: center;
          font-size: 14px;
          color: #909399;
          margin-bottom: 30px;
          margin-right: 10px;
          border: 1px dashed #eef1f6;
          img{
            width: 140px;
            height: 140px;
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
  }
}
</style>

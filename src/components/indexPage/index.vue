<template>
  <div class="index-page">
    <div class="header">
      <div class="left-header">
        <span class="header-name">系统运行情况<span style="font-size:12px; color:red"> ({{this.updateTime}}s刷新一次)</span></span>
        <div class="card">
          <el-progress type="circle" :percentage="progressPercent" :color="progressColor" :stroke-width='10' :width='100'></el-progress>
          <div class="card-content">
            <p class="percent">{{this.progressPercent}}%</p>
            <p>内存使用占比</p>
          </div>
        </div>
        <div class="card">
          <i class="icon-upload"></i>
          <div class="card-content">
            <p><span class="percent">{{this.videoUploadSpeed}}</span> <span class="rate"> M/s</span></p>
            <p>平均上传速度</p>
          </div>
        </div>
        <div class="card">
          <i class="icon-domnload"></i>
          <div class="card-content">
            <p><span class="percent">{{this.videoReleaseSpeed}}</span> <span class="rate"> M/s</span></p>
            <p>平均下发速度</p>
          </div>
        </div>
      </div>
      <div class="right-header">
        <div class="header">
          <span class="header-name" @click="showRemind">事件提醒</span>
          <span class="more" @click="showMore">更多
            <i class="el-icon-arrow-right"></i>
          </span>
        </div>
        <div class="right-content">
          <transition :name="slidemode">
            <ul v-if="rightPageShow" key="one">
              <li v-for="(item,index) in lilistReal1" :key="index">
                <el-badge v-if="!item.status" is-dot class="item"><i  class="icon-message"></i></el-badge>
                <i v-else class="icon-message"></i>
                <span class="li-info">{{item.subject}}</span>
                <span class="li-time">{{item.createTime}}</span>
              </li>
            </ul>
            <ul v-else key="two">
              <li v-for="(item,index) in lilistReal2" :key="index">
                <el-badge v-if="!item.status" is-dot class="item"><i  class="icon-message"></i></el-badge>
                <i v-else class="icon-message"></i>
                <span class="li-info">{{item.subject}}</span>
                <span class="li-time">{{item.createTime}}</span>
              </li>
            </ul>
          </transition>
        </div>
        <div class="right-controler">
          <i class="el-icon-arrow-left" :class="{blueI : rightPage == 1}" @click="rightPage = 0"></i>
          <i class="el-icon-arrow-right" :class="{blueI : rightPage == 0}" @click="rightPage = 1"></i>
        </div>
      </div>
    </div>

    <div class="table-wrap">
      <span class="wrap-name">内容商运行情况</span>
      <div class="table-content">
        <el-table
          :data="dataList"
          style="height:100%;"
          height="100%">
          <el-table-column
              label="内容商"
              max-width="260"
              prop="providerName"
              >
          </el-table-column>
          <el-table-column
              label="容量使用占比"
              max-width="260"
              prop="capacityRate"
              sortable
              >
          </el-table-column>
          <el-table-column
              label="上线平台数量"
              max-width="260"
              prop="operatorNum"
              sortable
              >
          </el-table-column>
          <el-table-column
              label="日上线视频数"
              prop="onlineVideoNum"
              sortable
              >
          </el-table-column>
          <el-table-column
              label="日发布视频量"
              prop="releaseVideoNum"
              sortable
              >
          </el-table-column>
          <el-table-column
              label="操作权限"
              prop="adminState">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.adminState"
                  @change="changeRowStatus(scope.row)"
                  active-color="#13ce66"
                  active-text="开"
                  inactive-color="#ff4949"
                  inactive-text="关"
                  active-value="true"
                  inactive-value="false">
                </el-switch>
              </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="page-wrap">
      <el-pagination
          @size-change="changePageSize"
          @current-change="changePageIdx"
          :current-page="curPageIdx"
          :page-sizes="pageSizes"
          :page-size="curPageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="curTotal">
      </el-pagination>
    </div>
    <router-view></router-view>
    <notification message='dddddddddddd' :dialogVisible='dialogVisible' @handleClose='handleClose'></notification>
  </div>
</template>
<script>
import notification from './notification'
export default {
  components: {
    notification
  },
  mounted () {
    this.getStatusData()
    this.getContentData()
    this.getListData()
  },
  destroyed () {
    console.log('destroyed')
    this.setTimeoutFlag = false
  },
  data () {
    const pageSizes = this.$('pageSizes')
    const updateTime = 10 // 系统运行情况刷新时间，单位秒
    return {
      curPageIdx: 1,
      curPageSize: 50,
      curTotal: 0,
      rightPage: 0,
      pageSizes: pageSizes,
      progressPercent: 0,
      videoUploadSpeed: 0,
      videoReleaseSpeed: 0,
      dataList: [], // 内容商运行情况data数据
      lilist: [],
      lilistReal1: [],
      lilistReal2: [],
      rightPageShow: true,
      setTimeoutFlag: true,
      updateTime: updateTime,
      slidemode: ''
    }
  },
  watch: {
    rightPage (value) {
      if (value === 0) {
        this.slidemode = 'slideleft'
        this.rightPageShow = true
      }
      if (value === 1) {
        this.slidemode = 'slideright'
        this.rightPageShow = false
      }
    }
  },
  computed: {
    progressColor () {
      if (this.progressPercent <= 50) {
        return '#67C23A'
      } else if (this.progressPercent <= 90) {
        return '#E6A23C'
      } else {
        return '#F56C6C'
      }
    },
    dialogVisible () {
      return this.$store.state.indexDialogVisible
    }
  },
  methods: {
    getContentData () {
      this.$http({
        url: 'getIndexContent',
        data: {
          pageNum: this.curPageIdx,
          pageSize: this.curPageSize
        }
      }).then(res => {
        console.log(res)
        res.data.rows.forEach(i => {
          i.adminState = !!i.adminState + ''
        })
        this.dataList = res.data.rows
        this.curTotal = res.data.rows.length
      })
    },
    getStatusData () {
      if (!this.setTimeoutFlag) return
      this.$http({
        url: 'getIndexSysStatus'
      }).then(res => {
        let d = res.data
        this.progressPercent = Math.round(d.videoTotalRate * 10000) / 100
        this.videoUploadSpeed = Math.round(d.videoUploadSpeed * 100) / 100
        this.videoReleaseSpeed = Math.round(d.videoReleaseSpeed * 100) / 100
        setTimeout(_ => {
          this.getStatusData()
        }, this.updateTime * 1000)
      })
    },
    getListData () {
      this.$http({
        url: 'getIndexInfoList'
      }).then(res => {
        res.data.rows.forEach(element => {
          element.createTime = element.createTime.replace(/T/, ' ')
        })
        this.lilist = res.data.rows
        this.lilistReal1 = this.lilist.slice(0, 3)
        this.lilistReal2 = this.lilist.slice(3, 6)
      })
    },
    changeRowStatus (row) {
      console.log(row.id)
      console.log(row.adminState)
      let state = row.adminState === 'true' ? 1 : 0
      console.log(state)
      this.$http({
        url: 'statusIndexContent',
        type: 'post',
        data: {
          providerId: row.providerId,
          state: state
        }
      }).then(res => {
        this.util.afterRequest(res)
      })
    },
    handleClose () {
      this.$store.commit('indexDialogDisappear')
    },
    showRemind () {
      this.$store.commit('indexDialogShow')
    },
    turnLeft () {},
    turnRight () {},
    showMore () {
      this.$router.push({path: 'index/moreinfo'})
    },
    changePageSize (s) {
      this.curPageSize = s
      this.getContentData()
    },
    changePageIdx (c) {
      this.curPageIdx = c
      this.getContentData()
    }
  }
}
</script>
<style lang="less" scoped>
.index-page {
  padding: 20px;
  height: 100%;
  box-sizing:border-box;
  .header {
    display: flex;
    .left-header {
      flex: 0 0.8 900px;
      position: relative;
      display: inline-block;
      width: 890px;
      height: 140px;
      padding: 60px 30px 30px 30px;
      border: 1px solid #eef1f6;
      background-color: #FAFAFA;
      .header-name {
        position: absolute;
        top: 20px;
        font-weight: 700;
        color: gray;
      }
      .card {
        height: 100px;
        background-color: #fff;
        width: 253px;
        padding: 20px;
        display: inline-block;
        border: 1px solid #eef1f6;
        vertical-align: top;
        .el-progress-circle {
          width: 100px;
          height: 100px;
        }
        .card-content {
          display: inline-block;
          vertical-align: top;
          position: relative;
          left: 20px;
          line-height: 48px;
          p{
            height: 48px;
          }
          .percent {
            font-size: 48px;
          }
          .rate {
            font-size: 24px;
          }
        }
        i {
          display: inline-block;
          width: 100px;
          height: 100px;
          background-size: 100px;
          background-repeat: no-repeat;
        }
      }
    }
    .right-header {
      flex: 1 1 500px;
      position: relative;
      display: inline-block;
      height: 230px;
      width: 475px;
      vertical-align: top;
      margin-left: 10px;
      border: 1px solid #eef1f6;
      .header {
        background-color: #EFF2F7;
        display: inline-block;
        height: 45px;
        width: 100%;
        line-height: 45px;
        .header-name {
          font-size: 16px;
          padding-left: 10px;
          font-weight: 700;
          color: gray;
        }
        .more {
          position: absolute;
          right: 15px;
          cursor: pointer;
        }
      }
      .right-content {
        position: relative;
        .item{
          .icon-message{
            top:0px;
          }
        }
        .icon-message{
          top:7px;
        }
        .el-badge {
          margin-right: 10px;
          display: inline-block;
          height: 20px;
          i {
            width: 20px;
          }
        }
        i {
          display: inline-block;
          width: 30px;
          height: 20px;
          background-size: 20px;
          background-repeat: no-repeat;
          position: relative;
        }
        ul{
          position: absolute;
          width: 100%;
          background-color: #fff;
        }
        li {
          vertical-align: top;
          height: 24px;
          padding: 10px 20px;
          .li-time {
            position: absolute;
            right: 15px;
          }
        }
        span {
          line-height: 24px;
          font-size: 16px;
        }
      }
      // 滑动动画相关
      .slideleft-enter-active,.slideleft-leave-active,.slideright-enter-active,.slideright-leave-active{
        transition: all .8s;
        }
      .slideleft-enter,.slideleft-leave-to,.slideright-enter,.slideright-leave-to{
        opacity: 0;
        }
      .slideright-enter {
        transform: translateX(+50%);
        }
      .slideright-leave-active {
        transform: translateX(-50%);
        }
      .slideleft-enter {
        transform: translateX(-50%);
        }
      .slideleft-leave-active {
        transform: translateX(+50%);
        }
      .right-controler {
        position: absolute;
        bottom: 10px;
        text-align: center;
        display: inline-block;
        width: 100%;
        i {
          cursor: not-allowed;;
        }
        .blueI{
          color: #20a0ff;
          cursor: pointer;
        }
      }
    }
  }
  .table-wrap {
    .wrap-name{
      display: inline-block;
      font-weight: 700;
      height: 40px;
      line-height: 40px;
      color: #475669;
    }
    padding-top: 20px;
    height: calc(~"100%  -  250px");
  }
}

</style>

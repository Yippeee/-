<template>
  <div class="index-page">
    <div class="header">
      <div class="left-header">
        <span class="header-name">系统运行情况</span>
        <div class="card">
          <el-progress type="circle" :percentage="75" color="#8e71c7" stroke-width='10' width='100'></el-progress>
          <div class="card-content">
            <p class="percent">75%</p>
            <p>内存使用占比</p>
          </div>
        </div>
        <div class="card">
          <i class="icon-upload"></i>
          <div class="card-content">
            <p><span class="percent">1</span> M/s</p>
            <p>平均上传速度</p>
          </div>
        </div>
        <div class="card">
          <i class="icon-domnload"></i>
          <div class="card-content">
            <p><span class="percent">1</span> M/s</p>
            <p>平均下发速度</p>
          </div>
        </div>
      </div>
      <div class="right-header">
        <div class="header">
          <span class="header-name">事件提醒</span>
          <span class="more" @click="showMore">更多
            <i class="el-icon-arrow-right"></i>
          </span>
        </div>
        <div class="right-content">
          <ul>
            <li v-for="item in lilistReal">
              <el-badge v-if="item.isnew" is-dot class="item"><i  class="icon-message"></i></el-badge>
              <i v-else class="icon-message"></i>
              <span class="li-info">{{item.info}}</span>
              <span class="li-time">{{item.time}}</span>
            </li>
          </ul>
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
                  prop="a"
                  >
              </el-table-column>
              <el-table-column
                  label="容量使用占比"
                  max-width="260"
                  prop="b"
                  >
              </el-table-column>
              <el-table-column
                  label="上线平台数量"
                  max-width="260"
                  prop="c"
                  >
              </el-table-column>
              <el-table-column
                  label="日上线视频数"
                  prop="d"
                  >
              </el-table-column>
              <el-table-column
                  label="日发布视频量"
                  prop="e"
                  >
              </el-table-column>
              <el-table-column
                  label="操作权限">
                  <template slot-scope="scope">
                    <el-switch
                      v-model="scope.row.right"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                      active-value="100"
                      inactive-value="0">
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
  </div>
</template>
<script>
export default {
  data () {
    return {
      curPageIdx: 1,
      curPageSize: 50,
      curTotal: 0,
      rightPage:0,
      pageSizes: [5,20,50,100],
      dataList:[
        {
          a:12,
          b:23,
          c:34,
          d:54,
          e:435,
          right:''
        },
        {
          a:12,
          b:23,
          c:34,
          d:54,
          e:435,
          right:''
        },
        {
          a:12,
          b:23,
          c:34,
          d:54,
          e:435,
          right:''
        }
      ],
      lilist:[
        {
          info:'如果说这就是在浪费时间的话',
          time:'06:33',
          isnew:true
        },
        {
          info:'如果说这就是在浪费时间的话',
          time:'06:33',
          isnew:false
        },
        {
          info:'如果说这就是在浪费时间的话',
          time:'06:33',
          isnew:true
        },
        {
          info:'如果这都不算爱',
          time:'17:33',
          isnew:false
        },
        {
          info:'如果这都不算爱2',
          time:'17:33',
          isnew:true
        },
        {
          info:'如果这都不算爱3',
          time:'17:33',
          isnew:true
        },
      ],
      lilistReal:[],
    }
  },
  created () {
    this.lilistReal = this.lilist.slice(0,3)
  },
  watch: {
    rightPage (value) {
      if(value === 0){
        this.lilistReal = this.lilist.slice(0,3)
      }
      if(value === 1){
        this.lilistReal = this.lilist.slice(3,6)
      }
    }
  },
  methods: {
    turnLeft () {},
    turnRight () {},
    showMore () {
      this.$router.push({path:'index/moreinfo'})
    },
    changePageSize (s) {
      this.pageSizes = s
    },
    changePageIdx (c) {
      this.curPageIdx = c
    }
  }
}
</script>
<style lang="less" scoped>
.index-page {
  padding: 30px 20px 20px 20px;
  height: 100%;
  box-sizing:border-box;
  .left-header {
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
      width: 246px;
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
        .percent {
          font-size: 48px;
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
    .right-controler {
      position: absolute;
      bottom: 10px;
      text-align: center;
      display: inline-block;
      width: 100%;
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
    height: calc(~"100%  -  243px");
  }
}
.blueI{
  color: #20a0ff;
  cursor: pointer;
}
</style>

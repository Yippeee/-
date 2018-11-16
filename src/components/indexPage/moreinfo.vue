<template>
  <div class="moreInfo">
    <div class="table-wrap">
      <div class="table-content">
        <ul>
          <li v-for="(item,index) in tableData" :key="index">
            <el-badge @click="changeStatus(item.id)" v-if="!item.status" is-dot class="item"><i class="icon-message"></i></el-badge>
            <i v-else class="icon-message"></i>
            <span class="info item" @click="changeStatus(item.id)">{{item.details}}</span>
            <span class="timer">{{item.createTime}}</span>
          </li>
        </ul>
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
  </div>
</template>
<script>
export default {
  data () {
    const pageSizes = this.$('pageSizes')
    return {
      curPageIdx: 1,
      curPageSize: 50,
      curTotal: 0,
      pageSizes: pageSizes,
      tableData: []
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      this.$http({
        url: 'getIndexInfoList',
        data: {
          pageNum: this.curPageIdx,
          pageSize: this.curPageSize
        }
      }).then(res => {
        res.data.rows.forEach(element => {
          element.createTime = element.createTime.replace(/T/, ' ')
        })
        this.tableData = res.data.rows
        this.curTotal = res.data.rows.length
      })
    },
    changeStatus (id) {
      console.log(id)
      this.$http({
        url: 'editIndexContent',
        type: 'post',
        data: {
          messageId: id
        }
      }).then(res => {
        this.getData()
      })
    },
    changePageSize (s) {
      this.curPageSize = s
      this.getData()
    },
    changePageIdx (s) {
      this.curPageIdx = s
      this.getData()
    }
  }
}
</script>
<style lang="less" scoped>
.moreInfo{
  position: absolute;
  top: 1px;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  .table-wrap{
    height: calc(~"100% - 32px");
    ul{
      margin: 10px;
      box-sizing: border-box;
      border: 1px solid #c1c1c1;
      li{
        padding:10px;
        border-bottom: 1px solid #c1c1c1;
        position: relative;
        .info{
          margin-left: 8px;
        }
        .item{
          cursor: pointer;
        }
        i{
          display: inline-block;
          width: 20px;
          height: 20px;
          background-size: 20px;
          background-repeat: no-repeat;
          position: relative;
        }
        .timer{
          position: absolute;
          right: 80px;
        }
      }
    }
  }
}
</style>

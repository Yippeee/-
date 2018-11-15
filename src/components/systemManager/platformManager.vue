<template>
  <div class="platformManager">
    <div class="control-wrap">
      <el-button type="primary" @click="formData = {};addDialogShow = true"><i class="el-icon-circle-plus-outline"></i>新增发布平台</el-button>
      <el-button ><i class="el-icon-circle-close-outline" @click="visible2 = true"></i>删除</el-button>
    </div>
    <div class="table-wrap">
      <div class="table-content">
        <el-table
          :data="dataList"
          style="height:100%;"
          height="100%">
          <el-table-column
            type="selection"
            max-width="55">
          </el-table-column>
          <el-table-column
              label="序号"
              max-width="160"
              type="index"
              >
          </el-table-column>
          <el-table-column
              label="运营商名称"
              max-width="300"
              prop="operatorName"
              >
          </el-table-column>
          <el-table-column
              label="合作状态"
              max-width="280"
              prop="statusStr"
              :filters="[{ text: '上线', value: '上线' }, { text: '下架', value: '下架' }]"
              filter-placement="bottom-end"
              >
          </el-table-column>
          <el-table-column
              label="级别"
              prop="rank"
              :filters="[{ text: '省网', value: '省网' }, { text: '市网', value: '市网' }]"
              filter-placement="bottom-end"
              >
          </el-table-column>
          <el-table-column
              label="所属区域"
              max-width="280"
              prop="region"
              >
          </el-table-column>
          <el-table-column
              label="操作">
              <template slot-scope="scope">
                <span class="operation" @click="offShore(scope.row.id)">下架</span>
                <span class="operation" @click="editRow(scope.row)">编辑</span>
                <span class="operation" @click="deleteRow(scope.row.id)">删除</span>
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
    <platform-dialog
      :addDialogShow = 'addDialogShow'
      :formData = 'formData'
      @close = 'closeDialog'
    ></platform-dialog>
  </div>
</template>
<script>
import platformDialog from './platformDialog'
export default {
  components: {
    platformDialog
  },
  data () {
    const pageSizes = this.$('pageSizes')
    return {
      curPageIdx: 1,
      curPageSize: 10,
      statusMap: {
        0: '下线',
        1: '上线'
      },
      rankMap: {
        1: '省网',
        2: '市网'
      },
      pageSizes: pageSizes,
      addDialogShow: false,
      formData: {},
      dataList: [],
      curTotal: 0
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      this.$http({
        url: 'getPlayForm',
        data: {
          pageNum: this.curPageIdx,
          pageSize: this.curPageSize
        }
      }).then(res => {
        if (res.code === 0) {
          this.dataList = res.data.rows
          this.dataList.forEach(i => {
            i.statusStr = this.statusMap[i.status]
            i.rank = this.rankMap[i.rank]
            i.region = i.region.split('/')
          })
        }
      })
    },
    closeDialog () {
      this.addDialogShow = false
    },
    changePageSize (s) {
      this.curPageSize = s
      this.getData()
    },
    changePageIdx (c) {
      this.curPageIdx = c
      this.getData()
    },
    editRow (row) {
      log(row.region)
      this.formData = row
      this.addDialogShow = true
    },
    offShore (id) {
      log(id)
    },
    deleteRow (id) {
      log(id)
    }
  }
}
</script>

<style lang="less" scoped>
.platformManager{
  box-sizing: border-box;
  height: 100%;
  padding: 20px;
  .control-wrap{
    height: 40px;
    margin-bottom: 30px;
  }
  .table-wrap{
    height: calc(~"100% - 102px");
    .el-table{
      border: 1px solid #ebebeb;
    }
  }
}
.operation{
  color: #1d8ce0;
  cursor: pointer;
  display: inline-block;
  &:hover{
    color: #1d8ce0;
    transform: scale(1.1);
  }
}
</style>

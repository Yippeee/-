<template>
  <div class="platformManager">
    <div class="control-wrap">
      <el-button type="primary" @click="addDialogShow = true"><i class="el-icon-circle-plus-outline"></i>新增发布平台</el-button>
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
              prop="a"
              >
          </el-table-column>
          <el-table-column
              label="运营商名称"
              max-width="300"
              prop="b"
              >
          </el-table-column>
          <el-table-column
              label="合作状态"
              max-width="280"
              prop="c"
              :filters="[{ text: '上线', value: '上线' }, { text: '下架', value: '下架' }]"
              filter-placement="bottom-end"
              >
          </el-table-column>
          <el-table-column
              label="级别"
              prop="d"
              :filters="[{ text: '省网', value: '省网' }, { text: '市网', value: '市网' }]"
              filter-placement="bottom-end"
              >
          </el-table-column>
          <el-table-column
              label="所属区域"
              max-width="280"
              prop="e"
              >
          </el-table-column>
          <el-table-column
              label="操作">
              <template slot-scope="scope">
                <span class="operation">下架</span>
                <span class="operation">编辑</span>
                <span class="operation">删除</span>
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
      pageSizes: pageSizes,
      addDialogShow: false,
      dataList: [
        {
          a: 12,
          b: 23,
          c: 34,
          d: 54,
          e: 435

        },
        {
          a: 12,
          b: 23,
          c: 34,
          d: 54,
          e: 435
        },
        {
          a: 12,
          b: 23,
          c: 34,
          d: 54,
          e: 435
        }
      ]
    }
  },
  methods: {
    closeDialog () {
      this.addDialogShow = false
    },
    changePageSize (s) {

    },
    changePageIdx (c) {
      this.curPageIdx = c
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

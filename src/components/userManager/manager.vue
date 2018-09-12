<template>
  <div class="manager">
    <div class="button-wrap">
      <el-button type="primary" @click="addDialogShow = true"><i class="el-icon-circle-plus-outline"></i>新建后台用户</el-button>
      <el-button type="primary"><i class="el-icon-edit-outline"></i>编辑</el-button>
      <el-button type="primary"><i class="el-icon-circle-close-outline" @click="visible2 = true"></i>删除</el-button>
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
              label="用户名称"
              max-width="260"
              prop="b"
              >
          </el-table-column>
          <el-table-column
              label="登录名"
              max-width="260"
              prop="c"
              >
          </el-table-column>
          <el-table-column
              label="用户角色"
              max-width="260"
              prop="d"
              :filters="[{ text: '超级管理员', value: '超级管理员' }, { text: '普通管理员', value: '普通管理员' }, { text: '用户', value: '用户' }]"
              :filter-method="filterTag"
              filter-placement="bottom-end"
              >
          </el-table-column>
          <el-table-column
              label="权限"
              prop="e"
              >
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
   <manager-dialog
     :addDialogShow = 'addDialogShow'
     :formData="formData"
     @close = 'close'
     ></manager-dialog>
  </div>
</template>
<script>
import managerDialog from './managerDialog'
export default {
  components: {
    managerDialog
  },
  data () {
    const pageSizes = this.$('pageSizes')
    return {
      pageSizes: pageSizes,
      addDialogShow: false,
      curPageIdx: 1,
      curPageSize: 50,
      curTotal: 0,
      formData: '',
      value: '',
      dataList: [
        {
          a: 12,
          b: 23,
          c: 34,
          d: '超级管理员',
          e: 435

        },
        {
          a: 12,
          b: 23,
          c: 34,
          d: '普通管理员',
          e: 435
        },
        {
          a: 12,
          b: 23,
          c: 34,
          d: '用户',
          e: 435
        }
      ]
    }
  },
  methods: {
    filterTag (value, row, column) {
      const property = column['property']
      return row[property] === value
    },
    close () {
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
.manager{
  box-sizing: border-box;
  padding: 20px 20px 0 20px;
  height: 100%;
  .button-wrap{
    height: 70px
  }
  .table-wrap{
    height: calc(~"100% - 102px");
    .el-table{
      border: 1px solid #ebebeb;
    }
  }
}
</style>

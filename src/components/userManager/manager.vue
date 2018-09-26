<template>
  <div class="manager">
    <div class="button-wrap">
      <el-button type="primary" @click="addBack"><i class="el-icon-circle-plus-outline"></i> 新建后台用户</el-button>
      <el-button  @click='editBack' :disabled="selection.length !== 1"><i class="el-icon-edit-outline"></i> 编辑</el-button>
      <el-button :disabled="selection.length <= 0" @click="deleteBack"><i class="el-icon-circle-close-outline"></i> 删除</el-button>
    </div>
    <div class="table-wrap">
      <div class="table-content">
        <el-table
          :data="dataList"
          @select="toggleSelect"
          style="height:100%;"
          height="100%">
          <el-table-column
            type="selection"
            max-width="55">
          </el-table-column>
          <el-table-column
              label="序号"
              width="100"
              type="index"
              >
          </el-table-column>
          <el-table-column
              label="用户名称"
              max-width="260"
              prop="userName"
              >
          </el-table-column>
          <el-table-column
              label="登录名"
              max-width="260"
              prop="loginName"
              >
          </el-table-column>
          <el-table-column
              label="用户角色"
              max-width="260"
              prop="roleName"
              :filters=this.filters
              :filter-method="filterTag"
              filter-placement="bottom-end"
              >
          </el-table-column>
          <el-table-column
              label="权限"
              prop="mainPermissionNames"
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
     :roleList="filters"
     :action='action'
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
      action: '',
      formData: {},
      value: '',
      dataList: [],
      selection: [],
      filters: []
    }
  },
  mounted () {
    this.getDatalist()
    this.$http({
      'url': 'role'
    })
      .then(res => {
        let data = res.data
        data.forEach(item => {
          this.filters.push(
            {
              text: item.name,
              value: item.name,
              id: item.nameId
            }
          )
        })
      })
  },
  methods: {
    toggleSelect (selection) {
      this.selection = selection
    },
    filterTag (value, row, column) {
      const property = column['property']
      return row[property] === value
    },
    close () {
      this.getDatalist()
      this.selection = []
      this.addDialogShow = false
    },
    changePageSize (s) {

    },
    changePageIdx (c) {
      this.curPageIdx = c
    },
    getDatalist () {
      this.$http({
        'url': 'provider'
      })
        .then((res) => {
          this.dataList = res.data
          this.curTotal = this.dataList.length
        })
    },
    editBack () {
      this.formData = this.selection[0]
      this.action = 'edit'
      this.addDialogShow = true
    },
    addBack () {
      this.formData = {}
      this.action = 'add'
      this.addDialogShow = true
    },
    deleteBack () {
      let ids = this.selection.map(item => item.userId)
      this.$http({
        url: 'deleteBack',
        type: 'delete',
        data: {
          list: ids
        }
      })
        .then(res => {
          this.getDatalist()
          this.$message(res.msg)
        })
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

<template>
  <div class="manager">
    <div class="button-wrap">
      <el-button type="primary" @click="addDialogShow = true">新建后台用户</el-button>
      <el-button type="primary">编辑</el-button>
      <el-button type="primary">删除</el-button>
    </div>
    <div class="table-wrap">
      <div class="table-content">
        <el-table
          :data="dataList"
          style="height:100%;"
          height="100%">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
              label="序号"
              width="160"
              prop="a"
              >
          </el-table-column>
          <el-table-column
              label="用户名称"
              width="260"
              prop="b"
              >
          </el-table-column>
          <el-table-column
              label="登录名"
              width="260"
              prop="c"
              >
          </el-table-column>
          <el-table-column
              label="用户角色"
              width="260"
              prop="d"
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
   <el-dialog
      title="新增后台用户"
      :visible.sync="addDialogShow"
      width="45%%"
      :before-close="handleClose">
      <el-form label-width="100px" :inline="true">
        <el-form-item label="用户姓名:" prop="id">
            <el-input ></el-input>
        </el-form-item>
        <el-form-item label="登录名:" prop="id" class="marginMore">
            <el-input ></el-input>
        </el-form-item>
        <el-form-item label="用户角色:" prop="id">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="邮箱:" prop="id">
            <el-input ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogShow = false">取 消</el-button>
        <el-button type="primary" @click="addDialogShow   = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      addDialogShow: false,
      curPageIdx: 1,
      curPageSize: 50,
      curTotal: 0,
      pageSizes: [5,20,50,100],
      dataList:[
        {
          a:12,
          b:23,
          c:34,
          d:54,
          e:435,

        },
        {
          a:12,
          b:23,
          c:34,
          d:54,
          e:435,
        },
        {
          a:12,
          b:23,
          c:34,
          d:54,
          e:435,
        }
      ],
      options:[{
          value: '选项1',
          label: '超级管理员'
        },{
          value: '选项1',
          label: '普通管理员'
        },{
          value: '选项1',
          label: '用户'
        }, ]
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
.marginMore {
  margin-left: 14px
}
</style>

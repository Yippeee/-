<template>
  <div class="platformManager">
    <div class="control-wrap">
      <el-button type="primary"><i class="el-icon-circle-plus-outline"></i>新增发布平台</el-button>
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
            width="55">
          </el-table-column>
          <el-table-column
              label="序号"
              width="160"
              prop="a"
              >
          </el-table-column>
          <el-table-column
              label="运营商名称"
              width="300"
              prop="b"
              >
          </el-table-column>
          <el-table-column
              label="合作状态"
              width="280"
              prop="c"
              >
          </el-table-column>
          <el-table-column
              label="级别"
              prop="d"
              >
          </el-table-column>
          <el-table-column
              label="所属区域"
              width="280"
              prop="e"
              >
          </el-table-column>
          <el-table-column
              label="操作"
              prop="d"
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
  </div>
</template>
<style lang="less" scoped>
.platformManager{
  box-sizing: border-box;
  height: 100%;
  padding: 30px;
  .control-wrap{
    height: 30px;
    margin-bottom: 30px;
  }
  .table-wrap{
    height: calc(~"100% - 102px");
    .el-table{
      border: 1px solid #ebebeb;
    }
  }
}
</style>

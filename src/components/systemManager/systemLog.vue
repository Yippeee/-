<template>
  <div class="systemLog">
    <div class="control-wrap">
      <el-date-picker
      v-model="begintime"
      type="date"
      align="right"
      placeholder="选择开始日期">
    </el-date-picker>
    <el-date-picker
      v-model="endtime"
      type="date"
      placeholder="选择结束日期">
    </el-date-picker>
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
              label="操作人"
              max-width="260"
              prop="b"
              >
          </el-table-column>
          <el-table-column
              label="内容商"
              max-width="260"
              prop="c"
              >
          </el-table-column>
          <el-table-column
              label="操作"
              prop="d"
              >
          </el-table-column>
          <el-table-column
              label="操作时间"
              max-width="130"
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
  </div>
</template>
<script>
export default {
  data () {
    return {
      begintime:'',
      endtime:''
    }
  }
}
</script>
<style lang="less" scoped>
.systemLog{
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
</style>

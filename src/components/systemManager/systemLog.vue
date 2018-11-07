<template>
  <div class="systemLog">
    <div class="control-wrap">
      <el-date-picker
      v-model="beginDate"
      type="date"
      format="yyyy 年 MM 月 dd 日"
      value-format="yyyy-MM-dd"
      align="right"
      placeholder="选择开始日期">
    </el-date-picker>
    <el-date-picker
      v-model="endDate"
      type="date"
      format="yyyy 年 MM 月 dd 日"
      value-format="yyyy-MM-dd"
      placeholder="选择结束日期">
    </el-date-picker>
    <el-input
      class="keyWords"
      placeholder="请输入内容"
      v-model="keyWords">
      <i slot="suffix" class="el-input__icon el-icon-search" @click="search"></i>
    </el-input>
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
              label="操作人"
              max-width="260"
              prop="userName"
              >
          </el-table-column>
          <el-table-column
              label="内容商"
              max-width="260"
              prop="providerName"
              :filters= filters
              filter-placement="bottom-end"
              >
          </el-table-column>
          <el-table-column
              label="操作"
              prop="operation"
              >
          </el-table-column>
          <el-table-column
              label="操作时间"
              max-width="130"
              prop="createTime"
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
    const pageSizes = this.$('pageSizes')
    return {
      dataList: [],
      pageSize: 0,
      pageSizes: pageSizes,
      begintime: '',
      curPageIdx: 1,
      curTotal: 0,
      curPageSize: 10,
      total: 0,
      beginDate: '',
      endDate: '',
      keyWords: '',
      filters: [{ text: 'test', value: 'test' }, { text: 'test1', value: 'test1' }]
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      this.$http({
        url: 'getSysLog',
        data: {
          pageNum: this.curPageIdx,
          pageSize: this.curPageSize,
          beginDate: this.beginDate,
          endDate: this.endDate,
          keyWords: this.keyWords
        }
      }).then(res => {
        this.dataList = res.data.rows
        this.curTotal = res.data.total
      })
    },
    search () {
      this.getData()
    },
    changePageSize (s) {
      this.curPageSize = s
      this.getData()
    },
    changePageIdx (id) {
      this.curPageIdx = id
      this.getData()
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
    .keyWords{
      width: 300px;
      float: right;
    }
  }
  .table-wrap{
    height: calc(~"100% - 102px");
    .el-table{
      border: 1px solid #ebebeb;
    }
  }
}
</style>

<template>
  <div class="contenter-manager">
    <div class="button-wrap">
      <el-button type="primary" @click="dialogFormVisible = true"><i class="el-icon-circle-plus-outline"></i> 新建内容商</el-button>
      <el-popover
        placement="top"
        width="160"
        v-model="visible2">
        <p>确定删除该内容运营商吗？</p>
        <div style="text-align: right; margin: 0">
          <el-button type="primary" size="mini" @click="visible2 = false">确定</el-button>
          <el-button size="mini" type="text" @click="visible2 = false">取消</el-button>
        </div>
        <el-button slot="reference"><i class="el-icon-circle-close-outline" @click="visible2 = true"></i> 删除</el-button>
      </el-popover>
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
              label="内容商名称"
              max-width="260"
              prop="b"
              >
          </el-table-column>
          <el-table-column
              label="英文名称"
              max-width="260"
              prop="c"
              >
          </el-table-column>
          <el-table-column
              label="合作商类型"
              max-width="260"
              prop="d"
              >
          </el-table-column>
          <el-table-column
              label="媒资容量(G)"
              max-width="260"
              prop="e"
              >
          </el-table-column>
          <el-table-column
              label="有效期">
          </el-table-column>
          <el-table-column
              label="操作"
              max-width="160">
              <template slot-scope="scope">
                <i class="el-icon-edit-outline"></i>
                <i class="el-icon-delete"></i>
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
    <contenter-dialog
      :dialogFormVisible = 'dialogFormVisible'
      @close = 'close'
      :cooperateForm = 'cooperateForm'
      ></contenter-dialog>
  </div>
</template>
<script>
import contenterDialog from './contenterDialog'
export default {
  components: {
    contenterDialog
  },
  data () {
    const pageSizes = this.$('pageSizes')
    return {
      cooperateForm: {},
      dialogFormVisible: false,
      visible2: false,
      curPageIdx: 1,
      curPageSize: 50,
      curTotal: 0,
      pageSizes: pageSizes,
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
    close () {
      this.dialogFormVisible = false
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
.contenter-manager{
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
      i{
        cursor: pointer;
        color: #20a0ff;
        display: inline-block;
        width: 15px;
        height: 15px;
        background-size: 15px;
        background-repeat: no-repeat;
        &:hover{
          color: #1d8ce0;
          transform: scale(1.1);
        }
      }
    }
  }
  .addDialog{
    .el-input{
      width: 100%
    }
  }
}
</style>

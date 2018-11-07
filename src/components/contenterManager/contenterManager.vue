<template>
  <div class="contenter-manager">
    <div class="button-wrap">
      <el-button type="primary" @click="addContenter"><i class="el-icon-circle-plus-outline"></i> 新建内容商</el-button>
      <el-popover
        placement="top"
        width="160"
        v-model="visible2">
        <p>确定删除该内容运营商吗？</p>
        <div style="text-align: right; margin: 0">
          <el-button type="primary" size="mini" @click="deleteRow">确定</el-button>
          <el-button size="mini" type="text" @click="visible2 = false">取消</el-button>
        </div>
        <el-button slot="reference" :disabled="!selections.length > 0"><i class="el-icon-circle-close-outline" @click="visible2 = true"></i> 删除</el-button>
      </el-popover>
    </div>
    <div class="table-wrap">
      <div class="table-content">
        <el-table
          :data="dataList"
          @selection-change = 'selectionChange'
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
              label="内容商名称"
              max-width="260"
              prop="providerName"
              >
          </el-table-column>
          <el-table-column
              label="英文名称"
              max-width="260"
              prop="englishName"
              >
          </el-table-column>
          <el-table-column
              label="合作商类型"
              max-width="260"
              prop="type"
              >
          </el-table-column>
          <el-table-column
              label="媒资容量(G)"
              max-width="260"
              prop="contentCapacity"
              >
          </el-table-column>
          <el-table-column
              label="有效期"
              prop="expiredTime"
              >
          </el-table-column>
          <el-table-column
              label="操作"
              max-width="160">
              <template slot-scope="scope">
                <i class="el-icon-edit-outline" @click = editRow(scope.row.id)></i>
                <i class="el-icon-delete" @click = deleteRow(scope.row.id)></i>
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
      :providerId = 'providerId'
      @close = 'close'
      :cooperateForm = 'cooperateForm'
      :dialogStatus = 'dialogStatus'
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
      cooperateForm: {
        'companyAddress': "",
        'companyName': "",
        'companyPhone': "",
        'companyWebsite': "",
        'contact': "",
        'contactEmail': "",
        'contactPhone': "",
        'contentCapacity': 0,
        'contractDate': "",
        'contractImage': "",
        'contractNum': "",
        'contractPrincipal': "",
        'cpId': "",
        'creditCode': "",
        'effectiveTime': "",
        'englishName': "",
        'expiredTime': "",
        'idList': [],
        'legalPerson': "",
        'organizationCode': "",
        'platform': "",
        'position': "",
        // 'providerId': '',
        'providerName': "",
        'registrationNum': "",
        'taxpayerNum': "",
        'type': ""
      },
      dialogFormVisible: false,
      visible2: false,
      curPageIdx: 1,
      curPageSize: 50,
      curTotal: 0,
      pageSizes: pageSizes,
      dataList: [],
      providerId: 0,
      selections: [],
      dialogStatus: 0 // 0是查看修改，1是新建
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      this.$http({
        url: 'getContenterManager',
        data: {
          pageNum: this.curPageIdx,
          pageSize: this.curPageSize
        }
      }).then((res) => {
        this.dataList = res.data.rows
        this.curTotal = res.data.rows.length
      }).catch((error) => {
        this.$message({
          type: 'error',
          message: error || '获取数据失败'
        })
      })
    },
    editRow (id) {
      this.providerId = id
      this.$http({
        url: 'getContenterManagerDetail',
        data: {
          providerId: id
        }
      }).then(res => {
        this.dialogFormVisible = true
        this.cooperateForm = res.data
        this.dialogStatus = 0
      })
    },
    deleteRow (id) {
      let ids = []
      if (id.type === 'click') {
        ids = JSON.parse(JSON.stringify(this.selections))
      } else {
        ids = Array.isArray(id) ? id : [id]
      }
      console.log(ids)
      let pid = ids.pop()
      const p = new Promise((resolve, reject) => {
        this.$http({
          url: 'deleteContenter',
          type: 'delete',
          data: {
            id: pid
          }
        }).then(res => {
          if (res.code === 0) {
            resolve()
          } else {
            this.$message({
              type: 'error',
              message: res.msg || '删除失败'
            })
            reject(res.msg)
          }
        })
      })

      p.then(res => {
        if (ids.length > 0) {
          this.deleteRow(ids)
        } else {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.getData()
          this.visible2 = false
        }
      }).catch((error) => {
        this.$message({
          type: 'error',
          message: error || '服务器错误'
        })
      })
    },
    selectionChange (selections) {
      this.selections = selections.map(i => {
        return i.id
      })
    },
    close () {
      this.dialogFormVisible = false
      this.getData()
    },
    addContenter () {
      this.dialogFormVisible = true
      this.cooperateForm = {
        'companyAddress': "",
        'companyName': "",
        'companyPhone': "",
        'companyWebsite': "",
        'contact': "",
        'contactEmail': "",
        'contactPhone': "",
        'contentCapacity': 0,
        'contractDate': "",
        'contractImage': "",
        'contractNum': "",
        'contractPrincipal': "",
        'cpId': "",
        'creditCode': "",
        'effectiveTime': "",
        'englishName': "",
        'expiredTime': "",
        'idList': [],
        'legalPerson': "",
        'organizationCode': "",
        'platform': "",
        'position': "",
        // 'providerId': '',
        'providerName': "",
        'registrationNum': "",
        'taxpayerNum': "",
        'type': ""
      }
      this.dialogStatus = 1
    },
    changePageSize (s) {
      this.curPageSize = s
      this.getData()
    },
    changePageIdx (c) {
      this.curPageIdx = c
      this.getData()
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

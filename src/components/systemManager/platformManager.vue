<template>
  <div class="platformManager">
    <div class="control-wrap">
      <el-button type="primary" @click="addDialogShow = true"><i class="el-icon-circle-plus-outline"></i>新增发布平台</el-button>
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
              label="运营商名称"
              max-width="300"
              prop="b"
              >
          </el-table-column>
          <el-table-column
              label="合作状态"
              max-width="280"
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
    <el-dialog
      title="新增发布平台"
      :visible.sync="addDialogShow"
      width="45%"
      :before-close="handleClose">
      <el-form label-width="100px" :inline="true">
        <el-form-item label="运营商名称:" prop="id">
            <el-input ></el-input>
        </el-form-item>
        <el-form-item label="编号:" prop="id" class="marginMore">
            <el-input ></el-input>
        </el-form-item>
        <el-form-item label="合作状态:" prop="id">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="级别:" prop="id">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="所属地区:" prop="id">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="端口:" prop="id" class="marginMore">
            <el-input ></el-input>
        </el-form-item>
        <el-form-item label="服务器地址:" prop="id" class="block-el-form">
            <el-input v-model="cooperateForm.id"></el-input>
        </el-form-item>
        <el-form-item label="ftp地址:" prop="id" class="block-el-form">
            <el-input v-model="cooperateForm.id"></el-input>
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
      cooperateForm:'',
      addDialogShow:false,
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
.block-el-form{
  display: block;
  .el-input{
    width: 628px!important;
  }
}
.marginMore{
  margin-left: 13px;
}
</style>

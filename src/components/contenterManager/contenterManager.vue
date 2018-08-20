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
        <el-button type="primary" slot="reference"><i class="el-icon-circle-close-outline" @click="visible2 = true"></i> 删除</el-button>
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
    <el-dialog class="addDialog" title="新建内容商" :visible.sync="dialogFormVisible" top="7vh">
        <el-tabs v-model="addDialogTabs" type="border-card" @tab-click="handleClick">
          <el-tab-pane label="合作信息" name="first">
            <el-form :model="cooperateForm" label-width="100px" :inline="true">
              <el-form-item label="内容商名称:" prop="name">
                  <el-input v-model="cooperateForm.name"></el-input>
              </el-form-item>
              <el-form-item label="内容商编码:" prop="id">
                  <el-input v-model="cooperateForm.id"></el-input>
              </el-form-item>
              <el-form-item label="英文名:" prop="name_en">
                  <el-input v-model="cooperateForm.name_en"></el-input>
              </el-form-item>
              <el-form-item label="版权平台:" prop="copyright">
                  <el-input v-model="cooperateForm.name_en"></el-input>
              </el-form-item>
              <el-form-item label="联系人:" prop="people">
                  <el-input v-model="cooperateForm.name_en"></el-input>
              </el-form-item>
              <el-form-item label="职位:" prop="worker">
                  <el-input v-model="cooperateForm.name_en"></el-input>
              </el-form-item>
              <el-form-item label="电话:" prop="phone">
                  <el-input v-model="cooperateForm.name_en"></el-input>
              </el-form-item>
              <el-form-item label="邮箱:" prop="mail">
                  <el-input v-model="cooperateForm.name_en"></el-input>
              </el-form-item>
              <el-form-item label="媒资容量:" prop="media">
                  <el-input v-model="cooperateForm.name_en"></el-input>
              </el-form-item>
              <el-form-item label="合作时间:" prop="coop_time">
                   <el-col :span="11">
                      <el-form-item >
                        <el-date-picker type="date" placeholder="选择日期" style="width: 100%;"></el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="11">
                      <el-form-item >
                        <el-date-picker type="date" placeholder="选择日期" style="width: 100%;"></el-date-picker>
                      </el-form-item>
                    </el-col>
              </el-form-item>
              <el-form-item label="合作商类型:" >
                  <el-checkbox-group>
                    <el-checkbox label="内容提供商" name="type"></el-checkbox>
                    <el-checkbox label="服务提供商" name="type"></el-checkbox>
                    <el-checkbox label="直播提供商" name="type"></el-checkbox>
                    <el-checkbox label="版权提供商" name="type"></el-checkbox>
                  </el-checkbox-group>
              </el-form-item>
              <el-form-item label="权限平台:" class="authority clearfix">
                  <el-checkbox-group >
                    <el-checkbox label="内容提供商" name="type"></el-checkbox>
                    <el-checkbox label="服务提供商" name="type"></el-checkbox>
                    <el-checkbox label="直播提供商" name="type"></el-checkbox>
                    <el-checkbox label="版权提供商" name="type"></el-checkbox>
                    <el-checkbox label="内容提供商" name="type" class="five"></el-checkbox>
                    <el-checkbox label="服务提供商" name="type"></el-checkbox>
                    <el-checkbox label="直播提供商" name="type"></el-checkbox>
                    <el-checkbox label="版权提供商" name="type"></el-checkbox>
                    <el-checkbox label="内容提供商" name="type" class="five"></el-checkbox>
                    <el-checkbox label="服务提供商" name="type"></el-checkbox>
                    <el-checkbox label="直播提供商" name="type"></el-checkbox>
                    <el-checkbox label="版权提供商" name="type"></el-checkbox>
                  </el-checkbox-group>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="内容商信息" name="second">
            <el-form :model="contenter" label-width="100px" :inline="true">
              <el-form-item label="内容商编码:" prop="id">
                  <el-input v-model="cooperateForm.id"></el-input>
              </el-form-item>
              <el-form-item label="内容商编码:" prop="id">
                  <el-input v-model="cooperateForm.id"></el-input>
              </el-form-item>
              <el-form-item label="内容商编码:" prop="id">
                  <el-input v-model="cooperateForm.id"></el-input>
              </el-form-item>
              <el-form-item label="内容商编码:" prop="id">
                  <el-input v-model="cooperateForm.id"></el-input>
              </el-form-item>
              <el-form-item label="内容商编码:" prop="id">
                  <el-input v-model="cooperateForm.id"></el-input>
              </el-form-item>
              <el-form-item label="内容商编码:" prop="id">
                  <el-input v-model="cooperateForm.id"></el-input>
              </el-form-item>
              <el-form-item label="内容商编码:" prop="id">
                  <el-input v-model="cooperateForm.id"></el-input>
              </el-form-item>
              <el-form-item label="官网地址:" prop="id" class="block-el-form">
                  <el-input v-model="cooperateForm.id"></el-input>
              </el-form-item>
              <el-form-item label="公司官网:" prop="id" class="block-el-form">
                  <el-input v-model="cooperateForm.id"></el-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="合同信息" name="third">
            <el-form label-width="100px" :inline="true">
              <el-form-item label="合同编号:" prop="id">
                  <el-input v-model="cooperateForm.id"></el-input>
              </el-form-item>
              <el-form-item label="签订日期:" prop="id">
                  <el-date-picker type="date" placeholder="选择日期" style="width: 100%;"></el-date-picker>
              </el-form-item>
              <el-form-item label="合同负责人:" prop="id">
                  <el-input v-model="cooperateForm.id"></el-input>
              </el-form-item>
              <el-form-item label="合同负责人:" prop="id" class="block-el-form">
                  <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>  
  </div>
</template>
<script>
export default {
  data () {
    return {
      addDialogTabs:'first',
      dialogFormVisible:false,
      visible2:false,
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
      cooperateForm:{}
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
.authority{
  position: relative;
  .el-checkbox-group{
    width: 57%;
    height: 100px;
    box-sizing: border-box;
    overflow-y: scroll; 
    position: relative;
    left: 100px;
    top: -40px;
    text-align: left;
    border: 1px solid #eef1f6;
    padding: 5px;
    .five{
      margin-left: 0px
    }
  }
}
.block-el-form{
  display: block;
  .el-input{
    width: 728px!important;
  }
}
//image
.avatar-uploader{
  border: 1px solid #eef1f6;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 60px;
    height: 60px;
    line-height: 60px;
    text-align: center;
  }
  .avatar {
    width: 60px;
    height: 60px;
    display: block;
  }

</style>

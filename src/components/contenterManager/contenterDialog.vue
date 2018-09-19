<template>
  <el-dialog class="addDialog"
    title="新建内容商"
    :visible.sync="dialogFormVisible1"
    @close = 'close'
    top="7vh"
    width="840px">
    <el-tabs v-model="addDialogTabs" type="border-card" @tab-click="handleClick">
      <el-tab-pane label="合作信息" name="first">
        <el-form :model="cooperateForm" label-width="100px" :inline="true" :rules="ruleCooperate" >
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
              <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
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
          <el-form-item label="合作商类型:" prop="coop_type">
              <el-checkbox-group>
                <el-checkbox label="内容提供商" name="type"></el-checkbox>
                <el-checkbox label="服务提供商" name="type"></el-checkbox>
                <el-checkbox label="直播提供商" name="type"></el-checkbox>
                <el-checkbox label="版权提供商" name="type"></el-checkbox>
              </el-checkbox-group>
          </el-form-item>
          <el-form-item label="权限平台:" prop="au_platform" class="authority clearfix">
            <el-checkbox-group >
              <el-scrollbar style="height:100%">
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
              </el-scrollbar>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="内容商信息" name="second">
        <el-form :model="contenter" label-width="100px" :inline="true" :rules="rulecooperation">
          <el-form-item label="公司全名:" prop="fullName">
              <el-input v-model="cooperateForm.fullName"></el-input>
          </el-form-item>
          <el-form-item label="公司法人:" prop="legalEntity">
              <el-input v-model="cooperateForm.legalEntity"></el-input>
          </el-form-item>
          <el-form-item label="公司电话:" prop="2">
              <el-input v-model="cooperateForm.id"></el-input>
          </el-form-item>
          <el-form-item label="工商注册号:" prop="3">
              <el-input v-model="cooperateForm.id"></el-input>
          </el-form-item>
          <el-form-item label="组织机构代码:" prop="4">
              <el-input v-model="cooperateForm.id"></el-input>
          </el-form-item>
          <el-form-item label="统一信用代码:" prop="5">
              <el-input v-model="cooperateForm.id"></el-input>
          </el-form-item>
          <el-form-item label="纳税人识别号:" prop="6">
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
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="close">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: ['dialogFormVisible', 'cooperateForm'],
  data () {
    return {
      addDialogTabs: 'first',
      value: '',
      contenter: '',
      imageUrl: '',
      options: [{
        value: '选项1',
        label: '超级管理员'
      }, {
        value: '选项1',
        label: '普通管理员'
      }, {
        value: '选项1',
        label: '用户'
      }],
      ruleCooperate: {
        name: [
          { required: true, message: '请输入合作商名称', trigger: 'blur' }
        ],
        copyright: [
          { required: true, message: '请输入合作商名称', trigger: 'blur' }
        ],
        people: [
          { required: true, message: '请输入合作商名称', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入合作商名称', trigger: 'blur' }
        ],
        media: [
          { required: true, message: '请输入合作商名称', trigger: 'blur' }
        ],
        coop_type: [
          { required: true, message: '请输入合作商名称', trigger: 'blur' }
        ],
        coop_time: [
          { required: true, message: '请输入合作商名称', trigger: 'blur' }
        ],
        au_platform: [
          { required: true, message: '请输入合作商名称', trigger: 'blur' }
        ]
      },
      rulecooperation: {
        fullName: [
          { required: true, message: '请输入合作商名称', trigger: 'blur' }
        ],
        legalEntity: [
          { required: true, message: '请输入合作商名称', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    close () {
      this.$emit('close')
    },
    handleClick () {

    },
    handleAvatarSuccess () {

    },
    beforeAvatarUpload () {}
  },
  computed: {
    dialogFormVisible1: {
      get () {
        return this.dialogFormVisible
      },
      set () {}
    }
  }
}
</script>
<style lang="less">
.authority{
  position: relative;
  .el-checkbox-group{
    width: 76%;
    height: 100px;
    box-sizing: border-box;
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
  display: block!important;
  .el-input{
    width: 600px!important;
  }
}
//image
.avatar-uploader{
  display: inline-block;
  // border: 1px solid #eef1f6;
  width: 62px;
  height: 62px;
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

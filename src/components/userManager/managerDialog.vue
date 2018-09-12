<template>
  <el-dialog
    title="新增后台用户"
    :visible.sync="addDialogShow"
    width="800px"
    @close="handleClose">
    <el-form label-width="100px" :inline="true" :rules="rules" :model="formData">
      <el-form-item label="用户姓名:" prop="name">
          <el-input ></el-input>
      </el-form-item>
      <el-form-item label="登录名:" prop="loginName" class="marginMore">
          <el-input ></el-input>
      </el-form-item>
      <el-form-item label="用户角色:" prop="role">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="邮箱  :  " prop="mail" style="margin-left:14px">
          <el-input ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handleClose">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  props: ['addDialogShow', 'formData'],
  data () {
    return {
      value: '',
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
      rules: {
        name: [
          { required: true, message: '请输入用户姓名', trigger: 'blur' }
        ],
        loginName: [
          { required: true, message: '请输入登录名', trigger: 'blur' }
        ],
        role: [
          { required: true, message: '请输入用户角色', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleClose () {
      this.$emit('close')
    }
  }
}
</script>
<style lang="less">
.marginMore {
  margin-left: 14px
}
</style>

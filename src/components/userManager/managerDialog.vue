<template>
  <el-dialog
    :title=title
    :visible.sync="addDialogShow1"
    width="800px"
    @close="handleClose">
    <el-form label-width="100px" :inline="true" :rules="rules" :model="formData">
      <el-form-item label="用户姓名:" prop="userName">
          <el-input v-model="formData.userName"></el-input>
      </el-form-item>
      <el-form-item label="登录名:" prop="loginName" class="marginMore">
          <el-input v-model="formData.loginName" :disabled="action === 'edit'"></el-input>
      </el-form-item>
      <el-form-item label="用户角色:" prop="roleName">
          <el-select v-model="formData.roleName" placeholder="请选择">
            <el-option
              v-for="item in roleList"
              :key="item.value"
              :label="item.value"
              :value="item.id">
            </el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="邮箱  :  " prop="email" style="margin-left:14px">
          <el-input v-model="formData.email"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  props: ['addDialogShow', 'formData', 'roleList', 'action'],
  data () {
    return {
      rules: {
        userName: [
          { required: true, message: '请输入用户姓名', trigger: 'blur' }
        ],
        loginName: [
          { required: true, message: '请输入登录名', trigger: 'blur' }
        ],
        roleName: [
          { required: true, message: '请输入用户角色', trigger: 'blur' }
        ]
      },
      title: ''
    }
  },
  methods: {
    handleClose () {
      this.$emit('close')
    },
    confirm () {
      let url
      let roleId
      let i
      if (this.action === 'edit') {
        url = 'editBack'
        this.roleList.forEach((element, index) => {
          if (element.text === this.formData.roleName) {
            i = element.id
          }
        })
        roleId = i
      } else {
        url = 'addBack'
        roleId = this.formData.roleName
      }
      this.$http({
        url: url,
        type: 'post',
        data: {
          userName: this.formData.userName,
          loginName: this.formData.loginName,
          roleId: roleId,
          email: this.formData.email,
          userId: this.formData.userId
        }
      })
        .then(res => {
          this.$message(res.msg)
          this.$emit('close')
        })
    }
  },
  computed: {
    addDialogShow1: {
      get () {
        return this.addDialogShow
      },
      set () {}
    }
  },
  watch: {
    action (val) {
      if (val === 'edit') {
        val = '编辑'
      } else {
        val = '新增'
      }
      this.title = val + '后台用户'
      console.log(this.action, this.action === 'add')
    }
  }
}
</script>
<style lang="less">
.marginMore {
  margin-left: 14px
}
</style>

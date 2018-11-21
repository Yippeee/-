<template>
  <div>
    <el-form ref="ruleForm" class="form" status-icon label-position="right" label-width="180px" :model="formData" :rules="rules">
      <el-form-item label="旧密码" prop="oldPsaaword">
        <el-input v-model="formData.oldPsaaword"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPsaawordOne">
        <el-input v-model="formData.newPsaawordOne"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="newPsaawordTwo">
        <el-input v-model="formData.newPsaawordTwo"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import md5 from '../assets/js/md5.js'
export default {
  data () {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('密码不能为空'))
      } else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (value === this.formData.oldPsaaword) {
        callback(new Error('不能与初始密码一样!'))
      } else {
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.formData.newPsaawordOne) {
        callback(new Error('两次输入密码不一致!'))
      } else if (value === this.formData.oldPsaaword) {
        callback(new Error('不能与初始密码一样!'))
      } else {
        callback()
      }
    }
    return {
      rules: {
        oldPsaaword: [
          { required: true, validator: checkAge, trigger: 'blur' }
        ],
        newPsaawordOne: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        newPsaawordTwo: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ]
      },
      formData: {
        oldPsaaword: '',
        newPsaawordOne: '',
        newPsaawordTwo: ''
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http({
            url: 'chPsw',
            type: 'post',
            data: {
              newSecret: md5(this.formData.oldPsaaword),
              oldSecret: md5(this.formData.newPsaawordOne)
            }
          }).then(res => {
            this.util.afterRequest(res)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style scoped>
.form{
  display: inline-block;
  width: 600px;
  margin-top: 50px;
}
</style>

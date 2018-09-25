<template>
  <div class="login">
    <img src="..\assets\image\bc.jpg" width="100%" height="100%" />
    <div class="login-center">
      <p>内容分发平台</p>
      <div class="login-info">
        <el-input placeholder="请输入用户名" v-model.lazy="username">
        </el-input>
        <span class="errTip">{{userTip}}</span>
        <el-input placeholder="请输入密码" v-model="password" type="password" @keyup.enter.native='login'>
        </el-input>
        <span class="errTip">{{pwdTip}}</span>
        <div>
          <el-button type="primary" @click="login">登录</el-button>
        </div>
      </div>
    </div>
    <div class="footer">
      <p>版权所有 © 1999-{{nowYear}} 深圳市茁壮网络股份有限公司 粤ICP备12069260</p>
      <p>Copyright © 1999-{{nowYear}} iPanel.TV Inc.,All Rights Reserved</p>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      username: '',
      password: '',
      userTip: '',
      pwdTip: ''
    }
  },
  computed: {
    nowYear () {
      return new Date().getFullYear()
    }
  },
  methods: {
    login () {
      this.userTip = this.pwdTip = ''
      if (!this.username) {
        this.userTip = '请输入用户名!'
        return false
      }
      if (!this.password) {
        this.pwdTip = '请输入密码!'
        return false
      }
      this.$http({
        url: 'login',
        type: 'post',
        data: {
          "loginName": this.username,
          "password": this.password
        }
      })
        .then((res) => {
          if (res.code === 0) {
            this.util.setCookie('accesstoken', res.data.token)
            this.$emit('loginSuccess')
          } else {
            this.$message(res.msg)
          }
        })
        .catch((res) => {
          this.$message(res.msg)
        })
    }
  }
}

</script>
<style scoped lang='less'>
.login {
  width: 100%;
  height: 100%;
  position: fixed;
  bottom: 0;
  z-index: 200;
  .login-center {
    position: absolute;
    left: 77%;
    top: 15%;
    width: 300px;
    p {
      margin-bottom: 70px;
      color: #20a0ff;
      font-size: 28px;
      text-align: center;
    }
    .login-info {
      position: relative;
      .errTip {
        color: red;
        width: 100%;
        padding-left: 10px;
        font-size: 12px;
      }
      .el-input {
        width: 300px;
      }
    }
  }
  .footer {
    position: fixed;
    bottom: 50px;
    width: 171%;
    p {
      text-align: center;
      font-size: 12px;
      color: #646464
    }
  }
}

</style>

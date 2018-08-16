<template>
<div class="menu-content">
  <el-menu>
    <router-link class="el-menu-item" index="1" tag="li" to="/index">
      <i class="el-icon-menu"></i>
      <span>首页</span>
    </router-link>
    <router-link class="el-menu-item" index="2" tag="li" to="/contenterManager">
        <i class="el-icon-menu"></i>
        <span>内容商管理</span>
    </router-link>
    <el-submenu index="2">
      <template slot="title">
          <i class="el-icon-location"></i>
          <span>统计报表</span>
        </template>
          <div class="child_el">
            <el-menu-item index="2-1"><span>订购统计</span></el-menu-item>
            <el-menu-item index="2-2"><span>收视统计</span></el-menu-item>
            <el-menu-item index="2-3"><span>资源统计</span></el-menu-item>
          </div>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">
          <i class="el-icon-location"></i>
          <span>后台用户</span>
        </template>
        <div class="child_el">
          <router-link class="el-menu-item" index="3-1" tag="li" to="/userManager/manager">
          <span>管理员</span>
          </router-link>
          <router-link class="el-menu-item" index="3-2" tag="li" to="/userManager/roleManager">
           <span>角色管理</span>
          </router-link>
        </div>
    </el-submenu>
        <el-submenu index="4">
      <template slot="title">
          <i class="el-icon-location"></i>
          <span>系统管理</span>
        </template>
        <div class="child_el">
          <router-link class="el-menu-item" index="4-1" tag="li" to="/systemManager/systemLog">
           <span>系统日志</span>
          </router-link>
          <router-link class="el-menu-item" index="4-2" tag="li" to="/systemManager/configManager">
           <span>配置管理</span>
          </router-link>
          <router-link class="el-menu-item" index="4-3" tag="li" to="/systemManager/platformManager">
           <span>发布平台管理</span>
          </router-link>
        </div>
    </el-submenu>
  </el-menu>
</div>
</template>
<script>
export default {}
</script>
<style scoped lang="less">
/* 重写el-menu样式 */
.menu-content {
  .el-menu {
    background: #20a0ff;
    .el-menu-item {
      height: 56px;
      background: #20a0ff;
      color: white;
      span {
        padding-left: 30px;
        font-size: 16px;
        line-height: 56px;
        color: white;
      }
      i {
        color: white;
      }
      &:hover {
        background: #1d8ce0;
      }
    }
    .el-submenu {
      .el-submenu__title {
        span {
          color: white;
          padding-left: 30px;
          text-align: center;
          font-size: 16px;
        }
        i {
          color: white;
        }
        &:hover {
          background: black;
        }
      }
      i {
        color: white;
      }
      &:hover {
        background: #58b7ff;
      }
    }
    .child_el {
      span {
        padding-left: 50px;
        font-size: 14px;
      }
    }
  }
}
.el-submenu__title:hover {
  background: black;
}
</style>

<template>
<div class="menu-content">
    <el-scrollbar style="height:100%">
  <el-menu>
    <router-link class="el-menu-item" index="1" tag="li" to="/index">
      <i class="menu-index menu-icon"></i>
      <span>首页</span>
    </router-link>
    <router-link class="el-menu-item" index="2" tag="li" to="/contenterManager">
        <i class="menu-contenter menu-icon"></i>
        <span>内容商管理</span>
    </router-link>
    <el-submenu index="2">
      <template slot="title">
          <i class="menu-report menu-icon"></i>
          <span>统计报表</span>
        </template>
          <div class="child_el">
            <router-link class="el-menu-item" index="2-1" tag="li" to="/statistics/orderStatistics">
             <span>订购统计</span>
            </router-link>
            <router-link class="el-menu-item" index="2-2" tag="li" to="/statistics/ratingStatistics">
             <span>收视统计</span>
            </router-link>
            <router-link class="el-menu-item" index="2-3" tag="li" to="/statistics/resourceStatistics">
             <span>媒资统计</span>
            </router-link>
          </div>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">
          <i class="menu-backend menu-icon"></i>
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
          <i class="menu-sys menu-icon"></i>
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
    <router-link class="el-menu-item" index="5" tag="li" to="/tocheck">
      <i class="menu-contenter menu-icon"></i>
      <span>待审核列表</span>
    </router-link>
    <router-link class="el-menu-item" index="6" tag="li" to="/posterEditor">
      <i class="menu-contenter menu-icon"></i>
      <span>海报编辑</span>
    </router-link>
  </el-menu>
   </el-scrollbar>
</div>
</template>
<script>
export default {}
</script>
<style scoped lang="less">
/* 重写el-menu样式 */
.menu-content {
  box-sizing: border-box;
  padding-top: 30px;
  overflow-x: hidden;
  height: 100%;
  .el-menu {
    background: #20a0ff;
    .el-menu-item {
      height: 56px;
      background: #20a0ff;
      span {
        // padding-left: 30px;
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
      &.router-link-exact-active{
        background: #1d8ce0;
      }
    }
    .el-submenu {
      .el-submenu__title {
        span {
          color: white;
          // padding-left: 30px;
          text-align: center;
          font-size: 16px;
        }
        i {
          color: white;
        }
        &:hover {
          background-color: #58b7ff;
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
        padding-left: 20px;
        font-size: 14px;
      }
    }
  }
}

.el-submenu__title:hover {
  background-color: #20A0FF;
}
</style>

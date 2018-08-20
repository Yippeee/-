<template>
  <div id="app" class="clearfix">
    <div v-if="isLogin" class="app-content clearfix">
      <div class="menu-wrap">
        <menu-header></menu-header>
        <menu-content @change="routerChange"></menu-content>
      </div>
      <!-- 导航提示 -->
      <el-breadcrumb class="router-tips" separator=">">
        <el-breadcrumb-item v-for="b in bread" :to="b.path">{{b.name}}</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="user">
        <i class="icon icon-single"></i>
        <span class="user-name">{{username}}</span>
      </div>
      <div class="line"></div>
      <div class="logout">
        <i class="icon icon-logout"></i>
        <span>退出</span>
      </div>
      <div class="content-wrap">
        <router-view></router-view>
      </div>
    </div>
    <login v-else></login>
  </div>
</template>

<script>
import menuHeader from "@/components/common/header"
import menuContent from "@/components/common/menu"

export default {
  name: "App",
  components: {
    menuHeader,
    menuContent
  },
  data () {
    return {
      isLogin: true,
      username: "海贼王",
      routerMap: {},
      bread: [{
        name: "首页",
        to: "/index"
      }]
    }
  },
  created () {
    window.document.title = "内容分发系统"
    let routes = this.$router.options.routes;
    for(let i in routes){
      let item = routes[i]
      let name = item.name
      if(name !== ''){
        if(!item.children){
          let arr = []
          arr.push({
            name: name,
            to: item.path
          })
          this.routerMap[name] = arr
        }else{
          for(let ch_index in item.children){
            name = item.name
            let ch_item = item.children[ch_index]
            let arr = []
            arr.push({
              name: name,
              to: item.path
            })
            this.routerMap[name] = arr
            name = ch_item.name
            let arr2 = arr.slice(0)
            arr2.push({
              name: name,
              to: ch_item.path
            })
            this.routerMap[name] = arr2
          }
        }
      }
    }
    this.bread = this.routerMap[this.util.getCookies("bread")]
  },
  watch:{
    '$route':{
      immediate:true,
      deep:true,
      handler (to, from) {
        const path = to.path;
        const name = to.name;
        this.bread = this.routerMap[name]
        if(this.bread){
          let length = this.bread.length-1
          this.util.setCookie('bread',this.bread[length].name)
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
#app {
  height: calc(~"100% - 50px");
  padding-bottom: 40px;
}
.app-content {
  position: relative;
  height: 100%;
}
.menu-wrap {
  width: 174px;
  height: 100%;
  overflow-y: hidden;
  background-color: #20a0ff;
  color: #fff;
  position: absolute;
}
.el-breadcrumb {
  position: absolute;
  left: 194px;
  right: 20px;
  top: 0;
  padding-left: 20px;
  height: 40px;
  line-height: 40px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border-bottom: 1px solid #aaa;
}
.content-wrap {
  position: relative;
  left: 174px;
  top: 40px;
  width: calc(~"100% - 174px");
  height: calc(~"100% - 40px");
  // white-space: nowrap;
  min-width: 1500px;
}
.user {
  display: inline-block;
  height: 40px;
  position: absolute;
  right: 120px;
  span {
    line-height: 40px;
    color: #1296db;
  }
}
.line {
  position: absolute;
  height: 32px;
  top: 4px;
  right: 96px;
  border-left: 2px solid rgb(233, 237, 240);
}
.logout {
  position: absolute;
  height: 40px;
  right: 20px;
  display: inline-block;
  span {
    line-height: 40px;
    color: #1296db;
  }
}
</style>

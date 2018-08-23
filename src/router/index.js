import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/indexPage/index'
import contenterManager from '@/components/contenterManager/contenterManager'
import manager from '@/components/userManager/manager'
import roleManager from '@/components/userManager/roleManager'
import systemLog from '@/components/systemManager/systemLog'
import configManager from '@/components/systemManager/configManager'
import platformManager from '@/components/systemManager/platformManager'
import moreinfo from '@/components/indexPage/moreinfo'
import systemManager from '@/components/systemManager/systemManager'
import userManager from '@/components/userManager/userManager'
import posterEditor from '@/components/videocheck/posterEditor'
import tocheck from '@/components/videocheck/tocheck'
/** 
 * indexPage 首页
 * contenterManager 内容商管理
 * systemManager 后台用户
 * systemManager 系统管理
*/

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/",
      name: "",
      redirect: {name : '首页'}
    },
    {
      path: "/index",
      name: "首页",
      component: index,
      children:[
        {        
          path: 'moreinfo',
          name: '更多信息',
          component: moreinfo
        },
      ]
    },
    {
      path: "/contenterManager",
      name: "内容商管理",
      component: contenterManager
    },
    {
      path: '/userManager',
      name: '后台用户',
      component:userManager,
      redirect: {name: '管理员'},
      children: [
        {
          path: "manager",
          name: "管理员",
          component: manager
        },
        {
          path: 'roleManager',
          name: "角色管理",
          component: roleManager
        }
      ]
    },
    {
      path: '/systemManager',
      name: "系统管理",
      component:systemManager,
      redirect: {name: '系统日志'},
      children: [
        {
          path: 'systemLog',
          name: "系统日志",
          component: systemLog
        },
        {
          path: 'configManager',
          name: "配置管理",
          component: configManager
        },
        {
          path: 'platformManager',
          name: "发布平台管理",
          component: platformManager
        }
      ]
    },
    {
      path: "/posterEditor",
      name: "内容商管理",
      component: posterEditor
    },
    {
      path: "/tocheck",
      name: "待审核列表",
      component: tocheck
    }
  ]
})

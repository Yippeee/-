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

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/",
      name: "默认",
      redirect: '/index'
    },
    {
      path: "/index",
      name: "首页",
      component: index,
    },
    {        
      path: '/moreinfo',
      name: '更多信息',
      component: moreinfo
    },
    {
      path: "/contenterManager",
      name: "内容商管理",
      component: contenterManager
    },
    {
      path: '/userManager',
      name: '后台用户',
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
    }
  ]
})

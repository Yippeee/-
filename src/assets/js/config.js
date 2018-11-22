// 系统配置文件
const CONFIG = {
  // boss 首页地址
  homepage: "",
  // Homed 后台登录地址
  loginurl: "/",
  // 系统名称
  systemname: "内容分发系统",
  // 是否为开发模式，默认为 true ; true 为不用登录即可进入系统，否则必须登录
  dev: false,
  // 开发模式下的默认账户 ID 1000025 1000103 1000056 3120
  userid: "3120",
  // 开发模式下的默认用户名
  username: "Yippee",
  // 开发模式下的默认令牌
  token: "TOKEN3120",
  // 可选的每页显示数量
  pagesizes: [20, 30, 50, 100]
}
// eslint-disable-next-line
const ipanelAddr = JAVA_API

// 系统接口配置
const API = {

  // login
  'login': ipanelAddr + 'user/ipanel/login',

  // 首页内容商信息获取
  'getIndexContent': ipanelAddr + '/provider/home',

  // 首页内容商操作权限开关
  'statusIndexContent': ipanelAddr + '/provider/enabled',

  // 首页系统运行情况获取
  'getIndexSysStatus': ipanelAddr + '/sys/system/inform',

  // 首页获取消息通知接口
  'getIndexInfoList': ipanelAddr + '/sys/message/list',

  // 首页消息通知标记接口
  'editIndexContent': ipanelAddr + '/sys/message/edit',

  // view back user
  'provider': ipanelAddr + '/user/user/authority/provider',

  // role
  'role': ipanelAddr + '/user/role/provider',

  // add back user
  'addBack': ipanelAddr + '/user/backstage/user/add',

  // delete back user
  'deleteBack': ipanelAddr + '/user/users/ids',

  // edit the back user
  'editBack': ipanelAddr + '/user/backstage/user/edit',

  // get the role list
  'getRoleList': ipanelAddr + '/user/role/permissions/provider',

  // new role
  'addRole': ipanelAddr + '/user/role/add',

  // delete role
  'deleteRole': ipanelAddr + '/user/role/id',

  // edit role
  'editRole': ipanelAddr + '/user/role/edit',

  // get the contenterManager list
  'getContenterManager': ipanelAddr + '/provider/all',

  // get the contenterManager detail
  'getContenterManagerDetail': ipanelAddr + '/provider/id',

  // get the right playform 获得所有权限平台
  'getRightPlayform': ipanelAddr + 'operators/all/online',

  // 新增内容商
  'addContenter': ipanelAddr + '/provider',

  // 修改内容商
  'editContenter': ipanelAddr + '/provider/edit',

  // 删除内容商
  'deleteContenter': ipanelAddr + '/provider/id',

  // 获取系统日志列表
  'getSysLog': ipanelAddr + '/sys/log',

  // 获取系统配置管理
  'getConfiguration': ipanelAddr + '/sys/configuration',

  // 修改系统配置管理
  'editConfiguration': ipanelAddr + '/sys/configuration/edit',

  // 新增内容运营商/上线地列表/发布平台
  'addPlayForm': ipanelAddr + '/operators',

  // 根据条件获得内容运营商/上线地列表/发布平台
  'getPlayForm': ipanelAddr + '/operators/condition',

  // 编辑内容运营商/上线地列表/发布平台
  'editPlayForm': ipanelAddr + '/operators/id',

  // 根据状态获取内容运营商/上线地列表/发布平台
  'statusGetPlayForm': ipanelAddr + '/operators/list/status',

  // 修改状态内容运营商/上线地列表/发布平台
  'statusPlayForm': ipanelAddr + '/operators/status',
  /* eslint-disable */
  // 订购统计——排名表
  "order_rank_list"               : ipanelAddr + "/report/order/rank/list",
  // 订购统计——表格数据统计
  "get_order_statistics"          : ipanelAddr + "/report/order/total",
  // 订购统计——折线图数据
  "get_order_trend"               : ipanelAddr + "/report/order/trend/list",
  // 订购统计——详情表格数据         
  "get_order_detail"              : ipanelAddr + "/report/order/detail/page/list",
  // 订购统计——所有上线地
  "get_order_district"            : ipanelAddr + "/report/order/names/list",
  // 订购统计——详情表下载
  "order_excel_download"          : ipanelAddr + "/report/order/detail/excel",

  // 收视统计——排名表
  "rate_rank_list"                : ipanelAddr + "/report/video/rank/list",
  // 收视统计——表格数据统计
  "get_rate_statistics"           : ipanelAddr + "/report/video/total/list",
  // 收视统计——折线图数据
  "get_rate_trend"                : ipanelAddr + "/report/video/trend/list",
  // 收视统计——详情表格数据
  "get_rate_detail"               : ipanelAddr + "/report/video/detail/page/list",
  // 收视统计——所有上线地
  "get_rate_district"             : ipanelAddr + "/report/video/names/list",
  // 收视统计——详情表下载
  "rate_excel_download"           : ipanelAddr + "/report/video/detail/export",

  // 媒资统计——排名表
  "resource_rank_list"            : ipanelAddr + "/report/media/rank",
  // 媒资统计——表格数据统计
  "get_resource_statistics"       : ipanelAddr + "/report/media/total",
  // 媒资统计——折线图数据         
  "get_resource_trend"            : ipanelAddr + "/report/media/trend",
  // 媒资统计——详情表格数据
  "get_resource_detail"           : ipanelAddr + "/report/media/order",
  // 媒资统计——详情表下载        
  "resource_excel_download"       : ipanelAddr + "/report/media/export",

  // 获取内容商
  "get_all_platforms"             : ipanelAddr + "/provider/list",

  // 修改密码
  'chPsw': ipanelAddr + '/user/user/password'

}

export {
  API,
  CONFIG
}

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
  username: "唐聪",
  // 开发模式下的默认令牌
  token: "TOKEN3120",
  // 可选的每页显示数量
  pagesizes: [20, 30, 50, 100],
}

// 系统接口
const API = {
  
}

export {
  API,
  CONFIG
}
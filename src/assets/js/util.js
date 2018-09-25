// 封装全局方法
import Axios from "axios"
import { API, CONFIG } from "./config"

const util = {
  /**
   *设置cookies
   *
   * @param {*} key
   * @param {*} value
   */
  setCookie (key, value) {
    document.cookie = key + '=' + value
  },
  /**
   *获取cookies
   *
   * @param {*} key
   */
  getCookies (key) {
    let reg = new RegExp("(^| )" + key + "=([^;]*)(;|$)")
    let arr = document.cookie.match(reg)
    if (arr === document.cookie.match(reg)) {
      return null
    } else {
      return arr[2]
    }
  },
  /**
   * 封装axios (仅仅是test版本，注意修改以及完善)
   * @param  {[Object]} options [请求相关参数]
   * url type data
   */
  http (options) {
    let url = options.url
    let type = options.type || 'get'
    type = type.toLowerCase()
    if (!url) {
      return new Error('请求地址为空，请检查！')
    }
    let axiosSettings = {
      url: API[url] || url,
      timeout: options.timeout ? options.timeout : 2000
    }
    Object.assign(axiosSettings, {
      method: type
    })

    if (type === 'get') {
      Object.assign(axiosSettings, {
        params: options.data,
        headers: {
          "Accept": "*/*",
          "Authorization": util.getCookies('accesstoken') || CONFIG.token
        }
      })
    }
    if (type === 'post' || type === 'delete') {
      Object.assign(axiosSettings, {
        data: options.data,
        headers: {
          "Authorization": util.getCookies('accesstoken') || CONFIG.token
        }
      })
    }

    return Axios(axiosSettings).then((response) => {
      let res = response.data || {}
      return res
    })
  }
}
// 开发者环境自动生成token
if (CONFIG.dev) {
  util.setCookie('accesstoken', CONFIG.token)
}
export default{
  install: function (vm) {
    vm.prototype.util = util
    vm.prototype.$http = vm.$http = util.http
    vm.prototype.$ = (x) => CONFIG[x]
    window.log = console.log
  }
}

// 封装全局方法
// import Axios from "axios"
// import { API, CONFIG } from "./config"

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
    var reg = new RegExp("(^| )" + key + "=([^;]*)(;|$)")
    var arr = document.cookie.match(reg)
    if (arr === document.cookie.match(reg)) {
      return null
    } else {
      return arr[2]
    }
  }
}
// const http = {}
export default{
  install: function (vm) {
    vm.prototype.util = util
  }
}

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
   *
   *
   * @param {*} key
   */
  getCookies (key) {
    var arr
    var reg = new RegExp("(^| )" + key + "=([^;]*)(;|$)")
    if (arr === document.cookie.match(reg)) {
      return (arr[2])
    } else {
      return null
    }
  }
}
// const http = {}
export default{
  install: function (vm) {
    vm.prototype.util = util
  }
}

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
// eslint-disable-next-line
import '!style-loader!css-loader!less-loader!@/assets/css/main.less'
import util from './assets/js/util';

Vue.config.productionTip = false

Vue.use(util)

Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

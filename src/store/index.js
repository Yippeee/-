import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    loginStatus: false,
    indexDialogVisible: false
  },
  mutations: {
    login (state) {
      state.loginStatus = true
    },
    logout (state) {
      state.loginStatus = false
    },
    indexDialogShow (state) {
      state.indexDialogVisible = true
    },
    indexDialogDisappear (state) {
      state.indexDialogVisible = false
    }
  }
})

export default store

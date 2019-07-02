import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    isLoggedIn: !!localStorage.getItem('lbUser'),
    isDark: false
  },
  mutations: {
    switchTheme (state){
      state.isDark = !state.isDark
    }
  },
  actions: {
  },
  getters: {}
})
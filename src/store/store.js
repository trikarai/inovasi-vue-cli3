import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: !!localStorage.getItem('lbUser'),
    isDark: false,
    breads: {
      level: 0,
      pos: 0,
      item: []
    }
  },
  mutations: {
    switchTheme(state) {
      state.isDark = !state.isDark
    },
    setDashboard(state, payload){
      state.breads.level = 0;
      state.breads.pos = 0;
      state.breads.item = [];
      state.breads.item.push(payload.to);
      state.breads.item[payload.level].disabled = true;
      window.sessionStorage.setItem("breadpos", payload.level);
      window.sessionStorage.setItem("breadcrumb", state.breads);
    },
    setBCLocal(state, payload){
      state.breads = payload;
    },
    breadcrumb(state, payload) {
      if (payload.level === 0) {
        state.breads.level = 0;
        state.breads.pos = 0;
        state.breads.item = [];
        state.breads.item.push(payload.to);
        state.breads.item[payload.level].disabled = true;
        window.sessionStorage.setItem("breadpos", payload.level);
        window.sessionStorage.setItem("breadcrumb", state.breads);
      }else if((payload.level - state.breads.level) > state.breads.pos ){
        console.log("state 2: ")
        state.breads.pos = payload.level;
        state.breads.item.splice(payload.level);
        state.breads.item.push(payload.to);
        for (let index = 0; index < payload.level ; index++) {
              state.breads.item[index].disabled = false;
        }
        state.breads.item[payload.level].disabled = true;
        window.sessionStorage.setItem("breadpos", payload.level);
        window.sessionStorage.setItem("breadcrumb", state.breads);
      }else if((payload.level - state.breads.level) < state.breads.pos){
        console.log("state 3: " +  (payload.level - state.breads.level))
        state.breads.pos = payload.level;
        state.breads.item.splice(payload.level)
        state.breads.item.push(payload.to);
        for (let index = 0; index < payload.level ; index++) {
              state.breads.item[index].disabled = false;
        }
        state.breads.item[payload.level].disabled = true;
        window.sessionStorage.setItem("breadpos", payload.level);
        window.sessionStorage.setItem("breadcrumb", state.breads);
      }else if(payload.level === state.breads.pos){
        console.log("state 4: " +  (payload.level - state.breads.level))
        state.breads.pos = payload.level;
        state.breads.item.splice(payload.level)
        state.breads.item.push(payload.to);
        state.breads.item[payload.level].disabled = true;
        window.sessionStorage.setItem("breadpos", payload.level);
        window.sessionStorage.setItem("breadcrumb", state.breads);
      }else{
        console.log("state 5: " + (payload.level - state.breads.level))
      }
    }
  },
  actions: {
  },
  getters: {}
})
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
    },
    profile: [
      { title: "edu", total: 0 },
      { title: "work", total: 0 },
      { title: "org", total: 0 },
      { title: "ent", total: 0 },
      { title: "tra", total: 0 },
      { title: "ski", total: 0 },
    ],
    teamMemberships: [],
    teamId: "",
    programId: "",
  },
  mutations: {
    setTeamId(state, payload){
      state.teamId = payload;
    },
    setProgramId(state, payload){
      state.programId = payload;
    },
    switchTheme(state) {
      state.isDark = !state.isDark
    },
    setDashboard(state, payload) {
      state.breads.level = 0;
      state.breads.pos = 0;
      state.breads.item = [];
      state.breads.item.push(payload.to);
      state.breads.item[payload.level].disabled = true;
      window.sessionStorage.setItem("breadpos", payload.level);
      window.sessionStorage.setItem("breadcrumb", state.breads);
    },
    setBCLocal(state, payload) {
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
      } else if ((payload.level - state.breads.level) > state.breads.pos) {
        console.log("state 2: ")
        state.breads.pos = payload.level;
        state.breads.item.splice(payload.level);
        state.breads.item.push(payload.to);
        for (let index = 0; index < payload.level; index++) {
          state.breads.item[index].disabled = false;
        }
        state.breads.item[payload.level].disabled = true;
        window.sessionStorage.setItem("breadpos", payload.level);
        window.sessionStorage.setItem("breadcrumb", state.breads);
      } else if ((payload.level - state.breads.level) < state.breads.pos) {
        console.log("state 3: " + (payload.level - state.breads.level))
        state.breads.pos = payload.level;
        state.breads.item.splice(payload.level)
        state.breads.item.push(payload.to);
        for (let index = 0; index < payload.level; index++) {
          state.breads.item[index].disabled = false;
        }
        state.breads.item[payload.level].disabled = true;
        window.sessionStorage.setItem("breadpos", payload.level);
        window.sessionStorage.setItem("breadcrumb", state.breads);
      } else if (payload.level === state.breads.pos) {
        console.log("state 4: " + (payload.level - state.breads.level))
        state.breads.pos = payload.level;
        state.breads.item.splice(payload.level)
        state.breads.item.push(payload.to);
        state.breads.item[payload.level].disabled = true;
        window.sessionStorage.setItem("breadpos", payload.level);
        window.sessionStorage.setItem("breadcrumb", state.breads);
      } else {
        console.log("state 5: " + (payload.level - state.breads.level))
      }
    },
    setProfile(state, payload) {
      state.profile[0].total = payload.data.educationalBackgrounds.length;
      state.teamMemberships = payload.data.teamMemberships;
    },
    incrementEdu(state){
      state.profile[0].total = state.profile[0].total + 1;
    },
    incrementWork(state){
      state.profile[1].total = state.profile[1].total + 1;
    },
    incrementOrg(state){
      state.profile[2].total = state.profile[2].total + 1;
    },
    incrementEnt(state){
      state.profile[3].total = state.profile[3].total + 1;
    },
    incrementTra(state){
      state.profile[4].total = state.profile[4].total + 1;
    },
    incrementSki(state){
      state.profile[5].total = state.profile[5].total + 1;
    },
  },
  actions: {
  },
  getters: {}
})
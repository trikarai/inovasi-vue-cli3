import Vue from "vue";
import VueResource from "vue-resource";
// import axios from "axios";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import "./registerServiceWorker";
import jQuery from "jquery";
global.jQuery = jQuery;
global.$ = jQuery;
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css"; // Ensure you are using css-loader
import { TiptapVuetifyPlugin } from "tiptap-vuetify";
import 'tiptap-vuetify/dist/main.css';
import VueVisible from "vue-visible";

//Translation 
import en from 'vuetify/es5/locale/en'
import id from 'vuetify/es5/locale/id'

// Vue.prototype.$axios = axios;
Vue.use(VueResource);
Vue.use(VueVisible);
Vue.use(Vuetify, {
  lang: {
    locales: {en, id},
    current: 'en'
  },
  theme: {
    primary: "#8bc751",
    accent: "#e4e4e4",
  }
});
Vue.use(TiptapVuetifyPlugin)

Vue.config.productionTip = false;

export const app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

window["vue"] = app;
window.store = store;

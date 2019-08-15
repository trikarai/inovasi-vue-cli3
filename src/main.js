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
import VueVisible from "vue-visible";
import UUID from 'vue-uuid';

//font
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret, faAddressBook } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUserSecret, faAddressBook)

Vue.component('font-awesome-icon', FontAwesomeIcon)

//Translation 
import en from '@/config/lang/en';
import id from '@/config/lang/id';

import customcolors from "@/components/css/customcolor"

// Vue.prototype.$axios = axios;
Vue.use(UUID);
Vue.use(VueResource);
Vue.use(VueVisible);

const opts = {
  lang: {
    locales: { en, id },
    current: 'en'
  },
  theme: {
    dark: false
  }
  // theme: customcolors
}
Vue.use(Vuetify)

Vue.config.productionTip = false;

export const app = new Vue({
  router,
  store,
  vuetify: new Vuetify(opts),
  render: h => h(App)
}).$mount("#app");

window["vue"] = app;
window.store = store;

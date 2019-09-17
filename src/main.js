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
import "vuetify/dist/vuetify.min.css"; // Ensure you are using css-loader
import VueVisible from "vue-visible";
import UUID from 'vue-uuid';

//loader global
import LoaderDialog from "@/components/Loader";

//font
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret, faAddressBook } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

//vuetify
import vuetify from './plugins/vuetify';

library.add(faUserSecret, faAddressBook)

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('loader-dialog', LoaderDialog);

// Vue.prototype.$axios = axios;
Vue.use(UUID);
Vue.use(VueResource);
Vue.use(VueVisible);

const moment = require('moment');
require('moment/locale/id');
require('moment/locale/en-gb');

Vue.use(require('vue-moment'), {
    moment
})


Vue.config.productionTip = false;

export const app = new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");

window["vue"] = app;
window.store = store;

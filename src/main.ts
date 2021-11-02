import { translate } from "./filters/translate";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import PerfectScrollbarPlugin from "vue2-perfect-scrollbar";
import Fragment from "vue-fragment";
import VueTree from "@ssthouse/vue-tree-chart";
import Vuelidate from "vuelidate";

import Notifications from "vue-notification";
import { i18n } from "./plugins/i18n";

Vue.config.productionTip = false;

Vue.use(PerfectScrollbarPlugin);
Vue.use(Fragment);
Vue.component("vue-tree", VueTree);
Vue.filter("translate", translate);
Vue.use(Notifications);
Vue.use(Vuelidate);
new Vue({
  router,
  i18n,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");

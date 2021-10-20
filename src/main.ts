import { translate } from "./filters/translate";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import PerfectScrollbarPlugin from "vue2-perfect-scrollbar";
import Fragment from "vue-fragment";
import VueTree from "@ssthouse/vue-tree-chart";
import VueI18n from "vue-i18n";

import Notifications from "vue-notification";
import { en } from "./lang/en";
import { ru } from "./lang/ru";

Vue.use(VueI18n);

export const i18n = new VueI18n({
  locale: localStorage.getItem("lang") || "ru",
  messages: {
    ru: {
      ...ru,
    },
    en: {
      ...en,
    },
  },
});
Vue.config.productionTip = false;

Vue.use(PerfectScrollbarPlugin);
Vue.use(Fragment);
Vue.component("vue-tree", VueTree);
Vue.filter("translate", translate);
Vue.use(Notifications);

new Vue({
  router,
  i18n,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");

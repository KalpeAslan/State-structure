import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import PerfectScrollbarPlugin from "vue2-perfect-scrollbar";

Vue.config.productionTip = false;
Vue.use(PerfectScrollbarPlugin)

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");

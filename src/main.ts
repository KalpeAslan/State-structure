import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import PerfectScrollbarPlugin from "vue2-perfect-scrollbar";
import Fragment from "vue-fragment";
import VueTree from '@ssthouse/vue-tree-chart'
Vue.config.productionTip = false;

Vue.use(PerfectScrollbarPlugin)
Vue.use(Fragment)
Vue.component('vue-tree', VueTree)

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");

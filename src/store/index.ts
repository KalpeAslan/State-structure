import { treeStore } from "./treeStore";
import { systemStore } from "./systemStore";
import { globalStore } from "./globalStore";
import { homeStore } from "./homeStore";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    treeStore,
    systemStore,
    homeStore,
    globalStore,
  },
});

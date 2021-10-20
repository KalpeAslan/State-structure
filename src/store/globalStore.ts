import { Module } from "vuex";
import { IStateGlobalStore } from "./interfaces";
import { SET_MODAL_NAME } from "./mutation-types";

export const globalStore: Module<IStateGlobalStore, any> = {
  state: {
    selectedModalName: null,
  },
  mutations: {
    [SET_MODAL_NAME](state, modalName) {
      state.selectedModalName = modalName;
    },
  },
  actions: {
    [SET_MODAL_NAME](ctx, modalName: string | null) {
      ctx.commit(SET_MODAL_NAME, modalName);
    },
  },
  getters: {
    SELECTED_MODAL(state) {
      return state.selectedModalName;
    },
  },
};

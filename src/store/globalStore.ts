import { Module } from "vuex";
import { IStateGlobalStore } from "./interfaces";
import { SET_LOADING, SET_MODAL_NAME } from "./mutation-types";

export const globalStore: Module<IStateGlobalStore, any> = {
  state: {
    selectedModalName: null,
    isLoading: false,
  },
  mutations: {
    [SET_MODAL_NAME](state, modalName) {
      state.selectedModalName = modalName;
    },
    [SET_LOADING](state, isLoading: boolean) {
      state.isLoading = isLoading;
    },
  },
  actions: {
    [SET_MODAL_NAME](ctx, modalName: string | null) {
      ctx.commit(SET_MODAL_NAME, modalName);
    },
    [SET_LOADING](ctx, isLoading: boolean) {
      ctx.commit(SET_LOADING, isLoading);
    },
  },
  getters: {
    SELECTED_MODAL(state) {
      return state.selectedModalName;
    },
    isLoading(state): boolean {
      return state.isLoading;
    },
  },
};

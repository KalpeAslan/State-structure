import { IStateSystemStore, language } from "./interfaces";
import { SET_LANGUAGE, SET_USER_TYPE } from "./mutation-types";
import { Module } from "vuex";

const userTypes = ["admin", "dispatcher"];
export const systemStore: Module<IStateSystemStore, any> = {
  state: {
    userType: userTypes[1],
    currentLanguage: "ru",
  },
  mutations: {
    [SET_USER_TYPE](context, userType: string) {
      context.userType = userType;
    },
    [SET_LANGUAGE](ctx, language: language) {
      ctx.currentLanguage = language;
    },
  },
  actions: {
    [SET_LANGUAGE](ctx, language: language) {
      ctx.commit(SET_LANGUAGE, language);
    },
  },
  getters: {
    GET_USER_TYPE(ctx) {
      return ctx.userType;
    },
    GET_CURRENT_LANGUAGE(ctx) {
      return ctx.currentLanguage;
    },
  },
};

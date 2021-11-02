import {
  IStateSystemStore,
  language,
  userTypes,
  webSocketState,
} from "./interfaces";
import { SET_LANGUAGE, SET_USER_TYPE } from "./mutation-types";
import { Module } from "vuex";
import { i18n } from "@/plugins/i18n";

const userTypes = ["dispatcher", "departmentBoss", "departmentHead", "admin"];
export const systemStore: Module<IStateSystemStore, any> = {
  state: {
    userType: "dispatcher",
    currentLanguage: "ru",
    webSocketState: null,
  },
  mutations: {
    [SET_USER_TYPE](context, userType) {
      context.userType = userType;
    },
    [SET_LANGUAGE](ctx, language: language) {
      ctx.currentLanguage = language;
    },
  },
  actions: {
    [SET_LANGUAGE](ctx, language: language) {
      i18n.locale = language;
      ctx.commit(SET_LANGUAGE, language);
    },
    [SET_USER_TYPE](ctx, userType: userTypes) {
      ctx.commit(SET_USER_TYPE, userType);
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

import { HttpService } from "./../services/httpService";
import { SystemService } from "./../services/systemService";
import {
  IStateSystemStore,
  language,
  userTypes,
  webSocketState,
} from "./interfaces";
import {
  CHECK_IS_LOGGINED,
  SET_LANGUAGE,
  SET_LOGGINED,
  SET_USER_TYPE,
} from "./mutation-types";
import { Module } from "vuex";
import { i18n } from "@/plugins/i18n";
const systemService: SystemService = new SystemService(new HttpService());

const userTypes = ["dispatcher", "departmentBoss", "departmentHead", "admin"];
export const systemStore: Module<IStateSystemStore, any> = {
  state: {
    userType: "dispatcher",
    currentLanguage: "ru",
    webSocketState: null,
    isLoggined: false,
  },
  mutations: {
    [SET_USER_TYPE](state, userType) {
      state.userType = userType;
    },
    [SET_LANGUAGE](state, language: language) {
      state.currentLanguage = language;
    },
    [SET_LOGGINED](state, isLoggined: boolean) {
      state.isLoggined = isLoggined;
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
    async [CHECK_IS_LOGGINED]() {
      if (
        !localStorage.getItem("refresh-token") &&
        !localStorage.getItem("access-token")
      ) {
        systemService.redirectToMain();
      }
    },
    async [SET_LOGGINED](ctx) {
      const urlSearchParams = new URLSearchParams(window.location.search);
      const params = Object.fromEntries(urlSearchParams.entries());
      await systemService.validateCode(params.code);
    },
  },
  getters: {
    GET_USER_TYPE(state): string {
      return state.userType;
    },
    GET_CURRENT_LANGUAGE(state): string {
      return state.currentLanguage;
    },
    isLoggined(state): boolean {
      return state.isLoggined;
    },
    isDispatcher(state): boolean {
      return state.userType === 'dispatcher'
    }
  },
};

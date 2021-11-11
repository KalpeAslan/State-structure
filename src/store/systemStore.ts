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
        const dump = {
          access_token:
            "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsicGF5bWVudCIsImludmVudG9yeSJdLCJzdWJzdXJmYWNlX3VzZXJfaWQiOjIzLCJ1c2VyX25hbWUiOiIxMjM0NTY3ODkwMTEiLCJzY29wZSI6WyJSRUFEIiwiV1JJVEUiXSwiZXhwIjoxNjA2NDA3MTI3LCJjb250YWN0X2lkIjo0MCwiRklPIjoi0J_QtdGC0YAg0KHQuNC80L7QvdC-0LIg0JDRhNCw0L3QsNGB0YzQtdCy0LjRhyIsImF1dGhvcml0aWVzIjpbIlJPTEVfVVNFUiJdLCJqdGkiOiI0MGQ0Yzg2Ny02NTk4LTQyZDAtOGRkZi1hYWVkNTJjNzg0OTAiLCJjbGllbnRfaWQiOiJwb3J0YWx0dGsifQ.dqa3HBfvvqftaeCj5NS64ozFrfXp8K9CJ3Sn2Xb4fDcevqATs_DFqke9iImcm9JOViEdeVVPTkJEEwH7NlDBSN128vxH4Q1C3mMvcwl_Vz_DW9sQuGsOQ46rX7AUMJ45er4bxnrf-k7AedefeJfIEIBfAbqYnLl0UvYCij48F5pCW_xicubQ_Y9SNDyxH5dtXu7aHeYTIQUOeJAEMLkgQ3XIlvFtrqMsBs2URloYtr748YHMrWgSy6BEvx7MsTO6EOY87F1PUATtgrds5Ni09CvXgWgbbfJqzSDgds62uW5obDdmocs5E5V2YFW5jKz8X1b9dvz4e1NdVKXu48PeiQ",
          token_type: "bearer",
          refresh_token:
            "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsicGF5bWVudCIsImludmVudG9yeSJdLCJzdWJzdXJmYWNlX3VzZXJfaWQiOjIzLCJ1c2VyX25hbWUiOiIxMjM0NTY3ODkwMTEiLCJzY29wZSI6WyJSRUFEIiwiV1JJVEUiXSwiYXRpIjoiNDBkNGM4NjctNjU5OC00MmQwLThkZGYtYWFlZDUyYzc4NDkwIiwiZXhwIjoxNjA2NDA3MTI3LCJjb250YWN0X2lkIjo0MCwiRklPIjoi0J_QtdGC0YAg0KHQuNC80L7QvdC-0LIg0JDRhNCw0L3QsNGB0YzQtdCy0LjRhyIsImF1dGhvcml0aWVzIjpbIlJPTEVfVVNFUiJdLCJqdGkiOiJmOTY0NjhjZi03OTY4LTQyMGYtYTljMS03OTM3MTE0ODQ2YjgiLCJjbGllbnRfaWQiOiJwb3J0YWx0dGsifQ.eweQo7xbQVf2pcc59QKT--IENk9TOjV4s2fAB5tzxy4CfTV2QGBvdsWMY-z2usX2seDWK1_GGuozz2hcHeAzDVo8RKi5EaupDjWT5zHLLTgIvx19h0ePvvFqbekVUVcA77-bgObrV-nLr2N9wN3r5nOAS5k4qXAVpuGyOChfOkt7a5R2j5v055STq5ibrUmSxTG3-3B8qRyJXMug4nzgvfKb9XoM_9rTQAaQuGVgD8ysNpRIr-FVzH5zxNxGydKIukJ_YFo5qOSn5bDtLnEWCETrsk7vZ5eXKgvjF0VHXGLlhYoSa_GyHcsp37wgGD7BMMYjqzv3jooiDhuXszM9iA",
          expires_in: 10799,
          scope: "READ WRITE",
          subsurface_user_id: 23,
          contact_id: 40,
          FIO: "Петр Симонов Афанасьевич",
          jti: "40d4c867-6598-42d0-8ddf-aaed52c78490",
        };
        const [header, payload, key] = dump.access_token.split(".");
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
      return state.userType === "dispatcher";
    },
  },
};

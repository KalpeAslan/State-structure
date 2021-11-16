import { ILog, ILogGet, IVersion } from "./interface";
import { logsService } from "./../services/logsService";
import { SET_LOGS, SET_VERSION, SET_VERSIONS } from "./mutation-types";
import { Module } from "vuex";
import Vue from "vue";

interface ILogsAndVersionsStore {
  logs: ILog[] | null;
  versions: IVersion[] | null;
}

export const logsStore: Module<ILogsAndVersionsStore, any> = {
  state: {
    logs: null,
    versions: null,
  },
  mutations: {
    [SET_LOGS](state, logs: ILog[]) {
      state.logs = logs;
    },
    [SET_VERSIONS](state, versions: IVersion[]) {
      state.versions = versions.map((version) => {
        version.userObject = {
          id: 243,
          firstname: "TestName",
          lastname: "TestSurname",
          username: "TestSurname TestName",
        };
        return version;
      });
    },
  },
  actions: {
    async [SET_LOGS](ctx) {
      await logsService.getLogs().then((logsGet: ILogGet[]) => {
        const logs = logsGet.map((logGet) => {
          let action;
          try {
            action = JSON.parse(logGet.action);
          } catch (e) {
            action = null;
          }
          const log: ILog = {
            ...logGet,
            comment: action
              ? Vue.filter("translate")(action[Object.keys(action)[0]])
              : "----",
            action: action ? Object.keys(action)[0] : "-----",
          };
          return log;
        });
        ctx.commit(SET_LOGS, logs);
      });
    },
    async [SET_VERSIONS](ctx) {
      await logsService
        .getVersionsByGAId(ctx.rootGetters.GET_GA_ID)
        .then((versions) => {
          ctx.commit(SET_VERSIONS, versions);
        });
    },
    async [SET_VERSION](ctx, versionId: number) {
      logsService.getVersionObjectByVersionId(versionId);
    },
  },
  getters: {
    logs(state): ILog[] {
      return state.logs;
    },
    versions(state): IVersion[] {
      return state.versions;
    },
  },
};

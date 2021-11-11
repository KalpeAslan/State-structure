import { ILog, ILogGet } from "./interface";
import { logsService } from "./../services/logsService";
import { SET_LOGS } from "./mutation-types";
import { Module } from "vuex";
import Vue from "vue";

interface ILogsStore {
  logs: ILog[] | null;
}

export const logsStore: Module<ILogsStore, any> = {
  state: {
    logs: null,
  },
  mutations: {
    [SET_LOGS](state, logs: ILog[]) {
      state.logs = logs;
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
  },
  getters: {
    logs(state): ILog[] {
      return state.logs;
    },
  },
};

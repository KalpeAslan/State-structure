import moment from "moment";
import { ILog, ILogGet, IVersion } from "./interface";
import { logsService } from "./../services/logsService";
import {
  SET_LOGS,
  SET_TREE,
  SET_VERSION,
  SET_VERSIONS,
  SET_VERSION_TREE,
} from "./mutation-types";
import { Module } from "vuex";
import Vue from "vue";
import { ITree } from "./interfaces";

interface ILogsAndVersionsStore {
  logs: ILog[] | null;
  versions: IVersion[] | null;
  versionTree: ITree | null;
}

export const logsStore: Module<ILogsAndVersionsStore, any> = {
  state: {
    logs: null,
    versions: null,
    versionTree: null,
  },
  mutations: {
    [SET_LOGS](state, logs: ILogGet[]) {
      state.logs = logs.map((logGet) => {
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
        log.dateTime = moment(log.dateTime).format("DD/MM/YYYY hh:mm");
        return log;
      });
    },
    [SET_VERSIONS](state, versions: IVersion[]) {
      state.versions = versions;
    },
    [SET_VERSION_TREE](state, versionTree: ITree) {
      state.versionTree = versionTree;
    },
  },
  actions: {
    async [SET_LOGS](ctx) {
      await logsService.getLogs().then((logs: ILogGet[]) => {
        ctx.commit(SET_LOGS, logs);
      });
    },
    async [SET_VERSIONS](ctx, id: number) {
      await logsService.getVersionsByGAId(id).then((versions) => {
        ctx.commit(SET_VERSIONS, versions);
      });
    },
    async [SET_VERSION](ctx, versionId: number) {
      await logsService.getVersionObjectByVersionId(versionId).then((data) => {
        ctx.commit(SET_VERSION_TREE, JSON.parse(data.ddepartmentIinTree));
      });
    },
  },
  getters: {
    logs(state): ILog[] {
      return state.logs;
    },
    versions(state): IVersion[] {
      return state.versions;
    },
    versionTree(state): ITree | null {
      return state.versionTree;
    },
  },
};

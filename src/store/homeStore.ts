import { treeService } from "@/services/treeService";
import {
  SET_USER_TYPE,
  SET_POSITIONS,
  ADD_POSITION,
  DELETE_POSITION,
  SET_MODE,
  SELECT_GOVERMENT,
  ADD_GOVERMENT,
  DELETE_GOVERMENT,
  SET_ROLES,
  SET_EMPLOYIES,
  DELETE_EMPLOYEE,
  DELETE_ROLE,
  SET_EMPLOYEE_REPLACEMENT,
  SET_ALL_GOVERMENT_AGENCIES,
  SET_SUBDIVISION_UNDER_GA,
  SET_TREE,
  EDIT_GOVERMENT,
  RELOAD_TREE,
  SEND_TO_APPLY,
  SEND_TO_REJECT,
  SET_GA_STATE,
  SET_WEBSOCKET_STATE,
  SET_MODAL_NAME,
} from "./mutation-types";
import { homeService } from "../services/homeService";
import { Module } from "vuex";
import Vue from "vue";
import {
  IGoverment,
  IGovermentReq,
  IPosition,
  IRole,
  IStateHomeStore,
} from "./interfaces";
import { employeesGet } from "./dump";
import { ncaLayerService } from "@/services/ncaLayerService";
import { IEmployeeGet, IPositionNew, TWebSocketState } from "./interface";

export const homeStore: Module<IStateHomeStore, any> = {
  state: {
    positions: [],
    mode: "default",
    goverments: [],
    selectedGoverment: null,
    roles: [],
    employies: [],
    subdivisionUnderGovernmentAgency: false,
    gaState: null,
    isWebSocketOpen: false,
    webSocketState: null,
  },
  mutations: {
    [SET_USER_TYPE](context) {},
    [SET_POSITIONS](context, positions: IPosition[]) {
      context.positions = positions.map((position) => {
        position.key = Math.round(Math.random() * 545145544);
        position.entityType = "position";
        return position;
      });
    },
    [ADD_POSITION](context, position) {
      context.positions.push(position);
    },
    [DELETE_POSITION](context, position: IPosition) {
      context.positions = context.positions.filter(
        (cPosition) => cPosition.key !== position.key
      );
    },

    [SET_MODE](context, mode: string) {
      context.mode = mode;
    },
    [SELECT_GOVERMENT](context, goverment: IGoverment) {
      context.selectedGoverment = goverment;
    },
    [DELETE_GOVERMENT](ctx, goverments: IGoverment[]) {
      ctx.goverments = goverments;
    },
    [SET_ROLES](context, roles: IRole[]) {
      context.roles = roles.map((role) => {
        role.entityType = "role";
        return role;
      });
    },
    [SET_EMPLOYIES](ctx, employies: IEmployeeGet[]) {
      ctx.employies = employies.map((employee) => {
        employee.key = Math.round(Math.random() * 454546515);
        employee.entityType = "employee";
        return employee;
      });
    },
    [SET_ALL_GOVERMENT_AGENCIES](ctx, allGovermentAgencies: IGoverment[]) {
      ctx.goverments = allGovermentAgencies.filter((ga) => ga.status !== 322);
    },
    [SET_SUBDIVISION_UNDER_GA](ctx, subdivisionUnderGaState: boolean) {
      ctx.subdivisionUnderGovernmentAgency = subdivisionUnderGaState;
    },
    [SET_GA_STATE](ctx, state: number) {
      ctx.gaState = state;
    },
    [SET_WEBSOCKET_STATE](ctx, state: TWebSocketState) {
      ctx.webSocketState = state;
    },
  },
  actions: {
    async [SET_POSITIONS](context) {
      if (context.getters.GET_GA_ID) {
        return await homeService
          .getPositions(context.getters.GET_GA_ID)
          .then((positions) => {
            context.commit(SET_POSITIONS, positions);
          });
      } else {
        context.commit(SET_POSITIONS, []);
      }
    },
    async [ADD_POSITION](context, position: IPositionNew) {
      await homeService.postNewPosition(position).then(() => {
        context.dispatch(SET_POSITIONS);
      });
    },
    async [DELETE_POSITION](context, position: IPosition) {
      treeService.changePosition({
        id: +position.id,
        governmentAgencyId: context.getters.GET_GA_ID,
        ddepartmentIinId: context.getters.GET_GA_ID,
        nameRu: position.nameRu,
        nameKz: position.nameKz,
        nameEng: position.nameEng,
        nameRuShort: position.nameRuShort,
        nameKzShort: position.nameKzShort,
        nameEngShort: position.nameEngShort,
        departmentId: position.subdivisionId,
        role: position.roleId,
        status: 322,
      });

      context.commit(DELETE_POSITION, position);
    },

    [SET_MODE](context, mode: string) {
      context.commit(SET_MODE, mode);
    },
    async [SELECT_GOVERMENT](context, goverment: IGoverment) {
      context.commit(SELECT_GOVERMENT, goverment);
      context.dispatch(SET_TREE, goverment.id).then(() => {
        context.commit(SET_GA_STATE, context.getters.tree.status || 315);
      });
    },
    [ADD_GOVERMENT](context, goverment: IGovermentReq) {
      //После добавления ГО, запрашиваю заново все ГО
      homeService.postNewGovermentAgence(goverment).then(() => {
        context.dispatch(SET_ALL_GOVERMENT_AGENCIES);
      });
    },
    async [DELETE_GOVERMENT](context) {
      const goverment: any = { ...context.state.selectedGoverment };
      goverment.status = 322;
      delete goverment.statusObject;
      await homeService.changeGovermentAgency(goverment).then(() => {
        context.dispatch(SET_TREE, null);
      });
    },
    async [SET_ROLES](context) {
      await homeService.getRoles().then((roles) => {
        context.commit(SET_ROLES, roles);
      });
    },
    async [SET_EMPLOYIES](ctx) {
      if (ctx.getters.GET_GA_ID)
        await homeService
          .getEmployees(ctx.getters.GET_GA_ID)
          .then((employies) => {
            //TEMP
            ctx.commit(SET_EMPLOYIES, employeesGet);
          });
    },

    [DELETE_ROLE](ctx, role: IRole) {
      ctx.commit(
        SET_ROLES,
        ctx.state.roles.filter((roleChild) => roleChild.key !== role.key)
      );
    },
    async [SET_ALL_GOVERMENT_AGENCIES](ctx) {
      await homeService.getAllGovermentAgencies().then((res) => {
        ctx.commit(SET_ALL_GOVERMENT_AGENCIES, res);
      });
    },
    async [EDIT_GOVERMENT](ctx, goverment: IGovermentReq | any) {
      await homeService.changeGovermentAgency(goverment).then(() => {
        ctx.dispatch(RELOAD_TREE);
      });
    },
    [SEND_TO_APPLY](ctx) {
      const goverment: any = { ...ctx.state.selectedGoverment };
      let status: number;
      switch (ctx.getters.GET_USER_TYPE) {
        case "dispatcher":
          goverment.status = 316;
          status = 316;
          break;
        case "departmentBoss":
          goverment.status = 317;
          status = 317;
          break;
        case "departmentHead":
          if (ctx.getters.isWebSocketOpen) {
            ncaLayerService.sign();
          }
          goverment.status = 319;
          status = 319;
          break;
      }
      const govermentChange = { ...goverment };
      delete govermentChange.statusObject;
      // homeService.changeGovermentAgency(govermentChange).then(() => {
      //   ctx.state.gaState = status;
      // });
    },
    [SEND_TO_REJECT](ctx) {
      const goverment: any = { ...ctx.state.selectedGoverment };
      let status: number;
      switch (ctx.getters.GET_USER_TYPE) {
        case "departmentBoss":
          goverment.status = 318;
          status = 318;
          break;
        case "departmentHead":
          goverment.status = 321;
          status = 321;
          break;
      }
      homeService.changeGovermentAgency(goverment).then(() => {
        ctx.state.gaState = status;
      });
    },
    async [SET_WEBSOCKET_STATE](ctx, state: TWebSocketState) {
      switch (state) {
        case "open":
          if (ctx.getters.webSocketState !== "opened")
            await ncaLayerService.init().then((res) => {
              ctx.commit(SET_WEBSOCKET_STATE, res);
            });
          break;
        case "close":
          ncaLayerService.close();
          break;
        case "error":
          ctx.dispatch(SET_MODAL_NAME, "nca-layer-modal");
          break;
        case "signed":
          Vue.notify({
            group: "alert",
            text: "Документ подписан",
            type: "success",
          });
          ctx.commit(SET_WEBSOCKET_STATE, "opened");
          break;
      }
    },
  },
  getters: {
    GET_FILTERED_POSITIONS: (state) => (input: string) => {
      return state.positions.filter((position) =>
        position.nameRu.toLowerCase().includes(input.toLowerCase())
      );
    },
    GET_ATTACH_ITEMS: (state) => (input: string, type: string) => {
      const items: any[] = type === "roles" ? state.roles : state.employies;
      if (!input) return items;
      return items.filter((role) => {
        const item = type === "roles" ? role.roleId.toString() : role.user.name;
        return item.toLowerCase().includes(input.toLowerCase());
      });
    },
    GET_EMPLOYEE_BY_ID:
      (state) =>
      (id: number): IEmployeeGet => {
        return state.employies.filter((employee) => employee.key === id)[0];
      },
    GET_ROLE_BY_ID:
      (state) =>
      (id: number): IRole => {
        return state.roles.filter((role) => role.key === id)[0];
      },
    GET_ALL_GOVERMENT_AGENCIES(state) {
      return state.goverments;
    },
    GET_EMPLOYIES(state) {
      return state.employies;
    },
    GET_SUBDIVISON_UNDER_GA(state) {
      return state.subdivisionUnderGovernmentAgency;
    },
    GET_SELECTED_GA(state) {
      return state.selectedGoverment;
    },
    gaState(state) {
      return state.gaState;
    },
    isWebSocketOpen(state): boolean {
      return state.webSocketState === "opened";
    },
    GET_GA_ID(state): number | null {
      return state.selectedGoverment ? state.selectedGoverment.id : null;
    },
    isShowFooter(state, getters, rootState, rootGetters): boolean {
      switch (rootGetters.GET_USER_TYPE) {
        case "dispatcher":
          return [315, 318, 322].includes(state.gaState);
        case "departmentBoss":
          return [316, 321].includes(state.gaState);
        case "departmentHead":
          return [317, 319].includes(state.gaState);
        case "admin":
          return false;
      }
    },
  },
};

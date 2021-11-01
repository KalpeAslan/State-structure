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
import {
  IEmployee,
  IEmployeeReq,
  IGoverment,
  IGovermentReq,
  IPosition,
  IRole,
  IStateHomeStore,
} from "./interfaces";
import { positions, roles } from "./dump";
import { ncaLayerService } from "@/services/ncaLayerService";

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
  },
  mutations: {
    [SET_USER_TYPE](context) {},
    [SET_POSITIONS](context, positions: IPosition[]) {
      context.positions = positions.map((position) => {
        position.key = Math.round(Math.random() * 545145544);
        return position;
      });
    },
    [ADD_POSITION](context, position: IPosition) {
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
      context.roles = roles;
    },
    [SET_EMPLOYIES](ctx, employies) {
      ctx.employies = employies.map((employee) => {
        employee.key = Math.round(Math.random() * 454546515);
        return employee;
      });
    },
    [SET_ALL_GOVERMENT_AGENCIES](ctx, allGovermentAgencies: IGoverment[]) {
      ctx.goverments = allGovermentAgencies;
    },
    [SET_SUBDIVISION_UNDER_GA](ctx, subdivisionUnderGaState: boolean) {
      ctx.subdivisionUnderGovernmentAgency = subdivisionUnderGaState;
    },
    [SET_GA_STATE](ctx, state: number) {
      ctx.gaState = state;
    },
    [SET_WEBSOCKET_STATE](ctx, state: boolean) {
      ctx.isWebSocketOpen = state;
    },
  },
  actions: {
    [SET_POSITIONS](context) {
      context.commit(SET_POSITIONS, positions);
    },
    [ADD_POSITION](context, postition: IPosition) {
      postition.key = Math.round(Math.random() * 465465464154);
      context.commit(ADD_POSITION, postition);
    },
    async [DELETE_POSITION](context, position: IPosition) {
      treeService.changePosition({
        id: position.positionsTableid,
        governmentAgency: position.governmentAgencyId,
        nameRu: position.nameRu,
        nameKz: position.nameKz,
        nameEng: position.nameEng,
        nameRuShort: position.nameRuShort,
        nameKzShort: position.nameKzShort,
        nameEngShort: position.nameEngShort,
        subdivisions: position.subdivisionId,
        role: position.roleId,
        status: 8,
      });

      context.commit(DELETE_POSITION, position);
    },

    [SET_MODE](context, mode: string) {
      context.commit(SET_MODE, mode);
    },
    async [SELECT_GOVERMENT](context, goverment: IGoverment) {
      if (
        !context.state.selectedGoverment ||
        context.state.selectedGoverment.governmentAgencyTableid !==
          goverment.governmentAgencyTableid
      ) {
        context.state.gaState = goverment.status.code.code;
        context.dispatch(SET_TREE, goverment.governmentAgencyTableid);
        context.commit(SELECT_GOVERMENT, goverment);
        context.commit(SET_GA_STATE, goverment.status.code.code);
      }
    },
    [ADD_GOVERMENT](context, goverment: IGovermentReq) {
      //После добавления ГО, запрашиваю заново все ГО
      homeService.postNewGovermentAgence(goverment).then(() => {
        context.dispatch(SET_ALL_GOVERMENT_AGENCIES);
      });
    },
    async [DELETE_GOVERMENT](context) {
      const goverment: any = { ...context.state.selectedGoverment };
      goverment.status = goverment.status.code.code;
      await homeService.changeGovermentAgency(goverment).then(() => {
        context.dispatch(SET_TREE, null);
      });
    },
    async [SET_ROLES](context) {
      // await homeService.getRoles().then((roles) => {
      //   context.commit(SET_ROLES, roles);
      // });
      context.commit(SET_ROLES, roles);
    },
    [SET_EMPLOYIES](ctx, employies: IEmployee[]) {
      ctx.commit(SET_EMPLOYIES, employies);
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
      goverment.status = goverment.status.id;
      await homeService.changeGovermentAgency(goverment).then(() => {
        ctx.dispatch(RELOAD_TREE);
      });
    },
    [SEND_TO_APPLY](ctx) {
      const goverment: any = { ...ctx.state.selectedGoverment };
      switch (ctx.getters.GET_USER_TYPE) {
        case "dispatcher":
          goverment.status = 2;
          ctx.state.gaState = 2;
          break;
        case "departmentBoss":
          goverment.status = 3;
          ctx.state.gaState = 3;
          break;
        case "departmentHead":
          ncaLayerService.sign();
          // goverment.status = 6;
          // ctx.state.gaState = 6;
          break;
      }
      homeService.changeGovermentAgency(goverment);
    },
    [SEND_TO_REJECT](ctx) {
      const goverment: any = { ...ctx.state.selectedGoverment };
      switch (ctx.getters.GET_USER_TYPE) {
        case "departmentBoss":
          goverment.status = 4;
          homeService.changeGovermentAgency(goverment);
          break;
        case "departmentHead":
          goverment.status = 7;
          break;
      }
    },
    async [SET_WEBSOCKET_STATE](ctx, state: boolean) {
      if (state) {
        await ncaLayerService.init().then((res) => {
          ctx.commit(SET_WEBSOCKET_STATE, res);
        });
      } else {
        ctx.dispatch(SET_MODAL_NAME, "nca-layer-modal");
        ctx.commit(SET_WEBSOCKET_STATE, false);
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
      (id: number): IEmployee => {
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
      return state.isWebSocketOpen;
    },
  },
};

import {
  SET_USER_TYPE,
  SET_POSITIONS,
  ADD_POSITION,
  DELETE_POSITION,
  SET_TEMP_POSITION,
  SET_MODE,
  SELECT_GOVERMENT,
  ADD_GOVERMENT,
  DELETE_GOVERMENT,
  SET_ROLES,
  SET_EMPLOYIES,
  DELETE_EMPLOYEE,
  DELETE_ROLE,
  SET_EMPLOYEE_TO_TEMP_POSITION,
  SET_ALL_GOVERMENT_AGENCIES,
  SET_SUBDIVISION_UNDER_GA,
  SET_TREE,
  EDIT_GOVERMENT,
  RELOAD_TREE,
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
import { positions } from "./dump";

export const homeStore: Module<IStateHomeStore, any> = {
  state: {
    positions: [],
    tempPosition: null,
    mode: "default",
    goverments: [],
    selectedGoverment: null,
    roles: [],
    employies: [],
    subdivisionUnderGovernmentAgency: false,
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
    [SET_TEMP_POSITION](context, tempPosition: IPosition) {
      context.tempPosition = tempPosition;
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
      ctx.employies = employies;
    },
    [SET_ALL_GOVERMENT_AGENCIES](ctx, allGovermentAgencies: IGoverment[]) {
      console.log(allGovermentAgencies);
      ctx.goverments = allGovermentAgencies;
    },
    [SET_SUBDIVISION_UNDER_GA](ctx, subdivisionUnderGaState: boolean) {
      ctx.subdivisionUnderGovernmentAgency = subdivisionUnderGaState;
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
    [DELETE_POSITION](context, position: IPosition) {
      context.commit(DELETE_POSITION, position);
    },
    [SET_TEMP_POSITION](context, position: IPosition) {
      context.commit(SET_TEMP_POSITION, position);
    },
    [SET_MODE](context, mode: string) {
      context.commit(SET_MODE, mode);
    },
    async [SELECT_GOVERMENT](context, goverment: IGoverment) {
      if (
        !context.state.selectedGoverment ||
        context.state.selectedGoverment.id !== goverment.id
      ) {
        context.dispatch(SET_TREE, goverment.id);
        context.commit(SELECT_GOVERMENT, goverment);
      }
    },
    [ADD_GOVERMENT](context, goverment: IGovermentReq) {
      //После добавления ГО, запрашиваю заново все ГО
      homeService.postNewGovermentAgence(goverment).then(() => {
        context.dispatch(SET_ALL_GOVERMENT_AGENCIES);
      });
    },
    [DELETE_GOVERMENT](context, govermentId: number) {
      context.commit(
        DELETE_GOVERMENT,
        context.state.goverments.filter(
          (goverment) => goverment.key !== govermentId
        )
      );
    },
    [SET_ROLES](context, roles: IRole[]) {
      context.commit(SET_ROLES, roles);
    },
    [SET_EMPLOYIES](ctx, employies: IEmployee[]) {
      ctx.commit(SET_EMPLOYIES, employies);
    },
    [DELETE_EMPLOYEE](ctx, employee: IEmployee) {
      ctx.commit(
        SET_EMPLOYIES,
        ctx.state.employies.filter(
          (employeeChild) => employeeChild.key !== employee.key
        )
      );
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
      return items.filter((role) =>
        role.name.toLowerCase().includes(input.toLowerCase())
      );
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
  },
};

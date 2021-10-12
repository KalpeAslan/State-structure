import { SET_USER_TYPE, SET_POSITIONS, ADD_POSITION, DELETE_POSITION, SET_TEMP_POSITION, SET_MODE, SELECT_GOVERMENT, ADD_GOVERMENT, DELETE_GOVERMENT, SET_ROLES, SET_EMPLOYIES } from './mutation-types';
import {homeService} from '../services/homeService'
import { Module } from "vuex";
interface IState {
    selectedGovOrg: Object,
    positions: Array<IPosition>,
    tempPosition: null | IPosition,
    mode: string,
    goverments: IGoverment[],
    selectedGoverment: IGoverment | null,
    roles: IRole[],
    employies: IEmployee[]
}
export interface IPosition {
    name: String,
    id: number | string,
    role?: string,
    type?: string,
    employeeDate?: string,
    tempEmployee?: string,
    endTempEmployeeDate?: string,
    comment?: string,
}

export interface IGoverment {
    bin: string | number,
    name: string,
    nameKz?: string,
    nameEn?: string,
    state?: string
}

export interface IRole {
    title: string,
    id: number
}

export interface IEmployee{
    title: string,
    id: number
}


export const homeStore: Module<IState, any> =  {
    state: {
        selectedGovOrg: {},
        positions: [],
        tempPosition: null,
        mode: 'default',
        goverments: [],
        selectedGoverment: null,
        roles: [],
        employies: []
    },
    mutations: {
        [SET_USER_TYPE](context){
        },
        [SET_POSITIONS](context, positions: IPosition[]){
            context.positions = positions
        },
        [ADD_POSITION](context, position: IPosition){
            context.positions.push(position)
        },
        [DELETE_POSITION](context, position: IPosition){
            context.positions = context.positions.filter(cPosition => cPosition.id !== position.id)
        },
        [SET_TEMP_POSITION](context, tempPosition: IPosition) {
            context.tempPosition = tempPosition
        },
        [SET_MODE](context, mode: string){
            context.mode = mode
        },
        [SELECT_GOVERMENT](context, goverment: IGoverment){
            context.selectedGoverment = goverment
        },
        [ADD_GOVERMENT](ctx, goverment){
            ctx.goverments.push(goverment)
        },
        [DELETE_GOVERMENT](ctx, govermentBin: number){
            ctx.goverments = ctx.goverments.filter(goverment => goverment.bin !== govermentBin)
        },
        [SET_ROLES](context, roles: IRole[]){
            context.roles = roles
        },
        [SET_EMPLOYIES](ctx, employies){
            ctx.employies = employies
        }

    },
    actions: {
        async [SET_POSITIONS](context){
            return await homeService.getPositions().then(positions => {
                context.commit(SET_POSITIONS, positions)
            })
        },
        [ADD_POSITION](context, postition: IPosition){
            context.commit(ADD_POSITION, postition)
        },
        [DELETE_POSITION](context,position){
            context.commit(DELETE_POSITION, position)
        },
        [SET_TEMP_POSITION](context, position: IPosition){
            context.commit(SET_TEMP_POSITION, position)
        },
        [SET_MODE](context, mode: string){
            context.commit(SET_MODE, mode)
        },
        [SELECT_GOVERMENT](context, goverment: IGoverment){
            context.commit(SELECT_GOVERMENT, goverment)
        },
        [ADD_GOVERMENT](context, goverment: IGoverment){
            context.commit(ADD_GOVERMENT, goverment)
        },
        [DELETE_GOVERMENT](context, govermentBin: number){
            context.commit(DELETE_GOVERMENT, govermentBin)
        },
        [SET_ROLES](context, roles: IRole[]){
            context.commit(SET_ROLES, roles)
        },
        [SET_EMPLOYIES](ctx, employies: IEmployee[]){
            ctx.commit(SET_EMPLOYIES, employies)
        }
    },
    getters: {
        GET_FILTERED_POSITIONS: (state) => (input: string) =>{
            return state.positions.filter(position => position.name.toLowerCase().includes(input.toLowerCase()))
        },
        GET_ATTACH_ITEMS: (state) => (input: string, type: string) =>{
            const items = type === 'roles' ? state.roles : state.employies
            if(!input) return items
            return items.filter(role => role.title.toLowerCase().includes(input.toLowerCase()))
        },
    }
}
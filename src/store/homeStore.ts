import { SET_USER_TYPE } from './mutation-types';
import { Module } from "vuex";
interface IState {
    selectedGovOrg: Object
}

export const treeStore: Module<IState, any> =  {
    state: {
        selectedGovOrg: {}
    },
    mutations: {
        [SET_USER_TYPE](context){
        }
    },
    actions: {
    }
}
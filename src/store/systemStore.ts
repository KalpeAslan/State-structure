import { SET_USER_TYPE } from './mutation-types';
import { Module } from "vuex";
interface IState {
    userType: string
}


const userTypes = [
    'admin',
    'dispatcher'
]
export const systemStore: Module<IState, any> =  {
    state: {
        userType: userTypes[1]
    },
    mutations: {
        [SET_USER_TYPE](context, userType: string){
            context.userType = userType
        }
    },
    getters:{
        GET_USER_TYPE(ctx){
            return ctx.userType
        }
    }
}
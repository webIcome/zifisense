/**
 * Created by spring on 2018/1/19.
 */
import HttpClient from '../../core/http-vue'
import MutationTypes from '../mutation-types'
import RestfulConstant from "../../constants/restful";
import LocalStorage from  '../local-storage';

export default {
    state: {
        get user(){
            let user = LocalStorage.getItem(MutationTypes.GET_USER);
            if (user) return JSON.parse(user);
        },
        set user(value){
            LocalStorage.setItem(MutationTypes.GET_USER, value);
        },
        get token() {
            return LocalStorage.getItem(MutationTypes.TOKEN);
        },
        set token(value) {
            LocalStorage.setItem(MutationTypes.TOKEN, value);
        }
    },
    getters: {
    },
    mutations: {
        [MutationTypes.GET_USER] (state, user) {
            state.user = JSON.stringify(user);
        },
        [MutationTypes.TOKEN] (state, token) {
            state.token = token;
        }
    },
    actions: {
        [MutationTypes.GET_USER] (context, access) {
            return HttpClient.post(RestfulConstant.LOGIN, access).then(res => {
                context.commit(MutationTypes.GET_USER, res.body.user);
                context.commit(MutationTypes.TOKEN, res.headers[MutationTypes.TOKEN]);
                return res.user;
            })
        }
    },

};
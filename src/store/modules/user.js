/**
 * Created by spring on 2018/1/19.
 */
import HttpClient from '../../core/http-client'
import MutationTypes from '../mutation-types'
import RestfulConstant from "../../constants/restful";
import LocalStorage from  '../local-storage';

export default {
    state: {
        user: {}
    },
    getters: {
    },
    mutations: {
        [MutationTypes.GET_USER] (state, user) {
            state.user = user;
            LocalStorage.setItem(MutationTypes.GET_USER, user);
        }
    },
    actions: {
        [MutationTypes.GET_USER] (context, access) {
            return HttpClient.post(RestfulConstant.LOGIN, access).then(res => {
                context.commit(MutationTypes.GET_USER, res.user);
                return res.user;
            })
        },
        [MutationTypes.GET_USER_LOCAL] () {
            return LocalStorage.getItem(MutationTypes.GET_USER);
        }
    },

};
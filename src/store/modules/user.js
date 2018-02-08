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
            let user =  LocalStorage.getItem(MutationTypes.GET_USER);
            if (!user) user = {};
            return user;
        },
        set user(value){
            LocalStorage.setItem(MutationTypes.GET_USER, value);
        },
        get token() {
            if (this.user) {
                return this.user[MutationTypes.TOKEN];
            }else {
                return null;
            }

        }
    },
    getters: {
    },
    mutations: {
        [MutationTypes.GET_USER] (state, user) {
            state.user = user;
        },
    },
    actions: {
        [MutationTypes.GET_USER] (context, access) {
            return HttpClient.post(RestfulConstant.LOGIN, access).then(res => {
                context.commit(MutationTypes.GET_USER, res.body.data);
                return res.body.data;
            })
        }
    },

};
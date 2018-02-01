/**
 * Created by spring on 2018/1/31.
 */
import LocalStorage from  '../store/local-storage';
import MutationTypes from '../store/mutation-types'
import Config from '../config';
import Vue from 'vue';
import VueResource from 'vue-resource';
Vue.use(VueResource);
Vue.http.interceptors.push(function (request, next) {
    window.vue.$loading();
    request.headers.set('x-token', LocalStorage.getItem(MutationTypes.TOKEN));
    next(function (response) {
        window.vue.$loading.end();
        if(response.status == 401) {
            window.vue.$router.push('/login');
            return;
        }
        return response
    })});
Vue.http.options = {
  root: Config.URL_API
};
export default Vue.http;
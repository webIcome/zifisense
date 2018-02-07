/**
 * Created by spring on 2018/1/31.
 */
import Config from '../config';
import Vue from 'vue';
import VueResource from 'vue-resource';
import store from '../store';
Vue.use(VueResource);
Vue.http.interceptors.push(function (request, next) {
    Vue.Loading();
    request.headers.set('access-token', store.state.UserModule.token);
    next(function (response) {
        Vue.Loading.end();
        if(response.status == 401) {
            window.vue.$router.push('/login');
            return;
        }
        if(response.data && response.data.code !='200') {

        }
        return response
    })});
Vue.http.options = {
  root: Config.URL_API
};
export default Vue.http;
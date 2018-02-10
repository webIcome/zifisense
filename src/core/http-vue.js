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
    let method = request.method;
    let url = request.url;
    if (store.state.UserModule.user.objectid) {
        request.headers.set('access_token', store.state.UserModule.token);
        request.headers.set('user_name', store.state.UserModule.user.loginname);
        request.headers.set('user_id', store.state.UserModule.user.objectid.toString());
        request.headers.set('company_id', store.state.UserModule.user.companyid.toString());
    }

    next(function (response) {
        Vue.Loading.end();
        if (response.body.code == 3 || response.body.code == 401 || response.body.code == 410) {
            setTimeout(function () {
                window.location.replace('/#login')
            })
            return ;

        }
        if (!(response.status == 200 || response.status == 304)) {
            Vue.Tips.fail(response.body.msg)
        } else if (method != 'GET' && url != 'accounts/login') {
            Vue.Tips.success(response.body.msg)
        }
        return response
    })
});
Vue.http.options = {
    root: Config.URL_API,
    emulateJSON: false
};
export default Vue.http;
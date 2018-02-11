/**
 * Created by spring on 2018/1/31.
 */
import Config from '../config';
import Vue from 'vue';
import VueResource from 'vue-resource';
import store from '../store';
import {Loading, Message} from 'element-ui'
Vue.use(VueResource);
Vue.http.interceptors.push(function (request, next) {
    let loading = Loading.service({fullscreen: true, body: true});
    if (store.state.UserModule.user.objectid) {
        request.headers.set('access_token', store.state.UserModule.token);
        request.headers.set('user_name', store.state.UserModule.user.loginname);
        request.headers.set('user_id', store.state.UserModule.user.objectid.toString());
        request.headers.set('company_id', store.state.UserModule.user.companyid.toString());
    }

    next(function (response) {
        loading.close();
        if (response.body.code == 3 || response.body.code == 401 || response.body.code == 410) {
            setTimeout(function () {
                window.location.replace('/login');
                // window.vue.$router.push('login')
            })
            return ;

        } else if (response.body.code == 10001 || response.body.code == 422){
            Message({
                message: '请求参数错误',
                type: 'warning',
                duration: 1000
            })
        } else if (response.body.code == 10002) {
            Message({
                message: response.body.msg,
                type: 'warning',
                duration: 1000
            })
        } else if (response.body.code == 20000) {
            Message({
                message: '系统内部错误',
                type: 'warning',
                duration: 1000
            })
        } else if(response.body.code == 0) {
            Message({
                message: '操作成功',
                type: 'success',
                duration: 1500
            })
        }
        if (!(response.status == 200 || response.status == 304)) {
            Message({
                message: '服务器网络问题，请联系管理员',
                type: 'warning',
                duration: 2000
            })
        }
        return response
    })
});
Vue.http.options = {
    root: Config.URL_API,
    emulateJSON: false
};
export default Vue.http;
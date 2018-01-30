/**
 * Created by spring on 2018/1/30.
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './app';
import router from './router';
import 'bootstrap/dist/css/bootstrap.css';
import '../../styles/index.less';
import './index.less';
import store from '../../store';
Vue.config.productionTip = false;

import components from '../../components';
import pipes from '../../pipes';

initComponent(components);
initPipe(pipes);
function initComponent(components) {
    Object.keys(components).forEach(key => {
        Vue.component(key, components[key])
    })
}
function initPipe(pipes) {
    Object.keys(pipes).forEach(key => {
        Vue.filter(key, pipes[key]);
    })
}

let vue = new Vue({
    el: '#app',
    store,
    router,
    template: '<App/>',
    components: {App},

});
window.vue = vue;

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './app';
import router from './router';
import 'bootstrap/dist/css/bootstrap.css';

import '../../styles/index.less';
import 'jquery';
import store from '../../store';
Vue.config.productionTip = false;

import Plugins from '../../plugins';
import HttpClient from '../../core/http-vue';
import Config from "../../config";

HttpClient.options.root = Config.URL_API;

initPlugins(Plugins);


function initPlugins(plugins) {
    plugins.forEach(plugin => {
        Vue.use(plugin);
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

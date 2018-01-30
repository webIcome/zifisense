/**
 * Created by spring on 2018/1/30.
 */
import Vue from 'vue'
import Router from 'vue-router'
import homePage from '../view/index-page.vue';
import lampControlPage from '../view/lamp-control-page.vue';
import searchLampControlPage from '../view/search-lamp-control-page.vue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/', name: 'lamp', component: homePage,
            children: [
                {path: 'device/lamp', component: lampControlPage},
                {path: 'device/lamp/search', component: searchLampControlPage},
            ]
        },
    ]
})

/**
 * Created by spring on 2018/1/30.
 */
import Vue from 'vue'
import Router from 'vue-router'
import homePage from '../view/index-page.vue';
import lampControlPage from '../view/lamp-control-page.vue';
import loopControlPage from '../view/loop-control-page.vue';
import panelControlPage from '../view/panel-control-page.vue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/', name: 'index', component: homePage,
            children: [
                {path: 'device/lamp', name: 'lamp', component: lampControlPage},
                {path: 'device/loop', name: 'loop', component: loopControlPage},
                {path: 'device/panel', name: 'panel', component: panelControlPage},
            ]
        },
    ]
})

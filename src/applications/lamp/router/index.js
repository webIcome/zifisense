/**
 * Created by spring on 2018/1/30.
 */
import Vue from 'vue'
import Router from 'vue-router'
import homePage from '../view/index-page.vue';
import lampControlPage from '../view/lamp-control-page.vue';
import detailLampControlPage from '../view/detail-lamp-control-page.vue';
import loopControlPage from '../view/loop-control-page.vue';
import detailLoopControlPage from '../view/detail-loop-control-page.vue';
import panelControlPage from '../view/panel-control-page.vue';
import detailPanelControlPage from '../view/detail-panel-control-page.vue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/', name: 'index', component: homePage,
            children: [
                {path: 'device/lamp', name: 'lamp', component: lampControlPage},
                {path: 'device/lamp/:id/detail', name: 'lamp/detail', component: detailLampControlPage},
                {path: 'device/loop', name: 'loop', component: loopControlPage},
                {path: 'device/loop/:id/detail', name: 'loop/detail', component: detailLoopControlPage},
                {path: 'device/panel', name: 'panel', component: panelControlPage},
                {path: 'device/panel/:id/detail', name: 'panel/detail', component: detailPanelControlPage},
            ]
        },
    ]
})

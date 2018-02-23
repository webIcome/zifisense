/**
 * Created by spring on 2018/1/30.
 */
import Vue from 'vue'
import Router from 'vue-router'
import homePage from '../view/index-page.vue';
import lampControlPage from '../view/lamp-control-page.vue';
import loopControlPage from '../view/loop-control-page.vue';
import panelControlPage from '../view/panel-control-page.vue';
import controlSingleLampPage from '../view/control-single-lamp-page.vue';
import controlSingleLoopPage from '../view/control-single-loop-page.vue'
import controlSinglePanelPage from '../view/control-single-panel-page.vue'
import controlGroupPage from '../view/control-group-page.vue'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/', name: 'index', component: homePage,
            children: [
                {path: 'device/lamp', name: 'lamp', component: lampControlPage},
                {path: 'device/loop', name: 'loop', component: loopControlPage},
                {path: 'device/panel', name: 'panel', component: panelControlPage},
                {path: 'control/single/lamp', name: 'single/lamp', component: controlSingleLampPage},
                {path: 'control/single/loop', name: 'single/loop', component: controlSingleLoopPage},
                {path: 'control/single/panel', name: 'single/panel', component: controlSinglePanelPage},
                {path: 'control/group', name: 'gtroup', component: controlGroupPage},
            ]
        },
    ]
})

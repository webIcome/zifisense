import Vue from 'vue'
import Router from 'vue-router'
import loginPage from '../view/login-page';
import homePage from '../view/home-page';
const systemManagementPage =  () => import(/* webpackChunkName: "group-sys" */'../view/system-management-page');
const userManagementPage =  () => import(/* webpackChunkName: "group-sys" */'../view/user-management-page');
const logManagementPage =  () => import(/* webpackChunkName: "group-sys" */'../view/log-management-page');
const organizeManagementPage =  () => import(/* webpackChunkName: "group-sys" */'../view/organize-management-page');

Vue.use(Router);

export default new Router({
    // mode:'history',
    routes: [
        {path: '/login', name: 'login', component: loginPage},
        {path: '/', name: 'home', component: homePage, alias: ['/index', '/home']},
        {path: '/sys', name: 'systemManagement', component: systemManagementPage,
        children: [
            {path: 'user',name: 'user', component: userManagementPage},
            {path: 'organize', component: organizeManagementPage},
            {path: 'log', component: logManagementPage},
        ]},
    ]
})

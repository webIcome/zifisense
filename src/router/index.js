import Vue from 'vue'
import Router from 'vue-router'
import loginPage from '../view/login-page';
import homePage from '../view/home-page';
import systemManagementPage from '../view/system-management-page';
import userManagementPage from '../view/user-management-page';
import logManagementPage from '../view/log-management-page';

Vue.use(Router)

export default new Router({
    // mode:'history',
    routes: [
        {path: '/login', name: 'login', component: loginPage},
        {path: '/', name: 'home', component: homePage, alias: ['/index', '/home']},
        {path: '/management', name: 'systemManagement', component: systemManagementPage,
        children: [
            {path: 'user', component: userManagementPage},
            // {path: 'organization', component: ''},
            {path: 'log', component: logManagementPage},
        ]},
    ]
})

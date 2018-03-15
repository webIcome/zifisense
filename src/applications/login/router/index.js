import Vue from 'vue'
import Router from 'vue-router'
import loginPage from '../view/login-page';

Vue.use(Router);

export default new Router({
    routes: [
        {path: '/', name: 'login', component: loginPage},
    ]
})

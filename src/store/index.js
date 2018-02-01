/**
 * Created by spring on 2018/1/19.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import UserModule from './modules/user';
import actions from './actions';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    actions,
    modules: {
        UserModule,
    },
    strict: debug,
    // plugins: debug ? [createLogger()] : []
})
/**
 * Created by spring on 2018/2/2.
 */
import FailRequest from './fail-request.vue'

export default {

    install(Vue, pluginOptions = {}) {
        const VueFailRequest = Vue.extend(FailRequest)

        function $requestFail() {

        }
        Vue.requestFail = Vue.prototype.$requestFail = $requestFail
    },
}
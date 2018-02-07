/**
 * Created by spring on 2018/2/2.
 */
import FailRequest from './tips.vue'

export default {

    install(Vue, pluginOptions = {}) {
        const VueFailRequest = Vue.extend(FailRequest)
        let request = null;
        function common() {
            if (!request) {
                request = new VueFailRequest()
                request.$mount()
                // 挂载
                document.querySelector(pluginOptions.container || 'body').appendChild(request.$el)
            }
        }

        let $tips = {
            show: function (msg) {
                return new Promise(function (resolve) {
                    common()
                    if (!request.isShow) {
                        request.show(msg)
                    }
                    resolve()
                })
            },
            fail: function (msg) {
                return new Promise(function (resolve) {
                    common()
                    if (!request.isShow) {
                        request.fail(msg)
                    }
                    resolve()
                })
            },
            success: function (msg) {
                return new Promise(function (resolve) {
                    common()
                    if (!request.isShow) {
                        request.success(msg)
                    }
                    resolve()
                })
            },
            hide: function () {
                return new Promise(function (resolve) {
                    if (!request || !request.isShow) {
                        resolve()
                        return
                    }
                    request.hide()
                })
            }
        };

        Vue.Tips = Vue.prototype.$tips = $tips
    },
}
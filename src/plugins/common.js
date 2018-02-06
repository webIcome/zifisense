/**
 * Created by spring on 2018/2/6.
 */
class common {
    static copyObj(obj) {
        let newobj = {};
        for ( let attr in obj) {
            newobj[attr] = obj[attr];
        }
        return newobj;
    }
}
export default {
    install(Vue, pluginOptions = {}) {
        let $common = common;
        Vue.Common = Vue.prototype.$common = $common
    }
}
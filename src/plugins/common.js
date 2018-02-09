/**
 * Created by spring on 2018/2/6.
 */
import moment from 'moment';
class common {
    static copyObj(obj) {
        let newobj = {};
        for (let attr in obj) {
            newobj[attr] = obj[attr];
        }
        return newobj;
    }

    static clearObjValue(obj) {
        if (!obj) return;
        Object.keys(obj).forEach(key => {
            obj[key] = '';
        })
    }

    static getFormDate(date, pattern) {
        if (!pattern) pattern = 'YYYY-MM-DD HH:mm:ss';
        return moment(date).format(pattern);
    }

    static vmSet(orginObj, targetObj) {
        Object.keys(orginObj).forEach(key => {
            this.$set(targetObj, key, orginObj[key]);
        })
    }
}
export default {
    install(Vue, pluginOptions = {}) {
        let $common = common;
        Vue.Common = Vue.prototype.$common = $common
    }
}
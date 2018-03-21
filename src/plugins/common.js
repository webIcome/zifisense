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

    static getUnixDate(date, pattern) {
        if (!pattern) pattern = 'HH:mm:ss';
        return moment(Number(date)).format(pattern);
    }

    static vmSet(orginObj, targetObj) {
        Object.keys(orginObj).forEach(key => {
            this.$set(targetObj, key, orginObj[key]);
        })
    }

    static debounce(func, wait, immediate) {
        let timeout;
        return function(){
            let context = this,
                args = arguments;
            let later = function() {
                timeout = null;
                if (!immediate) func.apply(context,args)
            };
            let callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        }

    }
    static colorRgb(color) {
        let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
        color = color.toLowerCase();
        if (color && reg.test(color)) {
            if (color.length == 4) {
                let colorNew = "#";
                for (let i=1; i<4; i++) {
                    colorNew += color.slice(i,i+1).concat(color.slice(i,i+i));
                }
                color = colorNew;
            }
            let colorChange = [];
            for(let i=1; i<7; i+=2) {
                colorChange.push(parseInt('0x'+color.slice(i,i+2)));
            }
            return colorChange.join(',');
        } else {
            return color;
        }
    }
}
export default {
    install(Vue, pluginOptions = {}) {
        let $common = common;
        Vue.Common = Vue.prototype.$common = $common
    }
}
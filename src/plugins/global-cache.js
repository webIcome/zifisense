/**
 * Created by spring on 2018/2/2.
 */
import HttpClient from '../core/http-vue';
import RestfulConstant from '../constants/restful';
class GlobalCache {
    constructor(){
        this._companies;
        this._apps;
        this._sysMenus;
        this._managementMenus;
    }
    get companies() {
        if (!this._companies) {
            /*this._companies = HttpClient.post(RestfulConstant.COMPANY + '/' + RestfulConstant.GET_TREE_INFO).then(res => {
                return res.data.companies;
            })*/
            this._companies = new Promise(function (resolve) {
                resolve([{
                    name: '厦门纵行科技',
                    children: [{
                        name: '厦门纵行科技1',
                        children: [{name: '厦门纵行科技2', children: []}, {
                            name: '厦门纵行科技',
                            children: []
                        }]
                    }, {name: '厦门纵行科技3', children: []}]
                },{name: '厦门纵行科技3', children: []}])
            })
        }
        return this._companies;
    }
    get apps() {
        if (!this._apps) {
            this._apps = HttpClient.get('permission/getAppList').then(res => {
                return res.data.list;
            })
        }
        return this._apps;
    }
    get sysMenus() {
        if (!this._sysMenus) {
            /*this._sysMenus = HttpClient.get('permission/getModuleListByLoginname').then(res => {
                return res.data.list;
            })*/
            this._sysMenus = new Promise(function (resolve) {
                resolve([{modulename: '用户管理', modulecode: 'code1'}, {modulename: '组织管理', modulecode: 'code2'}, {modulename: '操作日志', modulecode: 'code3'}])
            })
        }
        return this._sysMenus;
    }
    get managementMenus() {
        if (!this._managementMenus) {
           /* this._managementMenus = HttpClient.get('permission/getModuleListByPostid').then(res => {
                return res.data.list;
            })*/
            this._managementMenus = new Promise(function (resolve) {
                resolve([
                    {
                        name: '设备管理',
                        children: [
                            {name: '灯控器', url: '/device/lamp'},
                            {name: '回路控制器', url: '/device'},
                            {name: '控制面板', url: '/device/panel'},
                        ]
                    },
                    {
                        name: '控制管理',
                        children: [
                            {name: '灯控器', url: '/management/device'},
                            {name: '回路控制器', url: '/management/device'}
                        ]
                    },
                ])
            })
        }
        return this._managementMenus;
    }
}

export default {
    install(Vue, pluginOptions = {}) {
        let $globalCache = new GlobalCache();
        Vue.GlobalCache = Vue.prototype.$globalCache = $globalCache
    }
}
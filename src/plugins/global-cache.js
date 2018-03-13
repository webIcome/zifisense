/**
 * Created by spring on 2018/2/2.
 */
import HttpClient from '../core/http-vue';
import RestfulConstant from '../constants/restful';
import Config from "../config";
class GlobalCache {
    constructor() {
        this._companies;
        this._apps;
        this._sysMenus;
        this._managementMenus;
    }

    get companies() {
        if (!this._companies) {
            this._companies = HttpClient.get(RestfulConstant.COMPANY + '/' + RestfulConstant.GET_TREE_INFO, {root: Config.URL_API}).then(res => {
                if (!res.body.data) {
                    this._companies = null;
                } else {
                    return res.body.data.companies;
                }
            })
            /* this._companies = new Promise(function (resolve) {
             resolve([{
             name: '厦门纵行科技',
             id: 1,
             children: [{
             id: 2,
             name: '厦门纵行科技1',
             children: [{name: '厦门纵行科技2', id: 4, children: []}, {
             name: '厦门纵行科技',id:5,
             children: []
             }]
             }, {name: '厦门纵行科技3',id: 6, children: []}]
             },{name: '厦门纵行科技3',id:7, children: []}])
             })*/
        }
        return this._companies;
    }

    refleshCompanies() {
        this._companies = null;
        return this.companies;
    }

    getMenus(appid) {
        return HttpClient.post('permission/getModuleListByUserid', {appid: appid}, { root: Config.URL_API}).then(res => {
            if (!res.body.data) {
                return [];
            } else {
                return res.body.data.list;
            }
        })
    }

    get apps() {
        if (!this._apps) {
            this._apps = HttpClient.get('permission/getAppList').then(res => {
                if (!res.body.data) {
                    this._apps = null;
                } else {
                    return res.body.data.result;
                }
            })
            /*this._apps = new Promise(function (resolve) {
             resolve([
             {appname: '路灯', appcode: 'code1'},
             {appname: '建筑大脑-智慧照明', appcode: 'code2'},
             {appname: 'JLL-智慧物业', appcode: 'code3'},
             ])
             })*/
        }
        return this._apps;
    }

    get sysMenus() {
        if (!this._sysMenus) {
            this._sysMenus = HttpClient.post('permission/getModuleListByUserid').then(res => {
                if (!res.body.data) {
                    this._sysMenus = null;
                } else {
                    return res.body.data.list;
                }
            })
            /*this._sysMenus = new Promise(function (resolve) {
             resolve([{modulename: '用户管理', modulecode: 'code1'}, {modulename: '组织管理', modulecode: 'code2'}, {modulename: '操作日志', modulecode: 'code3'}])
             })*/
        }
        return this._sysMenus;
    }

    get managementMenus() {
        if (!this._managementMenus) {
            /* this._managementMenus = HttpClient.get('permission/getModuleListByPostid').then(res => {
             return res.body.data.list;
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
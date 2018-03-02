/**
 * Created by spring on 2018/3/1.
 */
import HttpClient from '../../core/http-vue';
import Config from "../../config";
export default {
    //灯控
    findLightList(params) {
        return HttpClient.get('lightController/getList', {params: params}).then(res => {
            return res.body.data
        })
    },
    getLight(id) {
        return HttpClient.post('lightController/getDetailsBySn', {sn: id}).then(res => {
            let data = res.body.data;
            if (!data) data = {};
            return data
        })
    },
    deleteLight(id) {
        return HttpClient.post('lightController/delete', {sn: id}).then(res => {
            return res;
        });
    },
    editLight(body) {
        return HttpClient.post('lightController/edit', body).then(res => {
            return res
        });
    },
    addLight(body) {
        return HttpClient.post('lightController/add', body).then(res => {
            return res
        });
    },
    //loop
    findLoopList(params) {
        return HttpClient.get('loopController/getList', {params: params}).then(res => {
            return res.body.data
        })
    },
    getLoop(id) {
        return HttpClient.post('loopController/getDetailsBySn', {sn: id}).then(res => {
            let data = res.body.data;
            if (!data) data = {};
            return data
        })
    },
    deleteLoop(id) {
        return HttpClient.post('loopController/delete', {sn: id}).then(res => {
            return res;
        });
    },
    editLoop(body) {
        return HttpClient.post('loopController/edit', body).then(res => {
            return res
        });
    },
    addLoop(body) {
        return HttpClient.post('loopController/add', body).then(res => {
            return res
        });
    },
    //panel
    findPanelList(params) {
        return HttpClient.get('controlPanel/getList', {params: params}).then(res => {
            return res.body.data
        })
    },
    getPanel(id) {
        return HttpClient.post('controlPanel/getDetailsBySn', {sn: id}).then(res => {
            let data = res.body.data;
            if (!data) data = {};
            return data
        })
    },
    deletePanel(id) {
        return HttpClient.post('controlPanel/delete', {sn: id}).then(res => {
            return res;
        });
    },
    editPanel(body) {
        return HttpClient.post('controlPanel/edit', body).then(res => {
            return res
        });
    },
    addPanel(body) {
        return HttpClient.post('controlPanel/add', body).then(res => {
            return res
        });
    },
    //灯具
    findLampsList(params) {
        return HttpClient.get('lamps/getList', {params: params}).then(res => {
            return res.body.data
        })
    },
    getLamps(id) {
        return HttpClient.post('lamps/getDetailsBySn', {objectid: id}).then(res => {
            let data = res.body.data;
            if (!data) data = {};
            return data
        })
    },
    deleteLamps(id) {
        return HttpClient.post('lamps/delete', {objectid: id}).then(res => {
            return res;
        });
    },
    editLamps(body) {
        return HttpClient.post('lamps/edit', body).then(res => {
            return res
        });
    },
    addLamps(body) {
        return HttpClient.post('lamps/add', body).then(res => {
            return res
        });
    },
    //group
    findGroupList(params) {
        return HttpClient.get('lightController/getList', {params: params}).then(res => {
            return res.body.data
        })
    },
    //area
    findAreaList(params) {
        return HttpClient.get('lightController/getList', {params: params}).then(res => {
            return res.body.data
        })
    },
    //company
    findCompanyList(params) {
        return HttpClient.get('companies/getList', {params: params, root: Config.URL_API}).then(res => {
            return res.body.data
        })
    },
    //energy
    findChartData(params) {
        return HttpClient.get('', {params: params}).then(res => {
            return res.body.data;
        })
    }
}
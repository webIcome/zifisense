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
    controlLightSingle(body) {
        return HttpClient.post('lightController/singleControl', body).then(res => {
            return res;
        })
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
    controlLoopSingle(body) {
        return HttpClient.post('loopController/singleControl', body).then(res => {
            return res;
        })
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
    controlPanelSingle(body) {
        return HttpClient.post('controlPanel/singleControl', body).then(res => {
            return res;
        })
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
        return HttpClient.get('groupInfo/getList', {params: params}).then(res => {
            return res.body.data
        })
    },
    deleteGroup(id) {
        return HttpClient.post('groupInfo/delete', {objectid: id}).then(res => {
            return res;
        });
    },
    editGroup(body) {
        return HttpClient.post('groupInfo/edit', body).then(res => {
            return res
        });
    },
    addGroup(body) {
        return HttpClient.post('groupInfo/add', body).then(res => {
            return res
        });
    },
    controlPanelGroup(body) {
        return HttpClient.post('controlPanel/groupControl', body).then(res => {
            return res;
        })
    },
    controlLoopGroup(body) {
        return HttpClient.post('loopController/groupControl', body).then(res => {
            return res;
        })
    },
    controlLightGroup(body) {
        return HttpClient.post('lightController/groupControl', body).then(res => {
            return res;
        })
    },
    runStrategyGroup(body) {
        return HttpClient.post('groupControl/sendStrategy', body).then(res => {
            return res;
        })
    },
    stopStrategyGroup(body) {
        return HttpClient.post('groupControl/recallStrategy', body).then(res => {
            return res;
        })
    },
    getSelectedDevicesGroupList(params) {
        return HttpClient.get('groupInfo/getDeviceGroupedList', {params: params}).then(res => {
            return res.body.data;
        })
    },
    findDevicesGroupList(params) {
        return HttpClient.get('groupInfo/getDeviceNoGroupedList', {params: params}).then(res => {
            return res.body.data
        })
    },
    //area
    findAreaList(params) {
        return HttpClient.get('areaInfo/getList', {params: params}).then(res => {
            return res.body.data
        })
    },
    deleteArea(id) {
        return HttpClient.post('areaInfo/delete', {objectid: id}).then(res => {
            return res;
        });
    },
    editArea(body) {
        return HttpClient.post('areaInfo/edit', body).then(res => {
            return res
        });
    },
    addArea(body) {
        return HttpClient.post('areaInfo/add', body).then(res => {
            return res
        });
    },
    controlPanelArea(body) {
        return HttpClient.post('controlPanel/areaControl', body).then(res => {
            return res;
        })
    },
    controlLoopArea(body) {
        return HttpClient.post('loopController/areaControl', body).then(res => {
            return res;
        })
    },
    controlLightArea(body) {
        return HttpClient.post('lightController/areaControl', body).then(res => {
            return res;
        })
    },
    runStrategyArea(body) {
        return HttpClient.post('areaControl/sendStrategy', body).then(res => {
            return res;
        })
    },
    stopStrategyArea(body) {
        return HttpClient.post('areaControl/recallStrategy', body).then(res => {
            return res;
        })
    },
    getSelectedDevicesAreaList(params) {
        return HttpClient.get('areaInfo/getGroupDevicedList', {params: params}).then(res => {
            return res.body.data.list;
        })
    },
    findDevicesAreaList(params) {
        return HttpClient.get('areaInfo/getGroupNoDevicedList', {params: params}).then(res => {
            return res.body.data;
        })
    },
    //strategy
    findStrategy(params) {
        return HttpClient.get('strategy/getList', {params: params}).then(res => {
            return res.body.data;
        })
    },
    addLightStrategy(body) {
        return HttpClient.post('strategy/addLight', body).then(res => {
            return res;
        })
    },
    addLoopStrategy(body) {
        return HttpClient.post('strategy/addLoopController', body).then(res => {
            return res;
        })
    },
    editLightStrategy(body) {
        return HttpClient.post('strategy/editLight', body).then(res => {
            return res;
        })
    },
    editLoopStrategy(body) {
        return HttpClient.post('strategy/editLoopController', body).then(res => {
            return res;
        })
    },
    deleteStrategy(id) {
        return HttpClient.post('strategy/delete', {objectid: id}).then(res => {
            return res;
        })
    },
    getStrategyDetail(id) {
        return HttpClient.post('strategy/getDetailsBySn', {objectid: id}).then(res => {
            return res.body.data;
        })
    },
    //scenario
    findScenario(params) {
        return HttpClient.get('scenario/getList', {params: params}).then(res => {
            return res.body.data;
        })
    },
    addScenario(body) {
        return HttpClient.post('scenario/addControlPanel', body).then(res => {
            return res;
        })
    },
    editScenario(body) {
        return HttpClient.post('scenario/editControlPanel', body).then(res => {
            return res;
        })
    },
    deleteScenario(id) {
        return HttpClient.post('scenario/delete', {objectid: id}).then(res => {
            return res;
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
        return HttpClient.get('consumption/getChartResult', {params: params}).then(res => {
            return res.body.data;
        })
    },
    findExcelData(params) {
        return HttpClient.get('consumption/getListResult', {params: params}).then(res => {
            return res.body.data;
        })
    },
    findDevicesListForEnergy(params) {
        return HttpClient.get('consumption/getDeviceListByModuleType', {params: params}).then(res => {
            return res.body.data;
        })
    },
    findCompaniesListForEnergy(params) {
        return HttpClient.get('company/getCompanyList', {params: params, root: Config.URL_API}).then(res => {
            return res.body.data;
        })
    },
    findGroupsListForEnergy(params) {
        return HttpClient.get('consumption/getGroupListByModuleType', {params: params}).then(res => {
            return res.body.data;
        })
    },
    findAreasListForEnergy(params) {
        return HttpClient.get('consumption/getAreaListByModuleType', {params: params}).then(res => {
            return res.body.data;
        })
    },
    getExcel(params) {
        return HttpClient.get('consumption/getExcelList', {params: params}).then(res => {
            return res;
        })
    }
}
<template>
  <div v-if="currentPage == pages.home" class="content-right">
    <div class="clearfix">
      <div class="search pull-left">
        <form class="form-inline default-form">
          <div class="form-group">
            <label class="sr-only">设备名称：</label>
            <el-input type="text" v-model="searchParams.devicename" placeholder="输入设备名称"></el-input>
          </div>
          <div class="form-group">
            <label class="sr-only">设备ID：</label>
            <el-input type="text" v-model="searchParams.sn" placeholder="输入设备ID"/>
          </div>
          <div class="form-group">
            <label class="sr-only">归属企业：</label>
            <tree-select-component v-model="searchParams.companyid" :list="companies"></tree-select-component>
          </div>
          <div class="form-group">
            <label class="sr-only">选择开关状态：</label>
            <el-select v-model="searchParams.switchstate" placeholder="选择开关状态" clearable >
              <el-option v-for="status in switchStatus" :key="status.value" :value="status.value" :label="status.text"></el-option>
            </el-select>
          </div>
          <div class="form-group">
            <label class="sr-only">灯控器类型：</label>
            <el-select v-model="searchParams.lightcontrollerType" placeholder="选择灯控器类型" clearable >
              <el-option v-for="status in lightControllerType" :key="status.value" :value="status.value" :label="status.text"></el-option>
            </el-select>
          </div>
          <div class="form-group">
            <label class="sr-only">传感器类型：</label>
            <el-select v-model="searchParams.sensortype" placeholder="选择传感器类型" clearable >
              <el-option v-for="status in sensorType" :key="status.value" :value="status.value" :label="status.text"></el-option>
            </el-select>
          </div>
          <div @click="search" class="form-group default-btn"><span class="quick-search-icon default-icon"></span>快速筛选</div>
          <div class="pull-right">
            <div @click="dialogHighSearch" class="default-btn"><span class="search-icon default-icon"></span>高级搜索</div>
          </div>
        </form>
      </div>

    </div>
    <div class="my-table center">
      <table class="table table-hover table-striped">
        <thead>
        <th>设备名称</th>
        <th>设备ID</th>
        <th>地理位置</th>
        <th>开关状态</th>
        <th>亮度值</th>
        <th>有功电能</th>
        <th>操作</th>
        </thead>
        <tbody>
        <tr v-for="item in list">
          <td>{{item.devicename}}</td>
          <td>{{item.sn}}</td>
          <td>{{item.position}}</td>
          <td>{{item.switchstate | switchStateNameConverter}}</td>
          <td>{{item.brightness}}</td>
          <td>{{item.activepower}}</td>
          <td class="td-btns">
            <control-light-dialog-component :device="item"></control-light-dialog-component>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <paging-component v-if="searchParams.pages" :pageNumber="searchParams.pageNum" :pages="searchParams.pages"
                      @pagingEvent='pagingEvent'></paging-component>

  </div>

  <search-light-control-component v-else-if="currentPage == pages.search" @search="highSearch" @back="goBack" :companies="companies"></search-light-control-component>

</template>

<script>
    import RestfulConstant from "../../../constants/restful";
    import Config from "../../../config";
    import Services from "../services";
    import CommonConstant from "../../../constants/common";
    import controlLightDialogComponent from './control-light-dialog-component.vue';
    import searchLightControlComponent from './search-light-control-component.vue';
    export default {
        name: 'controlSingleLampPage',
        components: {controlLightDialogComponent,searchLightControlComponent},
        data() {
            return {
                Rules: {
                    controltype: [
                        {required: true, message: '请选择指令'}
                    ],
                    strategyid: [
                        {required: true, message: '请选择策略', trigger: 'change'}
                    ],
                    rgb: [
                        {required: true, message: '请选择颜色',trigger: 'change'}
                    ],
                },
                searchParams: {
                    devicename: '',
                    sn: '',
                    companyid: '',
                    switchstate: '',
                    lightcontrollerType: '',
                    sensortype: ''
                },
                operData: {
                    objectid: '',
                    brightness: '',
                    strategyid: ''
                },
                groups: [{name: '分组1'}, {name: '分组2'}],
                isSearchPage: false,
                list: [{}],
                companies: [],
                lightControllerType: [],
                switchStatus: [],
                sensorType: [],
                runningStatus: [],
                defaultPaging: {
                    pageSize: Config.DEFAULT_PAGE_SIZE,
                    pageNum: 1
                },
                controlPages: {
                    switchState: 'switchstate',
                    brightness: 'brightness',
                    getState: 'getState',
                    rgb: 'rgb',
                    temperature: 'temperature'
                },
                currentControlPage: '',
                showSelectedStrategyName: '',
                pages: {
                    home: 1,
                    search: 2,
                    detail: 3
                },
                currentPage: 1,
                deviceView: {}
            }
        },
        created: function () {
            this.initData()
        },
        methods: {
            initData: function () {
                this.initLamp();
                this.initCompanies();
                this.initOperData();
                this.initCommonConstants();
//                this.currentControlPage = this.controlPages.switchState;
            },
            initCommonConstants: function () {
                this.runningStatus = CommonConstant.runningStatus;
                this.switchStatus = CommonConstant.switchState;
                this.lightControllerType = CommonConstant.lightControllerType;
                this.sensorType = CommonConstant.sensorType;
            },
            initLamp: function () {
                this.findList(this.defaultPaging)
            },
            initCompanies: function () {
                this.$globalCache.companies.then(companies => {
                    this.companies = companies;
                })
            },
            initOperData: function () {
                this.operData = {}
            },
            pagingEvent: function (pageNumber) {
                this.searchParams.pageNum = pageNumber;
                this.findList(this.searchParams);
            },
            findList: function (params) {
                Services.findLightList(params).then(data => {
                    this.searchParams.pageNum = data.pageNum;
                    this.searchParams.pages = data.pages;
                    this.searchParams.pageSize = data.pageSize;
                    this.list = data.list;
                });
            },
            dialogHighSearch: function () {
                this.showPage(this.pages.search)
            },
            search: function () {
                this.findList(Object.assign(this.searchParams, this.defaultPaging));
            },
            highSearch: function (searchParams) {
                this.findList(Object.assign(searchParams, this.defaultPaging));
                this.goBack();
            },
            goBack: function () {
                this.showPage(this.pages.home)
            },
            showPage:function (page) {
                this.currentPage = page;
            },
            resetData: function () {
                this.operData = {
                    objectid: '',
                    brightness: '',
                    strategyid: ''
                };
            }

        }
    }
</script>

<style scoped lang="less">

</style>

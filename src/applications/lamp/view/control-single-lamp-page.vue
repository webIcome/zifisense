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
            <div class="icon-item"><span data-toggle="modal" data-target="#set-device" @click="dialogControlDevice(item)" class="set-icon"></span></div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <paging-component v-if="searchParams.pages" :pageNumber="searchParams.pageNum" :pages="searchParams.pages"
                      @pagingEvent='pagingEvent'></paging-component>

    <el-dialog title="控制灯控器" :visible.sync="controlDeviceDialogVisible" center :width="'650px'">
      <el-form label-width="120px" :model="operData"  ref="controlDevice" :rules="Rules" class="el-form-default">
        <!--<el-form-item label="指令选择：" prop="currentControlPage">
          <el-radio v-model="currentControlPage" :label='controlPages.switchState'>开关</el-radio>
          <el-radio v-model="currentControlPage" :label="controlPages.brightness">亮度</el-radio>
          <el-radio v-model="currentControlPage" :label="controlPages.getState">状态读取</el-radio>
          <el-radio v-model="currentControlPage" :label="controlPages.temperature">色温</el-radio>
          <el-radio v-model="currentControlPage" :label="controlPages.rgb">RGB</el-radio>
        </el-form-item>
        <el-form-item v-show="currentControlPage == controlPages.switchState" label="开关：" prop="switchstate">
          <el-radio v-model="operData.switchstate" label="1">开</el-radio>
          <el-radio v-model="operData.switchstate" label="2">关</el-radio>
        </el-form-item>
        <el-form-item  v-show="currentControlPage == controlPages.brightness" label="亮度：" prop="brightness">
          <el-slider
              v-model="operData.brightness"
              show-input>
          </el-slider>
        </el-form-item>
        <el-form-item v-show="currentControlPage == controlPages.getState" label="" prop="switchstate">
          <el-checkbox v-model="operData.getState" label="状态读取"></el-checkbox>
        </el-form-item>
        <el-form-item  v-show="currentControlPage == controlPages.temperature" label="色温：" prop="temperature">
          <el-slider
              v-model="operData.temperature"
              show-input>
          </el-slider>
        </el-form-item>
        <el-form-item  v-show="currentControlPage == controlPages.rgb" label="RGB：" prop="color">
          <el-input type="color" v-model="operData.rgb"/>
        </el-form-item>
        <el-form-item label="策略：" prop="StrategyID">
          <select-strategy-component v-model="operData.strategyid" :strategyName="operData.strategyname" @name="name=operData.strategyname = name"></select-strategy-component>
        </el-form-item>-->
        <el-form-item label="指令选择：" prop="controltype">
          <div>
            <el-radio v-model="operData.controltype" label=1>开灯</el-radio>
          </div>
          <div>
            <el-radio v-model="operData.controltype" label=2>关灯</el-radio>
          </div>
          <div style="position: relative">
            <el-radio v-model="operData.controltype" label=3>调节亮度</el-radio>
            <div v-if="operData.controltype == 3" style="position: absolute; width: 300px; right: 0; top: 5px">
              <el-slider  v-model="operData.brightness" show-input></el-slider>
            </div>
          </div>
          <div>
            <el-radio v-model="operData.controltype" label=4>状态读取</el-radio>
          </div>
          <div style="position: relative">
            <el-radio v-model="operData.controltype" label=5>下发策略</el-radio>
            <div v-if="operData.controltype == 5" style="position: absolute; width: 300px; right: 0; top: 5px">
              <select-strategy-component v-model="operData.strategyid" :strategyName="operData.strategyname" @name="name=operData.strategyname = name"></select-strategy-component>
            </div>
          </div>
          <div style="position: relative">
            <el-radio v-model="operData.controltype" label=6>色温</el-radio>
            <div v-if="operData.controltype == 6" style="position: absolute; width: 300px; right: 0; top: 5px">
              <el-slider v-model="operData.temperature" show-input>
              </el-slider>
            </div>
          </div>
          <div style="position: relative">
            <el-radio v-model="operData.controltype" label=7>RGB</el-radio>
            <div v-if="operData.controltype == 7" style="position: absolute; width: 300px; right: 0; top: 5px">
              <el-input type="color" v-model="operData.rgb"/>
            </div>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="controlDevice('controlDevice')">确 定</el-button>
      </span>
    </el-dialog>

  </div>

  <div v-else-if="currentPage == pages.search" class="content-right">
    <div class="page-title">灯控器高级搜索</div>
    <form class="form-horizontal default-form">
      <div class="form-group">
        <label class="col-md-3 control-label">设备名称：</label>
        <div class="col-md-3">
          <el-input type="text" v-model="advancedSearchParams.devicename"/>
        </div>
        <label class="col-md-3 control-label">电压：</label>
        <div class="col-md-3">
          <el-input type="text" class="input-two" v-model="advancedSearchParams.voltagelow"/>到<el-input
            type="text" class="input-two" v-model="advancedSearchParams.voltagehigh"/>
        </div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">设备ID：</label>
        <div class="col-md-3">
          <el-input type="text" v-model="advancedSearchParams.sn"/>
        </div>
        <label class="col-md-3 control-label">电流：</label>
        <div class="col-md-3">
          <el-input type="text" class="input-two" v-model="advancedSearchParams.currrentlow"/>到<el-input
            v-model="advancedSearchParams.currenthigh" type="text" class="input-two"/>
        </div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">归属组：</label>
        <div class="col-md-3">
          <el-select v-model="advancedSearchParams.groupid" placeholder="选择归属组" clearable  style="width: 100%;">
            <el-option></el-option>
          </el-select>
        </div>
        <label class="col-md-3 control-label">有功电能：</label>
        <div class="col-md-3">
          <el-input type="text" class="input-two" v-model="advancedSearchParams.activepowerlow"/>到<el-input
            type="text" class="input-two" v-model="advancedSearchParams.activepowerhigh"/>
        </div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">归属回路控制器：</label>
        <div class="col-md-3">
          <el-select v-model="advancedSearchParams.loopcontrollerSn" placeholder="选择归属回路控制器" clearable  style="width: 100%;">
            <el-option></el-option>
          </el-select>
        </div>
        <label class="col-md-3 control-label">地理位置：</label>
        <div class="col-md-3">
          <el-input type="text" v-model="advancedSearchParams.position"/>
        </div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">灯控器类型：</label>
        <div class="col-md-3">
          <el-select v-model="advancedSearchParams.lightcontrollerType" placeholder="选择归属回路控制器" clearable  style="width: 100%;">
            <el-option v-for="type in lightControllerType" :key="type.value" :value="type.value" :label="type.text"></el-option>
          </el-select>
        </div>
        <label class="col-md-3 control-label">接入时间：</label>
        <div class="col-md-3">
          <el-col :span="11">
            <el-date-picker style="width: 100%" v-model="advancedSearchParams.regtimestart" type="date" placeholder="请选择开始时间"></el-date-picker>
          </el-col>
          <el-col class="line text-center" :span="2" style="line-height: 40px">到</el-col>
          <el-col :span="11">
            <el-date-picker style="width: 100%" v-model="advancedSearchParams.regtimeend" type="date" placeholder="请选择结束时间"></el-date-picker>
          </el-col>
        </div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">传感器类型：</label>
        <div class="col-md-3">
          <el-select v-model="advancedSearchParams.sensortype" placeholder="选择传感器类型" clearable  style="width: 100%;">
            <el-option v-for="type in sensorType" :key="type.value" :value="type.value" :label="type.text"></el-option>
          </el-select>
        </div>
        <label class="col-md-3 control-label">归属企业：</label>
        <div class="col-md-3">
          <tree-select-component v-model="searchParams.companyid" :list="companies"></tree-select-component>
        </div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">开关状态：</label>
        <div class="col-md-3">
          <el-select v-model="advancedSearchParams.switchstate" placeholder="选择开关状态" clearable  style="width: 100%;">
            <el-option v-for="type in switchStatus" :key="type.value" :value="type.value" :label="type.text"></el-option>
          </el-select>
        </div>
        <label class="col-md-3 control-label">运行状态：</label>
        <div class="col-md-3">
          <el-select v-model="advancedSearchParams.runningstate" placeholder="选择运行状态" clearable  style="width: 100%;">
            <el-option v-for="type in runningStatus" :key="type.value" :value="type.value" :label="type.text"></el-option>
          </el-select>
        </div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">亮度值：</label>
        <div class="col-md-3">
          <el-input type="text" class="input-two" v-model="advancedSearchParams.brightnesslow"/>到<el-input
            type="text" class="input-two" v-model="advancedSearchParams.brightnesshigh"/>
        </div>
      </div>
      <div class="search-btn">
        <div @click="highSearch" class="default-btn">搜索</div>
        <div @click="goBack" class="default-btn">返回</div>
      </div>
    </form>
  </div>
</template>

<script>
    import RestfulConstant from "../../../constants/restful";
    import Config from "../../../config";
    import Services from "../services";
    import selectStrategyComponent from "./select-strategy-component.vue";
    import CommonConstant from "../../../constants/common";
    export default {
        name: 'controlSingleLampPage',
        components: {selectStrategyComponent},
        data() {
            return {
                controlDeviceDialogVisible: false,
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
                advancedSearchParams: {
                    devicename: '',
                    sn: '',
                    groupid: '',
                    loopcontrollerSn: '',
                    lightcontrollerType: '',
                    sensortype: '',
                    switchstate: '',
                    brightnesslow: '',
                    brightnesshigh: '',
                    voltagelow: '',
                    voltagehigh: '',
                    currentlow: '',
                    currenthigh: '',
                    activepowerlow: '',
                    activepowerhigh: '',
                    position: '',
                    regtimestart: '',
                    regtimeend: '',
                    companyid: '',
                    runningstate: '',
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
            highSearch: function () {
                this.findList(Object.assign(this.advancedSearchParams, this.defaultPaging));
                this.goBack();
            },
            goBack: function () {
                this.showPage(this.pages.home)
            },
            showPage:function (page) {
                this.currentPage = page;
            },
            dialogControlDevice: function (device) {
                Services.getLight(device.sn).then(data => {
                    this.resetData();
                    this.operData.deviceid = data.deviceid;
                    this.operData.brightness = Number(data.brightness);
                    this.operData.strategyid = data.strategyid;
                    this.controlDeviceDialogVisible = true;
                });
            },
            controlDevice: function (formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                       /* let data = {};
                        data.deviceid = this.operData.deviceid;
                        data.strategyid = this.operData.strategyid;
                        data[this.currentControlPage] = this.operData[this.currentControlPage];*/
                        Services.editLight(this.operData).then(res => {
                            this.initLamp();
                            this.hideModal();
                        });
                    }
                })
            },
            hideModal: function () {
                this.controlDeviceDialogVisible = false;
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

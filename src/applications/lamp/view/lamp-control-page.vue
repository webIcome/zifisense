<template>
  <div v-if="currentPage == pages.home" class="content-right">
    <div class="clearfix">
      <div class="search pull-left">
        <form class="form-inline default-form">
          <div class="form-group">
            <label class="sr-only">设备名称：</label>
            <el-input type="text" v-model="searchParams.devicename" placeholder="输入设备名称" clearable></el-input>
          </div>
          <div class="form-group">
            <label class="sr-only">设备ID：</label>
            <el-input type="text" v-model="searchParams.sn" placeholder="输入设备ID" clearable/>
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
            <div  class="default-btn"  @click="dialogAddDevice"><span
                class="add-icon default-icon"></span>创建
            </div>
          </div>
        </form>
      </div>

    </div>
    <div class="my-table center">
      <table class="table table-hover table-striped">
        <thead>
        <th>设备名称</th>
        <th>设备ID</th>
        <th>运行状态</th>
        <th>地理位置</th>
        <th>开关状态</th>
        <th>亮度值</th>
        <th>电压</th>
        <th>电流</th>
        <th>累计电能</th>
        <th>操作</th>
        </thead>
        <tbody>
        <tr v-for="item in list" @click="showDetail($event, item)">
          <td>{{item.devicename}}</td>
          <td>{{item.sn}}</td>
          <td style="max-width: 300px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;" :title="item.runningstate">{{item.runningstate}}</td>
          <td>{{item.position}}</td>
          <td>{{item.switchstate | switchStateNameConverter}}</td>
          <td>{{item.brightness == 255? '控制异常' : item.brightness + '%'}}</td>
          <td>{{item.voltage}} V</td>
          <td>{{item.current}} A</td>
          <td>{{item.sumpower}} Wh</td>
          <td class="td-btns">
            <div class="icon-item"><span data-toggle="modal" data-target="#edit-device"
                                         @click="dialogEditDevice(item)" class="edit-icon"></span></div>
            <div class="icon-item"><span data-toggle="modal" data-target="#delete-device" @click="dialogDeleteDevice(item)"
                                         class="delete-icon"></span></div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <paging-component v-if="searchParams.pages" :pageNumber="searchParams.pageNum" :pages="searchParams.pages"
                      @pagingEvent='pagingEvent'></paging-component>

    <el-dialog title="创建灯控器" :visible.sync="addDeviceDialogVisible" center :width="'600px'">
      <el-form label-width="170px" :model="operData" :rules="addDeviceRoules" ref="addDevice" class="el-form-default">
        <el-form-item label="设备名称：" prop="devicename">
          <el-input v-model="operData.devicename" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="设备ID：" prop="sn">
          <el-input type="text" v-model="operData.sn" placeholder="请输入设备ID"/>
        </el-form-item>
        <el-form-item label="归属企业：" prop="companyid">
          <tree-select-component v-model="operData.companyid" :list="companies"></tree-select-component>
        </el-form-item>
        <el-form-item label="归属组：">
          <edit-group-max-component v-model="operData.groupid"
                                    :companyid="operData.companyid"
                                    :groupname="operData.groupname"
                                    @name="operData.groupname = arguments[0]"
                                    :run="addDeviceDialogVisible"
                                    :moduletype="moduleType.light"></edit-group-max-component>
        </el-form-item>
        <el-form-item label="归属回路控制器：" prop="loopcontrollersn">
          <el-input :disabled="!operData.companyid" type="text" v-model="showSelectedLoopName" placeholder="选择归属回路控制器" clearable @focus="dialogSelectLoop" @change="changeSelectLoop"></el-input>
          <el-input type="text"v-show="false" v-model="operData.loopcontrollersn"></el-input>
        </el-form-item>
        <el-form-item label="灯控器类型：" prop="lightControllerType">
          <el-select v-model="operData.lightControllerType" placeholder="选择灯控器类型" clearable  style="width: 100%;">
            <el-option v-for="type in lightControllerType" :value="type.value" :key="type.value" :label="type.text"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="传感器类型：" prop="sensortype">
          <el-select v-model="operData.sensortype" placeholder="选择传感器类型" clearable  style="width: 100%;">
            <el-option v-for="type in sensorType" :value="type.value" :key="type.value" :label="type.text"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="地理位置：" prop="position">
          <el-input type="text" v-model="operData.position" placeholder="请输入地理位置"/>
        </el-form-item>
        <el-form-item label="归属厂商：" prop="vendor">
          <el-select v-model="operData.vendor" placeholder="选择归属厂商" clearable  style="width: 100%;">
            <el-option v-for="type in vendor" :value="type.value" :key="type.value" :label="type.text"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="灯具类型：" prop="lampTypeID">
          <select-lamps-component v-model="operData.lampTypeID"
                                  @name="operData.lampType=arguments[0]"
                                  :companyId = operData.companyid
                                  :modelnum="operData.lampType"></select-lamps-component>
        </el-form-item>
        <el-form-item label="归属某一回路：" prop="toloopnum">
          <el-input type="text" v-model="operData.toloopnum" placeholder="请输回路控制器的某一回路"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addDevice('addDevice')">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="编辑灯控器" :visible.sync="editDeviceDialogVisible" center :width="'600px'">
      <el-form label-width="170px" :model="operData" :rules="addDeviceRoules" ref="editDevice" class="el-form-default">
        <el-form-item label="设备名称：" prop="devicename">
          <el-input v-model="operData.devicename" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="设备ID：" prop="sn">
          <el-input type="text" v-model="operData.sn" placeholder="请输入设备ID"/>
        </el-form-item>
        <el-form-item label="归属企业：" prop="companyid">
          <tree-select-component v-model="operData.companyid" :list="companies"></tree-select-component>
        </el-form-item>
        <el-form-item label="归属组：">
          <edit-group-max-component v-model="operData.groupid"
                                    :companyid="operData.companyid"
                                    :groupname="operData.groupname"
                                    @name="operData.groupname = arguments[0]"
                                    :run="editDeviceDialogVisible"
                                    :moduletype="moduleType.light"></edit-group-max-component>
        </el-form-item>
        <el-form-item label="归属回路控制器：" prop="loopcontrollersn">
          <el-input type="text" v-model="showSelectedLoopName" placeholder="选择归属回路控制器" clearable @focus="dialogSelectLoop" @change="changeSelectLoop"></el-input>
          <el-input type="text"v-show="false" v-model="operData.loopcontrollersn"></el-input>
        </el-form-item>
        <el-form-item label="灯控器类型：" prop="lightControllerType">
          <el-select v-model="operData.lightControllerType" placeholder="选择灯控器类型" clearable  style="width: 100%;">
            <el-option v-for="type in lightControllerType" :value="type.value" :key="type.value" :label="type.text"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="传感器类型：" prop="sensortype">
          <el-select v-model="operData.sensortype" placeholder="选择传感器类型" clearable  style="width: 100%;">
            <el-option v-for="type in sensorType" :value="type.value" :key="type.value" :label="type.text"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="地理位置：" prop="position">
          <el-input type="text" v-model="operData.position" placeholder="请输入地理位置"/>
        </el-form-item>
        <el-form-item label="归属厂商：" prop="vendor">
          <el-select v-model="operData.vendor" placeholder="选择归属厂商" clearable  style="width: 100%;">
            <el-option v-for="type in vendor" :value="type.value" :key="type.value" :label="type.text"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="灯具类型：" prop="lampTypeID">
          <select-lamps-component v-model="operData.lampTypeID"
                                  @name="operData.lampType=arguments[0]"
                                  :companyId = operData.companyid
                                  :modelnum="operData.lampType"></select-lamps-component>
        </el-form-item>
        <el-form-item label="归属某一回路：" prop="toloopnum">
          <el-input type="text" v-model="operData.toloopnum" placeholder="请输回路控制器的某一回路"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editDevice('editDevice')">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="删除灯控器" :visible.sync="deleteDeviceDialogVisible" center :width="'600px'">
      <div class="text-center">
        <div class="dialog-warning"></div>
      </div>
      <p class="title">您确认要删除此灯控器吗？</p>
      <p class="text-center">请慎重操作，您的操作一旦确认，将无法恢复，并被系统记录在日志当中！</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="deleteDevice">确认删除</el-button>
      </span>
    </el-dialog>
    <el-dialog title="选择回路控制器" :visible.sync="selectLoopDialogVisible" center :width="'600px'">
      <el-form :inline="true" label-width="170px" :model="searchLoopParams"  ref="editGroup" >
        <el-form-item prop="switchstate">
          <el-input type="text" v-model="searchLoopParams.devicename" placeholder="输入设备名称"></el-input>
        </el-form-item>
        <el-form-item prop="deviceType">
          <tree-select-component v-model="searchLoopParams.companyid" :list="companies"></tree-select-component>
        </el-form-item>
        <el-button type="primary" @click="findLoopList" icon="el-icon-search">筛选</el-button>
      </el-form>
      <div>
        <el-table ref="singleTable" :data="loopList" border class="table" @current-change="selectLoop" highlight-current-row>
          <el-table-column label="回路名称" prop="devicename" align="center"></el-table-column>
          <el-table-column label="归属企业" prop="companyname" align="center"></el-table-column>
        </el-table>
        <paging-component v-if="searchLoopParams.pages" :pageNumber="searchLoopParams.pageNum" :pages="searchLoopParams.pages"
                          @pagingEvent='pagingLoopEvent'></paging-component>
      </div>
    </el-dialog>
  </div>

  <search-light-control-component v-else-if="currentPage == pages.search" @search="highSearch" @back="goBack" :companies="companies"></search-light-control-component>
  <detail-lamp-control-page v-else-if="currentPage == pages.detail" :device="deviceView" :pages="pages" @page="showPage"></detail-lamp-control-page>
</template>

<script>
    import RestfulConstant from "../../../constants/restful";
    import Config from "../../../config";
    import {ContentLamp} from '../models';
    import detailLampControlPage from './detail-lamp-control-page.vue'
    import Services from '../services';
    import CommonConstant from "../../../constants/common";
    import editGroupMaxComponent from './edit-group-max-component.vue';
    import selectLampsComponent from './select-lamps-component.vue';
    import searchLightControlComponent from './search-light-control-component.vue';
    export default {
        name: 'lampControlPage',
        data() {
            return {
                addDeviceDialogVisible: false,
                editDeviceDialogVisible: false,
                deleteDeviceDialogVisible: false,
                selectLoopDialogVisible: false,
                selectLampDialogVisible: false,
                addDeviceRoules: {
                    devicename: [
                        {required: true, message: '请输入名称'}
                    ],
                    sn: [
                        {required: true, message: '请输入设备ID'}
                    ],
                    lightControllerType: [
                        {required: true, message: '选择灯控器类型'}
                    ],
                    sensortype: [
                        {required: true, message: '选择传感器类型'}
                    ],
                    position: [
                        {required: true, message: '请输入地理位置'}
                    ],
                    companyid: [
                        {required: true, message: '请选择企业'}
                    ],
                    vendor: [
                        {required: true, message: '请选择厂商'}
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
                searchLoopParams: {
                    devicename: '',
                    componyid: '',
                },
                loopList: [],
                showSelectedLampName: '',
                searchLampParams: {
                    devicename: '',
                    componyid: '',
                },
                lampList: [],
                showSelectedLoopName: '',
               /* advancedSearchParams: {
                    devicename: '',
                    sn: '',
                    groupname: '',
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
                },*/
                operData: {},
                isSearchPage: false,
                list: [],
                companies: [],
                lightControllerType: [
                    {value: 1, text: '电源蓝牙'},
                    {value: 2, text: '电源ZETA'},
                    {value: 3, text: '电源蓝牙+ZETA'},
                    {value: 4, text: '外挂式蓝牙'},
                    {value: 5, text: '外挂式ZETA'},
                    {value: 6, text: '外挂式蓝牙+ZETA'},
                ],
                switchStatus: [
                    {value: 1, text: '开'},
                    {value: 2, text: '关'},
                ],
                sensorType: [
                    {value: 1, text: '无'},
                    {value: 2, text: '光感'},
                    {value: 3, text: '微波'},
                ],
                runningStatus: [
                    {value: 1, text: '正常'},
                    {value: 2, text: '欠流'},
                    {value: 3, text: '过流'},
                    {value: 4, text: '欠压'},
                    {value: 5, text: '过压'},
                ],
                vendor: [],
                moduleType: {},
                defaultPaging: {
                    pageSize: Config.DEFAULT_PAGE_SIZE,
                    pageNum: 1
                },
                pages: {
                    home: 1,
                    search: 2,
                    detail: 3
                },
                currentPage: 1,
                deviceView: {}
            }
        },
        components: {
            detailLampControlPage,
            editGroupMaxComponent,
            selectLampsComponent,
            searchLightControlComponent
        },
        created: function () {
            this.initData()
        },
        methods: {
            initData: function () {
                this.initLamp();
                this.initCompanies();
                this.initOperData();
                this.initCommonData();
            },
            initLamp: function () {
                this.findList(this.defaultPaging)
                this.clearSearchParams();
            },
            clearSearchParams: function () {
                Object.keys(this.searchParams).forEach(key => {
                    this.searchParams[key] = '';
                })
            },
            initCompanies: function () {
                this.$globalCache.companies.then(companies => {
                    this.companies = companies;
                })
            },
            initOperData: function () {
              this.operData = this.$common.copyObj(ContentLamp);
            },
            initCommonData: function () {
                CommonConstant.deviceType.forEach(item => {
                    this.moduleType[item.name] = item.value;
                });
                this.vendor = CommonConstant.vendor;
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
            showDetail: function (event,device) {
                if (event.target.className == 'delete-icon' || event.target.className == 'edit-icon') {
                    return;
                }
                Services.getLight(device.deviceid).then(device => {
                    this.deviceView = device;
                    this.showPage(this.pages.detail)
                });
            },
            showPage:function (page) {
                this.currentPage = page;
            },
            dialogSelectLoop: function () {
                this.searchLoopParams.companyid = this.operData.companyid;
                this.findLoopList(Object.assign(this.searchLoopParams,this.defaultPaging));
                this.selectLoopDialogVisible = true;
            },
            selectLoop: function (val) {
                this.operData.loopcontrollersn = val.sn;
                this.showSelectedLoopName = val.devicename;
                this.selectLoopDialogVisible = false;
            },
            changeSelectLoop: function (val) {
                if (!val) {
                    this.operData.loopcontrollersn = ''
                }
            },
            pagingLoopEvent: function (pageNum) {
                this.searchLoopParams.pageNum = pageNum;
                this.findLoopList(this.searchLoopParams);
            },
            findLoopList: function (params) {
                Services.findLoopList(params).then(data => {
                    this.searchLoopParams.pageNum = data.pageNum;
                    this.searchLoopParams.pages = data.pages;
                    this.searchLoopParams.pageSize = data.pageSize;
                    this.loopList = data.list;
                });
            },
            dialogAddDevice: function () {
                this.resetData();
                this.addDeviceDialogVisible = true;
            },
            dialogEditDevice: function (device) {
                this.resetData();
                Services.getLight(device.deviceid).then(device => {
                    this.operData = device;
                    this.showSelectedLoopName = device.devicename;
                    this.showSelectedLampName = device.lampType
                });
                this.editDeviceDialogVisible = true;
            },
            dialogDeleteDevice: function (device) {
                this.resetData();
                this.operData = device;
                this.deleteDeviceDialogVisible = true;
            },
            deleteDevice: function () {
                Services.deleteLight(this.operData.deviceid).then(res => {
                    this.initLamp();
                    this.hideModal();
                });
            },
            editDevice: function (formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        Services.editLight(this.operData).then(res => {
                            this.initLamp();
                            this.hideModal();
                        });
                    }
                })
            },
            addDevice: function (formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                       Services.addLight(this.operData).then(res => {
                            this.initLamp();
                            this.hideModal();
                        });
                    }
                })
            },
            hideModal: function () {
                this.addDeviceDialogVisible = false;
                this.editDeviceDialogVisible = false;
                this.deleteDeviceDialogVisible = false;
            },
            resetData: function () {
                this.operData = this.$common.copyObj(ContentLamp);
                this.showSelectedLoopName = '';
            }

        }
    }
</script>

<style scoped lang="less">

</style>

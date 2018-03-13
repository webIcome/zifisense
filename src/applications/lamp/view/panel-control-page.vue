<template>
  <div v-if="currentPage == pages.home" class="content-right">
    <div class="clearfix">
      <div class="search pull-left">
        <form class="form-inline default-form">
          <div class="form-group">
            <label class="sr-only">设备名称：</label>
            <el-input type="text" v-model="searchParams.phone" placeholder="输入设备名称"/>
          </div>
          <div class="form-group">
            <label class="sr-only">设备ID：</label>
            <el-input type="text" v-model="searchParams.phone" placeholder="输入设备ID"/>
          </div>
          <div class="form-group">
            <label class="sr-only">归属企业：</label>
            <tree-select-component v-model="searchParams.companyid" :list="companies"></tree-select-component>
          </div>
          <div class="form-group default-btn"><span class="quick-search-icon default-icon"></span>快速筛选</div>
          <div class="pull-right">
            <div @click="dialogHighSearch" class="default-btn"><span class="search-icon default-icon"></span>高级搜索</div>
            <div @click="dialogAddDevice" data-toggle="modal" data-target="#add-device" class="default-btn"><span
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
        <th>按钮1情景模式</th>
        <th>按钮2情景模式</th>
        <th>按钮3情景模式</th>
        <th>地理位置</th>
        <th>操作</th>
        </thead>
        <tbody>
        <tr v-for="item in list" @click="showDetail($event, item)">
          <td>{{item.devicename}}</td>
          <td>{{item.sn}}</td>
          <td>{{item.runningstate | runningstateNameConverter}}</td>
          <td>{{item.buttonmode1}}</td>
          <td>{{item.buttonmode2}}</td>
          <td>{{item.buttonmode3}}</td>
          <td>{{item.position}}</td>
          <td class="td-btns">
            <div class="icon-item"><span data-toggle="modal" data-target="#edit-device" @click="dialogEditDevice(item)" class="edit-icon"></span></div>
            <div class="icon-item"><span data-toggle="modal" data-target="#delete-device" @click="dialogDeleteDevice(item)"
                                         class="delete-icon"></span></div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <paging-component v-if="searchParams.pages" :pageNumber="searchParams.pageNum" :pages="searchParams.pages"
                      @pagingEvent='pagingEvent'></paging-component>

    <el-dialog title="创建控制面版" :visible.sync="addDeviceDialogVisible" center :width="'600px'">
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
                                    :run="addDeviceDialogVisible"
                                    :moduletype="moduleType.panel"></edit-group-max-component>
        </el-form-item>
        <el-form-item label="地理位置：" prop="position">
          <el-input type="text" v-model="operData.position" placeholder="请输入地理位置"/>
        </el-form-item>
        <el-form-item label="归属厂商：" prop="vendor">
          <el-select v-model="operData.vendor" placeholder="选择归属厂商" clearable  style="width: 100%;">
            <el-option v-for="type in vendor" :value="type.value" :key="type.value" :label="type.text"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addDevice('addDevice')">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="编辑控制面版" :visible.sync="editDeviceDialogVisible" center :width="'600px'">
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
                                    :run="editDeviceDialogVisible"
                                    :moduletype="moduleType.panel"></edit-group-max-component>
        </el-form-item>
        <el-form-item label="地理位置：" prop="position">
          <el-input type="text" v-model="operData.position" placeholder="请输入地理位置"/>
        </el-form-item>
        <el-form-item label="归属厂商：" prop="vendor">
          <el-select v-model="operData.vendor" placeholder="选择归属厂商" clearable  style="width: 100%;">
            <el-option v-for="type in vendor" :value="type.value" :key="type.value" :label="type.text"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editDevice('editDevice')">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="删除控制面版" :visible.sync="deleteDeviceDialogVisible" center :width="'600px'">
      <div class="text-center">
        <div class="dialog-warning"></div>
      </div>
      <p class="title">您确认要删除此控制面板吗？</p>
      <p class="text-center">请慎重操作，您的操作一旦确认，将无法恢复，并被系统记录在日志当中！</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="deleteDevice">确认删除</el-button>
      </span>
    </el-dialog>
  </div>

  <div v-else-if="currentPage == pages.search" class="content-right">
    <div class="page-title">控制面版高级搜索</div>
    <form class="form-horizontal default-form">
      <div class="form-group">
        <label class="col-md-3 control-label">设备名称：</label>
        <div class="col-md-3">
          <el-input type="text" v-model="advancedSearchParams.devicename" placeholder="输入设备名称"/>
        </div>
        <label class="col-md-3 control-label">设备ID：</label>
        <div class="col-md-3">
          <el-input type="text" v-model="advancedSearchParams.sn" placeholder="输入设备ID"/>
        </div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">归属组：</label>
        <div class="col-md-3">
          <el-input type="text" v-model="advancedSearchParams.groupname" placeholder="输入组名称"></el-input>
        </div>
        <label class="col-md-3 control-label">地理位置：</label>
        <div class="col-md-3">
          <el-input type="text" v-model="advancedSearchParams.position" placeholder="输入地理位置"/>
        </div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">运行状态：</label>
        <div class="col-md-3">
          <el-select v-model="advancedSearchParams.runningstate" placeholder="选择运行状态" clearable  style="width: 100%;">
            <el-option v-for="type in runningStatus" :key="type.value" :value="type.value" :label="type.text"></el-option>
          </el-select>
        </div>
        <label class="col-md-3 control-label">接入时间：</label>
        <div class="col-md-3">
          <!--<vue-datepicker-local clearable :inputClass="'form-control'" class="input-two" v-model="advancedSearchParams.regtimestart"></vue-datepicker-local>
          到
          <vue-datepicker-local clearable :inputClass="'form-control'" class="input-two" v-model="advancedSearchParams.regtimeend"></vue-datepicker-local>-->
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
        <label class="col-md-3 control-label">归属企业：</label>
        <div class="col-md-3">
          <tree-select-component v-model="advancedSearchParams.companyid" :list="companies"></tree-select-component>
        </div>
      </div>
      <div class="search-btn">
        <div @click="highSearch" class="default-btn">搜索</div>
        <div @click="goBack" class="default-btn">返回</div>
      </div>
    </form>
  </div>
  <detail-panel-control-page v-else-if="currentPage == pages.detail" :device="deviceView" :pages="pages" @page="showPage"></detail-panel-control-page>

</template>

<script>
    import {ContentPanel} from '../models'
    import Config from "../../../config";
    import detailPanelControlPage from './detail-panel-control-page.vue';
    import Services from "../services";
    import editGroupMaxComponent from './edit-group-max-component.vue';
    import CommonConstant from "../../../constants/common";
    export default {
        name: 'panelControlPage',
        data() {
            return {
                addDeviceDialogVisible: false,
                editDeviceDialogVisible: false,
                deleteDeviceDialogVisible: false,
                addDeviceRoules: {
                    devicename: [
                        {required: true, message: '请输入名称'}
                    ],
                    sn: [
                        {required: true, message: '请输入设备ID'}
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
                    groupid: [
                        {required: true, message: '请选择归属组'}
                    ],
                },
                searchParams: {
                    devicename: '',
                    sn: '',
                    companyid: '',
                },
                advancedSearchParams: {
                    devicename: '',
                    sn: '',
                    groupname: '',
                    controlmode: '',
                    position: '',
                    regtimestart: '',
                    regtimeend: '',
                    companyid: '',
                    runningstate: '',
                },
                operData: {},
                addDeviceData: {},
                deviceView: '',
                list: [],
                companies: [],
                groups: [{name: '分组1'},{name: '分组2'}],
                isSearchPage: false,
                runningStatus: [
                    {value: 1, text: '正常'},
                    {value: 2, text: '欠流'},
                    {value: 3, text: '过流'},
                    {value: 4, text: '欠压'},
                    {value: 5, text: '过压'},
                ],
                controlPattern: [
                    {value: 1, text: '普通模式'},
                    {value: 2, text: '情景模式'},
                ],
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
                moduleType: {},
                vendor: []
            }
        },
        created: function () {
            this.initData()
        },
        components: {
            detailPanelControlPage,
            editGroupMaxComponent
        },
        methods: {
            initData: function () {
                this.initPanel();
                this.initCompanies();
                this.initOperData();
                this.initCommonData();
            },
            initPanel: function () {
                this.findList(this.defaultPaging)
            },
            initCompanies: function () {
                this.$globalCache.companies.then(companies => {
                    this.companies = companies;
                })
            },
            initOperData: function () {
                this.operData = this.$common.copyObj(ContentPanel);
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
                Services.findPanelList(params).then(data => {
                    this.searchParams.pageNum = data.pageNum;
                    this.searchParams.pages = data.pages;
                    this.searchParams.pageSize = data.pageSize;
                    this.list = data.list;
                });
            },
            addGroup: function () {

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
            showDetail: function (event,device) {
                if (event.target.className == 'delete-icon' || event.target.className == 'edit-icon') {
                    return;
                }
                Services.getPanel(device.sn).then(device => {
                    this.deviceView = device;
                    this.showPage(this.pages.detail)
                });
            },
            showPage:function (page) {
                this.currentPage = page;
            },
            dialogAddDevice: function () {
                this.resetData();
                this.addDeviceDialogVisible = true;
            },
            dialogEditDevice: function (device) {
                this.resetData();
                Services.getPanel(device.sn).then(device => {
                    this.operData = device
                });
                this.editDeviceDialogVisible = true;
            },
            dialogDeleteDevice: function (device) {
                this.resetData();
                this.operData = device;
                this.deleteDeviceDialogVisible = true;
            },
            deleteDevice: function () {
                Services.deletePanel(this.operData.sn).then(res => {
                    this.hideModal();
                    this.initPanel();
                });
            },
            editDevice: function (formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        Services.editPanel(this.operData).then(res => {
                            this.hideModal();
                            this.initPanel();
                        });
                    }
                })
            },
            addDevice: function (formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        Services.addPanel(this.operData).then(res => {
                            this.initPanel();
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
                this.operData = this.$common.copyObj(ContentPanel);
            }
        }
    }
</script>

<style scoped lang="less">

</style>

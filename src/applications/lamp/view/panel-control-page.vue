<template>
  <div v-if="currentPage == pages.home" class="content-right">
    <div class="clearfix">
      <div class="search pull-left">
        <form class="form-inline default-form">
          <div class="form-group">
            <label class="sr-only">设备名称：</label>
            <el-input type="text" v-model="searchParams.devicename" placeholder="输入设备名称" clearable/>
          </div>
          <div class="form-group">
            <label class="sr-only">设备ID：</label>
            <el-input type="text" v-model="searchParams.sn" placeholder="输入设备ID" clearable/>
          </div>
          <div class="form-group">
            <label class="sr-only">归属企业：</label>
            <tree-select-component v-model="searchParams.companyid" :list="companies"></tree-select-component>
          </div>
          <div  @click="search" class="form-group default-btn"><span class="quick-search-icon default-icon"></span>快速筛选</div>
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
        <th>控制模式</th>
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
          <td>{{item.mode | modeNameConverter}}</td>
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
    <paging-component v-if="pagingParams.pages" :pageNumber="pagingParams.pageNum" :pages="pagingParams.pages"
                      @pagingEvent='pagingEvent'></paging-component>

    <el-dialog title="创建控制面版" :visible.sync="addDeviceDialogVisible" center :width="'600px'" @close="resetData" @open="clearValidate('addDevice')">
      <el-form label-width="170px" :model="operData" :rules="addDeviceRoules" ref="addDevice" class="el-form-default">
        <el-form-item label="设备名称：" prop="devicename">
          <el-input v-model.trim="operData.devicename" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="设备ID：" prop="sn">
          <el-input type="text" v-model.trim="operData.sn" placeholder="请输入设备ID"/>
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
                                    :moduletype="moduleType.panel"></edit-group-max-component>
        </el-form-item>
        <el-form-item label="地理位置：" prop="position">
          <el-input type="text" v-model.trim="operData.position" placeholder="请输入地理位置"/>
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
    <el-dialog title="编辑控制面版" :visible.sync="editDeviceDialogVisible" center :width="'600px'" @close="resetData" @open="clearValidate('editDevice')">
      <el-form label-width="170px" :model="operData" :rules="addDeviceRoules" ref="editDevice" class="el-form-default">
        <el-form-item label="设备名称：" prop="devicename">
          <el-input v-model.trim="operData.devicename" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="设备ID：" prop="sn">
          <el-input type="text" v-model.trim="operData.sn" placeholder="请输入设备ID"/>
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
                                    :moduletype="moduleType.panel"></edit-group-max-component>
        </el-form-item>
        <el-form-item label="地理位置：" prop="position">
          <el-input type="text" v-model.trim="operData.position" placeholder="请输入地理位置"/>
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

  <search-panel-control-component v-else-if="currentPage == pages.search"
                                 @search="highSearch" @back="goBack"
                                 :companies="companies"></search-panel-control-component>
  <detail-panel-control-page v-else-if="currentPage == pages.detail" :device="deviceView" :pages="pages" @page="showPage"></detail-panel-control-page>

</template>

<script>
    import {ContentPanel} from '../models'
    import Config from "../../../config";
    import detailPanelControlPage from './detail-panel-control-page.vue';
    import Services from "../services";
    import editGroupMaxComponent from './edit-group-max-component.vue';
    import CommonConstant from "../../../constants/common";
    import searchPanelControlComponent from './search-panel-control-component.vue';
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
                pagingParams: {},
                advancedSearchParams: {
                    devicename: '',
                    sn: '',
                    groupname: '',
                    controlmode: '',
                    position: '',
                    regtimestart: '',
                    regtimeend: '',
                    companyid: '',
                },
                operData: {},
                addDeviceData: {},
                deviceView: '',
                list: [],
                companies: [],
                groups: [{name: '分组1'},{name: '分组2'}],
                isSearchPage: false,
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
            editGroupMaxComponent,
            searchPanelControlComponent
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
                this.operData = this.$common.copyObj(ContentPanel);
            },
            initCommonData: function () {
                CommonConstant.deviceType.forEach(item => {
                    this.moduleType[item.name] = item.value;
                });
                this.vendor = CommonConstant.vendor;
            },
            pagingEvent: function (pageNumber) {
                this.pagingParams.pageNum = pageNumber;
                this.findList(this.pagingParams);
            },
            findList: function (params) {
                Services.findPanelList(params).then(data => {
                    this.pagingParams.pageNum = data.pageNum;
                    this.pagingParams.pages = data.pages;
                    this.pagingParams.pageSize = data.pageSize;
                    this.list = data.list;
                });
            },
            addGroup: function () {

            },
            dialogHighSearch: function () {
                this.showPage(this.pages.search)
            },
            search: function () {
                this.pagingParams = {};
                this.findList(Object.assign(this.pagingParams, this.searchParams, this.defaultPaging));
            },
            highSearch: function (searchParams) {
                this.pagingParams = {};
                this.findList(Object.assign(this.pagingParams, searchParams, this.defaultPaging));
                this.goBack();
            },
            goBack: function () {
                this.showPage(this.pages.home)
            },
            showDetail: function (event,device) {
                if (event.target.className == 'delete-icon' || event.target.className == 'edit-icon') {
                    return;
                }
                Services.getPanel(device.deviceid).then(device => {
                    this.deviceView = device;
                    this.showPage(this.pages.detail)
                });
            },
            showPage:function (page) {
                this.currentPage = page;
            },
            dialogAddDevice: function () {
                this.addDeviceDialogVisible = true;
            },
            dialogEditDevice: function (device) {
                Services.getPanel(device.deviceid).then(device => {
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
                Services.deletePanel(this.operData.deviceid).then(res => {
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
            },
            clearValidate: function (formName) {
                if (this.$refs[formName]) this.$refs[formName].clearValidate();
            }
        }
    }
</script>

<style scoped lang="less">

</style>

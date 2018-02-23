<template>
  <div v-if="currentPage == pages.home" class="content-right">
    <div class="clearfix">
      <div class="search pull-left">
        <form class="form-inline default-form">
          <div class="form-group">
            <label class="sr-only">设备名称：</label>
            <el-input type="text" v-model="searchParams.devicename" placeholder="输入设备名称"/>
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
            <label class="sr-only">回路数：</label>
            <el-input type="text" v-model="searchParams.loopnum" placeholder="回路数"/>
          </div>
          <div class="form-group">
            <label class="sr-only">归属组：</label>
            <el-input type="text" v-model="searchParams.groupid" placeholder="归属组"/>
          </div>
          <div class="form-group">
            <label class="sr-only">地理位置：</label>
            <el-input type="text" v-model="searchParams.position" placeholder="地理位置"/>
          </div>
          <div @click="search" class="form-group default-btn"><span class="quick-search-icon default-icon"></span>快速筛选



          </div>
          <div class="pull-right">
            <div @click="dialogHighSearch" class="default-btn"><span class="search-icon default-icon"></span>高级搜索</div>
            <div @click="dialogAddDevice" data-toggle="modal" data-target="#add-device" class="default-btn"><span
                class="add-icon default-icon"></span>创建




            </div>
          </div>
        </form>
      </div>

    </div>
    <div class="table center">
      <table class="table table-hover table-striped">
        <thead>
        <th>设备名称</th>
        <th>设备ID</th>
        <th>运行状态</th>
        <th>回路数</th>
        <th>地理位置</th>
        <th>回路状态、DI口状态</th>
        <th>电表参数</th>
        <th>操作</th>
        </thead>
        <tbody>
        <tr v-for="item in list" @click="showDetail($event, item)">
          <td>{{item.devicename}}</td>
          <td>{{item.sn}}</td>
          <td>{{item.runningstate}}</td>
          <td>{{item.loopnum}}</td>
          <td>{{item.position}}</td>
          <td>{{item.loopcontrol + '、' + item.diportstate}}</td>
          <td>{{item.threevoltage}}{{item.threecurrent}}{{item.sumActivePower}}{{item.sumReactivePower}}</td>
        <td class="td-btns">
          <div class="icon-item"><span data-toggle="modal" data-target="#edit-device" @click="dialogEditDevice"
                                       class="edit-icon"></span></div>
          <div class="icon-item"><span data-toggle="modal" data-target="#delete-device" @click="dialogDeleteDevice"
                                       class="delete-icon"></span></div>
        </td>
        </tr>
        </tbody>
      </table>
    </div>
    <paging-component v-if="searchParams.pages" :pageNumber="searchParams.pageNum" :pages="searchParams.pages"
                      @pagingEvent='pagingEvent'></paging-component>

<!--    <dialog-component id="add-device">
      <div slot="body">
        <div class="dialog-title">创建回路控制器</div>
        <form class="form-horizontal default-form">
          <div class="form-group">
            <label class="col-md-4 control-label">设备名称：</label>
            <div class="col-md-8">
              <el-input type="text" v-model="operData.devicename"/>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-4 control-label">设备ID：</label>
            <div class="col-md-8">
              <el-input type="text" v-model="operData.sn"/>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-4 control-label">归属组：</label>
            <div class="col-md-8 group-lamp">
              <template v-for="group in groups">
                <div class="group-item default-btn">{{group.name}} <span class="group-delete"></span></div>
              </template>
              <div @click="addGroup" class="group-add"></div>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-4 control-label">回路数：</label>
            <div class="col-md-8">
              <el-input type="text" v-model="operData.loopnum"/>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-4 control-label">地理位置：</label>
            <div class="col-md-8">
              <el-input type="text" v-model="operData.position" placeholder="请输入地理位置"/>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-4 control-label">归属企业：</label>
            <div class="col-md-8">
              <tree-select-component v-model="operData.companyid" :list="companies"></tree-select-component>
            </div>
          </div>
          <div class="dialog-btn">
            <span @click="addDevice" class="dialog-btn-icon">确认</span>
          </div>
        </form>
      </div>
    </dialog-component>
    <dialog-component id="edit-device">
      <div slot="body">
        <div class="dialog-title">创建灯控器</div>
        <form class="form-horizontal default-form">
          <div class="form-group">
            <label class="col-md-4 control-label">设备名称：</label>
            <div class="col-md-8">
              <el-input type="text" v-model="operData.devicename"/>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-4 control-label">设备ID：</label>
            <div class="col-md-8">
              <el-input type="text" v-model="operData.sn"/>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-4 control-label">归属组：</label>
            <div class="col-md-8 group-lamp">
              <template v-for="group in groups">
                <div class="group-item default-btn">{{group.name}} <span class="group-delete"></span></div>
              </template>
              <div @click="addGroup" class="group-add"></div>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-4 control-label">回路数：</label>
            <div class="col-md-8">
              <el-input type="text" v-model="operData.loopnum"/>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-4 control-label">地理位置：</label>
            <div class="col-md-8">
              <el-input type="text" v-model="operData.company" placeholder="请输入地理位置"/>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-4 control-label">归属企业：</label>
            <div class="col-md-8">
              <tree-select-component v-model="operData.companyid" :list="companies"></tree-select-component>
            </div>
          </div>
          <div class="dialog-btn">
            <span @click="editDevice" class="dialog-btn-icon">确认</span>
          </div>
        </form>
      </div>
    </dialog-component>-->
    <el-dialog title="创建回路控制器" :visible.sync="addDeviceDialogVisible" center :width="'600px'">
      <el-form label-width="170px" :model="operData" :rules="addDeviceRoules" ref="addDevice" class="el-form-default">
        <el-form-item label="设备名称：" prop="devicename">
          <el-input v-model="operData.devicename" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="设备ID：" prop="sn">
          <el-input type="text" v-model="operData.sn" placeholder="请输入设备ID"/>
        </el-form-item>
        <el-form-item label="归属组：">
          <div class="group-lamp">
            <template v-for="group in groups">
              <div class="group-item default-btn">{{group.name}} <span class="group-delete"></span></div>
            </template>
            <div @click="addGroup" class="group-add"></div>
          </div>
        </el-form-item>
        <el-form-item label="回路数：" prop="loopnum">
          <el-input type="text" v-model="operData.loopnum"/>
        </el-form-item>
        <el-form-item label="地理位置：" prop="position">
          <el-input type="text" v-model="operData.position" placeholder="请输入地理位置"/>
        </el-form-item>
        <el-form-item label="归属企业：" prop="companyid">
          <tree-select-component v-model="operData.companyid" :list="companies"></tree-select-component>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addDevice('addDevice')">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="编辑回路控制器" :visible.sync="editDeviceDialogVisible" center :width="'600px'">
      <el-form label-width="170px" :model="operData" :rules="addDeviceRoules" ref="editDevice" class="el-form-default">
        <el-form-item label="设备名称：" prop="devicename">
          <el-input v-model="operData.devicename" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="设备ID：" prop="sn">
          <el-input type="text" v-model="operData.sn" placeholder="请输入设备ID"/>
        </el-form-item>
        <el-form-item label="归属组：">
          <div class="group-lamp">
            <template v-for="group in groups">
              <div class="group-item default-btn">{{group.name}} <span class="group-delete"></span></div>
            </template>
            <div @click="addGroup" class="group-add"></div>
          </div>
        </el-form-item>
        <el-form-item label="回路数：" prop="loopnum">
          <el-input type="text" v-model="operData.loopnum"/>
        </el-form-item>
        <el-form-item label="地理位置：" prop="position">
          <el-input type="text" v-model="operData.position" placeholder="请输入地理位置"/>
        </el-form-item>
        <el-form-item label="归属企业：" prop="companyid">
          <tree-select-component v-model="operData.companyid" :list="companies"></tree-select-component>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editDevice('editDevice')">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="删除回路控制器" :visible.sync="deleteDeviceDialogVisible" center :width="'600px'">
      <div class="text-center">
        <div class="dialog-warning"></div>
      </div>
      <p class="title">您确认要删除此回路灯控器吗？</p>
      <p class="text-center">请慎重操作，您的操作一旦确认，将无法恢复，并被系统记录在日志当中！</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="deleteDevice">确认删除</el-button>
      </span>
    </el-dialog>

<!--    <dialog-component id="delete-device">
      <div slot="body">
        <div class="dialog-title">删除回路控制器</div>
        <div class="text-center">
          <div class="dialog-warning"></div>
        </div>
        <p class="title">您确认要删除此回路灯控器吗？</p>
        <p class="text-center">请慎重操作，您的操作一旦确认，将无法恢复，并被系统记录在日志当中！</p>
        <div class="dialog-btn">
          <span @click="deleteDevice" class="dialog-btn-icon">确认删除</span>
        </div>
      </div>
    </dialog-component>-->
  </div>

  <div v-else-if="currentPage == pages.search" class="content-right">
    <div class="page-title">回路控制器高级搜索</div>
    <form class="form-horizontal default-form">
      <div class="form-group">
        <label class="col-md-3 control-label">设备名称：</label>
        <div class="col-md-3">
          <el-input type="text" v-model="advancedSearchParams.devicename"/>
        </div>
        <label class="col-md-3 control-label">有功电能累加：</label>
        <div class="col-md-3">
          <el-input type="text" class="input-two" v-model="advancedSearchParams.sumActivePowerLow"/>到<el-input type="text" class="input-two" v-model="advancedSearchParams.sumActivePowerHigh"/>
        </div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">设备ID：</label>
        <div class="col-md-3">
          <el-input type="text" v-model="advancedSearchParams.sn"/>
        </div>
        <label class="col-md-3 control-label">无功电能累加：</label>
        <div class="col-md-3">
         <el-input type="text" class="input-two" v-model="advancedSearchParams.sumReactivePowerLow"/>到<input
            type="text" class="form-control input-two" v-model="advancedSearchParams.sumReactivePowerHigh"/>
        </div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">归属组：</label>
        <div class="col-md-3">
          <el-select v-model="advancedSearchParams.groupid" placeholder="选择归属组" clearable  style="width: 100%;">
            <el-option v-for="type in groups" :key="type.value" :value="type.value" :label="type.text"></el-option>
          </el-select>
        </div>
        <label class="col-md-3 control-label">地理位置：</label>
        <div class="col-md-3">
          <el-input type="text" v-model="advancedSearchParams.position"/>
        </div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">回路数：</label>
        <div class="col-md-3">
          <el-input type="text" v-model="advancedSearchParams.loopnum"/>
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
        <label class="col-md-3 control-label">DI口状态：</label>
        <div class="col-md-3">
          <el-select v-model="advancedSearchParams.diportstate" placeholder="选择DI口状态" clearable  style="width: 100%;">
            <el-option v-for="type in diPortStatus" :key="type.value" :value="type.value" :label="type.text"></el-option>
          </el-select>
        </div>
        <label class="col-md-3 control-label">归属企业：</label>
        <div class="col-md-3">
          <tree-select-component v-model="advancedSearchParams.companyid" :list="companies"></tree-select-component>
        </div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">三相电压：</label>
        <div class="col-md-3">
         <el-input type="text" class="input-two" v-model="advancedSearchParams.threeVoltageLow"/>到<input
            type="text" class="form-control input-two" v-model="advancedSearchParams.threeVoltageHigh"/>
        </div>
        <label class="col-md-3 control-label">运行状态：</label>
        <div class="col-md-3">
          <el-select v-model="advancedSearchParams.runningstate" placeholder="选择运行状态" clearable  style="width: 100%;">
            <el-option v-for="type in runningStatus" :key="type.value" :value="type.value" :label="type.text"></el-option>
          </el-select>
        </div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">三项电流：</label>
        <div class="col-md-3">
         <el-input type="text" class="input-two"/>到<el-input type="text" class="input-two"/>
        </div>
      </div>
      <div class="search-btn">
        <div @click="highSearch" class="default-btn">搜索</div>
        <div @click="goBack" class="default-btn">返回</div>
      </div>
    </form>
  </div>
  <detail-lamp-control-page v-else-if="currentPage == pages.detail" :device="deviceView" :pages="pages" @page="showPage"></detail-lamp-control-page>
</template>

<script>
    import {ContentLoop} from '../models';
    import Config from "../../../config";
    import detailLoopControlPage from './detail-loop-control-page.vue'
    export default {
        name: 'loopControlPage',
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
                    loopnum: [
                        {required: true, message: '选择回路数'}
                    ],
                    position: [
                        {required: true, message: '请输入地理位置'}
                    ],
                    companyid: [
                        {required: true, message: '请选择企业'}
                    ],
                },
                searchParams: {
                    devicename: '',
                    sn: '',
                    componyid: '',
                    loopnum: '',
                    groupid: '',
                    position: '',
                },
                advancedSearchParams: {
                    devicename: '',
                    sn: '',
                    groupid: '',
                    loopnum: '',
                    threeVoltageLow: '',
                    threeVoltageHigh: '',
                    threeCurrentLow: '',
                    threeCurrentHigh: '',
                    sumActivePowerLow: '',
                    sumActivePowerHigh: '',
                    sumReactivePowerLow: '',
                    sumReactivePowerHigh: '',
                    position: '',
                    regtimestart: '',
                    regtimeend: '',
                    runningstate: '',
                    diportstate: ''
                },
                operData: {},
                groups: [{name: '分组1'}, {name: '分组2'}],
                list: [{}],
                companies: [],
                isSearchPage: false,
                diPortStatus: [
                    {value: 1, text: '开'},
                    {value: 2, text: '关'},
                ],
                runningStatus: [
                    {value: 1, text: '正常'},
                    {value: 2, text: '欠流'},
                    {value: 3, text: '过流'},
                    {value: 4, text: '欠压'},
                    {value: 5, text: '过压'},
                ],
                defaultPaging: {
                    pageSize: Config.DEFAULT_PAGE_SIZE,
                    pageNum: 1
                },
                deviceView: {},
                pages: {
                    home: 1,
                    search: 2,
                    detail: 3
                },
                currentPage: 1
            }
        },
        created: function () {
            this.initData();
        },
        components: {
            detailLoopControlPage
        },
        methods: {
            initData: function () {
                this.initLoop();
                this.initCompanies();
                this.initOperData();
            },
            initLoop: function () {
                this.findList(this.defaultPaging)
            },
            initCompanies: function () {
                this.$globalCache.companies.then(companies => {
                    this.companies = companies;
                })
            },
            initOperData: function () {
                this.operData = this.$common.copyObj(ContentLoop);
            },
            pagingEvent: function (pageNumber) {
                this.searchParams.pageNum = pageNumber;
                this.findList(this.searchParams);
            },
            findList: function (params) {
                this.$http.get('loopController/getList', {params: params}).then(res => {
                    this.searchParams.pageNum = res.body.data.pageNum;
                    this.searchParams.pages = res.body.data.pages;
                    this.searchParams.pageSize = res.body.data.pageSize;
                    this.list = res.body.data.list;
                }).catch(err => {

                })
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
                this.getDevice(device.sn).then(device => {
                    this.deviceView = device;
                    this.showPage(this.pages.detail)
                });
            },
            getDevice: function (id) {
                return this.$http.post('loopController/getDetailsBySn', {sn: id}).then(res => {
                    return res.body.data
                }).catch()
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
                this.getDevice(device.sn).then(device => {
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
                this.$http.post('loopController/delete', this.operData).then(res => {
                    this.hideModal();
                });
            },
            editDevice: function (formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        this.$http.post('loopController/edit', this.operData).then(res => {
                            this.hideModal();
                        });
                    }
                })
            },
            addDevice: function (formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        this.$http.post('loopController/add', this.operData).then(res => {
                            this.initLoop();
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
                this.operData = this.$common.copyObj(ContentLoop);
            }
        }
    }
</script>

<style scoped lang="less">

</style>

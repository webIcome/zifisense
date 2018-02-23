<template>
  <div class="content-right">
    <div class="clearfix">
      <div class="search pull-left">
        <form class="form-inline default-form">
          <div class="form-group">
            <label class="sr-only">设备名称：</label>
            <el-input type="text" v-model="searchParams.devicename" placeholder="输入设备名称"></el-input>
          </div>
          <div class="form-group">
            <label class="sr-only">类型：</label>
            <el-select v-model="searchParams.switchstate" placeholder="选择类型" clearable >
              <el-option v-for="item in deviceType" :key="item.value" :value="item.value" :label="item.text"></el-option>
            </el-select>
          </div>
          <div class="form-group">
            <label class="sr-only">应用状态：</label>
            <el-select v-model="searchParams.switchstate" placeholder="选择应用状态" clearable >
              <el-option v-for="status in deviceType" :key="status.value" :value="status.value" :label="status.text"></el-option>
            </el-select>
          </div>
          <div @click="search" class="form-group default-btn"><span class="quick-search-icon default-icon"></span>快速筛选</div>
          <div class="pull-right">
            <div @click="dialogAddGroup" class="default-btn"><span class="add-icon default-icon"></span>创建组</div>
          </div>
        </form>
      </div>

    </div>
    <div class="table center">
      <table class="table table-hover table-striped">
        <thead>
        <th>名称</th>
        <th>类型</th>
        <th>数量</th>
        <th>策略</th>
        <th>应用状态</th>
        <th>操作</th>
        </thead>
        <tbody>
        <tr v-for="item in list" @click="showDetail($event, item)">
          <td>{{item.devicename}}</td>
          <td>{{item.sn}}</td>
          <td>{{item.position}}</td>
          <td>{{(item.switchstate == 1)? '开':'关'}}</td>
          <td>{{item.brightness}}</td>
          <td class="td-btns">
            <div class="icon-item"><span @click="dialogSetGroup" class="set-icon"></span></div>
            <div class="icon-item"><span @click="dialogEditGroup" class="edit-icon"></span></div>
            <div class="icon-item"><span @click="dialogRepealGroup" class="repeal-icon"></span></div>
            <div class="icon-item"><span @click="dialogDeleteGroup" class="delete-icon"></span></div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <paging-component v-if="searchParams.pages" :pageNumber="searchParams.pageNum" :pages="searchParams.pages"
                      @pagingEvent='pagingEvent'></paging-component>
    <el-dialog title="创建组" :visible.sync="addGroupDialogVisible" center :width="'600px'">
      <el-form label-width="170px" :model="addGroupData"  ref="addGroup" class="el-form-default">
        <el-form-item label="名称：" prop="switchstate">
          <el-input type="text" v-model="addGroupData.devicename" placeholder="输入设备名称"></el-input>
        </el-form-item>
        <el-form-item label="类型：" prop="deviceType">
          <el-select v-model="addGroupData.deviceType" placeholder="选择类型" clearable >
            <el-option v-for="item in deviceType" :key="item.value" :value="item.value" :label="item.text"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备：" prop="deviceType">
          <el-row type="flex" justify="space-between">
            <el-col :span="18">{{devices[0].devicename}} 等{{devices.length}}个设备</el-col>
            <el-button :span="6" type="primary" icon="el-icon-edit-outline" @click="dialogEditGroup">编辑</el-button>
          </el-row>
        </el-form-item>
        <el-form-item label="策略：" prop="deviceType">
          <el-select v-model="addGroupData.deviceType" placeholder="请选择" clearable >
            <el-option v-for="item in deviceType" :key="item.value" :value="item.value" :label="item.text"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addGroup('addGroup')">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="编辑设备列表" :visible.sync="editGroupDialogVisible" center :width="'600px'">
      <el-form :inline="true" label-width="170px" :model="editGroupData"  ref="editGroup" >
        <el-form-item prop="switchstate">
          <el-input type="text" v-model="addGroupData.devicename" placeholder="输入设备名称"></el-input>
        </el-form-item>
        <el-form-item prop="deviceType">
          <el-select v-model="addGroupData.deviceType" placeholder="选择类型" clearable >
            <el-option v-for="item in deviceType" :key="item.value" :value="item.value" :label="item.text"></el-option>
          </el-select>
        </el-form-item>
        <el-button type="primary" @click="searchDevice()" icon="el-icon-search">筛选</el-button>
      </el-form>
      <div>
        <div style="margin-bottom: 20px">
          <el-button type="primary" @click="chooseAllDevices(devices)">全选</el-button>
          <el-button type="primary" @click="chooseAllDevices()">全不选</el-button>
        </div>
        <el-table ref="multiplyTable" :data="devices" border class="table">
          <el-table-column type="selection" align="center"></el-table-column>
          <el-table-column label="组名称" prop="devicename" align="center"></el-table-column>
          <el-table-column label="设备ID" prop="sn" align="center"></el-table-column>
          <el-table-column label="类型" prop="type" align="center"></el-table-column>
        </el-table>
        <paging-component v-if="searchDeviceParams.pages" :pageNumber="searchDeviceParams.pageNum" :pages="searchDeviceParams.pages"
                          @pagingEvent='pagingDeviceEvent'></paging-component>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addGroup('editGroup')">确 定</el-button>
      </span>
    </el-dialog>

<!--    <el-dialog title="控制灯控器" :visible.sync="controlDeviceDialogVisible" center :width="'600px'">
      <el-form label-width="170px" :model="operData"  ref="controlDevice">
        <el-form-item label="开关：" prop="switchstate">
          <el-input v-model="operData.switchstate" label="1">开</el-input>
          <el-radio v-model="operData.switchstate" label="2">关</el-radio>
        </el-form-item>
        <el-form-item label="亮度：" prop="brightness">
          <el-slider
              v-model="operData.brightness"
              show-input>
          </el-slider>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="controlDevice('controlDevice')">确 定</el-button>
      </span>
    </el-dialog>-->

  </div>

</template>

<script>
    import RestfulConstant from "../../../constants/restful";
    import Config from "../../../config";
    let LampContent = {
        switchstate: '',
        brightness: '',
        runningstate: ''
    };
    export default {
        name: 'controlSingleLampPage',
        data() {
            return {
                addGroupDialogVisible: false,
                setGroupDialogVisible: false,
                editGroupDialogVisible: false,
                repealGroupDialogVisible: false,
                deleteGroupDialogVisible: false,
                searchParams: {
                    devicename: '',
                    sn: '',
                    type: '',
                },
                searchDeviceParams: {
                    devicename: '',
                    sn: '',
                    pages: 1,
                    pageNum: 0
                },
                setGroupData: {},
                addGroupData: {},
                editGroupData:{},
                repealGroupData:{},
                deleteGroupData:{},
                devices: [{devicename: 'ddddd', sn: '', type:''},{devicename: 'ddddd', sn: '', type:''}],
                groups: [{name: '分组1'}, {name: '分组2'}],
                isSearchPage: false,
                list: [{}],
                companies: [],
                deviceType: [
                    {value: '', text: '全部'},
                    {value: 1, text: '灯控器'},
                    {value: 2, text: '回路控制器'},
                    {value: 3, text: '控制面板'},
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
        created: function () {
            this.initData()
        },
        methods: {
            initData: function () {
                this.initLamp();
                this.initCompanies();
                this.initOperData();
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
                this.operData = this.$common.copyObj(LampContent);
            },
            pagingEvent: function (pageNumber) {
                this.searchParams.pageNum = pageNumber;
                this.findList(this.searchParams);
            },
            findList: function (params) {
                this.$http.get('lightController/getList', {params: params}).then(res => {
                    this.searchParams.pageNum = res.body.data.pageNum;
                    this.searchParams.pages = res.body.data.pages;
                    this.searchParams.pageSize = res.body.data.pageSize;
                    this.list = res.body.data.list;
                }).catch(err => {

                })
            },
            pagingDeviceEvent: function (pageNumber) {
                this.searchDeviceParams.pageNum = pageNumber;
                this.findDevice(this.searchDeviceParams);
            },
            findDevice: function (params) {
                this.$http.get('', {params: params}).then(res => {
                    this.searchDeviceParams.pageNum = res.body.data.pageNum;
                    this.searchDeviceParams.pages = res.body.data.pages;
                    this.searchDeviceParams.pageSize = res.body.data.pageSize;
                    this.devices = res.body.data.list;
                })
            },
            search: function () {
                this.findList(Object.assign(this.searchParams, this.defaultPaging));
            },
            searchDevice: function () {

            },
            chooseAllDevices: function (devices) {
                if (devices) {
                    devices.forEach(item => {
                        this.$refs.multiplyTable.toggleRowSelection(item, true);
                    })
                } else {
                    this.$refs.multiplyTable.clearSelection();
                }
            },
            dialogAddGroup: function () {
                this.resetData();
                this.addGroupDialogVisible = true;
            },
            dialogSetGroup: function () {
                this.resetData();
                this.setGroupDialogVisible = true;
            },
            dialogEditGroup: function () {
                this.resetData();
                this.findDevice(this.defaultPaging);
                this.editGroupDialogVisible = true;
            },
            dialogRepealGroup: function () {
                this.resetData();
                this.repealGroupDialogVisible = true;
            },
            dialogDeleteGroup: function () {
                this.resetData();
                this.deleteGroupDialogVisible = true;
            },
            addGroup:function (formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {

                    }
                })
            },
            setGroup:function (formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {

                    }
                })
            },
            editGroup:function (formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {

                    }
                })
            },
            repealGroup:function (formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {

                    }
                })
            },
            deleteGroup:function (formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {

                    }
                })
            },
            getDevice: function (id) {
                return this.$http.post('lightController/getDetailsBySn', {sn: id}).then(res => {
                    return res.body.data
                }).catch()
            },
            controlDevice: function (formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        this.$http.post('lightController/add', this.operData).then(res => {
                            this.initLamp();
                            this.hideModal();
                        });
                    }
                })
            },
            hideModal: function () {
                this.addGroupDialogVisible = false;
                this.setGroupDialogVisible = false;
                this.editGroupDialogVisible = false;
                this.repealGroupDialogVisible = false;
                this.deleteGroupDialogVisible = false;
            },
            resetData: function () {
                this.operData = this.$common.copyObj(LampContent);
            }

        }
    }
</script>

<style scoped lang="less">

</style>

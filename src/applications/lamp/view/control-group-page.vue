<template>
  <div class="content-right">
    <div class="clearfix">
      <div class="search pull-left">
        <form class="form-inline default-form">
          <div class="form-group">
            <label class="sr-only">名称：</label>
            <el-input type="text" v-model="searchParams.groupname" placeholder="输入设备名称"></el-input>
          </div>
          <div class="form-group">
            <label class="sr-only">类型：</label>
            <el-select v-model="searchParams.moduletype" placeholder="选择类型" clearable >
              <el-option v-for="item in deviceType" :key="item.value" :value="item.value" :label="item.text"></el-option>
            </el-select>
          </div>
          <div class="form-group">
            <label class="sr-only">应用状态：</label>
            <el-select v-model="searchParams.switchstate" placeholder="选择应用状态" clearable >
              <el-option v-for="status in deviceState" :key="status.value" :value="status.value" :label="status.text"></el-option>
            </el-select>
          </div>
          <div @click="search" class="form-group default-btn"><span class="quick-search-icon default-icon"></span>快速筛选</div>
          <div class="pull-right">
            <div @click="dialogAddGroup" class="default-btn"><span class="add-icon default-icon"></span>创建组</div>
          </div>
        </form>
      </div>

    </div>
    <div class="my-table center">
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
          <td>{{item.groupname}}</td>
          <td>{{item.moduletype | deviceTypeNameConverter}}</td>
          <td>{{item.deviceTotal}}</td>
          <td>{{item.strategyName}}</td>
          <td>{{item.state | deviceStateNameConverter}}</td>
          <td class="td-btns">
            <div class="icon-item"><span @click="dialogSetGroup(item)" class="set-icon"></span></div>
            <div class="icon-item"><span @click="dialogEditGroup(item)" class="edit-icon"></span></div>
            <div class="icon-item"><span @click="dialogRepealGroup(item)" class="repeal-icon"></span></div>
            <div class="icon-item"><span @click="dialogRepealGroup(item)" class="issue-icon"></span></div>
            <div class="icon-item"><span @click="dialogDeleteGroup(item)" class="delete-icon"></span></div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <paging-component v-if="searchParams.pages" :pageNumber="searchParams.pageNum" :pages="searchParams.pages"
                      @pagingEvent='pagingEvent'></paging-component>
    <el-dialog title="创建组" :visible.sync="addGroupDialogVisible" center :width="'600px'">
      <el-form label-width="100px" :model="addGroupData"  ref="addGroup" class="el-form-default">
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
            <el-col :span="18" v-if="selectedListArray.length">{{selectedListArray[0].devicename}} 等{{selectedListArray.length}}个设备</el-col>
            <el-col :span="18" v-else>0个设备</el-col>
            <el-button :span="6" type="primary" icon="el-icon-edit-outline" @click="dialogEditDevice">编辑</el-button>
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
    <el-dialog title="编辑组" :visible.sync="editGroupDialogVisible" center :width="'600px'">
      <el-form label-width="100px" :model="editGroupData"  ref="editGroup" class="el-form-default">
        <el-form-item label="名称：" prop="switchstate">
          <el-input type="text" v-model="editGroupData.devicename" placeholder="输入设备名称"></el-input>
        </el-form-item>
        <el-form-item label="类型：" prop="deviceType">
          <el-select v-model="editGroupData.deviceType" placeholder="选择类型" clearable >
            <el-option v-for="item in deviceType" :key="item.value" :value="item.value" :label="item.text"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备：" prop="deviceType">
          <el-row type="flex" justify="space-between">
            <el-col :span="18" v-if="selectedListArray.length">{{selectedListArray[0].devicename}} 等{{selectedListArray.length}}个设备</el-col>
            <el-col :span="18" v-else>0个设备</el-col>
            <el-button :span="6" type="primary" icon="el-icon-edit-outline" @click="dialogEditDevice">编辑</el-button>
          </el-row>
        </el-form-item>
        <el-form-item label="策略：" prop="deviceType">
          <el-select v-model="editGroupData.deviceType" placeholder="请选择" clearable >
            <el-option v-for="item in deviceType" :key="item.value" :value="item.value" :label="item.text"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editGroup('editGroup')">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="编辑设备列表" :visible.sync="editDeviceDialogVisible" center :width="'600px'">
      <el-form :inline="true" label-width="170px" :model="searchDeviceParams"  ref="editGroup" >
        <el-form-item prop="switchstate">
          <el-input type="text" v-model="searchDeviceParams.devicename" placeholder="输入设备名称"></el-input>
        </el-form-item>
        <el-form-item prop="deviceType">
          <el-select v-model="searchDeviceParams.deviceType" placeholder="选择类型" clearable >
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
        <el-table ref="multiplyTable" :data="devices" border class="table" @selection-change="handleSelectionChange">
          <el-table-column type="selection" align="center"></el-table-column>
          <el-table-column label="组名称" prop="devicename" align="center"></el-table-column>
          <el-table-column label="设备ID" prop="sn" align="center"></el-table-column>
          <el-table-column label="类型" prop="type" align="center"></el-table-column>
        </el-table>
        <paging-component v-if="searchDeviceParams.pages" :pageNumber="searchDeviceParams.pageNum" :pages="searchDeviceParams.pages"
                          @pagingEvent='pagingDeviceEvent'></paging-component>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmSelectedList">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog :visible.sync="setGroupDialogVisible" center :width="'500px'">
      <span slot="title" class="el-dialog__title">控制组：{{}}</span>
      <el-form label-width="100px" :model="setGroupData"  ref="setGroup" class="el-form-default">
        <el-form-item label="回路：" prop="switchstate">
          <el-radio v-model="setGroupData.switchstate" label="1">开</el-radio>
          <el-radio v-model="setGroupData.switchstate" label="2">关</el-radio>
        </el-form-item>
        <el-form-item label="DI口：" prop="switchstate">
          <el-radio v-model="setGroupData.switchstate" label="1">开</el-radio>
          <el-radio v-model="setGroupData.switchstate" label="2">关</el-radio>
        </el-form-item>
        <el-form-item label="电压：" prop="">
          <el-input type="text" v-model="setGroupData.loopnum"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="setGroup('setGroup')">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="策略撤销" :visible.sync="repealGroupDialogVisible" center :width="'600px'">
      <p class="text-center">您确认要将已生效的策略 <span style="color: #1789e1">“{{repealGroupData.name}}”</span></p>
      <p class="text-center">从您的选中的组 <span style="color: #1789e1">“{{repealGroupData.name}}”</span> 中撤销吗？</p>
      <p class="text-center">您的应用将会实时生效，并被系统操作日志记录！</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="repealGroup">确认</el-button>
      </span>
    </el-dialog>
    <el-dialog title="删除组" :visible.sync="deleteGroupDialogVisible" center :width="'600px'">
      <p class="text-center">您确认要删除您选中的组 <span style="color: #1789e1">“{{deleteGroupData.name}}”</span>吗？</p>
      <p class="text-center">您的应用将会实时生效，并被系统操作日志记录！</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="deleteGroup">确认</el-button>
      </span>
    </el-dialog>

  </div>

</template>

<script>
    import RestfulConstant from "../../../constants/restful";
    import Config from "../../../config";
    import Services from '../services';
    import Common from "../../../constants/common";
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
                editDeviceDialogVisible: false,
                repealGroupDialogVisible: false,
                issueGroupDialogVisible: false,
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
                    pageNum: 1
                },
                setGroupData: {},
                addGroupData: {},
                editGroupData:{},
                repealGroupData:{},
                issueGroupData:{},
                deleteGroupData:{},
                devices: [],
                isSearchPage: false,
                list: [{}],
                companies: [],
                deviceState: [],
                deviceType: [],
                defaultPaging: {
                    pageSize: Config.DEFAULT_PAGE_SIZE,
                    pageNum: 1
                },
                selectedList: {},
                selectedListCache: {},
            }
        },
        computed: {
            selectedListArray: function () {
                return Object.keys(this.selectedList).map(key => {
                    return this.selectedList[key];
                })
            },
            selectedListCacheArray: function () {
                return Object.keys(this.selectedListCache).map(key => {
                    return this.selectedListCache[key];
                })
            }
        },
        created: function () {
            this.initData()
        },
        methods: {
            initData: function () {
                this.initList();
                this.initCompanies();
                this.initOperData();
                this.initCommonData();
            },
            initList: function () {
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
            initCommonData: function () {
                this.deviceType = Common.deviceType;
                this.deviceState = Common.deviceState;
            },
            pagingEvent: function (pageNumber) {
                this.searchParams.pageNum = pageNumber;
                this.findList(this.searchParams);
            },
            findList: function (params) {
               Services.findGroupList(params).then(data => {
                    this.searchParams.pageNum = data.pageNum;
                    this.searchParams.pages = data.pages;
                    this.searchParams.pageSize = data.pageSize;
                    this.list = data.list;
                })
            },
            pagingDeviceEvent: function (pageNumber) {
                this.searchDeviceParams.pageNum = pageNumber;
                this.findDeviceList(this.searchDeviceParams);
            },
            findDeviceList: function (params) {
                let findList;
                switch (Number(this.addGroupData.deviceType || this.editGroupData.deviceType)) {
                    case 1:
                        findList = Services.findLightList;
                        break;
                    case 2:
                        findList = Services.findLoopList;
                        break;
                    case 3:
                        findList = Services.findPanelList;
                        break;
                    default:
                        this.$message({
                            message: '请先选择类型',
                            type: 'warning'
                        });
                }
                findList(params).then(data => {
                    this.searchDeviceParams.pageNum = data.pageNum;
                    this.searchDeviceParams.pages = data.pages;
                    this.searchDeviceParams.pageSize = data.pageSize;
                    this.devices = data.list;
                    this.$nextTick(() => {
                        this.chooseAllDevices(this.getNewSelectedList(data.list))
                    })
                });
            },
            getNewSelectedList: function (list) {
                return list.filter(item => {
                    if (this.selectedList[item.sn]){
                        return true;
                    }
                })
            },
            search: function () {
                this.findList(Object.assign(this.searchParams, this.defaultPaging));
            },
            searchDevice: function () {
                this.findList(Object.assign(this.searchDeviceParams, this.defaultPaging));
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
            handleSelectionChange: function (val) {
                this.devices.forEach(item => {
                    if (this.selectedListCache[item.sn]) {
                        delete this.selectedListCache[item.sn];
                    }
                });
                val.forEach(item => {
                    this.selectedListCache[item.sn] = item;
                });
            },
            confirmSelectedList: function () {
                this.selectedList = this.selectedListCache;
                this.hideSecondModal();
            },
            dialogAddGroup: function () {
                this.resetData();
                this.addGroupDialogVisible = true;
            },
            dialogSetGroup: function (item) {
                this.resetData();
                this.setGroupDialogVisible = true;
            },
            dialogEditGroup: function (item) {
                this.resetData();
                this.editGroupData = item;
                this.editGroupDialogVisible = true;
            },
            dialogEditDevice: function (item) {
                this.findDeviceList(this.defaultPaging);
                this.editDeviceDialogVisible = true;
            },
            dialogRepealGroup: function (item) {
                this.resetData();
                this.repealGroupData = item;
                this.repealGroupDialogVisible = true;
            },
            dialogIssueGroup: function (item) {
                this.resetData();
                this.issueGroupData = item;
                this.issueGroupDialogVisible = true;
            },
            dialogDeleteGroup: function (item) {
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
                        Services.editGroup(this.editGroupData).then(res => {
                            this.hideModal();
                            this.initList();
                        })
                    }
                })
            },
            repealGroup:function () {
                Services.runStrategyGroup({groupID: this.repealGroupData.objectid, strategyID: this.repealGroupData.strategyID}).then(res => {
                    this.hideModal();
                    this.initList();
                })
            },
            issueGroup: function () {
                Services.stopStrategyGroup({groupID: this.repealGroupData.objectid, strategyID: this.repealGroupData.strategyID}).then(res => {
                    this.hideModal();
                    this.initList();
                })
            },
            deleteGroup:function () {
                Services.deleteGroup(this.deleteGroupData.objectid).then(res => {
                    this.hideModal();
                    this.initList();
                })
            },
            hideModal: function () {
                this.addGroupDialogVisible = false;
                this.setGroupDialogVisible = false;
                this.editGroupDialogVisible = false;
                this.repealGroupDialogVisible = false;
                this.issueGroupDialogVisible = false;
                this.deleteGroupDialogVisible = false;
            },
            hideSecondModal: function () {
                this.editDeviceDialogVisible = false;
            },
            resetData: function () {
                this.setGroupData = {};
                this.addGroupData = {};
                this.editGroupData = {};
                this.repealGroupData = {};
                this.issueGroupData = {};
                this.deleteGroupData = {};
                this.selectedList = {};
                this.selectedListCache = {};
            },
            resetSecondModal: function () {
                this.devices = [];
            }
        }
    }
</script>

<style scoped lang="less">

</style>

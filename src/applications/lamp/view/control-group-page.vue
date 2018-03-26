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
            <label class="sr-only">策略执行状态：</label>
            <el-select v-model="searchParams.strategystate" placeholder="选择策略执行状态" clearable >
              <el-option v-for="status in strategyState" :key="status.value" :value="status.value" :label="status.text"></el-option>
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
        <th>策略执行状态</th>
        <th>操作</th>
        </thead>
        <tbody>
        <tr v-for="item in list">
          <td>{{item.groupname}}</td>
          <td>{{item.moduletype | deviceTypeNameConverter}}</td>
          <td>{{item.deviceTotal}}</td>
          <td>{{item.strategyname}}</td>
          <td>{{item.strategystate | strategyStateNameConverter}}</td>
          <td class="td-btns">
            <control-light-dialog-component v-if="item.moduletype == moduleType.light" :device="item"></control-light-dialog-component>
            <control-loop-dialog-component v-if="item.moduletype == moduleType.loop" :device="item"></control-loop-dialog-component>
            <control-panel-dialog-component v-if="item.moduletype == moduleType.panel" :device="item"></control-panel-dialog-component>
            <div class="icon-item"><span @click="dialogEditGroup(item)" class="edit-icon"></span></div>
            <div class="icon-item" v-show="item.strategystate == 2"><span @click="dialogRepealGroup(item)" class="repeal-icon"></span></div>
            <div class="icon-item" v-show="item.strategystate == 1"><span @click="dialogIssueGroup(item)" class="issue-icon"></span></div>
            <div class="icon-item"><span @click="dialogDeleteGroup(item)" class="delete-icon"></span></div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <paging-component v-if="searchParams.pages" :pageNumber="searchParams.pageNum" :pages="searchParams.pages"
                      @pagingEvent='pagingEvent'></paging-component>
    <el-dialog title="创建组" :visible.sync="addGroupDialogVisible" center :width="'600px'">
      <el-form label-width="100px" :model="addGroupData" :rules="Rules"  ref="addGroup" class="el-form-default">
        <el-form-item label="名称：" prop="groupname">
          <el-input type="text" v-model="addGroupData.groupname" placeholder="输入设备名称"></el-input>
        </el-form-item>
        <el-form-item label="企业：" prop="companyid">
          <tree-select-component v-model="addGroupData.companyid" :list="companies"></tree-select-component>
        </el-form-item>
        <el-form-item label="类型：" prop="moduletype">
          <el-select v-model="addGroupData.moduletype" placeholder="选择类型" clearable >
            <el-option v-for="item in deviceType" :key="item.value" :value="item.value" :label="item.text"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备：" prop="deviceid">
          <edit-group-component v-model="addGroupData.deviceid"
                                :groupid="addGroupData.objectid"
                                :run="addGroupDialogVisible"
                                :moduletype="addGroupData.moduletype"
                                :companyid="addGroupData.companyid"></edit-group-component>
        </el-form-item>
        <el-form-item label="策略：" prop="strategyid">
          <select-strategy-component v-model="addGroupData.strategyid"
                                     :strategyName="addGroupData.strategyname"
                                     @strategyname="addGroupData.strategyname = arguments[0]"
                                     :modultype="addGroupData.moduletype"></select-strategy-component>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addGroup('addGroup')">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="编辑组" :visible.sync="editGroupDialogVisible" center :width="'600px'">
      <el-form label-width="100px" :model="editGroupData" :rules="Rules"  ref="editGroup" class="el-form-default">
        <el-form-item label="名称：" prop="groupname">
          <el-input type="text" v-model="editGroupData.groupname" placeholder="输入设备名称"></el-input>
        </el-form-item>
        <el-form-item label="企业：" prop="companyid">
          <tree-select-component v-model="editGroupData.companyid" :list="companies"></tree-select-component>
        </el-form-item>
        <el-form-item label="类型：" prop="moduletype">
          <el-select v-model="editGroupData.moduletype" placeholder="选择类型" clearable >
            <el-option v-for="item in deviceType" :key="item.value" :value="item.value" :label="item.text"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备：" prop="deviceid">

          <edit-group-component v-model="editGroupData.deviceid"
                                      :groupid="editGroupData.objectid"
                                :run="editGroupDialogVisible"
                                      :moduletype="editGroupData.moduletype"
                                      :companyid="editGroupData.companyid"></edit-group-component>
        </el-form-item>
        <el-form-item label="策略：" prop="strategyid">
          <select-strategy-component v-model="editGroupData.strategyid"
                                     :strategyName="editGroupData.strategyname"
                                     @strategyname="editGroupData.strategyname = arguments[0]"
                                     :modultype="editGroupData.moduletype"></select-strategy-component>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editGroup('editGroup')">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="策略撤销" :visible.sync="repealGroupDialogVisible" center :width="'600px'">
      <p class="text-center">您确认要将已生效的策略 <span style="color: #1789e1">“{{repealGroupData.strategyname}}”</span></p>
      <p class="text-center">从您的选中的组 <span style="color: #1789e1">“{{repealGroupData.strategyname}}”</span> 中撤销吗？</p>
      <p class="text-center">您的应用将会实时生效，并被系统操作日志记录！</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="repealGroup">确认</el-button>
      </span>
    </el-dialog>
    <el-dialog title="下发策略" :visible.sync="issueGroupDialogVisible" center :width="'600px'">
      <p class="text-center">您确认要将策略：<span style="color: #1789e1">“{{issueGroupData.strategyname}}”</span></p>
      <p class="text-center">下发到您的选中的组：<span style="color: #1789e1">“{{issueGroupData.groupname}}”</span> 吗？</p>
      <p class="text-center">您的应用将会实时生效，并被系统操作日志记录！</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="issueGroup">确认</el-button>
      </span>
    </el-dialog>
    <el-dialog title="删除组" :visible.sync="deleteGroupDialogVisible" center :width="'600px'">
      <p class="text-center">您确认要删除您选中的组 <span style="color: #1789e1">“{{deleteGroupData.groupname}}”</span>吗？</p>
      <p class="text-center">您的应用将会实时生效，并被系统操作日志记录！</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="deleteGroup">确认</el-button>
      </span>
    </el-dialog>

  </div>

</template>

<script>
    import Config from "../../../config";
    import Services from '../services';
    import Common from "../../../constants/common";
    import controlLightDialogComponent from './control-light-dialog-component.vue';
    import controlLoopDialogComponent from './control-loop-dialog-component.vue';
    import controlPanelDialogComponent from './control-panel-dialog-component.vue'
    import editGroupComponent from "./edit-group-component";
    import selectStrategyComponent from './select-strategy-component.vue'
    export default {
        name: 'controlGroupPage',
        components: {
            editGroupComponent,
            controlLightDialogComponent,
            controlLoopDialogComponent,
            controlPanelDialogComponent,
            selectStrategyComponent
        },
        data() {
            return {
                addGroupDialogVisible: false,
                editGroupDialogVisible: false,
                repealGroupDialogVisible: false,
                issueGroupDialogVisible: false,
                deleteGroupDialogVisible: false,
                Rules: {
                    groupname: [
                        {required: true, message: '请输入名称'}
                    ],
                    companyid: [
                        {required: true, message: '请选择企业'}
                    ],
                    moduletype: [
                        {required: true, message: '请选择类型'}
                    ],
                    deviceid: [
                        {required: true, message: '请选择设备'}
                    ],
                    strategyid: [
                        {required: true, message: '请选择策略'}
                    ],
                },
                searchParams: {
                    devicename: '',
                    sn: '',
                    type: '',
                },
                setGroupData: {},
                addGroupData: {},
                editGroupData:{},
                repealGroupData:{},
                issueGroupData:{},
                deleteGroupData:{},
                list: [{}],
                companies: [],
                strategyState: [],
                deviceType: [],
                moduleType: {
                },
                defaultPaging: {
                    pageSize: Config.DEFAULT_PAGE_SIZE,
                    pageNum: 1
                },
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
            },
            initCommonData: function () {
                this.deviceType = Common.deviceType;
                this.strategyState = Common.strategyState;
                this.deviceType.forEach(item => {
                    this.moduleType[item.name] = item.value;
                })
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
            search: function () {
                this.findList(Object.assign(this.searchParams, this.defaultPaging));
            },
            dialogAddGroup: function () {
                this.resetData();
                this.addGroupDialogVisible = true;
            },
            dialogEditGroup: function (item) {
                this.resetData();
                this.editGroupData = {
                    objectid: item.objectid,
                    companyid: item.companyid,
                    groupname: item.groupname,
                    moduletype: item.moduletype,
                    strategyid: item.strategyid,
                    strategyname: item.strategyname
                };
                this.editGroupDialogVisible = true;
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
                this.deleteGroupData = item;
                this.deleteGroupDialogVisible = true;
            },
            addGroup:function (formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        Services.addGroup(this.addGroupData).then(res => {
                            this.hideModal();
                            this.initList();
                        })
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
                Services.stopStrategyGroup({groupid: this.repealGroupData.objectid, strategyid: this.repealGroupData.strategyid}).then(res => {
                    this.hideModal();
                    this.initList();
                })
            },
            issueGroup: function () {
                Services.runStrategyGroup({groupid: this.issueGroupData.objectid, strategyid: this.issueGroupData.strategyid}).then(res => {
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
                this.editGroupDialogVisible = false;
                this.repealGroupDialogVisible = false;
                this.issueGroupDialogVisible = false;
                this.deleteGroupDialogVisible = false;
            },
            resetData: function () {
                this.addGroupData = {};
                this.editGroupData = {};
                this.repealGroupData = {};
                this.issueGroupData = {};
            },
        }
    }
</script>

<style scoped lang="less">

</style>

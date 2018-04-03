<template>
  <div class="content-right">
    <div class="clearfix">
      <div class="search pull-left">
        <form class="form-inline default-form">
          <div class="form-group">
            <label class="sr-only">区域名称：</label>
            <el-input type="text" v-model="searchParams.areaname" placeholder="输入区域名称" clearable></el-input>
          </div>
          <div class="form-group">
            <label class="sr-only">类型：</label>
            <el-select v-model="searchParams.moduletype" placeholder="选择类型" clearable >
              <el-option v-for="item in deviceType" :key="item.value" :value="item.value" :label="item.text"></el-option>
            </el-select>
          </div>
          <div class="form-group">
            <label class="sr-only">策略状态：</label>
            <el-select v-model="searchParams.strategystate" placeholder="选择策略状态" clearable >
              <el-option v-for="status in strategyState" :key="status.value" :value="status.value" :label="status.text"></el-option>
            </el-select>
          </div>
          <div @click="search" class="form-group default-btn"><span class="quick-search-icon default-icon"></span>快速筛选</div>
          <div class="pull-right">
            <div @click="dialogAddArea" class="default-btn"><span class="add-icon default-icon"></span>创建区域</div>
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
          <td>{{item.areaname}}</td>
          <td>{{item.moduletype | deviceTypeNameConverter}}</td>
          <td>{{item.groupTotal}}</td>
          <td>{{item.strategyname}}</td>
          <td>{{item.strategystate | strategyStateNameConverter}}</td>
          <td class="td-btns">
            <control-light-dialog-component v-if="item.moduletype == moduleType.light" :device="item"></control-light-dialog-component>
            <control-loop-dialog-component v-if="item.moduletype == moduleType.loop" :device="item"></control-loop-dialog-component>
            <control-panel-dialog-component v-if="item.moduletype == moduleType.panel" :device="item"></control-panel-dialog-component>
            <div class="icon-item"><span @click="dialogEditArea(item)" class="edit-icon"></span></div>
            <div class="icon-item" v-show="item.strategystate == 2"><span @click="dialogRepealArea(item)" class="repeal-icon"></span></div>
            <div class="icon-item" v-show="item.strategystate == 1"><span @click="dialogIssueArea(item)" class="issue-icon"></span></div>
            <div class="icon-item"><span @click="dialogDeleteArea(item)" class="delete-icon"></span></div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <paging-component v-if="searchParams.pages" :pageNumber="searchParams.pageNum" :pages="searchParams.pages"
                      @pagingEvent='pagingEvent'></paging-component>
    <el-dialog title="创建区域" :visible.sync="addAreaDialogVisible" center :width="'600px'" @close="resetData" @open="clearValidate('addArea')">
      <el-form label-width="100px" :model="addAreaData" :rules="Rules"  ref="addArea" class="el-form-default">
        <el-form-item label="名称：" prop="areaname">
          <el-input type="text" v-model.trim="addAreaData.areaname" placeholder="输入名称"></el-input>
        </el-form-item>
        <el-form-item label="企业：" prop="companyid">
          <tree-select-component v-model="addAreaData.companyid" :list="companies"></tree-select-component>
        </el-form-item>
        <el-form-item label="类型：" prop="moduletype">
          <el-select v-model="addAreaData.moduletype" placeholder="选择类型" clearable >
            <el-option v-for="item in deviceType" :key="item.value" :value="item.value" :label="item.text"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="组：" prop="groupid">
         <edit-area-group-component v-model="addAreaData.groupid"
                                :areaid="addAreaData.objectid"
                                :run="addAreaDialogVisible"
                                :moduletype="addAreaData.moduletype"
                                :companyid="addAreaData.companyid"></edit-area-group-component>
        </el-form-item>
        <el-form-item v-if="addAreaData.moduletype != moduleType.panel" label="策略：" prop="strategyid">
          <select-strategy-component v-model="addAreaData.strategyid"
                                     :strategyName="addAreaData.strategyname"
                                     :companyId="addAreaData.companyid"
                                     @strategyname="addAreaData.strategyname = arguments[0]"
                                     :moduletype="addAreaData.moduletype"></select-strategy-component>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addArea('addArea')">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="编辑区域" :visible.sync="editAreaDialogVisible" center :width="'600px'" @close="resetData" @open="clearValidate('editArea')">
      <el-form label-width="100px" :model="editAreaData" :rules="Rules" ref="editArea" class="el-form-default">
        <el-form-item label="名称：" prop="areaname">
          <el-input type="text" v-model.trim="editAreaData.areaname" placeholder="输入名称"></el-input>
        </el-form-item>
        <el-form-item label="企业：" prop="companyid">
          <tree-select-component v-model="editAreaData.companyid" :list="companies"></tree-select-component>
        </el-form-item>
        <el-form-item label="类型：" prop="moduletype">
          <el-select v-model="editAreaData.moduletype" placeholder="选择类型" clearable >
            <el-option v-for="item in deviceType" :key="item.value" :value="item.value" :label="item.text"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="组：" prop="groupid">
          <edit-area-group-component v-model="editAreaData.groupid"
                                :areaid="editAreaData.objectid"
                                :run="editAreaDialogVisible"
                                :moduletype="editAreaData.moduletype"
                                :companyid="editAreaData.companyid"></edit-area-group-component>
        </el-form-item>
        <el-form-item v-if="editAreaData.moduletype != moduleType.panel" label="策略：" prop="strategyid">
          <select-strategy-component v-model="editAreaData.strategyid"
                                     :strategyName="editAreaData.strategyname"
                                     :companyId="editAreaData.companyid"
                                     @strategyname="editAreaData.strategyname = arguments[0]"
                                     :moduletype="editAreaData.moduletype"></select-strategy-component>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editArea('editArea')">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="策略撤销" :visible.sync="repealAreaDialogVisible" center :width="'600px'">
      <p class="text-center">您确认要将已生效的策略 <span style="color: #1789e1">“{{repealAreaData.strategyname}}”</span></p>
      <p class="text-center">从您的选中的区域 <span style="color: #1789e1">“{{repealAreaData.areaname}}”</span> 中撤销吗？</p>
      <p class="text-center">您的应用将会实时生效，并被系统操作日志记录！</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="repealArea">确认</el-button>
      </span>
    </el-dialog>
    <el-dialog title="下发策略" :visible.sync="issueAreaDialogVisible" center :width="'600px'">
      <p class="text-center">您确认要将策略：<span style="color: #1789e1">“{{issueAreaData.strategyname}}”</span></p>
      <p class="text-center">下发到您的选中的区域：<span style="color: #1789e1">“{{issueAreaData.areaname}}”</span> 吗？</p>
      <p class="text-center">您的应用将会实时生效，并被系统操作日志记录！</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="issueArea">确认</el-button>
      </span>
    </el-dialog>
    <el-dialog title="删除区域" :visible.sync="deleteAreaDialogVisible" center :width="'600px'">
      <p class="text-center">您确认要删除您选中的区域 <span style="color: #1789e1">“{{deleteAreaData.areaname}}”</span>吗？</p>
      <p class="text-center">您的应用将会实时生效，并被系统操作日志记录！</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="deleteArea">确认</el-button>
      </span>
    </el-dialog>

  </div>

</template>

<script>
    import Config from "../../../config";
    import Services from "../services";
    import controlLightDialogComponent from './control-light-dialog-component.vue';
    import controlLoopDialogComponent from './control-loop-dialog-component.vue';
    import controlPanelDialogComponent from './control-panel-dialog-component.vue'
    import editAreaGroupComponent from "./edit-area-group-component";
    import selectStrategyComponent from './select-strategy-component.vue'
    import CommonConstant from "../../../constants/common";
    export default {
        name: 'controlAreaPage',
        components: {
            editAreaGroupComponent,
            controlLightDialogComponent,
            controlLoopDialogComponent,
            controlPanelDialogComponent,
            selectStrategyComponent
        },
        data() {
            return {
                addAreaDialogVisible: false,
                editAreaDialogVisible: false,
                repealAreaDialogVisible: false,
                issueAreaDialogVisible: false,
                deleteAreaDialogVisible: false,
                searchParams: {
                    areaname: '',
                    moduletype: '',
                    strategystate: '',
                },
                addAreaData: {},
                editAreaData:{},
                repealAreaData:{},
                issueAreaData:{},
                deleteAreaData:{},
                list: [{}],
                companies: [],
                deviceType: [],
                moduleType: {},
                defaultPaging: {
                    pageSize: Config.DEFAULT_PAGE_SIZE,
                    pageNum: 1
                },
                strategyState: [],
            }
        },
        computed: {
            Rules: function() {
                let rules = {
                    areaname: [
                        {required: true, message: '请输入名称'}
                    ],
                    companyid: [
                        {required: true, message: '请选择企业'}
                    ],
                    moduletype: [
                        {required: true, message: '请选择类型'}
                    ],
                    groupid: [
                        {required: true, message: '请选择组'}
                    ],
                };
                /*if ((this.addAreaDialogVisible && this.addAreaData.moduletype != this.moduleType.panel)||
                    (this.editAreaDialogVisible && this.editAreaData.moduletype != this.moduleType.panel)) {
                    rules.strategyid = [
                        {required: true, message: '请选择策略'}
                    ]
                }*/
                return rules;
            },
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

            },
            initCommonData: function () {
                this.deviceType = CommonConstant.deviceType;
                this.strategyState = CommonConstant.strategyState;
                this.deviceType.forEach(item => {
                    this.moduleType[item.name] = item.value;
                })
            },
            pagingEvent: function (pageNumber) {
                this.searchParams.pageNum = pageNumber;
                this.findList(this.searchParams);
            },
            findList: function (params) {
                Services.findAreaList(params).then(data => {
                    this.searchParams.pageNum = data.pageNum;
                    this.searchParams.pages = data.pages;
                    this.searchParams.pageSize = data.pageSize;
                    this.list = data.list;
                })
            },
            search: function () {
                this.findList(Object.assign(this.searchParams, this.defaultPaging));
            },
            dialogAddArea: function () {
                this.addAreaDialogVisible = true;
            },
            dialogEditArea: function (item) {
                this.editAreaData = {
                    objectid: item.objectid,
                    companyid: item.companyid,
                    areaname: item.areaname,
                    moduletype: item.moduletype,
                    strategyid: item.strategyid,
                    strategyname: item.strategyname
                };
                this.editAreaDialogVisible = true;
            },
            dialogRepealArea: function (item) {
                this.resetData();
                this.repealAreaData = item;
                this.repealAreaDialogVisible = true;
            },
            dialogIssueArea: function (item) {
                this.resetData();
                this.issueAreaData = item;
                this.issueAreaDialogVisible = true;
            },
            dialogDeleteArea: function (item) {
                this.resetData();
                this.deleteAreaData = item;
                this.deleteAreaDialogVisible = true;
            },
            addArea:function (formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        Services.addArea(this.addAreaData).then(res => {
                            this.hideModal();
                            this.initList();
                        })
                    }
                })
            },
            editArea:function (formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        Services.editArea(this.editAreaData).then(res => {
                            this.hideModal();
                            this.initList();
                        })
                    }
                })
            },
            repealArea:function () {
                Services.stopStrategyArea({areaid: this.repealAreaData.objectid, strategyid: this.repealAreaData.strategyid}).then(res => {
                    this.hideModal();
                    this.initList();
                })
            },
            issueArea: function () {
                Services.runStrategyArea({areaid: this.issueAreaData.objectid, strategyid: this.issueAreaData.strategyid}).then(res => {
                    this.hideModal();
                    this.initList();
                })
            },
            deleteArea:function () {
                Services.deleteArea(this.deleteAreaData.objectid).then(res => {
                    this.hideModal();
                    this.initList();
                })
            },
            hideModal: function () {
                this.addAreaDialogVisible = false;
                this.editAreaDialogVisible = false;
                this.repealAreaDialogVisible = false;
                this.issueAreaDialogVisible = false;
                this.deleteAreaDialogVisible = false;
            },
            resetData: function () {
                this.addAreaData = {};
                this.editAreaData = {};
                this.repealAreaData = {};
                this.issueAreaData = {};
                this.deleteAreaData = {};
            },
            clearValidate: function (formName) {
                if (this.$refs[formName]) this.$refs[formName].clearValidate();
            }

        }
    }
</script>

<style scoped lang="less">

</style>

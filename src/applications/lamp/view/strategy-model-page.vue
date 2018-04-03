<template>
  <div class="content-right">
    <div class="clearfix">
      <div class="search pull-left">
        <form class="form-inline default-form">
          <div class="form-group">
            <label>情景名称：</label>
            <el-input style="width: 180px" type="text" v-model="searchParams.scenarioname"
                      placeholder="输入情景名称" clearable></el-input>
          </div>
          <div @click="search" class="form-group default-btn"><span class="quick-search-icon default-icon"></span>快速筛选

          </div>
          <div class="pull-right">
            <div @click="dialogAddStrategy" class="default-btn"><span class="add-icon default-icon"></span>新建</div>
          </div>
        </form>
      </div>

    </div>
    <div class="my-table center">
      <table class="table table-hover table-striped">
        <thead>
        <th>名称</th>
        <th>组名称</th>
        <th>功能</th>
        <th>操作</th>
        </thead>
        <tbody>
        <tr v-for="item in list">
          <td>{{item.scenarioname}}</td>
          <td style="max-width: 300px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;" :title="item.groupname">{{item.groupname}}</td>
          <td style="max-width: 300px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;" :title="item.analysistask">{{item.analysistask}}</td>
          <td class="td-btns">
            <div class="icon-item"><span @click="dialogEditStrategy(item)" class="edit-icon"></span></div>
            <div class="icon-item"><span @click="dialogDeleteStrategy(item)" class="delete-icon"></span></div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <paging-component v-if="searchParams.pages" :pageNumber="searchParams.pageNum" :pages="searchParams.pages"
                      @pagingEvent='pagingEvent'></paging-component>

    <el-dialog title="新建情景" :visible.sync="addStrategyDialogVisible" center :width="'650px'" @close="resetData" @open="clearValidate('addStrategy')">
      <el-form label-width="120px" :model="operData" ref="addStrategy" :rules="operDataRules" class="el-form-default">
        <el-form-item label="情景名称：" prop="scenarioname">
          <el-input type="text" v-model.trim="operData.scenarioname" placeholder="输入情景名称"></el-input>
        </el-form-item>
        <el-form-item label="归属企业：" prop="companyid">
          <tree-select-component v-model="operData.companyid" :list="companies"></tree-select-component>
        </el-form-item>
        <el-form-item label="应用范围：" prop="groups">
          <el-row type="flex" justify="space-between">
            <el-col :span="18">{{operData.groups.length}}个组</el-col>
            <el-button :span="6" type="primary" icon="el-icon-edit-outline" @click="dialogEditGroup">编辑</el-button>
          </el-row>
          <input v-show="false" v-model="operData.groups"/>
          <!--<add-scenario-group-component v-model="operData.groups"></add-scenario-group-component>-->
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addStrategy('addStrategy')">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="编辑情景" :visible.sync="editStrategyDialogVisible" center :width="'650px'" @close="resetData" @open="clearValidate('editStrategy')">
      <el-form label-width="120px" :model="operData" ref="editStrategy" :rules="operDataRules" class="el-form-default">
        <el-form-item label="情景名称：" prop="scenarioname">
          <el-input type="text" v-model.trim="operData.scenarioname" placeholder="输入情景名称"></el-input>
        </el-form-item>
        <el-form-item label="归属企业：" prop="companyid">
          <tree-select-component v-model="operData.companyid" :list="companies"></tree-select-component>
        </el-form-item>
        <el-form-item label="应用范围：" prop="groups">
          <el-row type="flex" justify="space-between">
            <el-col :span="18">{{operData.groups[0]?operData.groups[0].groupname: '' }} 等{{operData.groups.length}}个组</el-col>
            <el-button :span="6" type="primary" icon="el-icon-edit-outline" @click="dialogEditGroup">编辑</el-button>
          </el-row>
          <input v-show="false" v-model="operData.groups"/>
          <!--<add-scenario-group-component v-model="operData.groups"></add-scenario-group-component>-->
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editStrategy('editStrategy')">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="选择" :visible.sync="editGroupDialogVisible" center :width="'650px'" @open="clearGroupValidate('editGroup')">
      <template v-for="(groupItem,index) in editGroupData">
        <el-form label-width="120px" :model="groupItem" ref="editGroup" :rules="groupRules" class="el-form-default">
          <el-form-item label="应用组：" prop="objectid">
            <select-group-component v-model="groupItem.objectid"
                                    :groupName="groupItem.groupname"
                                    @groupname="groupItem.groupname = arguments[0]"></select-group-component>
          </el-form-item>
          <el-form-item label="执行功能：" prop="task">
            <div>
              <el-radio v-model="groupItem.task" label="1">开灯</el-radio>
            </div>
            <div>
              <el-radio v-model="groupItem.task" label="2">关灯</el-radio>
            </div>
            <div style="position: relative">
              <el-radio v-model="groupItem.task" label="3">调节亮度</el-radio>
              <div style="position: absolute; width: 300px; right: 0; top: 5px">
                <el-slider :disabled="groupItem.task != 3" v-model="groupItem.brightness" ></el-slider>
              </div>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button class="pull-right" type="primary" @click="deleteGroup(index)">
              删除本组
            </el-button>
          </el-form-item>
        </el-form>
      </template>
      <div style="display: flex; justify-content: space-between; padding: 0 50px;">
        <el-button type="primary" @click="addGroup">添加一组</el-button>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="selectGroup('editGroup')">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="删除情景模式" :visible.sync="deleteStrategyDialogVisible" center :width="'600px'">
      <div class="text-center">
        <div class="dialog-warning"></div>
      </div>
      <p class="title">您确认要删除此情景模式策略吗？</p>
      <p class="text-center">请慎重操作，您的操作一旦确认，将无法恢复，并被系统记录在日志当中！</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="deleteStrategy">确认</el-button>
      </span>
    </el-dialog>

  </div>

</template>

<script>
    import Config from "../../../config";
    import Services from "../services";
    import selectGroupComponent from './select-group-component.vue';
    import addScenarioGroupComponent from './add-scenario-group-component.vue';
    export default {
        name: 'strategyTimePage',
        components: {selectGroupComponent, addScenarioGroupComponent},
        data() {
            return {
                addStrategyDialogVisible: false,
                editStrategyDialogVisible: false,
                deleteStrategyDialogVisible: false,
                editGroupDialogVisible: false,
                groupRules: {
                    objectid: [
                        {required: true, message: '请选择应用组'}
                    ],
                    task: [
                        {required: true, message: '请选择功能'}
                    ],
                },
                operDataRules: {
                    companyid: [
                        {required: true, message: '请选择所属企业'}
                    ],
                    scenarioname: [
                        {required: true, message: '请输入情景名称'}
                    ],
                    groups: [
                        {required: true, message: '请选择组', trigger: 'change'}
                    ],
                },
                searchParams: {
                    scenarioname: '',
                },
                operData: {},
                group: [],
                strategy: [{}],
                editGroupData: [],
                list: [],
                companies: [],
                sensorType: [
                    {value: 1, text: '无'},
                    {value: 2, text: '光感'},
                    {value: 3, text: '微波'},
                ],
                frequency: [
                    {value: 1, text: '一次'},
                    {value: 2, text: '每天'},
                    {value: 3, text: '每周'},
                    {value: 4, text: '间隔'},
                ],
                time: [
                    {value: 1, text: '时间点'},
                    {value: 2, text: '日出'},
                    {value: 3, text: '日落'},
                ],
                deviceType: [],
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
                this.initPaging();
                this.initOperData();
                this.initCompanies();
                this.initCommonConstants();
            },
            initPaging: function () {
                this.findList(this.defaultPaging);
                this.clearSearchParams();
            },
            clearSearchParams: function () {
                Object.keys(this.searchParams).forEach(key => {
                    this.searchParams[key] = '';
                })
            },
            initOperData: function () {
                this.operData = {};
                this.operData.groups = [];
            },
            initCompanies: function () {
                this.$globalCache.companies.then(companies => {
                    this.companies = companies;
                })
            },
            initCommonConstants: function () {
                this.deviceType = [
                    {value: 1, text: '灯控器'},
                    {value: 2, text: '回路控制器'},
                ];
            },
            pagingEvent: function (pageNumber) {
                this.searchParams.pageNum = pageNumber;
                this.findList(this.searchParams);
            },
            findList: function (params) {
                Services.findScenario(params).then(data => {
                    this.searchParams.pageNum = data.pageNum;
                    this.searchParams.pages = data.pages;
                    this.searchParams.pageSize = data.pageSize;
                    this.list = data.list;
                })
            },
            search: function () {
                this.findList(Object.assign(this.searchParams, this.defaultPaging));
            },
            transformDataToUse: function (data) {
                let operData = {};
                let brightness = 0;
                let groupsId = data.groupid.split(',');
                let groupsName = data.groupname.split(',');
                let tasks = data.task.split(',');
                operData.objectid = data.objectid;
                operData.scenarioname = data.scenarioname;
                operData.companyid = data.companyid;
                let groups = groupsId.map((id, index) => {
                    let task;
                    if (tasks[index].indexOf('|') != -1) {
                        task = tasks[index].split('|')[0];
                        brightness = Number(tasks[index].split('|')[1]);
                    } else {
                        task = tasks[index];
                    }
                    return {objectid: id, groupname: groupsName[index], task: task, brightness: brightness}
                });
                operData.groups = groups;
                return operData;
            },
            transformDataToSend: function (data) {
                let operData = {};
                let groupsId = [];
                let tasks = [];
                let groupname = [];
                data.groups.forEach(item => {
                    groupsId.push(item.objectid);
                    let task = item.task;
                    if (!item.brightness) {
                        item.brightness = 0
                    }
                    if (task == 3) {
                        task = task + "|" + item.brightness;
                    }
                    tasks.push(task);
                    groupname.push(item.groupname)
                });
                if (data.objectid) {
                    operData.objectid = data.objectid;
                }
                operData.scenarioname = data.scenarioname;
                operData.groupid = groupsId.join();
                operData.task = tasks.join();
                operData.companyid = data.companyid;
                operData.groupname = groupname.join();
                return operData;
            },
            dialogAddStrategy: function () {
                this.addStrategyDialogVisible = true;
            },
            dialogEditStrategy: function (strategy) {
                this.operData = this.transformDataToUse(strategy);
                this.editStrategyDialogVisible = true;
//                this.validateGroups();
            },
            dialogDeleteStrategy: function (strategy) {
                this.resetData();
                this.operData.objectid = strategy.objectid;
                this.deleteStrategyDialogVisible = true;
            },
            dialogEditGroup: function () {
                this.resetEditGroupData();
                if (this.operData.groups.length > 0 && this.operData.groups[0]) {
                    this.editGroupData = this.operData.groups;
                } else {
                }
                this.editGroupDialogVisible = true;
            },
            addGroup: function () {
                this.editGroupData.push({})
            },
            deleteGroup: function (index) {
                this.editGroupData.splice(index, 1);
            },
            selectGroup: function (formName) {
                let valids = [];
                this.$refs[formName].forEach(item => {
                    item.validate(valid => {
                        valids.push(valid);
                    })
                });
                if (valids.every(item => item)) {
                    this.operData.groups = this.editGroupData;
                    this.resetEditGroupData();
                    this.hideSecondModal();
                }
                this.validateGroups();
            },
            addStrategy: function (formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        Services.addScenario(this.transformDataToSend(this.operData)).then(res => {
                            this.initPaging();
                            this.hideModal();
                        })
                    }
                })
            },
            editStrategy: function (formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        Services.editScenario(this.transformDataToSend(this.operData)).then(res => {
                            this.initPaging();
                            this.hideModal();
                        })
                    }
                })
            },
            deleteStrategy: function () {
                Services.deleteScenario(this.operData.objectid).then(res => {
                    this.initPaging();
                    this.hideModal();
                })
            },
            hideModal: function () {
                this.addStrategyDialogVisible = false;
                this.editStrategyDialogVisible = false;
                this.deleteStrategyDialogVisible = false;
            },
            hideSecondModal: function () {
                this.editGroupDialogVisible = false;
            },
            resetData: function () {
                this.operData = {};
                this.operData.groups = [];
            },
            resetEditGroupData: function () {
                this.editGroupData = [{}];
            },
            validateGroups: function () {
                if (this.addStrategyDialogVisible) {
                    this.$refs.addStrategy.validateField('groups');
                } else {
                    this.$refs.editStrategy.validateField('groups');
                }
            },
            clearValidate: function (formName) {
                if (this.$refs[formName]) this.$refs[formName].clearValidate();
            },
            clearGroupValidate: function (formName) {
                if (this.$refs[formName]) this.$refs[formName].forEach(item => {
                    item.clearValidate();
                })
            }

        }
    }
</script>

<style scoped lang="less">

</style>

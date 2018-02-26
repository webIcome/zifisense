<template>
  <div class="content-right">
    <div class="clearfix">
      <div class="search pull-left">
        <form class="form-inline default-form">
          <div class="form-group">
            <label>情景名称：</label>
            <el-input style="width: 180px" type="text" v-model="searchParams.devicename" placeholder="输入策略名称"></el-input>
          </div>
          <div class="form-group">
            <label>情景类别：</label>
            <el-select v-model="searchParams.sensortype" placeholder="选择策略类别" clearable>
              <el-option v-for="status in sensorType" :key="status.value" :value="status.value"
                         :label="status.text"></el-option>
            </el-select>
          </div>
          <div @click="search" class="form-group default-btn"><span class="quick-search-icon default-icon"></span>快速筛选
          </div>
          <div class="pull-right">
            <div @click="dialogAddStrategy" class="default-btn"><span class="add-icon default-icon"></span>新建</div>
          </div>
        </form>
      </div>

    </div>
    <div class="table center">
      <table class="table table-hover table-striped">
        <thead>
        <th>名称</th>
        <th>组名称</th>
        <th>功能</th>
        <th>操作</th>
        </thead>
        <tbody>
        <tr v-for="item in list">
          <td>{{item.devicename}}</td>
          <td>{{item.sn}}</td>
          <td>{{item.brightness}}</td>
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

    <el-dialog title="新建情景" :visible.sync="addStrategyDialogVisible" center :width="'650px'">
      <el-form label-width="120px" :model="operData"  ref="addStrategy" class="el-form-default">
        <el-form-item label="情景名称：" prop="switchstate">
          <el-input type="text" v-model="operData.devicename" placeholder="输入设备名称"></el-input>
        </el-form-item>
        <el-form-item label="应用范围：" prop="deviceType">
          <el-row type="flex" justify="space-between">
            <el-col :span="18">{{selectedGroupData[0]}} 等{{selectedGroupData.length}}个组</el-col>
            <el-button :span="6" type="primary" icon="el-icon-edit-outline" @click="dialogEditGroup">编辑</el-button>
          </el-row>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addStrategy('addStrategy')">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="编辑情景" :visible.sync="editStrategyDialogVisible" center :width="'650px'">
      <el-form label-width="120px" :model="operData"  ref="editStrategy" class="el-form-default">
        <el-form-item label="情景名称：" prop="switchstate">
          <el-input type="text" v-model="operData.devicename" placeholder="输入设备名称"></el-input>
        </el-form-item>
        <el-form-item label="应用范围：" prop="deviceType">
          <el-row type="flex" justify="space-between">
            <el-col :span="18">{{selectedGroupData[0]}} 等{{selectedGroupData.length}}个组</el-col>
            <el-button :span="6" type="primary" icon="el-icon-edit-outline" @click="dialogEditGroup">编辑</el-button>
          </el-row>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editStrategy('editStrategy')">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="编辑组" :visible.sync="editGroupDialogVisible" center :width="'650px'">
      <el-form label-width="120px" :model="editGroupData"  ref="editGroup" class="el-form-default">
        <template v-for="groupItem in editGroupData">
          <el-form-item label="应用组：" prop="">
            <el-select v-model="groupItem.deviceType" placeholder="选择设备组" clearable >
              <el-option v-for="item in group" :key="item.value" :value="item.value" :label="item.text"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="策略功能：" prop="">
            <el-select v-model="groupItem.deviceType" placeholder="选择设备组" clearable >
              <el-option v-for="item in strategy" :key="item.value" :value="item.value" :label="item.text"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="执行功能：" prop="">
            <div><el-radio v-model="groupItem.fn" label="1">开灯</el-radio></div>
            <div><el-radio v-model="groupItem.fn" label="2">关灯</el-radio></div>
            <div style="position: relative">
              <el-radio v-model="groupItem.fn" label="3">调节亮度</el-radio>
              <div style="position: absolute; width: 300px; right: 0; top: 5px"><el-slider :disabled="groupItem.fn != 3" v-model="groupItem.brightness" show-input></el-slider></div>
            </div>
            <div><el-radio v-model="groupItem.fn" label="1">状态读取</el-radio></div>
          </el-form-item>
        </template>
      </el-form>
      <div style="display: flex; justify-content: space-between; padding: 0 50px;">
        <el-button type="primary" @click="addGroup">添加一组</el-button>
        <el-button type="primary" @click="deleteGroup" v-if="editGroupData.length > 1">删除本组</el-button>
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
    import RestfulConstant from "../../../constants/restful";
    import Config from "../../../config";
    export default {
        name: 'strategyTimePage',
        data() {
            return {
                addStrategyDialogVisible: false,
                editStrategyDialogVisible: false,
                deleteStrategyDialogVisible: false,
                editGroupDialogVisible: false,
                searchParams: {
                    devicename: '',
                    sn: '',
                    companyid: '',
                    switchstate: '',
                    lightcontrollerType: '',
                    sensortype: ''
                },
                operData: {},
                group: [],
                strategy: [{}],
                editGroupData: [{}],
                selectedGroupData: [],
                list: [{}],
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
            },
            initPaging: function () {
                this.findList(this.defaultPaging)
            },
            initOperData: function () {
//                this.operData = this.$common.copyObj(LampContent);
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
            search: function () {
                this.findList(Object.assign(this.searchParams, this.defaultPaging));
            },
            dialogAddStrategy: function () {
                this.resetData();
                this.addStrategyDialogVisible = true;
            },
            dialogEditStrategy: function (strategy) {
                this.resetData();
                this.operData = strategy;
                this.editStrategyDialogVisible = true;
            },
            dialogDeleteStrategy: function (strategy) {
                this.resetData();
                this.operData = strategy;
                this.deleteStrategyDialogVisible = true;
            },
            dialogEditGroup: function () {
                if (this.selectedGroupData.length){
                    this.editGroupData = this.selectedGroupData;
                }
                this.editGroupDialogVisible = true;
            },
            editGroup: function () {

            },
            addGroup: function () {
                this.editGroupData.push({})
            },
            deleteGroup: function () {
                this.editGroupData.shift()
            },
            selectGroup: function (formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        this.selectedGroupData = this.editGroupData;
                        this.resetEditGroupData();
                        this.hideSecondModal();
                    }
                })
            },
            addStrategy: function (formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {

                    }
                })
            },
            editStrategy: function (formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {

                    }
                })
            },
            deleteStrategy: function () {

            },
            getDevice: function (id) {
                return this.$http.post('lightController/getDetailsBySn', {sn: id}).then(res => {
                    return res.body.data
                }).catch()
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
                this.selectedGroupData = [];
            },
            resetEditGroupData: function () {
                this.editGroupData = [{}];
            },

        }
    }
</script>

<style scoped lang="less">

</style>

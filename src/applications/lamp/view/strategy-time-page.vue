<template>
  <div class="content-right">
    <div class="clearfix">
      <div class="search pull-left">
        <form class="form-inline default-form">
          <div class="form-group">
            <label>策略名称：</label>
            <el-input style="width: 180px" type="text" v-model="searchParams.strategyName" placeholder="输入策略名称"></el-input>
          </div>
          <div class="form-group">
            <label>有效时间起：</label>
              <el-date-picker style="width: 180px" v-model="searchParams.validityStart" type="date" placeholder=""></el-date-picker> 到
<el-date-picker style="width: 180px" v-model="searchParams.validityEnd" type="date" placeholder=""></el-date-picker>
          </div>
          <div class="form-group">
            <label>策略类别：</label>
            <el-select v-model="searchParams.moduleTypeID" placeholder="选择策略类别" clearable>
              <el-option v-for="status in deviceType" :key="status.value" :value="status.value"
                         :label="status.text"></el-option>
            </el-select>
          </div>
          <div @click="search" class="form-group default-btn"><span class="quick-search-icon default-icon"></span>快速筛选
          </div>
          <div class="pull-right">
            <div @click="dialogAddStrategy" class="default-btn"><span class="add-icon default-icon"></span>新建灯时序</div>
            <div @click="dialogAddLoopStrategy" class="default-btn"><span class="add-icon default-icon"></span>新建回路时序</div>
          </div>
        </form>
      </div>

    </div>
    <div class="my-table center">
      <table class="table table-hover table-striped">
        <thead>
        <th>策略名称</th>
        <th>类型</th>
        <th>有效时间</th>
        <th>执行时间</th>
        <th>操作</th>
        </thead>
        <tbody>
        <tr v-for="item in list">
          <td>{{item.devicename}}</td>
          <td>{{item.moduleType}}</td>
          <td>{{item.validityTime | formDate}}</td>
          <td>{{item.executionTime | formDate}}</td>
          <td class="td-btns">
            <div class="icon-item"><span @click="dialogEditStrategy" class="edit-icon"></span></div>
            <div class="icon-item"><span @click="dialogDeleteStrategy" class="delete-icon"></span></div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <paging-component v-if="searchParams.pages" :pageNumber="searchParams.pageNum" :pages="searchParams.pages"
                      @pagingEvent='pagingEvent'></paging-component>

    <el-dialog title="灯时序控制-新建" :visible.sync="addStrategyDialogVisible" center :width="'650px'">
      <el-form label-width="120px" :model="operData"  ref="addStrategy" class="el-form-default">
        <el-form-item label="策略名称：" prop="strategyName">
          <el-input type="text" v-model="operData.strategyName" placeholder="输入设备名称"></el-input>
        </el-form-item>
        <el-form-item label="策略功能：" prop="moduleTypeID">
          <el-select v-model="operData.moduleTypeID" placeholder="选择类型" clearable >
            <el-option v-for="item in deviceType" :key="item.value" :value="item.value" :label="item.text"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="有效时间：" prop="validityStart">
          <el-date-picker style="width: 200px" v-model="operData.validityStart" type="date" placeholder=""></el-date-picker> 到
           <el-date-picker style="width: 200px" v-model="operData.validityEnd" type="date" placeholder=""></el-date-picker>
        </el-form-item>
        <el-form-item label="执行频率：" prop="periodType">
         <!-- <el-select style="width: 200px; margin-right: 24px" v-model="operData.periodType" placeholder="选择类型" clearable >
            <el-option v-for="item in periodType" :key="item.value" :value="item.value" :label="item.text"></el-option>
          </el-select>-->
          <template v-for="item in periodType">
            <el-radio v-model="operData.periodType" :label="item.value">{{item.text}}</el-radio>
          </template>
        </el-form-item>
        <el-form-item v-if="operData.periodType == period.single" label="执行时间：" prop="executionTime">
          <el-date-picker style="width: 200px" v-model="operData.executionTime" type="date" placeholder="请选择时间点"></el-date-picker>
        </el-form-item>
        <el-form-item v-else-if="operData.periodType == period.day" label="执行时间：" prop="executionTime">
          <el-time-picker style="width: 200px" v-model="operData.executionTime" placeholder="请选择时间"></el-time-picker>
        </el-form-item>
        <el-form-item v-else-if="operData.periodType == period.week" label="执行时间：" prop="executionTime">
          <el-select style="width: 200px" v-model="operData.executionTime" placeholder="请选择时间" clearable >
            <el-option v-for="item in week" :key="item.value" :value="item.value" :label="item.text"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-else-if="operData.periodType == period.interval" label="间隔时间：" prop="executionTime">
          <el-input style="width: 200px" v-model="operData.interval"></el-input>
        </el-form-item>
        <el-form-item label="执行功能：" prop="taskCmd">
          <div><el-radio v-model="operData.taskCmd" label="lightOn">开灯</el-radio></div>
          <div><el-radio v-model="operData.taskCmd" label="lightOff">关灯</el-radio></div>
          <div style="position: relative">
            <el-radio v-model="operData.taskCmd" label="lightAdjust">调节亮度</el-radio>
            <div style="position: absolute; width: 300px; right: 0; top: 5px"><el-slider :disabled="operData.taskCmd != 'lightAdjust'" v-model="operData.brightness" show-input></el-slider></div>
          </div>
          <div><el-radio v-model="operData.taskCmd" label="lightSate">状态读取</el-radio></div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addStrategy('addStrategy')">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="回路时序控制-新建" :visible.sync="addLoopStrategyDialogVisible" center :width="'650px'">
      <el-form label-width="120px" :model="operLoopData"  ref="addLoopStrategy" class="el-form-default">
        <el-form-item label="策略名称：" prop="strategyName">
          <el-input type="text" v-model="operLoopData.strategyName" placeholder="输入设备名称"></el-input>
        </el-form-item>
        <el-form-item label="策略功能：" prop="moduleTypeID">
          <el-select v-model="operLoopData.moduleTypeID" placeholder="选择类型" clearable >
            <el-option v-for="item in deviceType" :key="item.value" :value="item.value" :label="item.text"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="有效时间：" prop="validityStart">
          <el-date-picker style="width: 200px" v-model="operLoopData.validityStart" type="date" placeholder=""></el-date-picker> 到
           <el-date-picker style="width: 200px" v-model="operLoopData.validityEnd" type="date" placeholder=""></el-date-picker>
        </el-form-item>
        <el-form-item label="执行频率：" prop="periodType">
          <template v-for="item in periodType">
            <el-radio v-model="operLoopData.periodType" :label="item.value">{{item.text}}</el-radio>
          </template>
        </el-form-item>
        <el-form-item v-if="operLoopData.periodType == period.single" label="执行时间：" prop="executionTime">
          <el-date-picker style="width: 200px" v-model="operLoopData.executionTime" type="date" placeholder="请选择时间点"></el-date-picker>
        </el-form-item>
        <el-form-item v-else-if="operLoopData.periodType == period.day" label="执行时间：" prop="executionTime">
          <el-time-picker style="width: 200px" v-model="operLoopData.executionTime" placeholder="请选择时间"></el-time-picker>
        </el-form-item>
        <el-form-item v-else-if="operLoopData.periodType == period.week" label="执行时间：" prop="executionTime">
          <el-select style="width: 200px" v-model="operLoopData.executionTime" placeholder="请选择时间" clearable >
            <el-option v-for="item in week" :key="item.value" :value="item.value" :label="item.text"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-else-if="operLoopData.periodType == period.interval" label="间隔时间：" prop="executionTime">
          <el-input style="width: 200px" type="text" v-model="operLoopData.interval"></el-input>
        </el-form-item>
        <el-form-item label="执行功能：" prop="taskCmd">
          <div><el-radio v-model="operLoopData.taskCmd" label="circuitryOn">开线路</el-radio></div>
          <div><el-radio v-model="operLoopData.taskCmd" label="circuitryOff">关线路</el-radio></div>
          <div><el-radio v-model="operLoopData.taskCmd" label="circuitryState">状态读取</el-radio></div>
          <div><el-radio v-model="operLoopData.taskCmd" label="circuitryMeter">读取电表</el-radio></div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addLoopStrategy('addLootStrategy')">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="时序控制-编辑" :visible.sync="editStrategyDialogVisible" center :width="'650px'">
      <el-form label-width="120px" :model="operData"  ref="editStrategy" class="el-form-default">
        <el-form-item label="策略名称：" prop="strategyName">
          <el-input type="text" v-model="operData.strategyName" placeholder="输入设备名称"></el-input>
        </el-form-item>
        <el-form-item label="策略功能：" prop="moduleTypeID">
          <el-select v-model="operData.moduleTypeID" placeholder="选择类型" clearable >
            <el-option v-for="item in deviceType" :key="item.value" :value="item.value" :label="item.text"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="有效时间：" prop="validityStart">
          <el-date-picker style="width: 200px" v-model="operData.validityStart" type="date" placeholder=""></el-date-picker> 到
           <el-date-picker style="width: 200px" v-model="operData.validityEnd" type="date" placeholder=""></el-date-picker>
        </el-form-item>
        <el-form-item label="执行频率：" prop="periodType">
          <template v-for="item in periodType">
            <el-radio v-model="operData.periodType" :label="item.value">{{item.text}}</el-radio>
          </template>
        </el-form-item>
        <el-form-item v-if="operData.periodType == period.single" label="执行时间：" prop="executionTime">
          <el-date-picker style="width: 200px" v-model="operData.executionTime" type="date" placeholder="请选择时间点"></el-date-picker>
        </el-form-item>
        <el-form-item v-else-if="operData.periodType == period.day" label="执行时间：" prop="executionTime">
          <el-time-picker style="width: 200px" v-model="operData.executionTime" placeholder="请选择时间"></el-time-picker>
        </el-form-item>
        <el-form-item v-else-if="operData.periodType == period.week" label="执行时间：" prop="executionTime">
          <el-select style="width: 200px" v-model="operData.executionTime" placeholder="请选择时间" clearable >
            <el-option v-for="item in week" :key="item.value" :value="item.value" :label="item.text"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-else-if="operData.periodType == period.interval" label="间隔时间：" prop="executionTime">
          <el-input style="width: 200px" v-model="operData.interval"></el-input>
        </el-form-item>
        <el-form-item label="执行功能：" prop="taskCmd">
          <div><el-radio v-model="operData.taskCmd" label="lightOn">开灯</el-radio></div>
          <div><el-radio v-model="operData.taskCmd" label="lightOff">关灯</el-radio></div>
          <div style="position: relative">
            <el-radio v-model="operData.taskCmd" label="lightAdjust">调节亮度</el-radio>
            <div style="position: absolute; width: 300px; right: 0; top: 5px"><el-slider :disabled="operData.taskCmd != 'lightAdjust'" v-model="operData.brightness" show-input></el-slider></div>
          </div>
          <div><el-radio v-model="operData.taskCmd" label="lightSate">状态读取</el-radio></div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editStrategy('editStrategy')">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="回路时序控制-编辑" :visible.sync="editLoopStrategyDialogVisible" center :width="'650px'">
      <el-form label-width="120px" :model="operLoopData"  ref="editLoopStrategy" class="el-form-default">
        <el-form-item label="策略名称：" prop="strategyName">
          <el-input type="text" v-model="operLoopData.strategyName" placeholder="输入设备名称"></el-input>
        </el-form-item>
        <el-form-item label="策略功能：" prop="moduleTypeID">
          <el-select v-model="operLoopData.moduleTypeID" placeholder="选择类型" clearable >
            <el-option v-for="item in deviceType" :key="item.value" :value="item.value" :label="item.text"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="有效时间：" prop="validityStart">
          <el-date-picker style="width: 200px" v-model="operLoopData.validityStart" type="date" placeholder=""></el-date-picker> 到
           <el-date-picker style="width: 200px" v-model="operLoopData.validityEnd" type="date" placeholder=""></el-date-picker>
        </el-form-item>
        <el-form-item label="执行频率：" prop="periodType">
          <template v-for="item in periodType">
            <el-radio v-model="operLoopData.periodType" :label="item.value">{{item.text}}</el-radio>
          </template>
        </el-form-item>
        <el-form-item v-if="operLoopData.periodType == period.single" label="执行时间：" prop="executionTime">
          <el-date-picker style="width: 200px" v-model="operLoopData.executionTime" type="date" placeholder="请选择时间点"></el-date-picker>
        </el-form-item>
        <el-form-item v-else-if="operLoopData.periodType == period.day" label="执行时间：" prop="executionTime">
          <el-time-picker style="width: 200px" v-model="operLoopData.executionTime" placeholder="请选择时间"></el-time-picker>
        </el-form-item>
        <el-form-item v-else-if="operLoopData.periodType == period.week" label="执行时间：" prop="executionTime">
          <el-select style="width: 200px" v-model="operLoopData.executionTime" placeholder="请选择时间" clearable >
            <el-option v-for="item in week" :key="item.value" :value="item.value" :label="item.text"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-else-if="operLoopData.periodType == period.interval" label="间隔时间：" prop="executionTime">
          <el-input style="width: 200px" type="text" v-model="operLoopData.interval"></el-input>
        </el-form-item>
        <el-form-item label="执行功能：" prop="taskCmd">
          <div><el-radio v-model="operLoopData.taskCmd" label="circuitryOn">开线路</el-radio></div>
          <div><el-radio v-model="operLoopData.taskCmd" label="circuitryOff">关线路</el-radio></div>
          <div><el-radio v-model="operLoopData.taskCmd" label="circuitryState">状态读取</el-radio></div>
          <div><el-radio v-model="operLoopData.taskCmd" label="circuitryMeter">读取电表</el-radio></div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editLoopStrategy('editLoopStrategy')">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="删除时序控制" :visible.sync="deleteStrategyDialogVisible" center :width="'600px'">
      <div class="text-center">
        <div class="dialog-warning"></div>
      </div>
      <p class="title">您确认要删除此时序控制策略吗？</p>
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
                addLoopStrategyDialogVisible: false,
                editStrategyDialogVisible: false,
                editLoopStrategyDialogVisible: false,
                deleteStrategyDialogVisible: false,
                searchParams: {
                    strategyName: '',
                    moduleTypeID: '',
                    validityStart: '',
                    validityEnd: '',
                },
                operData: {},
                operLoopData: {},
                list: [{}],
                companies: [],
                periodType: [
                    {value: 'single', text: '一次'},
                    {value: 'day', text: '每天'},
                    {value: 'week', text: '每周'},
                    {value: 'interval', text: '间隔'},
                ],
                week: [
                    {value: 1, text: '周一'},
                    {value: 2, text: '周二'},
                    {value: 3, text: '周三'},
                    {value: 4, text: '周四'},
                    {value: 5, text: '周五'},
                    {value: 6, text: '周六'},
                    {value: 0, text: '周天'},
                ],
                period: {
                    single: 'single',
                    day: 'day',
                    week: 'week',
                    interval: 'interval'
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
                this.initPaging();
                this.initOperData();
                this.initCommonConstants();
            },
            initCommonConstants: function () {
                this.deviceType = [
                    {value: 1, text: '灯控器'},
                    {value: 2, text: '回路控制器'},
                ];
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
            dialogAddLoopStrategy: function () {
                this.resetData();
                this.addLoopStrategyDialogVisible = true;
            },
            dialogEditStrategy: function (item) {
                this.resetData();
                this.operData = item;
                this.editStrategyDialogVisible = true;
            },
            dialogEditLoopStrategy: function (item) {
                this.resetData();
                this.operLoopData = item;
                this.editLoopStrategyDialogVisible = true;
            },
            dialogDeleteStrategy: function (item) {
                this.resetData();
                this.operData = item;
                this.deleteStrategyDialogVisible = true;
            },
            addStrategy: function (formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {

                    }
                })
            },
            addLoopStrategy: function (formName) {
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
            editLoopStrategy: function (formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {

                    }
                })
            },
            deleteStrategy: function () {

            },
            hideModal: function () {
                this.addStrategyDialogVisible = false;
                this.addLoopStrategyDialogVisible = false;
                this.editStrategyDialogVisible = false;
                this.editLoopStrategyDialogVisible = false;
                this.deleteStrategyDialogVisible = false;
            },
            resetData: function () {
                this.operData = {};
                this.operLoopData = {};
            }

        }
    }
</script>

<style scoped lang="less">

</style>

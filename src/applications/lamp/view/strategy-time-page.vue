<template>
  <div class="content-right">
    <div class="clearfix">
      <div class="search pull-left">
        <form class="form-inline default-form">
          <div class="form-group">
            <label>策略名称：</label>
            <el-input style="width: 180px" type="text" v-model="searchParams.strategyname"
                      placeholder="输入策略名称"></el-input>
          </div>
          <div class="form-group">
            <label>有效时间起：</label>
            <el-date-picker style="width: 180px" v-model="searchParams.validitystartST" type="date"
                            placeholder="选择时间"></el-date-picker>
            到

            <el-date-picker style="width: 180px" v-model="searchParams.validitystartED" type="date"
                            placeholder="选择时间"></el-date-picker>
          </div>
          <div class="form-group">
            <label>有效时间止：</label>
            <el-date-picker style="width: 180px" v-model="searchParams.validityendST" type="date"
                            placeholder="选择时间"></el-date-picker>
            到

            <el-date-picker style="width: 180px" v-model="searchParams.validityendED" type="date"
                            placeholder="选择时间"></el-date-picker>
          </div>
          <div class="form-group">
            <label>策略类别：</label>
            <el-select v-model="searchParams.moduletype" placeholder="选择策略类别" clearable>
              <el-option v-for="status in deviceType" :key="status.value" :value="status.value"
                         :label="status.text"></el-option>
            </el-select>
          </div>
          <div @click="search" class="form-group default-btn"><span class="quick-search-icon default-icon"></span>快速筛选

          </div>
          <div class="pull-right">
            <div @click="dialogAddStrategy" class="default-btn"><span class="add-icon default-icon"></span>新建灯时序</div>
            <div @click="dialogAddLoopStrategy" class="default-btn"><span class="add-icon default-icon"></span>新建回路时序
            </div>
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
          <td>{{item.strategyname}}</td>
          <td>{{item.moduletype | deviceTypeNameConverter}}</td>
          <td>{{item.validityTime | formDate}}</td>
          <td>{{item.executionTime | formDate}}</td>
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

    <el-dialog title="灯时序控制-新建" :visible.sync="addStrategyDialogVisible" center :width="'650px'">
      <el-form label-width="120px" :model="operData" ref="addStrategy" :rules="addStrategyRules"
               class="el-form-default">
        <el-form-item label="策略名称：" prop="strategyname">
          <el-input type="text" v-model="operData.strategyname" placeholder="输入设备名称"></el-input>
        </el-form-item>
        <el-form-item label="归属企业：" prop="companyid">
          <tree-select-component v-model="operData.companyid" :list="companies"></tree-select-component>
        </el-form-item>
        <el-form-item label="策略功能：" prop="moduletype">
          <el-select v-model="operData.moduletype" placeholder="选择类型" clearable>
            <el-option v-for="item in deviceType" :key="item.value" :value="item.value" :label="item.text"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="有效时间：" required>
          <el-form-item style="display: inline-block" prop="validitystart">
            <el-date-picker style="width: 200px" v-model="operData.validitystart" type="date"
                            placeholder=""></el-date-picker>
          </el-form-item>
          到

          <el-form-item style="display: inline-block" prop="validityend">
            <el-date-picker style="width: 200px" v-model="operData.validityend" type="date"
                            placeholder=""></el-date-picker>
          </el-form-item>
        </el-form-item>
        <el-form-item label="执行频率：" prop="periodtype">
          <!-- <el-select style="width: 200px; margin-right: 24px" v-model="operData.periodType" placeholder="选择类型" clearable >
             <el-option v-for="item in periodType" :key="item.value" :value="item.value" :label="item.text"></el-option>
           </el-select>-->
          <template v-for="item in periodType">
            <el-radio v-model="operData.periodtype" :label="item.value">{{item.text}}</el-radio>
          </template>
        </el-form-item>
        <el-form-item v-if="operData.periodtype == period.single" label="执行时间：" prop="executiontime">
          <el-date-picker style="width: 200px" v-model="operData.singlextime" type="date"
                          placeholder="请选择时间点"></el-date-picker>
        </el-form-item>
        <el-form-item v-else-if="operData.periodtype == period.day" label="执行时间：" prop="periodextime">
          <el-time-picker style="width: 200px" v-model="operData.periodextime" placeholder="请选择时间"></el-time-picker>
        </el-form-item>
        <el-form-item v-else-if="operData.periodtype == period.week" label="执行时间：" prop="weeknumber">
          <el-select style="width: 200px" v-model="operData.weeknumber" placeholder="请选择周几" clearable>
            <el-option v-for="item in week" :key="item.value" :value="item.value" :label="item.text"></el-option>
          </el-select>
          <el-time-picker style="width: 200px" v-model="operData.periodextime" placeholder="请选择时间"></el-time-picker>
        </el-form-item>
        <el-form-item v-else-if="operData.periodtype == period.interval" label="间隔时间：" prop="intervaltime">
          <el-input style="width: 200px" v-model="operData.intervaltime"></el-input>
        </el-form-item>
        <el-form-item label="执行功能：" prop="taskcmd">
          <div>
            <el-radio v-model="operData.taskcmd" label="lightOn">开灯</el-radio>
          </div>
          <div>
            <el-radio v-model="operData.taskcmd" label="lightOff">关灯</el-radio>
          </div>
          <div style="position: relative">
            <el-radio v-model="operData.taskcmd" label="lightAdjust">调节亮度</el-radio>
            <div style="position: absolute; width: 300px; right: 0; top: 5px">
              <el-slider :disabled="operData.taskcmd != 'lightAdjust'" v-model="operData.brightness"
                         show-input></el-slider>
            </div>
          </div>
          <div>
            <el-radio v-model="operData.taskcmd" label="lightSate">状态读取</el-radio>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addStrategy('addStrategy')">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="回路时序控制-新建" :visible.sync="addLoopStrategyDialogVisible" center :width="'650px'">
      <el-form label-width="120px" :model="operLoopData" ref="addLoopStrategy" :rules="addStrategyRules"
               class="el-form-default">
        <el-form-item label="策略名称：" prop="strategyname">
          <el-input type="text" v-model="operLoopData.strategyname" placeholder="输入设备名称"></el-input>
        </el-form-item>
        <el-form-item label="归属企业：" prop="companyid">
          <tree-select-component v-model="operLoopData.companyid" :list="companies"></tree-select-component>
        </el-form-item>
        <el-form-item label="策略功能：" prop="moduletype">
          <el-select v-model="operLoopData.moduletype" placeholder="选择类型" clearable>
            <el-option v-for="item in deviceType" :key="item.value" :value="item.value" :label="item.text"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="有效时间：" required>
          <el-form-item style="display: inline-block" prop="validitystart">
            <el-date-picker style="width: 200px" v-model="operLoopData.validitystart" type="date" placeholder=""></el-date-picker>
          </el-form-item>
          到
          <el-form-item style="display: inline-block" prop="validityend">
            <el-date-picker style="width: 200px" v-model="operLoopData.validityend" type="date"
                            placeholder=""></el-date-picker>
          </el-form-item>
        </el-form-item>
        <el-form-item label="执行频率：" prop="periodtype">
          <template v-for="item in periodType">
            <el-radio v-model="operLoopData.periodtype" :label="item.value">{{item.text}}</el-radio>
          </template>
        </el-form-item>
        <el-form-item v-if="operLoopData.periodtype == period.single" label="执行时间：" prop="singlextime">
          <el-date-picker style="width: 200px" v-model="operLoopData.singlextime" type="date"
                          placeholder="请选择时间点"></el-date-picker>
        </el-form-item>
        <el-form-item v-else-if="operLoopData.periodtype == period.day" label="执行时间：" prop="periodextime">
          <el-time-picker style="width: 200px" v-model="operLoopData.periodextime"
                          placeholder="请选择时间"></el-time-picker>
        </el-form-item>
        <el-form-item v-else-if="operLoopData.periodtype == period.week" label="执行时间：" prop="weeknumber">
          <el-select style="width: 200px" v-model="operLoopData.weeknumber" placeholder="请选择时间" clearable>
            <el-option v-for="item in week" :key="item.value" :value="item.value" :label="item.text"></el-option>
          </el-select>
          <el-time-picker style="width: 200px" v-model="operLoopData.periodextime"
                          placeholder="请选择时间"></el-time-picker>
        </el-form-item>
        <el-form-item v-else-if="operLoopData.periodtype == period.interval" label="间隔时间：" prop="intervaltime">
          <el-input style="width: 200px" type="text" v-model="operLoopData.intervaltime"></el-input>
        </el-form-item>
        <el-form-item label="执行功能：" prop="taskcmd">
          <div>
            <el-radio v-model="operLoopData.taskcmd" label="circuitryOn">开线路</el-radio>
          </div>
          <div>
            <el-radio v-model="operLoopData.taskcmd" label="circuitryOff">关线路</el-radio>
          </div>
          <div>
            <el-radio v-model="operLoopData.taskcmd" label="circuitryState">状态读取</el-radio>
          </div>
          <div>
            <el-radio v-model="operLoopData.taskcmd" label="circuitryMeter">读取电表</el-radio>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addLoopStrategy('addLootStrategy')">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="时序控制-编辑" :visible.sync="editStrategyDialogVisible" center :width="'650px'">
      <el-form label-width="120px" :model="operData" ref="editStrategy" :rules="addStrategyRules"
               class="el-form-default">
        <el-form-item label="策略名称：" prop="strategyname">
          <el-input type="text" v-model="operData.strategyname" placeholder="输入设备名称"></el-input>
        </el-form-item>
        <el-form-item label="归属企业：" prop="companyid">
          <tree-select-component v-model="operData.companyid" :list="companies"></tree-select-component>
        </el-form-item>
        <el-form-item label="策略功能：" prop="moduletype">
          <el-select v-model="operData.moduletype" placeholder="选择类型" clearable>
            <el-option v-for="item in deviceType" :key="item.value" :value="item.value" :label="item.text"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="有效时间：" required>
          <el-form-item style="display: inline-block" prop="validitystart">
            <el-date-picker style="width: 200px" v-model="operData.validitystart" type="date" placeholder=""></el-date-picker>
          </el-form-item>
          到
          <el-form-item style="display: inline-block" prop="validityend">
            <el-date-picker style="width: 200px" v-model="operData.validityend" type="date" placeholder=""></el-date-picker>
          </el-form-item>
        </el-form-item>
        <el-form-item label="执行频率：" prop="periodtype">
          <template v-for="item in periodType">
            <el-radio v-model="operData.periodtype" :label="item.value">{{item.text}}</el-radio>
          </template>
        </el-form-item>
        <el-form-item v-if="operData.periodtype == period.single" label="执行时间：" prop="executiontime">
          <el-date-picker style="width: 200px" v-model="operData.singlextime" type="date"
                          placeholder="请选择时间点"></el-date-picker>
        </el-form-item>
        <el-form-item v-else-if="operData.periodtype == period.day" label="执行时间：" prop="periodextime">
          <el-time-picker style="width: 200px" v-model="operData.periodextime" placeholder="请选择时间"></el-time-picker>
        </el-form-item>
        <el-form-item v-else-if="operData.periodtype == period.week" label="执行时间：" prop="weeknumber">
          <el-select style="width: 200px" v-model="operData.weeknumber" placeholder="请选择周几" clearable>
            <el-option v-for="item in week" :key="item.value" :value="item.value" :label="item.text"></el-option>
          </el-select>
          <el-time-picker style="width: 200px" v-model="operData.periodextime" placeholder="请选择时间"></el-time-picker>
        </el-form-item>
        <el-form-item v-else-if="operData.periodtype == period.interval" label="间隔时间：" prop="intervaltime">
          <el-input style="width: 200px" v-model="operData.intervaltime"></el-input>
        </el-form-item>
        <el-form-item label="执行功能：" prop="taskcmd">
          <div>
            <el-radio v-model="operData.taskcmd" label="lightOn">开灯</el-radio>
          </div>
          <div>
            <el-radio v-model="operData.taskcmd" label="lightOff">关灯</el-radio>
          </div>
          <div style="position: relative">
            <el-radio v-model="operData.taskcmd" label="lightAdjust">调节亮度</el-radio>
            <div style="position: absolute; width: 300px; right: 0; top: 5px">
              <el-slider :disabled="operData.taskcmd != 'lightAdjust'" v-model="operData.brightness"
                         show-input></el-slider>
            </div>
          </div>
          <div>
            <el-radio v-model="operData.taskcmd" label="lightSate">状态读取</el-radio>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editStrategy('editStrategy')">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="回路时序控制-编辑" :visible.sync="editLoopStrategyDialogVisible" center :width="'650px'">
      <el-form label-width="120px" :model="operLoopData" ref="editLoopStrategy" :rules="addStrategyRules"
               class="el-form-default">
        <el-form-item label="策略名称：" prop="strategyname">
          <el-input type="text" v-model="operLoopData.strategyname" placeholder="输入设备名称"></el-input>
        </el-form-item>
        <el-form-item label="归属企业：" prop="companyid">
          <tree-select-component v-model="operLoopData.companyid" :list="companies"></tree-select-component>
        </el-form-item>
        <el-form-item label="策略功能：" prop="moduletype">
          <el-select v-model="operLoopData.moduletype" placeholder="选择类型" clearable>
            <el-option v-for="item in deviceType" :key="item.value" :value="item.value" :label="item.text"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="有效时间：" required>
          <el-form-item style="display: inline-block" prop="validitystart">
            <el-date-picker style="width: 200px" v-model="operLoopData.validitystart" type="date" placeholder=""></el-date-picker>
          </el-form-item>
          到
          <el-form-item style="display: inline-block" prop="validityend">
          <el-date-picker style="width: 200px" v-model="operLoopData.validityend" type="date"
                          placeholder=""></el-date-picker>
        </el-form-item>
        </el-form-item>
        <el-form-item label="执行频率：" prop="periodtype">
          <template v-for="item in periodType">
            <el-radio v-model="operLoopData.periodtype" :label="item.value">{{item.text}}</el-radio>
          </template>
        </el-form-item>
        <el-form-item v-if="operLoopData.periodtype == period.single" label="执行时间：" prop="singlextime">
          <el-date-picker style="width: 200px" v-model="operLoopData.singlextime" type="date"
                          placeholder="请选择时间点"></el-date-picker>
        </el-form-item>
        <el-form-item v-else-if="operLoopData.periodtype == period.day" label="执行时间：" prop="periodextime">
          <el-time-picker style="width: 200px" v-model="operLoopData.periodextime"
                          placeholder="请选择时间"></el-time-picker>
        </el-form-item>
        <el-form-item v-else-if="operLoopData.periodtype == period.week" label="执行时间：" prop="weeknumber">
          <el-select style="width: 200px" v-model="operLoopData.weeknumber" placeholder="请选择时间" clearable>
            <el-option v-for="item in week" :key="item.value" :value="item.value" :label="item.text"></el-option>
          </el-select>
          <el-time-picker style="width: 200px" v-model="operLoopData.periodextime"
                          placeholder="请选择时间"></el-time-picker>
        </el-form-item>
        <el-form-item v-else-if="operLoopData.periodtype == period.interval" label="间隔时间：" prop="intervaltime">
          <el-input style="width: 200px" type="text" v-model="operLoopData.intervaltime"></el-input>
        </el-form-item>
        <el-form-item label="执行功能：" prop="taskcmd">
          <div>
            <el-radio v-model="operLoopData.taskcmd" label="circuitryOn">开线路</el-radio>
          </div>
          <div>
            <el-radio v-model="operLoopData.taskcmd" label="circuitryOff">关线路</el-radio>
          </div>
          <div>
            <el-radio v-model="operLoopData.taskcmd" label="circuitryState">状态读取</el-radio>
          </div>
          <div>
            <el-radio v-model="operLoopData.taskcmd" label="circuitryMeter">读取电表</el-radio>
          </div>
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
    import Services from "../services";
    export default {
        name: 'strategyTimePage',
        data() {
            return {
                addStrategyDialogVisible: false,
                addLoopStrategyDialogVisible: false,
                editStrategyDialogVisible: false,
                editLoopStrategyDialogVisible: false,
                deleteStrategyDialogVisible: false,
                addStrategyRules: {
                    companyid: [
                        {required: true, message: '请选择所属企业'}
                    ],
                    strategyname: [
                        {required: true, message: '请输入策略名称'}
                    ],
                    moduletype: [
                        {required: true, message: '请选择类型'}
                    ],
                    validitystart: [
                        {required: true, message: '请选择有效起始时间'}
                    ],
                    validityend: [
                        {required: true, message: '请选择有效截止时间'}
                    ],
                    periodtype: [
                        {required: true, message: '请选择执行频率'}
                    ],
                    taskcmd: [
                        {required: true, message: '请选择执行功能'}
                    ],
                },
                searchParams: {
                    strategyname: '',
                    moduletype: '',
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
            initCommonConstants: function () {
                this.deviceType = [
                    {value: 1, text: '灯控器'},
                    {value: 2, text: '回路控制器'},
                ];
            },
            initPaging: function () {
                this.findList(this.defaultPaging)
            },
            initCompanies: function () {
                this.$globalCache.companies.then(companies => {
                    this.companies = companies;
                })
            },
            initOperData: function () {
//                this.operData = this.$common.copyObj(LampContent);
            },
            pagingEvent: function (pageNumber) {
                this.searchParams.pageNum = pageNumber;
                this.findList(this.searchParams);
            },
            findList: function (params) {
                Services.findStrategy(params).then(data => {
                    this.searchParams.pageNum = data.pageNum;
                    this.searchParams.pages = data.pages;
                    this.searchParams.pageSize = data.pageSize;
                    this.list = data.list;
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
                        Services.addStrategy(this.operData).then(res => {
                            this.initPaging();
                            this.hideModal();
                        })
                    }
                })
            },
            addLoopStrategy: function (formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        Services.addLoopStrategy(this.operLoopData).then(res => {
                            this.initPaging();
                            this.hideModal();
                        })
                    }
                })
            },
            editStrategy: function (formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        Services.editStrategy(this.operData).then(res => {
                            this.initPaging();
                            this.hideModal();
                        })
                    }
                })
            },
            editLoopStrategy: function (formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        Services.editLoopStrategy(this.operLoopData).then(res => {
                            this.initPaging();
                            this.hideModal();
                        })
                    }
                })
            },
            deleteStrategy: function () {
                Services.deleteStrategy(this.operData.objectid).then(res => {
                    this.initPaging();
                    this.hideModal();
                })
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

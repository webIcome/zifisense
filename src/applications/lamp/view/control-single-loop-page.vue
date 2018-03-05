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
          </div>
        </form>
      </div>

    </div>
    <div class="my-table center">
      <table class="table table-hover table-striped">
        <thead>
        <th>设备名称</th>
        <th>设备ID</th>
        <th>地理位置</th>
        <th>运行状态</th>
        <th>回路状态</th>
        <th>当前策略</th>
        <th>操作</th>
        </thead>
        <tbody>
        <tr v-for="item in list">
          <td>{{item.devicename}}</td>
          <td>{{item.sn}}</td>
          <td>{{item.position}}</td>
          <td>{{item.runningstate | runningstateNameConverter}}</td>
          <td>{{item.loopcontrol}}</td>
          <td>{{item.loopcontrol}}</td>
          <td class="td-btns">
            <div class="icon-item"><span data-toggle="modal" data-target="#set-device" @click="dialogControlDevice" class="set-icon"></span></div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <paging-component v-if="searchParams.pages" :pageNumber="searchParams.pageNum" :pages="searchParams.pages"
                      @pagingEvent='pagingEvent'></paging-component>

    <el-dialog title="控制回路控制器" :visible.sync="controlDeviceDialogVisible" center :width="'600px'">
      <el-form label-width="170px" :model="operData"  ref="controlDevice">
        <el-form-item label="开关：" prop="switchstate">
          <el-radio v-model="operData.switchstate" label="1">开</el-radio>
          <el-radio v-model="operData.switchstate" label="2">关</el-radio>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="controlDevice('controlDevice')">确 定</el-button>
      </span>
    </el-dialog>

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
</template>

<script>
    import RestfulConstant from "../../../constants/restful";
    import Config from "../../../config";
    import Services from "../services";
    export default {
        name: 'controlSingleLoopPage',
        data() {
            return {
                controlDeviceDialogVisible: false,
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
                isSearchPage: false,
                list: [{}],
                companies: [],
                lightControllerType: [
                    {value: 1, text: '电源蓝牙'},
                    {value: 2, text: '电源ZETA'},
                    {value: 3, text: '电源蓝牙+ZETA'},
                    {value: 4, text: '外挂式蓝牙'},
                    {value: 5, text: '外挂式ZETA'},
                    {value: 6, text: '外挂式蓝牙+ZETA'},
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
                this.operData = {}
            },
            pagingEvent: function (pageNumber) {
                this.searchParams.pageNum = pageNumber;
                this.findList(this.searchParams);
            },
            findList: function (params) {
                Services.findLoopList(params).then(data => {
                    this.searchParams.pageNum = data.pageNum;
                    this.searchParams.pages = data.pages;
                    this.searchParams.pageSize = data.pageSize;
                    this.list = data.list;
                });
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
            showPage:function (page) {
                this.currentPage = page;
            },
            dialogControlDevice: function (device) {
                this.resetData();
                Services.getLoop(device.id).then(data => {
                    this.operData = data;
                    this.controlDeviceDialogVisible = true;
                })
            },
            controlDevice: function (formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        Services.editLoop(this.operData).then(res => {
                            this.initLamp();
                            this.hideModal();
                        });
                    }
                })
            },
            hideModal: function () {
                this.controlDeviceDialogVisible = false;
            },
            resetData: function () {
                this.operData = {}
            }

        }
    }
</script>

<style scoped lang="less">

</style>

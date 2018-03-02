<template>
  <div v-if="currentPage == pages.home" class="content-right">
    <div class="clearfix">
      <div class="search pull-left">
        <form class="form-inline default-form">
          <div class="form-group">
            <label class="sr-only">灯具型号：</label>
            <el-input type="text" v-model="searchParams.modelnum" placeholder="输入设备名称"/>
          </div>
          <div class="form-group">
            <label class="sr-only">归属企业：</label>
            <tree-select-component v-model="searchParams.companyid" :list="companies"></tree-select-component>
          </div>
          <div class="form-group">
            <label class="sr-only">灯具寿命：</label>
            <el-input type="text" v-model="searchParams.lifetime" placeholder="回路数"/>
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
    <div class="my-table center">
      <table class="table table-hover table-striped">
        <thead>
        <th>灯具型号</th>
        <th>灯具类型</th>
        <th>电源类型</th>
        <th>所属企业</th>
        <th>灯具寿命</th>
        <th>灯具功率</th>
        <th>额定电流</th>
        <th>额定电压</th>
        <th>操作</th>
        </thead>
        <tbody>
        <tr v-for="item in list">
          <td>{{item.modelnum}}</td>
          <td>{{item.lamptype | lampTypeNameConverter}}</td>
          <td>{{item.powertype | powerTypeNameConverter}}</td>
          <td>{{item.companyname}}</td>
          <td>{{item.lifetime}}</td>
          <td>{{item.power}}</td>
          <td>{{item.ratedcurrent}}</td>
          <td>{{item.ratedvoltage}}</td>
          <td class="td-btns">
            <div class="icon-item"><span data-toggle="modal" data-target="#edit-device" @click="dialogEditDevice(item)"
                                         class="edit-icon"></span></div>
            <div class="icon-item"><span data-toggle="modal" data-target="#delete-device" @click="dialogDeleteDevice(item)"
                                         class="delete-icon"></span></div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <paging-component v-if="searchParams.pages" :pageNumber="searchParams.pageNum" :pages="searchParams.pages"
                      @pagingEvent='pagingEvent'></paging-component>

    <el-dialog title="创建灯具类型" :visible.sync="addDeviceDialogVisible" center :width="'600px'">
      <el-form label-width="170px" :model="operData" :rules="addDeviceRoules" ref="addDevice" class="el-form-default">
        <el-form-item label="灯具型号：" prop="modelnum">
          <el-input v-model="operData.modelnum" placeholder="请输入灯具型号"></el-input>
        </el-form-item>
        <el-form-item label="灯具寿命：" prop="lifetime">
          <el-input type="text" v-model="operData.lifetime" placeholder="请输入灯具寿命"/>
        </el-form-item>
        <el-form-item label="灯具功率：" prop="power">
          <el-input type="text" v-model="operData.power" placeholder="请输入灯具功率"/>
        </el-form-item>
        <el-form-item label="额定电流：" prop="ratedcurrent">
          <el-input type="text" v-model="operData.ratedcurrent" placeholder="请输入额定电流"/>
        </el-form-item>
        <el-form-item label="额定电压：" prop="ratedvoltage">
          <el-input type="text" v-model="operData.ratedvoltage" placeholder="请输入额定电压"/>
        </el-form-item>
        <el-form-item label="归属企业：" prop="companyid">
          <tree-select-component v-model="operData.companyid" :list="companies"></tree-select-component>
        </el-form-item>
        <el-form-item label="灯具类型：" prop="lamptype">
          <el-select v-model="operData.lamptype" placeholder="选择灯具类型" clearable  style="width: 100%;">
            <el-option v-for="type in lamptype" :value="type.value" :key="type.value" :label="type.text"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="电源类型：" prop="powertype">
          <el-select v-model="operData.powertype" placeholder="选择电源类型" clearable  style="width: 100%;">
            <el-option v-for="type in powertype" :value="type.value" :key="type.value" :label="type.text"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addDevice('addDevice')">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="编辑灯具" :visible.sync="editDeviceDialogVisible" center :width="'600px'">
      <el-form label-width="170px" :model="operData" :rules="addDeviceRoules" ref="editDevice" class="el-form-default">
        <el-form-item label="灯具型号：" prop="modelnum">
          <el-input v-model="operData.modelnum" placeholder="请输入灯具型号"></el-input>
        </el-form-item>
        <el-form-item label="灯具寿命：" prop="lifetime">
          <el-input type="text" v-model="operData.lifetime" placeholder="请输入灯具寿命"/>
        </el-form-item>
        <el-form-item label="灯具功率：" prop="power">
          <el-input type="text" v-model="operData.power" placeholder="请输入灯具功率"/>
        </el-form-item>
        <el-form-item label="额定电流：" prop="ratedcurrent">
          <el-input type="text" v-model="operData.ratedcurrent" placeholder="请输入额定电流"/>
        </el-form-item>
        <el-form-item label="额定电压：" prop="ratedvoltage">
          <el-input type="text" v-model="operData.ratedvoltage" placeholder="请输入额定电压"/>
        </el-form-item>
        <el-form-item label="归属企业：" prop="companyid">
          <tree-select-component v-model="operData.companyid" :list="companies"></tree-select-component>
        </el-form-item>
        <el-form-item label="灯具类型：" prop="lamptype">
          <el-select v-model="operData.lamptype" placeholder="选择灯具类型" clearable  style="width: 100%;">
            <el-option v-for="type in lamptype" :value="type.value" :key="type.value" :label="type.text"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="电源类型：" prop="powertype">
          <el-select v-model="operData.powertype" placeholder="选择电源类型" clearable  style="width: 100%;">
            <el-option v-for="type in powertype" :value="type.value" :key="type.value" :label="type.text"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editDevice('editDevice')">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="删除灯具" :visible.sync="deleteDeviceDialogVisible" center :width="'600px'">
      <div class="text-center">
        <div class="dialog-warning"></div>
      </div>
      <p class="title">您确认要删除此灯具吗？</p>
      <p class="text-center">请慎重操作，您的操作一旦确认，将无法恢复，并被系统记录在日志当中！</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="deleteDevice">确认删除</el-button>
      </span>
    </el-dialog>
  </div>

  <div v-else-if="currentPage == pages.search" class="content-right">
    <div class="page-title">灯具高级搜索</div>
    <form class="form-horizontal default-form">
      <div class="form-group">
        <label class="col-md-3 control-label">灯具型号：</label>
        <div class="col-md-3">
          <el-input type="text" v-model="advancedSearchParams.modelnum"/>
        </div>
        <label class="col-md-3 control-label">灯具寿命：</label>
        <div class="col-md-3">
          <el-input type="text" class="input-two" v-model="advancedSearchParams.lifetimelow"/>到<el-input type="text" class="input-two" v-model="advancedSearchParams.lifetimehigh"/>
        </div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">灯具类型：</label>
        <div class="col-md-3">
          <el-select v-model="advancedSearchParams.lamptype" placeholder="选择灯具类型" clearable  style="width: 100%;">
            <el-option v-for="type in lamptype" :key="type.value" :value="type.value" :label="type.text"></el-option>
          </el-select>
        </div>
        <label class="col-md-3 control-label">电源类型：</label>
        <div class="col-md-3">
          <el-select v-model="advancedSearchParams.powertype" placeholder="选择灯具类型" clearable  style="width: 100%;">
            <el-option v-for="type in powertype" :key="type.value" :value="type.value" :label="type.text"></el-option>
          </el-select>
        </div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">灯具功率：</label>
        <div class="col-md-3">
          <el-input type="text" class="input-two" v-model="advancedSearchParams.powerlow"/>到<el-input type="text" class="input-two" v-model="advancedSearchParams.powerhigh"/>
        </div>
        <label class="col-md-3 control-label">额定电流：</label>
        <div class="col-md-3">
          <el-input type="text" class="input-two" v-model="advancedSearchParams.ratedCurrentLow"/>到<el-input type="text" class="input-two" v-model="advancedSearchParams.ratedCurrentHigh"/>
        </div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">额定电压：</label>
        <div class="col-md-3">
          <el-input type="text" class="input-two" v-model="advancedSearchParams.ratedVoltageLow"/>到<el-input type="text" class="input-two" v-model="advancedSearchParams.ratedVoltageHigh"/>
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
    import {ContentLamps} from '../models';
    import Config from "../../../config";
    import detailLoopControlPage from './detail-loop-control-page.vue'
    import Services from "../services";
    import Common from "../../../constants/common";
    export default {
        name: 'lampsControlPage',
        data() {
            return {
                addDeviceDialogVisible: false,
                editDeviceDialogVisible: false,
                deleteDeviceDialogVisible: false,
                addDeviceRoules: {
                    modelnum: [
                        {required: true, message: '请输入灯具型号'}
                    ],
                    lifetime: [
                        {required: true, message: '请输入灯具寿命'}
                    ],
                    power: [
                        {required: true, message: '请输入灯具功率'}
                    ],
                    ratedcurrent: [
                        {required: true, message: '请输入额定电流'}
                    ],
                    companyid: [
                        {required: true, message: '请选择企业'}
                    ],
                    ratedvoltage: [
                        {required: true, message: '请输入额定电压'}
                    ],
                    lamptype: [
                        {required: true, message: '选择灯具类型'}
                    ],
                    powertype: [
                        {required: true, message: '选择电源类型'}
                    ],
                },
                searchParams: {
                    modelnum: '',
                    componyid: '',
                    lifetime: '',
                },
                advancedSearchParams: {
                    modelnum: '',
                    lamptype: '',
                    powertype: '',
                    lifetimelow: '',
                    lifetimehigh: '',
                    powerlow: '',
                    powerhigh: '',
                    ratedCurrentLow: '',
                    ratedCurrentHigh: '',
                    ratedVoltageLow: '',
                    ratedVoltageHigh: '',
                    pageNum: '',
                    pageSize: '',
                },
                operData: {},
                list: [{}],
                companies: [],
                isSearchPage: false,
                lamptype: [],
                powertype: [],
                defaultPaging: {
                    pageSize: Config.DEFAULT_PAGE_SIZE,
                    pageNum: 1
                },
                deviceView: {},
                pages: {
                    home: 1,
                    search: 2,
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
                this.initCommonData();
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
                this.operData = this.$common.copyObj(ContentLamps);
            },
            initCommonData: function () {
                this.lamptype = Common.lampType;
                this.powertype = Common.powerType;
            },
            pagingEvent: function (pageNumber) {
                this.searchParams.pageNum = pageNumber;
                this.findList(this.searchParams);
            },
            findList: function (params) {
                Services.findLampsList(params).then(data => {
                    this.searchParams.pageNum = data.pageNum;
                    this.searchParams.pages = data.pages;
                    this.searchParams.pageSize = data.pageSize;
                    this.list = data.list;
                });
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
            showPage:function (page) {
                this.currentPage = page;
            },
            dialogAddDevice: function () {
                this.resetData();
                this.addDeviceDialogVisible = true;
            },
            dialogEditDevice: function (device) {
                this.resetData();
                this.operData = device;
                this.editDeviceDialogVisible = true;
            },
            dialogDeleteDevice: function (device) {
                this.resetData();
                this.operData = device;
                this.deleteDeviceDialogVisible = true;
            },
            deleteDevice: function () {
                Services.deleteLamps(this.operData.objectid).then(res => {
                    this.initLoop();
                    this.hideModal();
                });
            },
            editDevice: function (formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        Services.editLamps(this.operData).then(res => {
                            this.initLoop();
                            this.hideModal();
                        });
                    }
                })
            },
            addDevice: function (formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        Services.addLamps(this.operData).then(res => {
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
                this.operData = this.$common.copyObj(ContentLamps);
            }
        }
    }
</script>

<style scoped lang="less">

</style>

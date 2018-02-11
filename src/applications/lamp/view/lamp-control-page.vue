<template>
  <div v-if="currentPage == pages.home" class="content-right">
    <div class="clearfix">
      <div class="search pull-left">
        <form class="form-inline default-form">
          <div class="form-group">
            <label class="sr-only">设备名称：</label>
            <el-input type="text" v-model="searchParams.devicename" placeholder="输入设备名称"></el-input>
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
            <label class="sr-only">选择开关状态：</label>
            <el-select v-model="searchParams.switchstate" placeholder="选择开关状态" clearable >
              <el-option v-for="status in switchStatus" :key="status.value" :value="status.value" :label="status.text"></el-option>
            </el-select>
          </div>
          <div class="form-group">
            <label class="sr-only">灯控器类型：</label>
            <el-select v-model="searchParams.lightcontrollerType" placeholder="选择灯控器类型" clearable >
              <el-option v-for="status in lightControllerType" :key="status.value" :value="status.value" :label="status.text"></el-option>
            </el-select>
          </div>
          <div class="form-group">
            <label class="sr-only">传感器类型：</label>
            <el-select v-model="searchParams.sensortype" placeholder="选择传感器类型" clearable >
              <el-option v-for="status in sensorType" :key="status.value" :value="status.value" :label="status.text"></el-option>
            </el-select>
          </div>
          <div @click="search" class="form-group default-btn"><span class="quick-search-icon default-icon"></span>快速筛选</div>
          <div class="pull-right">
            <div @click="dialogHighSearch" class="default-btn"><span class="search-icon default-icon"></span>高级搜索</div>
            <div data-toggle="modal" data-target="#add-device" class="default-btn"><span
                class="add-icon default-icon"></span>创建
            </div>
          </div>
        </form>
      </div>

    </div>
    <div class="table center">
      <table class="table table-hover table-striped">
        <thead>
        <th>设备名称</th>
        <th>设备ID</th>
        <th>运行状态</th>
        <th>地理位置</th>
        <th>开关状态</th>
        <th>亮度值</th>
        <th>电压</th>
        <th>电流</th>
        <th>有功电能</th>
        <th>操作</th>
        </thead>
        <tbody>
        <tr v-for="item in list" @click="showDetail($event, item)">
          <td>{{item.devicename}}</td>
          <td>{{item.sn}}</td>
          <td>{{item.runnintstate}}</td>
          <td>{{item.position}}</td>
          <td>{{(item.switchstate == 1)? '开':'关'}}</td>
          <td>{{item.brightness}}</td>
          <td>{{item.voltagelow}}</td>
          <td>{{item.oldpwd}}</td>
          <td>{{item.activepower}}</td>
          <td class="td-btns">
            <!--<div class="icon-item"><span data-toggle="modal" data-target="#set-device" @click="dialogSetDevice" class="set-icon"></span></div>-->
            <div class="icon-item"><span data-toggle="modal" data-target="#edit-device"
                                         @click="dialogEditDevice(item)" class="edit-icon"></span></div>
            <div class="icon-item"><span data-toggle="modal" data-target="#delete-device" @click="dialogDeleteDevice(item)"
                                         class="delete-icon"></span></div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <paging-component v-if="searchParams.pages" :pageNumber="searchParams.pageNum" :pages="searchParams.pages"
                      @pagingEvent='pagingEvent'></paging-component>

    <dialog-component id="add-device">
      <div slot="body">
        <div class="dialog-title">创建灯控器</div>
        <form class="form-horizontal default-form">
          <div class="form-group">
            <label class="col-md-4 control-label">设备名称：</label>
            <div class="col-md-8">
              <el-input type="text" v-model="operData.devicename"/>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-4 control-label">设备ID：</label>
            <div class="col-md-8">
              <el-input type="text" v-model="operData.sn"/>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-4 control-label">归属组：</label>
            <div class="col-md-8 group-lamp">
              <template v-for="group in groups">
                <div class="group-item default-btn">{{group.name}} <span class="group-delete"></span></div>
              </template>
              <div @click="addGroup" class="group-add"></div>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-4 control-label">归属回路控制器：</label>
            <div class="col-md-8">
              <el-select v-model="operData.loopcontrollerSn" placeholder="选择归属回路控制器" clearable  style="width: 100%;">
                <el-option v-for="type in lightControllerType" :value="type.value" :key="type.value" :label="type.text"></el-option>
              </el-select>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-4 control-label">灯控器类型：</label>
            <div class="col-md-8">
              <el-select v-model="operData.lightcontrollerType" placeholder="选择灯控器类型" clearable  style="width: 100%;">
                <el-option v-for="type in lightControllerType" :value="type.value" :key="type.value" :label="type.text"></el-option>
              </el-select>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-4 control-label">传感器类型：</label>
            <div class="col-md-8">
              <el-select v-model="operData.sensortype" placeholder="选择传感器类型" clearable  style="width: 100%;">
                <el-option v-for="type in sensorType" :value="type.value" :key="type.value" :label="type.text"></el-option>
              </el-select>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-4 control-label">地理位置：</label>
            <div class="col-md-8">
              <el-input type="text" v-model="operData.position" placeholder="请输入地理位置"/>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-4 control-label">归属企业：</label>
            <div class="col-md-8">
              <tree-select-component v-model="operData.companyid" :list="companies"></tree-select-component>
            </div>
          </div>
          <div class="dialog-btn">
            <span @click="addDevice" class="dialog-btn-icon">确认</span>
          </div>
        </form>
      </div>
    </dialog-component>
    <dialog-component id="edit-device">
      <div slot="body">
        <div class="dialog-title">编辑灯控器</div>
        <form class="form-horizontal default-form">
          <div class="form-group">
            <label class="col-md-4 control-label">设备名称：</label>
            <div class="col-md-8">
              <el-input type="text" v-model="operData.devicename"/>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-4 control-label">设备ID：</label>
            <div class="col-md-8">
              <el-input type="text" v-model="operData.sn"/>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-4 control-label">归属组：</label>
            <div class="col-md-8 group-lamp">
              <template v-for="group in groups">
                <div class="group-item default-btn">{{group.name}} <span class="group-delete"></span></div>
              </template>
              <div @click="addGroup" class="group-add"></div>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-4 control-label">归属回路控制器：</label>
            <div class="col-md-8">
              <el-select v-model="operData.loopcontrollerSn" placeholder="选择归属回路控制器" clearable  style="width: 100%;">
                <el-option v-for="type in lightControllerType" :value="type.value" :key="type.value" :label="type.text"></el-option>
              </el-select>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-4 control-label">灯控器类型：</label>
            <div class="col-md-8">
              <el-select v-model="operData.lightcontrollerType" placeholder="选择灯控器类型" clearable  style="width: 100%;">
                <el-option v-for="type in lightControllerType" :value="type.value" :key="type.value" :label="type.text"></el-option>
              </el-select>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-4 control-label">传感器类型：</label>
            <div class="col-md-8">
              <el-select v-model="operData.sensortype" placeholder="选择传感器类型" clearable  style="width: 100%;">
                <el-option v-for="type in sensorType" :value="type.value" :key="type.value" :label="type.text"></el-option>
              </el-select>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-4 control-label">地理位置：</label>
            <div class="col-md-8">
              <el-input type="text" v-model="operData.position" placeholder="请输入地理位置"/>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-4 control-label">归属企业：</label>
            <div class="col-md-8">
              <tree-select-component v-model="operData.companyid" :list="companies"></tree-select-component>
            </div>
          </div>
          <div class="dialog-btn">
            <span @click="editDevice" class="dialog-btn-icon">确认</span>
          </div>
        </form>
      </div>
    </dialog-component>

    <dialog-component id="delete-device">
      <div slot="body">
        <div class="dialog-title">删除灯控器</div>
        <div class="text-center">
          <div class="dialog-warning"></div>
        </div>
        <p class="title">您确认要删除此灯控器吗？</p>
        <p class="text-center">请慎重操作，您的操作一旦确认，将无法恢复，并被系统记录在日志当中！</p>
        <div class="dialog-btn">
          <span @click="deleteDevice" class="dialog-btn-icon">确认删除</span>
        </div>
      </div>
    </dialog-component>

    <!-- <dialog-component id="set-device">
       <div slot="body">
         <div class="dialog-title">控制灯控器</div>
         <form class="form-horizontal default-form-radio">
           <div class="form-group">
             <label class="col-md-4 control-label">开关：</label>
             <div class="col-md-8">
               <div class="col-md-6"><input type="radio"  name="switch"/> 开</div>
               <div class="col-md-6"><input type="radio"  name="switch"/> 关</div>
             </div>
           </div>
           <div class="form-group">
             <label class="col-md-4 control-label">亮度：</label>
             <div class="col-md-8">
               <input type="text" class="form-control" />
             </div>
           </div>
           <div class="form-group">
             <label class="col-md-4 control-label"></label>
             <div class="col-md-8">
               <input type="checkbox" /> 状态读取
             </div>
           </div>
           <div class="form-group">
             <label class="col-md-4 control-label">所在时区：</label>
             <div class="col-md-8">
               <select  class="form-control">
                 <option value="">无</option>
                 <template v-for="company in logs">
                   <option>{{company.name}}</option>
                 </template>
               </select>
             </div>
           </div>
           <div class="dialog-btn">
             <span @click="deleteDevice" class="dialog-btn-icon">确认</span>
           </div>
         </form>
       </div>
     </dialog-component>-->
  </div>

  <div v-else-if="currentPage == pages.search" class="content-right">
    <div class="page-title">灯控器高级搜索</div>
    <form class="form-horizontal default-form">
      <div class="form-group">
        <label class="col-md-3 control-label">设备名称：</label>
        <div class="col-md-3">
          <el-input type="text" v-model="advancedSearchParams.devicename"/>
        </div>
        <label class="col-md-3 control-label">电压：</label>
        <div class="col-md-3">
          <el-input type="text" class="input-two" v-model="advancedSearchParams.voltagelow"/>到<el-input
            type="text" class="input-two" v-model="advancedSearchParams.voltagehigh"/>
        </div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">设备ID：</label>
        <div class="col-md-3">
          <el-input type="text" v-model="advancedSearchParams.sn"/>
        </div>
        <label class="col-md-3 control-label">电流：</label>
        <div class="col-md-3">
          <el-input type="text" class="input-two" v-model="advancedSearchParams.currrentlow"/>到<el-input
            v-model="advancedSearchParams.currenthigh" type="text" class="input-two"/>
        </div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">归属组：</label>
        <div class="col-md-3">
          <el-select v-model="advancedSearchParams.groupid" placeholder="选择归属组" clearable  style="width: 100%;">
            <el-option></el-option>
          </el-select>
        </div>
        <label class="col-md-3 control-label">有功电能：</label>
        <div class="col-md-3">
          <el-input type="text" class="input-two" v-model="advancedSearchParams.activepowerlow"/>到<el-input
            type="text" class="input-two" v-model="advancedSearchParams.activepowerhigh"/>
        </div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">归属回路控制器：</label>
        <div class="col-md-3">
          <el-select v-model="advancedSearchParams.loopcontrollerSn" placeholder="选择归属回路控制器" clearable  style="width: 100%;">
            <el-option></el-option>
          </el-select>
        </div>
        <label class="col-md-3 control-label">地理位置：</label>
        <div class="col-md-3">
          <el-input type="text" v-model="advancedSearchParams.position"/>
        </div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">灯控器类型：</label>
        <div class="col-md-3">
          <el-select v-model="advancedSearchParams.lightcontrollerType" placeholder="选择归属回路控制器" clearable  style="width: 100%;">
            <el-option v-for="type in lightControllerType" :key="type.value" :value="type.value" :label="type.text"></el-option>
          </el-select>
        </div>
        <label class="col-md-3 control-label">接入时间：</label>
        <div class="col-md-3">
   <!--       <el-date-picker v-model="advancedSearchParams.regtimestart" type="date" placeholder="请选择开始时间"></el-date-picker>
          <el-date-picker v-model="advancedSearchParams.regtimeend" type="date" placeholder="请选择结束时间"></el-date-picker>-->
          <vue-datepicker-local clearable :inputClass="'form-control'" class="input-two"
                                v-model="advancedSearchParams.regtimestart"></vue-datepicker-local>到
          <vue-datepicker-local clearable :inputClass="'form-control'" class="input-two"
                                v-model="advancedSearchParams.regtimeend"></vue-datepicker-local>
        </div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">传感器类型：</label>
        <div class="col-md-3">
          <el-select v-model="advancedSearchParams.sensortype" placeholder="选择传感器类型" clearable  style="width: 100%;">
            <el-option v-for="type in sensorType" :key="type.value" :value="type.value" :label="type.text"></el-option>
          </el-select>
        </div>
        <label class="col-md-3 control-label">归属企业：</label>
        <div class="col-md-3">
          <tree-select-component v-model="searchParams.companyid" :list="companies"></tree-select-component>
        </div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">开关状态：</label>
        <div class="col-md-3">
          <el-select v-model="advancedSearchParams.switchstate" placeholder="选择开关状态" clearable  style="width: 100%;">
            <el-option v-for="type in switchStatus" :key="type.value" :value="type.value" :label="type.text"></el-option>
          </el-select>
        </div>
        <label class="col-md-3 control-label">运行状态：</label>
        <div class="col-md-3">
          <el-select v-model="advancedSearchParams.runningstate" placeholder="选择运行状态" clearable  style="width: 100%;">
            <el-option v-for="type in runningStatus" :key="type.value" :value="type.value" :label="type.text"></el-option>
          </el-select>
        </div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">亮度值：</label>
        <div class="col-md-3">
          <el-input type="text" class="input-two" v-model="advancedSearchParams.brightnesslow"/>到<el-input
            type="text" class="input-two" v-model="advancedSearchParams.brightnesshigh"/>
        </div>
      </div>
      <div class="search-btn">
        <div @click="highSearch" class="default-btn">搜索</div>
        <div @click="goBack" class="default-btn">返回</div>
      </div>
    </form>
  </div>
  <detail-lamp-control-page v-else-if="currentPage == pages.detail" :device="deviceView" :pages="pages" @page="showPage"></detail-lamp-control-page>
</template>

<script>
    import RestfulConstant from "../../../constants/restful";
    import Config from "../../../config";
    import {ContentLamp} from '../models';
    import detailLampControlPage from './detail-lamp-control-page.vue'
    import {Select, Option} from 'element-ui'
    import ElOption from "../../../../node_modules/element-ui/packages/select/src/option";
    export default {
        name: 'lampControlPage',
        data() {
            return {
                searchParams: {
                    devicename: '',
                    sn: '',
                    companyid: '',
                    switchstate: '',
                    lightcontrollerType: '',
                    sensortype: ''
                },
                advancedSearchParams: {
                    devicename: '',
                    sn: '',
                    groupid: '',
                    loopcontrollerSn: '',
                    lightcontrollerType: '',
                    sensortype: '',
                    switchstate: '',
                    brightnesslow: '',
                    brightnesshigh: '',
                    voltagelow: '',
                    voltagehigh: '',
                    currentlow: '',
                    currenthigh: '',
                    activepowerlow: '',
                    activepowerhigh: '',
                    position: '',
                    regtimestart: '',
                    regtimeend: '',
                    companyid: '',
                    runningstate: '',
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
        components: {
            ElOption, detailLampControlPage,
            'el-select': Select,
//            'el-option': Option
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
              this.operData = this.$common.copyObj(ContentLamp);
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
            showDetail: function (event,device) {
                if (event.target.className == 'delete-icon' || event.target.className == 'edit-icon') {
                    return;
                }
                this.getDevice(device.sn).then(device => {
                    this.deviceView = device;
                    this.showPage(this.pages.detail)
                });
            },
            showPage:function (page) {
                this.currentPage = page;
            },
            dialogAddDevice: function () {
                this.resetData();
            },
            dialogEditDevice: function (device) {
                this.resetData();
                this.getDevice(device.sn).then(device => {
                    this.operData = device
                });
            },
            dialogDeleteDevice: function (device) {
                this.resetData();
                this.operData = device;
            },
            getDevice: function (id) {
                return this.$http.post('lightController/getDetailsBySn', {sn: id}).then(res => {
                    return res.body.data
                }).catch()
            },
            deleteDevice: function () {
                this.$http.post('lightController/delete', {sn: this.operData.sn}).then(res => {
                    this.initLamp();
                    this.hideModal();
                });
            },
            editDevice: function () {
                this.$http.post('lightController/edit', this.operData).then(res => {
                    this.initLamp();
                    this.hideModal();
                });
            },
            addDevice: function () {
                this.$http.post('lightController/add', this.operData).then(res => {
                    this.initLamp();
                    this.hideModal();
                });
            },
            hideModal: function () {
                $('.modal').modal('hide')
            },
            resetData: function () {
                this.operData = this.$common.copyObj(ContentLamp);
            }

        }
    }
</script>

<style scoped lang="less">

</style>

<template>
  <div v-if="currentPage == pages.home" class="content-right">
    <div class="clearfix">
      <div class="search pull-left">
        <form class="form-inline default-form">
          <div class="form-group">
            <label class="sr-only">设备名称：</label>
            <input type="text" class="form-control" v-model="searchParams.devicename" placeholder="输入设备名称"/>
          </div>
          <div class="form-group">
            <label class="sr-only">设备ID：</label>
            <input type="text" class="form-control" v-model="searchParams.sn" placeholder="输入设备ID"/>
          </div>
          <div class="form-group">
            <label class="sr-only">归属企业：</label>
            <tree-select-component v-model="searchParams.companyid" :list="companies"></tree-select-component>
          </div>
          <div class="form-group">
            <label class="sr-only">选择开关状态：</label>
            <select class="form-control" v-model="searchParams.switchstate">
              <option value="">--选择开关状态--</option>
              <template v-for="status in switchStatus">
                <option :value="status.value">{{status.text}}</option>
              </template>
            </select>
          </div>
          <div class="form-group">
            <label class="sr-only">灯控器类型：</label>
            <select v-model="searchParams.lightcontrollerType" class="form-control">
              <option value="">--选择灯控器类型--</option>
              <template v-for="type in lightControllerType">
                <option :value="type.value">{{type.text}}</option>
              </template>
            </select>
          </div>
          <div class="form-group">
            <label class="sr-only">传感器类型：</label>
            <select class="form-control" v-model="searchParams.sensortype">
              <option value="">--选择传感器类型--</option>
              <template v-for="type in sensorType">
                <option :value="type.value">{{type.text}}</option>
              </template>
            </select>
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
              <input type="text" class="form-control" v-model="operData.devicename"/>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-4 control-label">设备ID：</label>
            <div class="col-md-8">
              <input type="text" class="form-control" v-model="operData.sn"/>
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
              <select v-model="operData.loopcontrollerSn" class="form-control">
                <option value="">--选择回路控制器--</option>
                <template >
                  <option>{{}}</option>
                </template>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-4 control-label">灯控器类型：</label>
            <div class="col-md-8">
              <select class="form-control" v-model="operData.lightcontrollerType">
                <option value="">--选择灯控器类型--</option>
                <template v-for="type in lightControllerType">
                  <option :value="type.value">{{type.text}}</option>
                </template>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-4 control-label">传感器类型：</label>
            <div class="col-md-8">
              <select class="form-control" v-model="operData.sensortype">
                <option value="">--选择传感器类型--</option>
                <template v-for="type in sensorType">
                  <option :value="type.value">{{type.text}}</option>
                </template>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-4 control-label">地理位置：</label>
            <div class="col-md-8">
              <input type="text" class="form-control" v-model="operData.position" placeholder="请输入地理位置"/>
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
              <input type="text" class="form-control" v-model="operData.devicename"/>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-4 control-label">设备ID：</label>
            <div class="col-md-8">
              <input type="text" class="form-control" v-model="operData.sn"/>
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
              <select v-model="operData.loopcontrollerSn" class="form-control">
                <template >
                  <option>{{}}</option>
                </template>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-4 control-label">灯控器类型：</label>
            <div class="col-md-8">
              <select class="form-control" v-model="operData.lightcontrollerType">
                <template v-for="type in lightControllerType">
                  <option :value="type.value">{{type.text}}</option>
                </template>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-4 control-label">传感器类型：</label>
            <div class="col-md-8">
              <select class="form-control" v-model="operData.sensortype">
                <template v-for="type in sensorType">
                  <option :value="type.value">{{type.text}}</option>
                </template>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-4 control-label">地理位置：</label>
            <div class="col-md-8">
              <input type="text" class="form-control" v-model="operData.position" placeholder="请输入地理位置"/>
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
          <input type="text" class="form-control" v-model="advancedSearchParams.devicename"/>
        </div>
        <label class="col-md-3 control-label">电压：</label>
        <div class="col-md-3">
          <input type="text" class="form-control input-two" v-model="advancedSearchParams.voltagelow"/>到<input
            type="text" class="form-control input-two" v-model="advancedSearchParams.voltagehigh"/>
        </div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">设备ID：</label>
        <div class="col-md-3">
          <input type="text" class="form-control" v-model="advancedSearchParams.sn"/>
        </div>
        <label class="col-md-3 control-label">电流：</label>
        <div class="col-md-3">
          <input type="text" class="form-control input-two" v-model="advancedSearchParams.currrentlow"/>到<input
            v-model="advancedSearchParams.currenthigh" type="text" class="form-control input-two"/>
        </div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">归属组：</label>
        <div class="col-md-3">
          <select class="form-control" v-model="advancedSearchParams.groupid">
            <option value="">--选择归属组--</option>
            <template>
              <option></option>
            </template>
          </select>
        </div>
        <label class="col-md-3 control-label">有功电能：</label>
        <div class="col-md-3">
          <input type="text" class="form-control input-two" v-model="advancedSearchParams.activepowerlow"/>到<input
            type="text" class="form-control input-two" v-model="advancedSearchParams.activepowerhigh"/>
        </div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">归属回路控制器：</label>
        <div class="col-md-3">
          <select class="form-control" v-model="advancedSearchParams.loopcontrollerSn">
            <option value="">--选择归属回路控制器--</option>
            <template>
              <option></option>
            </template>
          </select>
        </div>
        <label class="col-md-3 control-label">地理位置：</label>
        <div class="col-md-3">
          <input type="text" class="form-control" v-model="advancedSearchParams.position"/>
        </div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">灯控器类型：</label>
        <div class="col-md-3">
          <select class="form-control" v-model="advancedSearchParams.lightcontrollerType">
            <option value="">--选择灯控器类型--</option>
            <template v-for="type in lightControllerType">
              <option :value="type.value">{{type.text}}</option>
            </template>
          </select>
        </div>
        <label class="col-md-3 control-label">接入时间：</label>
        <div class="col-md-3">
          <vue-datepicker-local clearable :inputClass="'form-control'" class="input-two"
                                v-model="advancedSearchParams.regtimestart"></vue-datepicker-local>到
          <vue-datepicker-local clearable :inputClass="'form-control'" class="input-two"
                                v-model="advancedSearchParams.regtimeend"></vue-datepicker-local>
        </div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">传感器类型：</label>
        <div class="col-md-3">
          <select class="form-control" v-model="advancedSearchParams.sensortype">
            <option value="">--选择传感器类型--</option>
            <template v-for="type in sensorType">
              <option :value="type.value">{{type.text}}</option>
            </template>
          </select>
        </div>
        <label class="col-md-3 control-label">归属企业：</label>
        <div class="col-md-3">
          <tree-select-component v-model="searchParams.companyid" :list="companies"></tree-select-component>
        </div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">开关状态：</label>
        <div class="col-md-3">
          <select class="form-control" v-model="advancedSearchParams.switchstate">
            <option value="">--选择开关状态--</option>
            <template v-for="status in switchStatus">
              <option :value="status.value">{{status.text}}</option>
            </template>
          </select>
        </div>
        <label class="col-md-3 control-label">运行状态：</label>
        <div class="col-md-3">
          <select class="form-control" v-model="advancedSearchParams.runningstate">
            <option value="">--选择运行状态--</option>
            <template v-for="status in runningStatus">
              <option :value="status.value">{{status.text}}</option>
            </template>
          </select>
        </div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">亮度值：</label>
        <div class="col-md-3">
          <input type="text" class="form-control input-two" v-model="advancedSearchParams.brightnesslow"/>到<input
            type="text" class="form-control input-two" v-model="advancedSearchParams.brightnesshigh"/>
        </div>
      </div>
      <div class="search-btn">
        <div @click="highSearch" class="default-btn">搜索</div>
        <div @click="goBack" class="default-btn">返回</div>
      </div>
    </form>
  </div>
  <detail-lamp-control-page v-else-if="currentPage == pages.detail" :id="detailDeviceId" :pages="pages" @page="showPage"></detail-lamp-control-page>
</template>

<script>
    import RestfulConstant from "../../../constants/restful";
    import Config from "../../../config";
    import {ContentLamp} from '../models';
    import detailLampControlPage from './detail-lamp-control-page.vue'
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
                detailDeviceId: '',
                pages: {
                    home: 1,
                    search: 2,
                    detail: 3
                },
                currentPage: 1
            }
        },
        components: {
            detailLampControlPage
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
                this.$http.post('lightController/getList', params).then(res => {
                    this.searchParams.pageNum = res.pageNum;
                    this.searchParams.pages = res.pages;
                    this.list = res.list;
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
                this.detailDeviceId = device.sn;
                this.showPage(this.pages.detail)
            },
            showPage:function (page) {
                this.currentPage = page;
            },
            dialogAddDevice: function () {
                this.resetData();
            },
            dialogEditDevice: function (device) {
                this.resetData();
                this.operData = device;
            },
            dialogDeleteDevice: function (device) {
                this.resetData();
                this.operData = device;
            },
            deleteDevice: function () {
                this.$http.post('lightController/delete', this.operData).then(res => {
                    this.hideModal();
                });
            },
            editDevice: function () {
                this.$http.post('lightController/edit', this.operData).then(res => {
                    this.hideModal();
                });
            },
            addDevice: function () {
                this.$http.post('lightController/add', this.operData).then(res => {
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

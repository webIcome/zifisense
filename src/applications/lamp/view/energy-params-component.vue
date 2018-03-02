<template>
  <div>
    <el-form label-width="200px" :model="searchParams" ref="addArea" class="el-form-default" style="padding: 0 200px;">
      <el-form-item label="请选择设备类型：" prop="deviceType">
        <el-radio v-model="searchParams.deviceType" label="1">灯控器</el-radio>
        <el-radio v-model="searchParams.deviceType" label="2">回路控制器</el-radio>
      </el-form-item>
      <el-form-item label="请选择统计单位：" prop="unit">
        <el-radio v-model="searchParams.unit" :label="units.device">单个设备</el-radio>
        <el-radio v-model="searchParams.unit" :label="units.group">组</el-radio>
        <el-radio v-model="searchParams.unit" :label="units.area">区域</el-radio>
        <el-radio v-model="searchParams.unit" :label="units.company">企业</el-radio>
      </el-form-item>
      <el-form-item label="参与统计的相关单位：" prop="items">
        <el-row type="flex" justify="flex-start">
          <span style="margin-right: 20px">{{itemsLength()}}个单位</span>
          <el-button type="primary" icon="el-icon-edit-outline" @click="dialogEditItems(searchParams.unit)">编辑</el-button>
        </el-row>
      </el-form-item>
      <el-form-item label="情景类别：" prop="sceneCategory">
        <el-row type="flex" justify="space-between">
          <el-select v-model="searchParams.sceneCategory" placeholder="请选择类型跨度" clearable>
            <el-option v-for="item in sceneCategory" :key="item.value" :value="item.value" :label="item.text"></el-option>
          </el-select>
          <span style="margin: 0 10px">从</span>
          <el-date-picker v-model="searchParams.dateStart" type="date" placeholder="选择日期"></el-date-picker>
          <span style="margin: 0 10px;">到</span>
          <el-date-picker v-model="searchParams.dateEnd" type="date" placeholder="选择日期"></el-date-picker>
        </el-row>
      </el-form-item>
      <div class="text-center" style="margin: 100px">
        <el-button style="width: 200px; font-size: 18px" type="primary" @click="search">确 定</el-button>
      </div>
    </el-form>
    <el-dialog title="编辑设备列表" :visible.sync="selectDeviceDialogVisible" center :width="'600px'">
      <el-form :inline="true" label-width="170px" :model="searchDeviceParams" >
        <el-form-item prop="devicename">
          <el-input type="text" v-model="searchDeviceParams.devicename" placeholder="输入设备名称"></el-input>
        </el-form-item>
        <el-form-item prop="sn">
          <el-input type="text" v-model="searchDeviceParams.sn" placeholder="输入设备ID"></el-input>
        </el-form-item>
        <el-button class="pull-right" type="primary"  icon="el-icon-search">筛选</el-button>
      </el-form>
      <div>
        <div style="margin-bottom: 20px">
          <el-button type="primary" @click="chooseAllDevices(deviceList)">全选</el-button>
          <el-button type="primary" @click="chooseAllDevices()">全不选</el-button>
        </div>
        <el-table ref="deviceTable" :data="deviceList" border class="table" @selection-change="handleSelectionChange">
          <el-table-column type="selection" align="center"></el-table-column>
          <el-table-column label="设备名称" prop="devicename" align="center"></el-table-column>
          <el-table-column label="设备ID" prop="sn" align="center"></el-table-column>
        </el-table>
        <paging-component v-if="searchDeviceParams.pages" :pageNumber="searchDeviceParams.pageNum" :pages="searchDeviceParams.pages"
                          @pagingEvent='pagingDeviceEvent'></paging-component>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmSelectedList">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="编辑组" :visible.sync="selectGroupDialogVisible" center :width="'600px'">
      <el-form :inline="true" label-width="170px" :model="searchGroupParams">
        <el-form-item prop="devicename">
          <el-input type="text" v-model="searchGroupParams.groupname" placeholder="输入组名称"></el-input>
        </el-form-item>
        <el-button class="pull-right" type="primary"  icon="el-icon-search">筛选</el-button>
      </el-form>
      <div>
        <div style="margin-bottom: 20px">
          <el-button type="primary" @click="chooseAllDevices(groupList)">全选</el-button>
          <el-button type="primary" @click="chooseAllDevices()">全不选</el-button>
        </div>
        <el-table ref="groupTable" :data="groupList" border class="table" @selection-change="handleSelectionChange">
          <el-table-column type="selection" align="center"></el-table-column>
          <el-table-column label="设备名称" prop="devicename" align="center"></el-table-column>
        </el-table>
        <paging-component v-if="searchGroupParams.pages" :pageNumber="searchGroupParams.pageNum" :pages="searchGroupParams.pages"
                          @pagingEvent='pagingGroupEvent'></paging-component>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmSelectedList">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="编辑区域" :visible.sync="selectAreaDialogVisible" center :width="'600px'">
      <el-form :inline="true" label-width="170px" :model="searchAreaParams">
        <el-form-item prop="devicename">
          <el-input type="text" v-model="searchAreaParams.areaname" placeholder="输入区域名称"></el-input>
        </el-form-item>
        <el-button class="pull-right" type="primary"  icon="el-icon-search">筛选</el-button>
      </el-form>
      <div>
        <div style="margin-bottom: 20px">
          <el-button type="primary" @click="chooseAllDevices(areaList)">全选</el-button>
          <el-button type="primary" @click="chooseAllDevices()">全不选</el-button>
        </div>
        <el-table ref="areaTable" :data="areaList" border class="table" @selection-change="handleSelectionChange">
          <el-table-column type="selection" align="center"></el-table-column>
          <el-table-column label="区域名称" prop="devicename" align="center"></el-table-column>
        </el-table>
        <paging-component v-if="searchAreaParams.pages" :pageNumber="searchAreaParams.pageNum" :pages="searchAreaParams.pages"
                          @pagingEvent='pagingAreaEvent'></paging-component>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmSelectedList">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="编辑企业" :visible.sync="selectCompanyDialogVisible" center :width="'600px'">
      <el-form :inline="true" label-width="170px" :model="searchCompanyParams">
        <el-form-item prop="devicename">
          <el-input type="text" v-model="searchCompanyParams.companyname" placeholder="输入企业名称"></el-input>
        </el-form-item>
        <el-button class="pull-right" type="primary"  icon="el-icon-search">筛选</el-button>
      </el-form>
      <div>
        <div style="margin-bottom: 20px">
          <el-button type="primary" @click="chooseAllDevices(companyList)">全选</el-button>
          <el-button type="primary" @click="chooseAllDevices()">全不选</el-button>
        </div>
        <el-table ref="companyTable" :data="companyList" border class="table" @selection-change="handleSelectionChange">
          <el-table-column type="selection" align="center"></el-table-column>
          <el-table-column label="企业名称" prop="devicename" align="center"></el-table-column>
        </el-table>
        <paging-component v-if="searchCompanyParams.pages" :pageNumber="searchCompanyParams.pageNum" :pages="searchCompanyParams.pages"
                          @pagingEvent='pagingCompanyEvent'></paging-component>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmSelectedList">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
    import Config from "../../../config";
    import Services from "../services";
    export default {
        name: 'energyParamsComponent',
        data() {
            return {
                selectDeviceDialogVisible: false,
                selectGroupDialogVisible: false,
                selectAreaDialogVisible: false,
                selectCompanyDialogVisible: false,
                searchParams: {
                    deviceType: '1',
                    unit: 1,
                    items: [],
                    sceneCategory: '',
                    dateStart: '',
                    dateEnd: ''
                },
                searchDeviceParams: {
                    devicename: '',
                    sn: ''
                },
                searchGroupParams: {
                    groupname: '',
                },
                searchAreaParams: {
                    areaname: '',
                },
                searchCompanyParams: {
                    companyname: '',
                },
                sceneCategory: [],
                defaultPaging: {
                    pageSize: Config.DEFAULT_PAGE_SIZE,
                    pageNum: 1
                },
                units: {
                    device: 1,
                    group: 2,
                    area: 3,
                    company: 4
                },
                deviceList: [],
                groupList: [],
                areaList: [],
                companyList: [],
                refTable: {},
                selectedList: {},
                selectedListCache: {}
            }
        },
        props: {},
        computed: {
        },
        created: function () {
            this.initData();
        },
        mounted: function () {
        },
        methods: {
            initData: function () {
                this.selectedListCache = {
                    [this.units.device]: {},
                    [this.units.group]: {},
                    [this.units.area]: {},
                    [this.units.company]: {}
                };
                this.selectedList = Object.assign({},this.selectedListCache);
                this.refTable = {
                    [this.units.device]: 'deviceTable',
                    [this.units.group]: 'groupTable',
                    [this.units.area]: 'areaTable',
                    [this.units.company]: 'companyTable'
                }
            },
            search: function () {
                this.confirmItems();
                this.$emit('search', this.searchParams);
            },
            itemsLength: function () {
                return Object.keys(this.selectedList[this.searchParams.unit]).length;
            },
            pagingDeviceEvent: function (pageNumber) {
                this.searchDeviceParams.pageNum = pageNumber;
                this.findDeviceList(this.searchDeviceParams.pageNum);
            },
            pagingGroupEvent: function (pageNumber) {
                this.searchGroupParams.pageNum = pageNumber;
                this.findGroupList(this.searchGroupParams);
            },
            pagingAreaEvent: function (pageNumber) {
                this.searchAreaParams.pageNum = pageNumber;
                this.findAreaList(this.searchAreaParams);
            },
            pagingCompanyEvent: function (pageNumber) {
                this.searchCompanyParams.pageNum = pageNumber;
                this.findCompanyList(this.searchCompanyParams);
            },
            findDeviceList: function (params) {
                Services.findLightList(params).then(data => {
                    this.searchDeviceParams.pageNum =data.pageNum;
                    this.searchDeviceParams.pages = data.pages;
                    this.searchDeviceParams.pageSize = data.pageSize;
                    this.deviceList = data.list;
                    this.$nextTick(() => {
                        this.chooseAllDevices(this.getNewSelectedList(data.list, this.units.device))
                    })
                })
            },
            findGroupList: function (params) {
                Services.findGroupList(params).then(data => {
                    this.searchGroupParams.pageNum = data.pageNum;
                    this.searchGroupParams.pages = data.pages;
                    this.searchGroupParams.pageSize = data.pageSize;
                    this.groupList = data.list;
                    this.$nextTick(() => {
                        this.chooseAllDevices(this.getNewSelectedList(data.list, this.units.group))
                    })
                }).catch(err => {

                })
            },
            findAreaList: function (params) {
                Services.findAreaList(params).then(data => {
                    this.searchAreaParams.pageNum = data.pageNum;
                    this.searchAreaParams.pages = data.pages;
                    this.searchAreaParams.pageSize = data.pageSize;
                    this.areaList = data.list;
                    this.$nextTick(() => {
                        this.chooseAllDevices(this.getNewSelectedList(data.list, this.units.area))
                    })
                }).catch(err => {

                })
            },
            findCompanyList: function (params) {
                Services.findCompanyList(params).then(data => {
                    this.searchCompanyParams.pageNum = data.pageNum;
                    this.searchCompanyParams.pages = data.pages;
                    this.searchCompanyParams.pageSize = data.pageSize;
                    this.companyList = data.list;
                    this.$nextTick(() => {
                        this.chooseAllDevices(this.getNewSelectedList(data.list, this.units.company))
                    })
                }).catch(err => {

                })
            },
            getNewSelectedList: function (list, unit) {
                let objectid = this.searchParams.unit == this.units.device ? 'sn' : 'objectid';
                return list.filter(item => {
                    if (this.selectedList[unit][item[objectid]]){
                        return true;
                    }
                })
            },
            dialogEditItems: function (unit) {
                switch (unit) {
                    case this.units.device:
                        this.selectDeviceDialogVisible = true;
                        this.findDeviceList(Object.assign(this.searchDeviceParams, this.defaultPaging));
                        break;
                    case this.units.group:
                        this.selectGroupDialogVisible = true;
                        this.findGroupList(Object.assign(this.searchGroupParams, this.defaultPaging));
                        break;
                    case this.units.area:
                        this.selectAreaDialogVisible = true;
                        this.findAreaList(Object.assign(this.searchAreaParams, this.defaultPaging));
                        break;
                    case this.units.company:
                        this.selectCompanyDialogVisible = true;
                        this.findCompanyList(Object.assign(this.searchCompanyParams, this.defaultPaging));
                        break;
                    default:
                        this.confirmSelectedUnit();
                }
            },
            confirmSelectedUnit: function () {
                this.$message({
                    message: '请先选择统计单位',
                    type: 'warning'
                });
            },
            chooseAllDevices: function (devices) {
                if (devices) {
                    devices.forEach(item => {
                        this.$refs[this.refTable[this.searchParams.unit]].toggleRowSelection(item, true);
                    })
                } else {
                    this.$refs[this.refTable[this.searchParams.unit]].clearSelection();
                }
            },
            handleSelectionChange: function (val) {
                let selectedListCache = this.selectedListCache[this.searchParams.unit];
//                let objectid = this.searchParams.unit == this.units.device ? 'sn' : 'objectid';
                let objectid =  'sn';
                let list;
                switch (this.searchParams.unit) {
                    case this.units.device:
                        list = this.deviceList;
                        break;
                    case this.units.group:
                        list = this.groupList;
                        break;
                    case this.units.area:
                        list = this.areaList;
                        break;
                    case this.units.company:
                        list = this.companyList;
                        break;
                    default:
                        break;
                }
                this.changeSelectedListCache(list, selectedListCache, val, objectid);
            },
            changeSelectedListCache: function (list, selectedListCache, val, objectid) {
                list.forEach(item => {
                    if (selectedListCache[item[objectid]]) {
                        delete selectedListCache[item[objectid]];
                    }
                });
                val.forEach(item => {
                    selectedListCache[item[objectid]] = item;
                });
            },
            addStrategy: function (formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {

                    }
                })
            },
            confirmSelectedList: function () {
                this.selectedList[this.searchParams.unit] = this.selectedListCache[this.searchParams.unit];
                this.hideModal();
            },
            confirmItems: function () {
                this.searchParams.items = [];
                Object.keys(this.selectedList[this.searchParams.unit]).forEach(key => {
                    this.searchParams.items.push(key);
                });

            },
            hideModal: function () {
                this.selectDeviceDialogVisible = false;
                this.selectGroupDialogVisible = false;
                this.selectAreaDialogVisible = false;
                this.selectCompanyDialogVisible = false;
            },
            resetData: function () {
                this.operData = {};
            },
        }
    }
</script>

<style scoped lang="less">

</style>

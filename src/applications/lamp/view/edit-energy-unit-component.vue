<template>
  <el-row type="flex" justify="flex-start">
    <span style="margin-right: 20px">{{deviceNumber}}个单位</span>
    <el-button :disabled="!editable" type="primary" icon="el-icon-edit-outline" @click="dialogEditDevice">编辑</el-button>
    <el-dialog title="编辑组" :visible.sync="dialogVisible" center :width="'550px'"  append-to-body>
      <el-transfer v-model="selectedList"
                   :titles="titles"
                   :data="list"
                   :props="props"
                   :format="format">
        <el-pagination v-if="this.companyid" style="margin-top: 5px" class="transfer-footer" slot="left-footer" @current-change="pagingEvent"
                       small
                       :total="total"
                       next-text="下一页"
                       prev-text="上一页"
                       :page-size="searchParams.pageSize"
                       layout="prev, next"></el-pagination>
      </el-transfer>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="selectDevice">确 定</el-button>
      </span>
    </el-dialog>
  </el-row>
</template>
<script>
    import Services from "../services";
    import Config from "../../../config";
    import CommonConstant from "../../../constants/common";
    export default{
        name: 'editEnergyUnitComponent',
        data(){
            return {
                dialogVisible: false,
                searchParams: {
                },
                list: [],
                titles: ['列表', '已选择列表'],
                format: {
                    noChecked: '${total}',
                    hasChecked: '${checked}/${total}'
                },
                selectedList: [],
                selectDataList: [],
                defaultPaging: {
                    pageSize: Config.DEFAULT_PAGE_SIZE,
                    pageNum: 1
                },
                total: '',
                statisticalWay: {
                    device: 1,
                    group: 2,
                    area: 3,
                    company: 4
                }

            }
        },
        props: {
            statisticalway: {
                default: '',
            },
            moduletype: {
                default: ''
            },
            companyid: {
                default: ''
            },
            value: {
                default: ''
            },
        },
        created: function () {
            this.initData();
        },
        computed: {
            editable: function () {
                if (this.statisticalway != this.statisticalWay.company) {
                    return this.moduletype && this.statisticalway && this.companyid
                } else {
                    return this.moduletype && this.statisticalway
                }
            },
            deviceNumber: function () {
                if (this.value) {
                    return this.value.split(',').length
                } else {
                    return 0;
                }
            },
            props: function() {
                let key;
                let label;
                switch (this.statisticalway) {
                    case 1:
                        key = 'sn';
                        label = 'devicename';
                        break;
                    case 2:
                        key = 'objectid';
                        label = 'groupname';
                        break;
                    case 3:
                        key = 'objectid';
                        label = 'areaname';
                        break;
                    case 4:
                        key = 'objectid';
                        label = 'companyname';
                        break;
                    default:
                        key = 'sn';
                        label = 'devicename';
                        break;
                }
                return {
                    label: label,
                    key: key
                }
            }
        },
        watch: {
            statisticalway: function (newVal) {
                this.selectDataList = [];
                this.selectedList = [];
                this.$emit('input', '');
            }
        },
        methods: {
            initData: function () {
            },
            dialogEditDevice: function () {
                this.resetData();
                this.dialogVisible = true;
                this.findList(Object.assign(this.searchParams, this.defaultPaging))
            },
            pagingEvent: function (pageNumber) {
                this.searchParams.pageNum = pageNumber;
                this.findList(this.searchParams);
            },
            findList: function (params) {
                let func;
                switch (this.statisticalway){
                    case this.statisticalWay.device:
                        func = Services.findDevicesListForEnergy;
                        break;
                    case this.statisticalWay.group:
                        func = Services.findGroupsListForEnergy;
                        break;
                    case this.statisticalWay.area:
                        func = Services.findAreasListForEnergy;
                        break;
                    case this.statisticalWay.company:
                        func = Services.findCompaniesListForEnergy;
                        break;
                }
                func(params).then(data => {
                    this.searchParams.pageNum = data.pageNum;
                    this.searchParams.pages = data.pages;
                    this.searchParams.pageSize = data.pageSize;
                    this.list = this.transformList(data.list);
                    this.total = this.list.length;
                });
            },
            transformList: function (list) {
                let data = [];
                list.forEach(item => {
                    if(this.selectedList.indexOf(item[this.props.key]) == -1) {
                        data.push(item);
                    }
                })
                return this.selectDataList.concat(data)
            },
            selectDevice: function () {
                this.selectDataList = [];
                this.list.forEach(item => {
                    if(this.selectedList.indexOf(item[this.props.key]) != -1) {
                        this.selectDataList.push(item);
                    }
                });
                this.$emit('input', this.selectedList.join());
                this.dialogVisible = false;
            },
            resetData: function () {
                if (this.statisticalway == this.statisticalWay.company) {
                    this.searchParams.companyid = this.companyid;
                } else {
                    this.searchParams = {};
                }
                this.searchParams.moduletype = this.moduletype;
            }
        }
    }
</script>
<style lang="less" scoped>
</style>
<template>
  <el-row type="flex" justify="space-between">
    <el-col :span="18">{{deviceNumber}}个组</el-col>
    <el-input v-model="value" v-show="false"></el-input>
    <el-button :disabled="!editable" :span="6" type="primary" icon="el-icon-edit-outline" @click="dialogEditDevice">编辑</el-button>
    <el-dialog title="选择" :visible.sync="dialogVisible" center :width="'550px'"  append-to-body>
      <el-transfer v-model="selectedList"
                   :titles="titles"
                   :data="list"
                   :props="props"
                   :format="format">
        <el-pagination style="margin-top: 5px" class="transfer-footer" slot="left-footer" @current-change="pagingEvent"
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
        name: 'editLightGroupComponent',
        data(){
            return {
                dialogVisible: false,
                searchParams: {
//                  devicename: ''
                },
                list: [],
                titles: ['组列表', '已选择组'],
                format: {
                    noChecked: '${total}',
                    hasChecked: '${checked}/${total}'
                },
                props: {
                    key: 'objectid',
                    label: 'groupname'
                },
                selectedList: [],
                selectDataList: [],
                defaultPaging: {
                    pageSize: Config.DEFAULT_PAGE_SIZE,
                    pageNum: 1
                },
                total: 1,
                deviceType: {},

            }
        },
        props: {
            companyid: {
                default: '',
            },
            areaid: {
                default: '',
            },
            moduletype: {
                default: ''
            },
            value: {
                default: ''
            },
            run: {
                default: false
            }
        },
        created: function () {
            this.initData();
        },
        computed: {
            editable: function () {
                return this.moduletype && this.companyid
            },
            deviceNumber: function () {
                if (this.value) {
                    return this.value.split(',').length;
                } else {
                    return 0;
                }
            }
        },
        watch: {
            run: function (newVal) {
                if (newVal) this.getSelectedList();
            },
            moduletype: function (nuwVal, oldVal) {
                if (this.run && oldVal) this.getSelectedList();
            },
            companyid: function (nuwVal, oldVal) {
                if (this.run && oldVal) this.getSelectedList();
            },
        },
        methods: {
            initData: function () {
                CommonConstant.deviceType.forEach(item => {
                    this.deviceType[item.name] = item.value;
                });
                this.getSelectedList();
            },
            dialogEditDevice: function () {
                this.resetData();
                this.searchParams.companyid = this.companyid;
                this.searchParams.moduletype = this.moduletype;
                this.dialogVisible = true;
                this.findList(this.searchParams)
            },
            pagingEvent: function (pageNumber) {
                this.searchParams.pageNum = pageNumber;
                this.findList(this.searchParams);
            },
            findList: function (params) {
                Services.findDevicesAreaList(params).then(data => {
                    this.searchParams.pageNum = data.pageNum;
                    this.searchParams.pages = data.pages;
                    this.searchParams.pageSize = data.pageSize;
                    this.list = this.selectDataList.concat(data.list);
                    this.total = this.list.length;
                });
            },
            getSelectedList: function () {
                if (!this.areaid) {
                    this.initSelectDataList();
                    return;
                }
                Services.getSelectedDevicesAreaList({companyid: this.companyid, moduletype: this.moduletype, objectid: this.areaid}).then(data => {
                    this.selectDataList = data;
                    this.initSelectDataList();
                    this.$emit('input', this.selectedList.join());
                })
            },
            initSelectDataList: function () {
                this.selectedList = [];
                this.selectDataList.forEach(item => {
                    this.selectedList.push(item.objectid);
                });
                this.$emit('input', this.selectedList.join());
            },
            selectDevice: function () {
                this.$emit('input', this.selectedList.join());
                this.dialogVisible = false;
            },
            resetData: function () {
                if (this.areaid){
                    this.searchParams.dtype = 1;
                    this.searchParams.objectid = this.areaid;
                } else {
                    this.searchParams.dtype = 2
                }
            }
        }
    }
</script>
<style lang="less" scoped>
</style>
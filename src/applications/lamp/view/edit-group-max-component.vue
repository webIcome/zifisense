<template>
  <el-row type="flex" justify="space-between">
    <el-col :span="18">{{deviceNumber}}个组</el-col>
    <el-button :disabled="!editable" :span="6" type="primary" icon="el-icon-edit-outline" @click="dialogEditDevice">编辑</el-button>
    <el-dialog title="编辑组" :visible.sync="dialogVisible" center :width="'550px'"  append-to-body>
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
                total: 0,
            }
        },
        props: {
            companyid: {
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
            },
            groupname: {
                default: ''
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
            }
        },
        methods: {
            initData: function () {
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
                Services.findGroupList(params).then(data => {
                    this.searchParams.pageNum = data.pageNum;
                    this.searchParams.pages = data.pages;
                    this.searchParams.pageSize = data.pageSize;
                    this.list = this.selectDataList.concat(data.list);
                    this.total = this.list.length;
                });
            },
            getSelectedList: function () {
                this.selectedList = [];
                if (!this.value) return;
                this.selectDataList = this.getGroups(this.value, this.groupname);
                this.selectDataList.forEach(item => {
                    this.selectedList.push(item.objectid);
                });
                this.$emit('input', this.selectedList.join());
            },
            getGroups: function (id, name) {
                let ids = id.split(',');
                let names = name.split(',');
                let groups = [];
                ids.forEach((item,index) => {
                    let group = {};
                    group.sn = item;
                    group.devicename = names[index];
                    groups.push(group)
                });
                return groups;
            },
            selectDevice: function () {
                this.$emit('input', this.selectedList.join());
                this.dialogVisible = false;
            },
            resetData: function () {

            }
        }
    }
</script>
<style lang="less" scoped>
</style>
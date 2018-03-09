<template>
  <div>
    <el-input type="text" v-model="groupName" placeholder="选择组" @focus="dialogSelect" @change="changeSelect"></el-input>
    <el-dialog title="选择组" :visible.sync="dialogVisible" center :width="'600px'"  append-to-body>
      <el-form :inline="true" label-width="170px" :model="searchParams">
        <el-form-item prop="switchstate">
          <el-input type="text" v-model="searchParams.groupname" placeholder="输入策略名称"></el-input>
        </el-form-item>
        <el-form-item prop="switchstate">
          <el-select v-model="searchParams.moduleType" placeholder="选择类" clearable>
            <el-option v-for="status in deviceType" :key="status.value" :value="status.value"
                       :label="status.text"></el-option>
          </el-select>
        </el-form-item>
        <el-button type="primary" @click="findList" icon="el-icon-search">筛选</el-button>
      </el-form>
      <div>
        <el-table ref="singleTable" :data="list" border class="table" @row-click="select" highlight-current-row>
          <el-table-column label="组名称" prop="groupname" align="center"></el-table-column>
          <el-table-column label="类型" prop="moduleType" align="center"></el-table-column>
          <el-table-column label="应用状态" prop="stateId" :formatter="formatter" align="center"></el-table-column>
        </el-table>
        <paging-component v-if="searchParams.pages" :pageNumber="searchParams.pageNum" :pages="searchParams.pages"
                          @pagingEvent='pagingEvent'></paging-component>
      </div>
    </el-dialog>
  </div>
</template>
<script>
    import Services from "../services";
    import Config from "../../../config";
    import CommonConstant from "../../../constants/common";
    export default {
        data() {
            return {
                searchParams: {
                    strategyName: '',
                    moduleType: ''
                },
                deviceType: [],
                defaultPaging: {
                    pageSize: Config.DEFAULT_PAGE_SIZE,
                    pageNum: 1
                },
                dialogVisible: false,
                list: []
            }
        },
        props: {
            groupName: {
                default: ''
            }
        },
        created: function () {
            this.initData()
        },
        methods: {
            initData: function () {
                this.initCommonConstants();
            },
            initCommonConstants: function () {
                this.deviceType = CommonConstant.deviceType;
            },
            pagingEvent: function (pageNumber) {
                this.searchParams.pageNum = pageNumber;
                this.findList(this.searchParams);
            },
            search: function () {
                this.findList(Object.assign(this.searchParams, this.defaultPaging))
            },
            findList: function (params) {
                Services.findGroupList(params).then(data => {
                    this.searchParams.pageNum = data.pageNum;
                    this.searchParams.pages = data.pages;
                    this.searchParams.pageSize = data.pageSize;
                    this.list = data.list;
                })
            },
            dialogSelect: function () {
                this.findList(this.defaultPaging);
                this.dialogVisible = true;
            },
            select: function (val) {
                this.dialogVisible = false;
                this.$emit('input', val.objectid);
                this.$emit('groupname', val.groupname);
            },
            changeSelect: function (val) {
                this.$emit('input', '');
                this.$emit('groupname', '');
            },
            formatter: function (row, column, cellValue) {
                let name;
                CommonConstant.deviceState.forEach(item => {
                    if (item.value == Number(cellValue)) {
                        name = item.text;
                    }
                });
                return name;
            }
        }
    }
</script>
<template>
  <div>
    <el-input type="text" :value="scenarioname" placeholder="选择情景模式" @focus="dialogSelect" @change="changeSelect"></el-input>
    <el-dialog title="选择情景模式" :visible.sync="dialogVisible" center :width="'600px'"  append-to-body>
      <el-form :inline="true" label-width="170px" :model="searchParams"  ref="editGroup" class="el-form-default">
        <el-form-item prop="strategyname">
          <el-input type="text" v-model="searchParams.scenarioname" placeholder="输入情景模式名称"></el-input>
        </el-form-item>
        <el-button type="primary" @click="findList" icon="el-icon-search">筛选</el-button>
      </el-form>
      <div>
        <el-table ref="singleTable" :data="list" border class="table" @row-click="select" highlight-current-row>
          <el-table-column with="50" label="名称" prop="scenarioname" align="center"></el-table-column>
          <el-table-column label="模式功能" prop="analysistask" align="center"></el-table-column>
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
    export default {
        data() {
            return {
                searchParams: {
                    strategyname: '',
                    moduletype: 1
                },
                moduleTypeID: [
                    {value: 1, text: '灯控器'},
                    {value: 2, text: '回路控制器'},
                ],
                defaultPaging: {
                    pageSize: Config.DEFAULT_PAGE_SIZE,
                    pageNum: 1,
                    moduletype: 1
                },
                dialogVisible: false,
                list: []
            }
        },
        props: {
            scenarioname: {
                default: ''
            },
            componyid: {
                default: ''
            }
        },
        created: function () {
            this.initData()
        },
        methods: {
            initData: function () {
            },
            pagingEvent: function (pageNumber) {
                this.searchParams.pageNum = pageNumber;
                this.findList(this.searchParams);
            },
            findList: function (params) {
                Services.findScenario(params).then(data => {
                    this.searchParams.pageNum = data.pageNum;
                    this.searchParams.pages = data.pages;
                    this.searchParams.pageSize = data.pageSize;
                    this.list = data.list;
                })
            },
            dialogSelect: function () {
                this.searchParams.companyid = this.componyid;
                this.findList(Object.assign(this.searchParams, this.defaultPaging));
                this.dialogVisible = true;
            },
            select: function (val) {
                this.dialogVisible = false;
                this.$emit('input', val.objectid);
                this.$emit('scenarioname', val.scenarioname);
            },
            changeSelect: function (val) {
                if (!val) {
                    this.$emit('input', '');
                    this.$emit('scenarioname', '');
                }
            },
        }
    }
</script>
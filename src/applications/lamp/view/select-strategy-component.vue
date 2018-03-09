<template>
  <div>
    <el-input type="text" v-model="strategyName" placeholder="选择策略" @focus="dialogSelect"
              @change="changeSelect"></el-input>
    <el-dialog title="选择策略类型" :visible.sync="dialogVisible" center :width="'700px'" append-to-body>
      <el-form :inline="true" label-width="170px" :model="searchParams" ref="editGroup" class="el-form-default">
        <el-form-item prop="strategyname">
          <el-input type="text" v-model="searchParams.strategyname" placeholder="输入策略名称"></el-input>
        </el-form-item>
        <el-button type="primary" @click="findList" icon="el-icon-search">筛选</el-button>
      </el-form>
      <div>
        <el-table ref="singleTable" :data="list" border class="table" @row-click="select" highlight-current-row>
          <el-table-column label="策略名称" prop="strategyname" align="center"></el-table-column>
          <el-table-column label="有效期" prop="validitytime" align="center"></el-table-column>
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
                    moduletype: ''
                },
                defaultPaging: {
                    pageSize: Config.DEFAULT_PAGE_SIZE,
                    pageNum: 1
                },
                dialogVisible: false,
                list: [],
            }
        },
        props: {
            strategyName: {
                default: ''
            },
            moduletype: {
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
                Services.findStrategy(params).then(data => {
                    this.searchParams.pageNum = data.pageNum;
                    this.searchParams.pages = data.pages;
                    this.searchParams.pageSize = data.pageSize;
                    this.list = data.list;
                })
            },
            dialogSelect: function () {
                this.searchParams.moduletype = this.moduletype;
                this.findList(Object.assign(this.searchParams, this.defaultPaging));
                this.dialogVisible = true;
            },
            select: function (val) {
                this.dialogVisible = false;
                this.$emit('input', val.objectid);
                this.$emit('strategyname', val.strategyname);
            },
            changeSelect: function (val) {
                this.$emit('input', '');
                this.$emit('strategyname', '');
            },
        }
    }
</script>
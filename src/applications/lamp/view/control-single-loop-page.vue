<template>
  <div v-if="currentPage == pages.home" class="content-right">
    <div class="clearfix">
      <div class="search pull-left">
        <form class="form-inline default-form">
          <div class="form-group">
            <label class="sr-only">设备名称：</label>
            <el-input type="text" v-model="searchParams.devicename" placeholder="输入设备名称" clearable/>
          </div>
          <div class="form-group">
            <label class="sr-only">设备ID：</label>
            <el-input type="text" v-model="searchParams.sn" placeholder="输入设备ID" clearable/>
          </div>
          <div class="form-group">
            <label class="sr-only">归属企业：</label>
            <tree-select-component v-model="searchParams.companyid" :list="companies"></tree-select-component>
          </div>
          <div class="form-group">
            <label class="sr-only">回路数：</label>
            <el-input type="text" v-model="searchParams.loopnum" placeholder="回路数" clearable/>
          </div>
          <div class="form-group">
            <label class="sr-only">归属组：</label>
            <el-input type="text" v-model="searchParams.groupname" placeholder="归属组" clearable/>
          </div>
          <div class="form-group">
            <label class="sr-only">地理位置：</label>
            <el-input type="text" v-model="searchParams.position" placeholder="地理位置" clearable/>
          </div>
          <div @click="search" class="form-group default-btn"><span class="quick-search-icon default-icon"></span>快速筛选



          </div>
          <div class="pull-right">
            <div @click="dialogHighSearch" class="default-btn"><span class="search-icon default-icon"></span>高级搜索</div>
          </div>
        </form>
      </div>

    </div>
    <div class="my-table center">
      <table class="table table-hover table-striped">
        <thead>
        <th>设备名称</th>
        <th>设备ID</th>
        <th>地理位置</th>
        <th>回路状态</th>
        <th>DI口状态</th>
        <th>当前策略</th>
        <th>操作</th>
        </thead>
        <tbody>
        <tr v-for="item in list">
          <td>{{item.devicename}}</td>
          <td>{{item.sn}}</td>
          <td>{{item.position}}</td>
          <td>{{item.loopcontrol}}</td>
          <td>{{item.diportstate}}</td>
          <td>{{item.strategyname}}</td>
          <td class="td-btns">
            <control-loop-dialog-component :device="item"></control-loop-dialog-component>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <paging-component v-if="pagingParams.pages" :pageNumber="pagingParams.pageNum" :pages="pagingParams.pages"
                      @pagingEvent='pagingEvent'></paging-component>


  </div>

  <search-loop-control-component v-else-if="currentPage == pages.search"
                                 @search="highSearch" @back="goBack"
                                 :runningStatus="runningStatus"
                                 :diPortStatus="diPortStatus"
                                 :companies="companies"></search-loop-control-component>
</template>

<script>
    import RestfulConstant from "../../../constants/restful";
    import Config from "../../../config";
    import Services from "../services";
    import controlLoopDialogComponent from './control-loop-dialog-component.vue';
    import searchLoopControlComponent from './search-loop-control-component.vue'
    export default {
        components: {controlLoopDialogComponent,searchLoopControlComponent},
        name: 'controlSingleLoopPage',
        data() {
            return {
                controlDeviceDialogVisible: false,
                searchParams: {
                    devicename: '',
                    sn: '',
                    componyid: '',
                    loopnum: '',
                    groupid: '',
                    position: '',
                },
                pagingParams: {},
                operData: {
                    controltype: 1
                },
                isSearchPage: false,
                list: [],
                companies: [],
                runningStatus: [
                    {value: 1, text: '正常'},
                    {value: 2, text: '欠流'},
                    {value: 3, text: '过流'},
                    {value: 4, text: '欠压'},
                    {value: 5, text: '过压'},
                ],
                diPortStatus: [
                    {value: 1, text: '开'},
                    {value: 2, text: '关'},
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
        created: function () {
            this.initData()
        },
        methods: {
            initData: function () {
                this.initLoop();
                this.initCompanies();
                this.initOperData();
            },
            initLoop: function () {
                this.findList(this.defaultPaging)
                this.clearSearchParams();
            },
            clearSearchParams: function () {
                Object.keys(this.searchParams).forEach(key => {
                    this.searchParams[key] = '';
                })
            },
            initCompanies: function () {
                this.$globalCache.companies.then(companies => {
                    this.companies = companies;
                })
            },
            initOperData: function () {
                this.operData = {}
            },
            pagingEvent: function (pageNumber) {
                this.pagingParams.pageNum = pageNumber;
                this.findList(this.pagingParams);
            },
            findList: function (params) {
                Services.findLoopList(params).then(data => {
                    this.pagingParams.pageNum = data.pageNum;
                    this.pagingParams.pages = data.pages;
                    this.pagingParams.pageSize = data.pageSize;
                    this.list = data.list;
                });
            },
            dialogHighSearch: function () {
                this.showPage(this.pages.search)
            },
            search: function () {
                this.pagingParams = {};
                this.findList(Object.assign(this.pagingParams, this.searchParams, this.defaultPaging));
            },
            highSearch: function (searchParams) {
                this.pagingParams = {};
                this.findList(Object.assign(this.pagingParams, searchParams, this.defaultPaging));
                this.goBack();
            },
            goBack: function () {
                this.showPage(this.pages.home)
            },
            showPage:function (page) {
                this.currentPage = page;
            },
            resetData: function () {
                this.operData = {
                    controltype: 1
                };
            }

        }
    }
</script>

<style scoped lang="less">

</style>

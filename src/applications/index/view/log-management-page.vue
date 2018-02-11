<template>
  <div class="content-right">
    <div class="search">
      <form class="form-inline default-form">
        <div class="form-group">
          <label>操作时间：</label>
          <el-date-picker id="date-start" v-model="searchParams.operationtimeStart" type="date" placeholder="选择开始时间"></el-date-picker>
        </div>
        <div class="form-group">
          <label>至：</label>
          <el-date-picker id="date-end" v-model="searchParams.operationtimeEnd" type="date" placeholder="选择结束时间"></el-date-picker>
        </div>
        <div class="form-group">
          <label for="username">用户名：</label>
          <input type="text" class="form-control" id="username" v-model="searchParams.loginname"/>
        </div>
        <div class="form-group">
          <label for="phone">手机号码：</label>
          <input type="text" class="form-control" id="phone" v-model="searchParams.phone"/>
        </div>
        <div @click="search" class="form-group default-btn">搜索</div>
      </form>
    </div>
    <div class="table center">
      <table class="table table-hover table-striped">
        <thead>
        <th>操作时间</th>
        <th>用户名</th>
        <th>姓名</th>
        <th>操作内容</th>
        </thead>
        <tbody>
        <tr v-for="log in logs">
          <td>{{log.operationtime}}</td>
          <td>{{log.loginname}}</td>
          <td>{{log.username}}</td>
          <td>{{log.operation}}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <paging-component v-if="searchParams.pages" :pageNumber="searchParams.pageNum" :pages="searchParams.pages" @pagingEvent='pagingEvent'></paging-component>
  </div>
</template>

<script>
    import HttpClient from "../../../core/http-client";
    import RestfulConstant from "../../../constants/restful";
    import Config from "../../../config";
    export default {
        name: 'logPage',
        data() {
            return {
                searchParams: {
                    operationtimeStart: '',
                    operationtimeEnd: '',
                    loginname: '',
                    phone: '',
                    pageSize: '',
                    pageNum: '',
                    pages: '',
                },
                defaultPaging: {
                    pageSize: Config.DEFAULT_PAGE_SIZE,
                    pageNum: 1
                },
                logs: []
            }
        },
        created: function () {
            this.initData();
        },
        methods: {
            pagingEvent: function (pageNumber) {
                this.searchParams.pageNum = pageNumber;
                this.findLogs(this.searchParams);
            },
            findLogs: function (params) {
                Object.keys(params).forEach(key => {
                    if (params[key] instanceof Date) params[key] = this.$common.getFormDate(params[key])
                });
                this.$http.get('operationLogs/getList', {params: params}).then(res => {
                    this.searchParams.pageNum = res.body.data.pageNum;
                    this.searchParams.pages = res.body.data.pages;
                    this.searchParams.pageSize = res.body.data.pageSize;
                    this.logs = res.body.data.list;
                })
            },
            search: function () {
                this.findLogs(Object.assign(this.searchParams, this.defaultPaging));
            },
            initData() {
                this.findLogs(this.defaultPaging);
            }
        }
    }
</script>

<style scoped lang="less">
  .content-right {
    box-shadow: 0 0 20px #ccc;
    padding: 40px;
    min-width: 1540px;
    .search {
    }
    .table {
      margin-top: 90px;
    }
  }

</style>

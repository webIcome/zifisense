<template>
  <div class="content-right">
    <div class="search">
      <form class="form-inline default-form">
        <div class="form-group">
          <label>操作时间：</label>
          <vue-datepicker-local clearable :inputClass="'form-control default-input'" v-model="searchParams.operationtimeStart"></vue-datepicker-local>
        </div>
        <div class="form-group">
          <label>至：</label>
          <vue-datepicker-local clearable :inputClass="'default-input form-control'" v-model="searchParams.operationtimeEnd"></vue-datepicker-local>
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
    <paging-component v-if="searchParams.pages" :pageNumber="searchParams.pageNumber" :pages="searchParams.pages" @pagingEvent='pagingEvent'></paging-component>
  </div>
</template>

<script>
    import HttpClient from "../../../core/http-client";
    import RestfulConstant from "../../../constants/restful";
    import Config from "../../../config";
    export default {
        name: 'userComponent',
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
                this.$http.post('operationlog/getListByLoginname', params).then(res => {
                    this.searchParams.pageNum = res.pageNum;
                    this.searchParams.pages = res.pages;
                    this.pageSize = res.pageSize;
                    this.logs = res.data.list;
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

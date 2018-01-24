<template>
  <div class="content-right">
    <div class="search">
      <form class="form-inline">
        <div class="form-group">
          <label for="enterprise">归属企业：</label>
          <input type="text" class="form-control" id="enterprise" v-model="searchParams.enterprise"/>
        </div>
        <div class="form-group">
          <label for="username">用户名：</label>
          <input type="text" class="form-control" id="username" v-model="searchParams.username"/>
        </div>
        <div class="form-group">
          <label for="jopName">岗位名称：</label>
          <input type="text" class="form-control" id="jopName" v-model="searchParams.jobName"/>
        </div>
        <button class="btn btn-primary" @click="search">筛选</button>
      </form>
    </div>
    <div class="pull-right">
      <button class="btn btn-primary"><span class="glyphicon glyphicon-search"></span>高级搜索</button>
      <button class="btn btn-primary"><span class="glyphicon glyphicon-plus"></span>创建账号</button>
    </div>
    <div class="table center">
      <table class="table table-hover table-striped">
        <thead>
        <th>用户名</th>
        <th>姓名</th>
        <th>电子邮箱</th>
        <th>归属企业</th>
        <th>归属岗位</th>
        <th>有效期</th>
        <th>操作</th>
        </thead>
        <tbody>
        <tr v-for="user in users">
          <td>{{user}}</td>
          <td>{{user}}</td>
          <td>{{user}}</td>
          <td>{{user}}</td>
          <td>{{user}}</td>
          <td>{{user}}</td>
          <td>
            <button class="btn"><span class="glypion glypion-edit"></span></button>
            <button class="btn"><span class="glypion glypion-edit"></span></button>
            <button class="btn"><span class="glypion glypion-edit"></span></button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <paging-component v-if="searchParams.pages" :pageNumber="searchParams.pageNumber" :pages="searchParams.pages" @pagingEvent='pagingEvent'></paging-component>
  </div>
</template>

<script>
    import HttpClient from "../core/http-client";
    import RestfulConstant from "../constants/restful";
    import Config from "../config";
    export default {
        name: 'userComponent',
        data() {
            return {
                searchParams: {
                    username: '',
                    enterprise: '',
                    jobName: '',
                    pageSize: Config.DEFAULT_PAGE_SIZE,
                    pageNumber: 0,
                    pages: 0,
                },
                users: [{},{}],
            }
        },
        created: function () {

        },
        methods: {
            pagingEvent: function (pageNumber) {
                this.searchParams.pageNumber = pageNumber
            },
            getLogs: function () {
                HttpClient.getPaging(RestfulConstant.LOGS, this.searchParams).then(res => {
                    this.searchParams.pageNumber = res.pageNumber;
                    this.searchParams.pages = res.pages;
                    this.logs = res.rows;
                })
            },
            search: function () {
                this.getLogs();
            }

        }
    }
</script>

<style scoped lang="less">
  .content-right {
    box-shadow: 0 0 20px #ccc;
    padding: 40px;
  }
</style>

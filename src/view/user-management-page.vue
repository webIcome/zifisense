<template>
  <div class="content-right">
    <div class="search">
      <form class="form-inline default-form">
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
        <div class="default-btn" @click="search">筛选</div>
      </form>
    </div>
    <div class="pull-right">
      <div class="default-btn"><span class="search-icon"></span>高级搜索</div>
      <div class="default-btn"><span class="add-icon"></span>创建账号</div>
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
          <td class="td-btns">
            <div class="edit-icon-item"><span class="edit-icon"></span></div>
            <div class="edit-icon-item"><span class="reset-icon"></span></div>
            <div class="edit-icon-item"><span class="delete-icon"></span></div>
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
    min-width: 1360px;
    .search {
      display: inline-block;

    }
    .pull-right {
      .default-btn {
        display: block;
        margin-bottom: 10px;
        font-size: 18px;
        .search-icon {
          display: inline-block;
          width: 18px;
          height: 18px;
          background-image: url("../assets/sys/search.png");
          vertical-align: middle;
          margin-right: 10px;
        }
        .add-icon {
          display: inline-block;
          width: 18px;
          height: 18px;
          background-image: url("../assets/sys/add-number.png");
          vertical-align: middle;
          margin-right: 10px;
        }
      }
    }
    .table {
      margin-top: 90px;
    }
    .td-btns {
      white-space: nowrap;
    }
    .edit-icon-item {
      display: inline-block;
      width: 33%;
      vertical-align: middle;
      .edit-icon,
      .reset-icon,
      .delete-icon {
        display: inline-block;
        text-align: center;
        vertical-align: middle;
        cursor: pointer;
      }
      .edit-icon{
        width: 18px;
        height: 16px;
        background-image: url("../assets/sys/edit.png");
      }
      .reset-icon {
        width: 18px;
        height: 18px;
        background-image: url("../assets/sys/reset-password.png");
      }
      .delete-icon {
        width: 14px;
        height: 18px;
        background-image: url("../assets/sys/delete.png");
      }
    }

  }
</style>

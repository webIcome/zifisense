<template>
  <div class="content-right">
    <div class="search">
      <form class="form-inline">
        <div class="form-group">
          <label for="createTimeStart">操作时间：</label>
          <input type="text" class="form-control" id="createTimeStart" v-model="searchParams.createTimeStart"/>
        </div>
        <div class="form-group">
          <label for="createTimeEnd">至：</label>
          <input type="text" class="form-control" id="createTimeEnd" v-model="searchParams.createTimeEnd"/>
        </div>
        <div class="form-group">
          <label for="username">用户名：</label>
          <input type="text" class="form-control" id="username" v-model="searchParams.username"/>
        </div>
        <div class="form-group">
          <label for="phone">手机号码：</label>
          <input type="text" class="form-control" id="phone" v-model="searchParams.phone"/>
        </div>
        <button class="btn btn-primary">搜索</button>
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
          <td>{{log}}</td>
          <td>{{log}}</td>
          <td>{{log}}</td>
          <td>{{log}}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <paging-component v-if="pages" :pageNumber="pageNumber" :pages="pages" @pagingEvent='pagingEvent'></paging-component>
  </div>
</template>

<script>
    import HttpClient from "../core/http-client";
    import RestfulConstant from "../constants/restful";
    export default {
        name: 'userComponent',
        data() {
            return {
                searchParams: {
                    createTimeStart: '',
                    createTimeEnd: '',
                    username: '',
                    phone: ''
                },
                pageNumber: 1,
                pages: 1,
                logs: [{},{}]
            }
        },
        methods: {
            pagingEvent: function (pageNumber) {
                this.pageNumber = pageNumber;
            }

        }
    }
</script>

<style scoped lang="less">
  .aside {
    position: fixed;
    z-index: 999;
    width: 225px;
    background-color: #1b6d85;
  }

</style>

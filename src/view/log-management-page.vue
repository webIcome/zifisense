<template>
  <div class="content-right">
    <div class="search">
      <form class="form-inline">
        <div class="form-group">
          <label>操作时间：</label>
          <vue-datepicker-local clearable :inputClass="'form-control'" v-model="searchParams.createTimeStart"></vue-datepicker-local>
        </div>
        <div class="form-group">
          <label>至：</label>
          <vue-datepicker-local clearable :inputClass="'form-control'" v-model="searchParams.createTimeEnd"></vue-datepicker-local>
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
  .content-right {
    box-shadow: 0 0 20px #ccc;
    padding: 40px;
    .search {
    }
    .table {
      margin-top: 90px;
    }
  }

</style>

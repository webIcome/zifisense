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
      <div @click="dialogHighSearch" class="default-btn"><span class="search-icon"></span>高级搜索</div>
      <div @click="dialogAddUser" class="default-btn"><span class="add-icon"></span>创建账号</div>
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
            <div class="edit-icon-item"><span @click="dialogEditUser(user)" class="edit-icon"></span></div>
            <div class="edit-icon-item"><span @click="dialogResetPassword(user)" class="reset-icon"></span></div>
            <div class="edit-icon-item"><span @click="dialogDeleteUser(user)" class="delete-icon"></span></div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <paging-component v-if="searchParams.pages" :pageNumber="searchParams.pageNumber" :pages="searchParams.pages"
                      @pagingEvent='pagingEvent'></paging-component>
    <dialog-component id="reset-password">
      <div slot="body">
        <div class="dialog-title">重置密码</div>
        <p class="text-center">您确认要重置账号：<a>{{operUser.name}}</a>的密码吗？

        <div class="col-md-12 dialog-btn">
          <span @click="resetPassword" class="dialog-btn-icon">确认</span>
        </div>
      </div>
    </dialog-component>
    <dialog-component id="add-user">
      <div slot="body">
        <div class="dialog-title">创建账号</div>
        <form class="form-horizontal default-form">
          <div class="form-group">
            <label class="col-md-4 control-label">归属企业：</label>
            <div class="col-md-8">
              <select v-model="operUser.company" class="form-control">
                <template v-for="company in companies">
                  <option>{{company.name}}</option>
                </template>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-4 control-label">归属岗位：</label>
            <div class="col-md-8">
              <select v-model="operUser.job" class="form-control">
                <template v-for="company in companies">
                  <option>{{company.name}}</option>
                </template>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-4 control-label">登录名：</label>
            <div class="col-md-8">
              <input type="text" class="form-control" v-model="operUser.name"/>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-4 control-label">姓名：</label>
            <div class="col-md-8">
              <input type="text" class="form-control" v-model="operUser.name"/>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-4 control-label">电子邮箱：</label>
            <div class="col-md-8">
              <input type="text" class="form-control" v-model="operUser.name"/>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-4 control-label">有效期至：</label>
            <div class="col-md-8">
              <vue-datepicker-local clearable :inputClass="'form-control default-input'"
                                    v-model="operUser.validity"></vue-datepicker-local>
            </div>
          </div>
          <div class="dialog-btn">
            <span @click="addUser" class="dialog-btn-icon">创建账号</span>
          </div>
        </form>
      </div>
    </dialog-component>
    <dialog-component id="edit-user">
      <div slot="body">
        <div class="dialog-title">编辑账号</div>
        <form class="form-horizontal default-form">
          <div class="form-group">
            <label class="col-md-4 control-label">归属企业：</label>
            <div class="col-md-8">
              <select v-model="operUser.company" class="form-control">
                <template v-for="company in companies">
                  <option>{{company.name}}</option>
                </template>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-4 control-label">归属岗位：</label>
            <div class="col-md-8">
              <select v-model="operUser.job" class="form-control">
                <template v-for="company in companies">
                  <option>{{company.name}}</option>
                </template>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-4 control-label">登录名：</label>
            <div class="col-md-8">
              <input type="text" class="form-control" v-model="operUser.name"/>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-4 control-label">姓名：</label>
            <div class="col-md-8">
              <input type="text" class="form-control" v-model="operUser.name"/>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-4 control-label">电子邮箱：</label>
            <div class="col-md-8">
              <input type="text" class="form-control" v-model="operUser.name"/>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-4 control-label">有效期至：</label>
            <div class="col-md-8">
              <vue-datepicker-local clearable :inputClass="'form-control default-input'"
                                    v-model="operUser.validity"></vue-datepicker-local>
            </div>
          </div>
          <div class="dialog-btn">
            <span @click="addUser" class="dialog-btn-icon">确认修改</span>
          </div>
        </form>
      </div>
    </dialog-component>
    <dialog-component id="delete-user">
      <div slot="body">
        <div class="dialog-title">删除账号</div>
        <div class="text-center">
          <div class="dialog-warning"></div>
        </div>
        <p>您确认要删除账号：<a>{{operUser.name}}</a>吗？</p>
        <p>请慎重操作，您的操作一旦确认，将无法恢复，并被系统记录在日志当中！</p>
        <div class="dialog-btn">
          <span @click="deleteUser" class="dialog-btn-icon">确认删除</span>
        </div>
      </div>
    </dialog-component>

    <dialog-component id="high-search">
      <div slot="body">
        <div class="dialog-title">高级搜索</div>
        <form class="form-horizontal default-form">
          <div class="form-group">
            <label class="col-md-4 control-label">归属企业：</label>
            <div class="col-md-8">
              <select v-model="operUser.company" class="form-control">
                <template v-for="company in companies">
                  <option>{{company.name}}</option>
                </template>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-4 control-label">归属岗位：</label>
            <div class="col-md-8">
              <select v-model="operUser.job" class="form-control">
                <template v-for="company in companies">
                  <option>{{company.name}}</option>
                </template>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-4 control-label">登录名：</label>
            <div class="col-md-8">
              <input type="text" class="form-control" v-model="operUser.name"/>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-4 control-label">姓名：</label>
            <div class="col-md-8">
              <input type="text" class="form-control" v-model="operUser.name"/>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-4 control-label">电子邮箱：</label>
            <div class="col-md-8">
              <input type="text" class="form-control" v-model="operUser.name"/>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-4 control-label">有效期至：</label>
            <div class="col-md-8">
              <vue-datepicker-local clearable :inputClass="'form-control default-input'"
                                    v-model="operUser.validity"></vue-datepicker-local>
              <vue-datepicker-local clearable :inputClass="'form-control default-input'"
                                    v-model="operUser.validity"></vue-datepicker-local>
            </div>
          </div>

          <div class=" dialog-btn">
            <span @click="editUser" class="dialog-btn-icon">确认修改</span>
          </div>
        </form>
      </div>
    </dialog-component>
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
                users: [{}, {}],
                operUser: {},
                companies: [],
            }
        },
        created: function () {

        },
        methods: {
            pagingEvent: function (pageNumber) {
                this.searchParams.pageNumber = pageNumber
            },
            getUsers: function () {
                HttpClient.getPaging(RestfulConstant.LOGS, this.searchParams).then(res => {
                    this.searchParams.pageNumber = res.pageNumber;
                    this.searchParams.pages = res.pages;
                    this.logs = res.rows;
                })
            },
            dialogHighSearch: function () {
                $('#high-search').modal();
            },
            search: function () {
            },
            dialogAddUser: function () {
                $('#add-user').modal();
            },
            addUser: function () {

            },
            dialogResetPassword: function (user) {
                $('#reset-password').modal();
            },
            resetPassword: function () {

            },
            dialogEditUser: function (user) {
                $('#edit-user').modal();
            },
            editUser: function () {

            },
            dialogDeleteUser: function (user) {
                $('#delete-user').modal();
            },
            deleteUser: function () {

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
      .edit-icon {
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

<template>
  <div class="content-right">
    <div class="search">
      <form class="form-inline default-form">
        <div class="form-group">
          <label>归属企业：</label>
          <tree-select-component v-model="searchParams.companyid" :list="companies"></tree-select-component>
        </div>
        <div class="form-group">
          <label for="username">用户名：</label>
          <input type="text" class="form-control" id="username" v-model="searchParams.loginname"/>
        </div>
        <div class="form-group">
          <label for="jopName">岗位名称：</label>
          <input type="text" class="form-control" id="jopName" v-model="searchParams.postname"/>
        </div>
        <div class="form-group default-btn" @click="search">筛选</div>
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
          <td>{{user.loginname}}</td>
          <td>{{user.username}}</td>
          <td>{{user.email}}</td>
          <td>{{user.companyname}}</td>
          <td>{{user.postname}}</td>
          <td>{{user.expiretime | formDate}}</td>
          <td class="td-btns">
            <div class="edit-icon-item"><span @click="dialogEditUser(user)" class="edit-icon"></span></div>
            <div class="edit-icon-item"><span @click="dialogResetPassword(user)" class="reset-icon"></span></div>
            <div class="edit-icon-item"><span @click="dialogDeleteUser(user)" class="delete-icon"></span></div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <paging-component v-if="searchParams.pages" :pageNumber="searchParams.pageNum" :pages="searchParams.pages"
                      @pagingEvent='pagingEvent'></paging-component>
    <dialog-component id="reset-password">
      <div slot="body">
        <div class="dialog-title">重置密码</div>
        <p class="text-center">您确认要重置账号：<a>{{currentUsername}}</a>的密码吗？



        <div class="col-md-12 dialog-btn">
          <span @click="resetPassword" class="dialog-btn-icon">确认</span>
        </div>
      </div>
    </dialog-component>
    <dialog-component id="add-user">
      <div slot="body">
        <div class="dialog-title">创建账号</div>
        <form class="form-horizontal default-form"  @submit.prevent="addUser">
          <div class="form-group">
            <label class="col-md-4 control-label">归属企业：</label>
            <div class="col-md-8">
              <tree-select-component v-model="operUser.companyid" :list="companies"></tree-select-component>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-4 control-label">归属岗位：</label>
            <div class="col-md-8">
              <select v-model="operUser.postid" class="form-control">
                <option value="">--选择岗位--</option>
                <template v-for="post in posts">
                  <option :value="post.objectid">{{post.postname}}</option>
                </template>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-4 control-label">登录名：</label>
            <div class="col-md-8">
              <input type="text" class="form-control" v-model="operUser.loginname"/>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-4 control-label">姓名：</label>
            <div class="col-md-8">
              <input type="text" class="form-control" v-model="operUser.username"/>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-4 control-label">电子邮箱：</label>
            <div class="col-md-8">
              <input type="text" class="form-control" v-model="operUser.email"/>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-4 control-label">有效期至：</label>
            <div class="col-md-8">
              <el-date-picker id="add-date" v-model="operUser.expiretime" type="date" placeholder="选择日期"></el-date-picker>
            </div>
          </div>
          <div class="dialog-btn">
            <button type="submit" class="dialog-btn-icon">创建账号</button>
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
              <tree-select-component v-model="operUser.companyid" :list="companies"></tree-select-component>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-4 control-label">归属岗位：</label>
            <div class="col-md-8">
              <select v-model="operUser.postid" class="form-control">
                <option value="">--选择岗位--</option>
                <template v-for="post in posts">
                  <option :value="post.objectid">{{post.postname}}</option>
                </template>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-4 control-label">登录名：</label>
            <div class="col-md-8">
              <input type="text" class="form-control" v-model="operUser.loginname"/>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-4 control-label">姓名：</label>
            <div class="col-md-8">
              <input type="text" class="form-control" v-model="operUser.username"/>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-4 control-label">电子邮箱：</label>
            <div class="col-md-8">
              <input type="text" class="form-control" v-model="operUser.email"/>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-4 control-label">有效期至：</label>
            <div class="col-md-8">
              <el-date-picker name="edit-date" v-model="operUser.expiretime" type="date" placeholder="选择日期"></el-date-picker>
            </div>
          </div>
          <div class="dialog-btn">
            <span @click="editUser" class="dialog-btn-icon">确认修改</span>
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
        <p class="text-center">您确认要删除账号：<a>{{currentUsername}}</a>吗？</p>
        <p class="text-center">请慎重操作，您的操作一旦确认，将无法恢复，并被系统记录在日志当中！</p>
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
              <tree-select-component v-model="advancedSearchParams.companyid" :list="companies"></tree-select-component>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-4 control-label">归属岗位：</label>
            <div class="col-md-8">
              <select v-model="advancedSearchParams.postid" class="form-control">
                <option value="">--选择岗位--</option>
                <template v-for="post in posts">
                  <option :value="post.objectid">{{post.postname}}</option>
                </template>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-4 control-label">登录名：</label>
            <div class="col-md-8">
              <input type="text" class="form-control" v-model="advancedSearchParams.loginname"/>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-4 control-label">姓名：</label>
            <div class="col-md-8">
              <input type="text" class="form-control" v-model="advancedSearchParams.username"/>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-4 control-label">电子邮箱：</label>
            <div class="col-md-8">
              <input type="text" class="form-control" v-model="advancedSearchParams.email"/>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-4 control-label">有效期：</label>
            <div class="col-md-8">
              <el-date-picker id="search-start-date" v-model="advancedSearchParams.expiretimelow" type="date" placeholder="选择日期"></el-date-picker>
            </div>
          </div>
            <div class="form-group">
              <label class="col-md-4 control-label">到：</label>
              <div class="col-md-8">
                <el-date-picker id="search-end-date" v-model="advancedSearchParams.expiretimehigh" type="date" placeholder="选择日期"></el-date-picker>
              </div>
          </div>

          <div class=" dialog-btn">
            <span @click="highSearch" class="dialog-btn-icon">确认</span>
          </div>
        </form>
      </div>
    </dialog-component>
  </div>
</template>

<script>
    import RestfulConstant from "../../../constants/restful";
    import Config from "../../../config";
    import Service from "../services";
    import {ContentUser} from '../models'
    export default {
        name: 'userComponent',
        data() {
            return {
                searchParams: {
                    postid: '',
                    companyid: '',
                    loginname: '',
                    username: '',
                    email: '',
                },
                advancedSearchParams: {
                    postid: '',
                    companyid: '',
                    loginname: '',
                    username: '',
                    email: '',
                    expiretimelow: '',
                    expiretimehigh: '',
                },
                defaultPaging: {
                    pageSize: Config.DEFAULT_PAGE_SIZE,
                    pageNum: 1
                },
                users: [],
                operUser: {

                },
                currentUsername: '',
                currentUserId: '',
                companies: [],
                posts: []
            }
        },
        created: function () {
            this.initData();
        },
        methods: {
            initData: function () {
                this.initUsers();
                this.initCompanies();
            },
            initUsers: function () {
                this.getUsers(this.defaultPaging)
            },
            pagingEvent: function (pageNumber) {
                this.searchParams.pageNum = pageNumber;
                this.getUsers(this.searchParams);
            },
            getUsers: function (params) {
                this.$http.get(RestfulConstant.USER + '/' + RestfulConstant.GET_LIST, {params: params}).then(res => {
                    this.searchParams.pageNum = res.body.data.pageNum;
                    this.searchParams.pages = res.body.data.pages;
                    this.searchParams.pageSize = res.body.data.pageSize;
                    this.users = this.transformTime(res.body.data.list);
                })
            },
            getPosts: function (companyid) {
                this.$http.get('post/getListByCompanyid', {params: {companyid: companyid}}).then(res => {
                    this.posts = res.body.data.list;
                });
            },
            initCompanies: function () {
                this.$globalCache.companies.then(companies => {
                    this.companies = companies;
                })
            },
            transformTime: function (list) {
                return list.map(item => {
//                    item.expiretime = this.$common.getFormDate(item.expiretime);
                    return item;
                })
            },
            dialogHighSearch: function () {
                $('#high-search').modal();
            },
            search: function () {
                this.getUsers(Object.assign(this.searchParams, this.defaultPaging));
            },
            highSearch: function () {
                this.getUsers(Object.assign(this.advancedSearchParams, this.defaultPaging));
                this.closeMode()
            },
            dialogAddUser: function () {
                this.resetData();
                $('#add-user').modal();
            },
            addUser: function () {
                this.$http.post('user/add', this.operUser).then(res => {
                    this.initUsers();
                    this.closeMode()
                })
            },
            dialogResetPassword: function (user) {
                this.currentUserId = user.objectid;
                this.currentUsername = user.username;
                $('#reset-password').modal();
            },
            resetPassword: function () {
                this.$http.post('user/resetPassword', {objectid: this.currentUserId}).then(res => {
                    this.closeMode();
                })
            },
            dialogEditUser: function (user) {
                this.resetData();
                this.operUser = user;
                $('#edit-user').modal();
            },
            editUser: function () {
                this.$http.post('user/edit', this.operUser).then(res => {
                    this.initUsers();
                    this.closeMode();
                })
            },
            dialogDeleteUser: function (user) {
                this.currentUserId = user.objectid;
                this.currentUsername = user.username;
                $('#delete-user').modal();
            },
            deleteUser: function () {
                this.$http.post('user/delete', {objectid: this.currentUserId}).then(res => {
                    this.initUsers();
                    this.closeMode()
                })
            },
            closeMode: function () {
                $('.modal').modal('hide')
            },
            resetData: function () {
               this.operUser = this.$common.copyObj(ContentUser);
            }
        },
        computed: {
            currentCompanyid: function () {
                return this.operUser.companyid;
            }
        },
        watch: {
            currentCompanyid: function (newVal, oldVal) {
                if (!newVal) return;
                this.getPosts(this.currentCompanyid)
            },
            ['advancedSearchParams.companyid']: function () {
                this.getPosts(this.advancedSearchParams.companyid)
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

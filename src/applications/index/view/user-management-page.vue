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
    <div class="my-table center">
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
    <el-dialog title="创建账号" :visible.sync="addUserDialogVisible" center :width="'600px'">
      <el-form label-width="140px" :model="operUser" :rules="addUserRoules" ref="addUser" class="el-form-default">
        <el-form-item label="归属企业：" prop="companyid">
          <tree-select-component v-model="operUser.companyid" :list="companies"></tree-select-component>
        </el-form-item>
        <el-form-item label="归属岗位：" prop="postid">
          <el-select v-model="operUser.postid" placeholder="请选择岗位">
            <el-option v-for="item in posts" :key="item.objectid" :label="item.postname"
                       :value="item.objectid"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="登录名：" prop="loginname">
          <el-input v-model="operUser.loginname" placeholder="请输入登录名"></el-input>
        </el-form-item>
        <el-form-item label="姓名：" prop="username">
          <el-input v-model="operUser.username" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱：" prop="email">
          <el-input :span="12" v-model="operUser.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="有效期至：" prop="expiretime">
          <el-date-picker v-model="operUser.expiretime" type="datetime" placeholder="选择日期"
                          class="display-block"></el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addUser('addUser')">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="编辑账号" :visible.sync="editUserDialogVisible" center :width="'600px'">
      <el-form label-width="140px" :model="operUser" :rules="addUserRoules" ref="editUser" class="el-form-default">
        <el-form-item label="归属企业：" prop="companyid">
          <tree-select-component v-model="operUser.companyid" :list="companies"></tree-select-component>
        </el-form-item>
        <el-form-item label="归属岗位：" prop="postid">
          <el-select v-model="operUser.postid" placeholder="请选择岗位">
            <template v-for="post in posts">
              <el-option :key="post.objectid" :value="post.objectid" :label="post.postname"></el-option>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="登录名：" prop="loginname">
          <el-input v-model="operUser.loginname" placeholder="请输入登录名"></el-input>
        </el-form-item>
        <el-form-item label="姓名：" prop="username">
          <el-input v-model="operUser.username" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱：" prop="email">
          <el-input :span="12" v-model="operUser.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="有效期至：" prop="expiretime">
          <el-date-picker v-model="operUser.expiretime" type="datetime" placeholder="选择日期"
                          class="display-block"></el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editUser('editUser')">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="删除账号" :visible.sync="deleteUserDialogVisible" center :width="'600px'">
      <div class="text-center">
        <div class="dialog-warning"></div>
      </div>
      <p class="text-center">您确认要删除账号：<a>{{currentUsername}}</a>吗？</p>
      <p class="text-center">请慎重操作，您的操作一旦确认，将无法恢复，并被系统记录在日志当中！</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="deleteUser">确认删除</el-button>
      </span>
    </el-dialog>
    <el-dialog title="重置密码" :visible.sync="resetUserDialogVisible" center :width="'600px'">
      <p class="text-center">您确认要重置账号：<a>{{currentUsername}}</a>的密码吗？</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="resetPassword">确认</el-button>
      </span>
    </el-dialog>
    <el-dialog title="高级搜索" :visible.sync="highSearchDialogVisible" center :width="'600px'">
      <el-form label-width="140px" :model="advancedSearchParams" class="el-form-default">
        <el-form-item label="归属企业：" prop="companyid">
          <tree-select-component v-model="advancedSearchParams.companyid" :list="companies"></tree-select-component>
        </el-form-item>
        <el-form-item label="归属岗位：" prop="postid">
          <el-select v-model="advancedSearchParams.postid" placeholder="请选择岗位" clearable>
            <el-option v-for="item in posts" :key="item.objectid" :label="item.postname"
                       :value="item.objectid"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="登录名：" prop="loginname">
          <el-input v-model="advancedSearchParams.loginname" placeholder="请输入登录名"></el-input>
        </el-form-item>
        <el-form-item label="姓名：" prop="username">
          <el-input v-model="advancedSearchParams.username" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱：" prop="email">
          <el-input :span="12" v-model="advancedSearchParams.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="有效期：">
          <el-col :span="11">
            <el-form-item prop="expiretimelow">
              <el-date-picker style="width: 100%" v-model="advancedSearchParams.expiretimelow" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line text-center" :span="2">到</el-col>
          <el-col :span="11">
            <el-form-item prop="expiretimehigh">
              <el-date-picker style="width: 100%" v-model="advancedSearchParams.expiretimehigh" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="highSearch">确 定</el-button>
      </span>
    </el-dialog>
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
                addUserRoules: {
                    companyid: [
                        {required: true, message: '请选择企业'}
                    ],
                    postid: [
                        {required: true, message: '请选择岗位'}
                    ],
                    loginname: [
                        {required: true, message: '请填写登入名'}
                    ],
                    username: [
                        {required: true, message: '请填写姓名'}
                    ],
                    expiretime: [
                        {required: true, message: '选择日期'}
                    ],
                    email: [
                        {required: true, message: '请填写邮箱'}
                    ],
                },
                addUserDialogVisible: false,
                editUserDialogVisible: false,
                deleteUserDialogVisible: false,
                resetUserDialogVisible: false,
                highSearchDialogVisible: false,
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
                operUser: this.$common.copyObj(ContentUser),
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
                this.highSearchDialogVisible = true;
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
                this.addUserDialogVisible = true
            },
            addUser: function (formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        this.$http.post('user/add', this.operUser).then(res => {
                            this.initUsers();
                            this.closeMode();
                        })
                    }
                })

            },
            dialogResetPassword: function (user) {
                this.currentUserId = user.objectid;
                this.currentUsername = user.username;
                this.resetUserDialogVisible = true;
            },
            resetPassword: function () {
                this.$http.post('user/resetPassword', {objectid: this.currentUserId}).then(res => {
                    this.closeMode();
                })
            },
            dialogEditUser: function (user) {
                this.resetData();
                this.operUser = user;
                this.editUserDialogVisible = true;
            },
            editUser: function (formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        this.$http.post('user/edit', this.operUser).then(res => {
                            this.initUsers();
                            this.closeMode();
                        })
                    }
                })
            },
            dialogDeleteUser: function (user) {
                this.currentUserId = user.objectid;
                this.currentUsername = user.username;
//                $('#delete-user').modal();
                this.deleteUserDialogVisible = true;
            },
            deleteUser: function () {
                this.$http.post('user/delete', {objectid: this.currentUserId}).then(res => {
                    this.initUsers();
                    this.closeMode()
                })
            },
            closeMode: function () {
                this.addUserDialogVisible = false;
                this.editUserDialogVisible = false;
                this.resetUserDialogVisible = false;
                this.highSearchDialogVisible = false;
                this.deleteUserDialogVisible = false;
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
    .my-table {
      margin-top: 50px;
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

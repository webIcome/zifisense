<template>
  <div class="organize">
    <div class="company">
      <div class="company-full">
        <div class="company-title clearfix">
          <div class="company-title-name">公司</div>
          <div @click="dialogFirstClassEnterPrise" class="btn-add-company">创建一级企业</div>
        </div>
        <div class="company-content">
          <template v-for="company in companies">
            <div class="company-conent-items">
              <tree-folder-component v-model="currentCompany" :company="company" v-on:edit="dialogEditCompany" v-on:add="dialogAddCompany"
                                     v-on:delete="dialogDeleteCompany"></tree-folder-component>
            </div>
          </template>
        </div>
      </div>
    </div>
    <div class="job">
      <div class="job-title clearfix">
        <div class="job-title-name">岗位</div>
        <div @click="dialogAddPost" class="btn-add-job">创建岗位</div>
      </div>
      <div class="job-content">
        <template v-for="post in posts">
          <div @click="choosePost(post)" class="job-content-item" :class="{active: post.postid==currentPost.postid}">
            <div class="job-content-item-name">{{post.postname}}</div>
            <span @click.self="dialogEditPost(post)" class="job-content-item-edit"></span>
            <span @click.self="dialogDeletePost(post)" class="job-content-item-delete"></span>
          </div>
        </template>
      </div>
    </div>
    <div class="limit">
      <div class="limit-title clearfix">
        <div class="limit-title-name">选择权限</div>
      </div>
      <div class="limit-content">
        <form>
          <template v-for="limit in limits">
            <div class="limit-content-title">{{limit.title}}：</div>
            <div class="limit-content-items">
              <template v-for="item in limit.items">
                <div class="limit-content-item" v-if="showLimit(item)"><input v-if="isEditLimit" class="limit-content-checkbox" type="checkbox"
                                                       name="limit" v-model="item.checked" checked="item.checked">{{item.modulename}}
                </div>
              </template>
            </div>
          </template>
          <div @click="editLimit" v-if="!isEditLimit" class="limit-btn">修改</div>
          <div @click="confirmLimit" v-else class="limit-btn">确认</div>
        </form>
      </div>
    </div>

    <dialog-component id="first-class-enterprise">
      <div slot="body">
        <div class="dialog-title">创建一级企业</div>
        <form class="form-horizontal default-form">
          <div class="form-group">
            <label class="col-md-4 control-label">企业名称：</label>
            <div class="col-md-8">
              <input type="text" class="form-control" v-model="firstClassEnterprise.companyname"/>
            </div>
          </div>
          <div class="form-group" v-if="firstClassEnterprise.timeZone">
            <label class="col-md-4 control-label" >时区：</label>
            <div class="col-md-8">
              <select type="text" class="form-control" v-model="firstClassEnterprise.timeZone"/>
            </div>
          </div>
          <div class="dialog-btn">
            <span @click="addCompany" class="dialog-btn-icon">确认创建</span>
          </div>
        </form>
      </div>
    </dialog-component>
    <!--job-->
    <dialog-component id="add-job">
      <div slot="body">
        <div class="dialog-title">创建岗位</div>
        <form class="form-horizontal default-form">
          <div class="form-group">
            <label class="col-md-4 control-label" for="name">岗位名称：</label>
            <div class="col-md-8">
              <input type="text" class="form-control" v-model="operPost.postname"/>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-4 control-label">岗位描述：</label>
            <div class="col-md-8">
              <textarea type="text" class="form-control" v-model="operPost.description"/>
            </div>
          </div>
          <div class="dialog-btn">
            <span @click="addPost" class="dialog-btn-icon">确认创建</span>
          </div>
        </form>
      </div>
    </dialog-component>
    <dialog-component id="edit-job">
      <div slot="body">
        <div class="dialog-title">编辑岗位</div>
        <form class="form-horizontal default-form">
          <div class="form-group">
            <label class="col-md-4 control-label" for="name">岗位名称：</label>
            <div class="col-md-8">
              <input type="text" class="form-control" id="name" v-model="operPost.name"/>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-4 control-label" for="description">岗位描述：</label>
            <div class="col-md-8">
              <textarea type="text" class="form-control" id="description" v-model="operPost.description"/>
            </div>
          </div>
          <div class="dialog-btn">
            <span @click="editPost" class="dialog-btn-icon">确认修改</span>
          </div>
        </form>
      </div>
    </dialog-component>
    <dialog-component id="delete-job">
      <div slot="body">
        <div class="dialog-title">删除岗位</div>
        <div class="text-center">
          <div class="dialog-warning"></div>
        </div>
        <p>您确认要删除岗位：<a>operPost.name</a>吗？相关岗位下的属性的账号将一并删除！</p>
        <p>请慎重操作，您的操作一旦确认，将无法恢复，并被系统记录在日志当中！</p>
        <div class="dialog-btn">
          <span @click="deletePost" class="dialog-btn-icon">确认删除</span>
        </div>
      </div>
    </dialog-component>
    <!--company-->
    <dialog-component id="edit-company">
      <div slot="body">
        <div class="dialog-title">编辑企业</div>
        <form class="form-horizontal default-form">
          <div class="form-group">
            <label class="col-md-4 control-label" for="company-name">名称：</label>
            <div class="col-md-8">
              <input type="text" class="form-control" id="company-name" v-model="editCompanyData.companyname"/>
            </div>
          </div>
          <div class="form-group" v-if="editCompanyData.timeZone">
            <label class="col-md-4 control-label" for="time-zone">时区：</label>
            <div class="col-md-8">
              <select type="text" class="form-control" id="time-zone" v-model="editCompanyData.timeZone"/>
            </div>
          </div>
          <div class="dialog-btn">
            <span @click="editCompany" class="dialog-btn-icon">确认修改</span>
          </div>
        </form>
      </div>
    </dialog-component>
    <dialog-component id="add-company">
      <div slot="body">
        <div class="dialog-title">创建企业</div>
        <form class="form-horizontal default-form">
          <div class="form-group">
            <label class="col-md-4 control-label" for="parent">上级企业：</label>
            <div class="col-md-8">
              <input type="text" class="form-control" id="parent" v-model="addCompanyData.parentid"/>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-4 control-label">名称：</label>
            <div class="col-md-8">
              <input type="text" class="form-control" v-model="addCompanyData.companyname"/>
            </div>
          </div>
          <div class="form-group" v-if="addCompanyData.timeZone" >
            <label class="col-md-4 control-label" >时区：</label>
            <div class="col-md-8">
              <select type="text" class="form-control" v-model="addCompanyData.timeZone"/>
            </div>
          </div>
          <div class="dialog-btn">
            <span @click="editCompany" class="dialog-btn-icon">确认创建</span>
          </div>
        </form>
      </div>
    </dialog-component>
    <dialog-component id="delete-company">
      <div slot="body">
        <div class="dialog-title">删除企业</div>
        <div class="text-center">
          <div class="dialog-warning"></div>
        </div>
        <p>您确认要删除企业：<a>deleteCompanyData.companyname</a>及其名下的所有分支机构吗？相关部门下的属性的账号将一并删除！</p>
        <p>请慎重操作，您的操作一旦确认，将无法恢复，并被系统记录在日志当中！</p>
        <div class="dialog-btn">
          <span @click="deleteCompany" class="dialog-btn-icon">确认删除</span>
        </div>
      </div>
    </dialog-component>
  </div>
</template>

<script>
    import HttpClient from "../../../core/http-client";
    import RestfulConstant from "../../../constants/restful";
    import Config from "../../../config";
    import moment from 'moment';
    import Service from '../services';
    export default {
        name: 'organizeManagementPage',
        data() {
            return {
                companies: [],
                currentCompany: {},
                currentPost: {},
                posts: [{postname: '岗位',postid: 1},{postname: '岗位',postid: 2}],
                limits: [{title: '系统权限', items: [{modulename: '组织管理'}, {modulename: '组织管理'}]}, {
                    title: '管理权限',
                    items: [{modulename: '组织管理'}]
                }],
                operPost: {
                    postid: '',
                    postname: '',
                    description: ''
                },
                deleteCompanyData: {
                    companyname: '',
                    id: ''
                },
                editCompanyData: {
                    companyid: '',
                    companyname: ''
                },
                addCompanyData: {
                    parentid: '',
                    companyname: ''
                },
                firstClassEnterprise: {
                    companyname: '',
                },

                isEditLimit: false
            }
        },
        created: function () {
            this.initData();
        },
        methods: {
            initData: function () {
                this.initCompanies();
            },
            initCompanies: function () {
                this.$globalCache.companies.then(companies => {
                    this.companies = companies;
                    this.chooseCompany(this.companies[0]);
                })
            },
            showLimit: function (limit) {
                if (this.isEditLimit) {
                    return true;
                } else {
                    return limit.checked;
                }
            },
            chooseCompany: function (company) {
                this.currentCompany = company;
            },
            getPosts: function () {
                this.$http.post('post/getListByCompanyid', this.currentCompany).then(res => {
                    this.posts = res.data.list;
                    this.choosePost(this.posts[0]);
                });
            },
            getPostsPermission: function () {
                this.$http.post('permission/getModuleListByPostid', this.currentPost).then(res => {
                    this.limits = res.data.list;
                })
            },
            choosePost: function (post) {
                this.currentPost = post;
            },

            dialogFirstClassEnterPrise: function () {
                $('#first-class-enterprise').modal('show');
            },
            dialogEditCompany: function (company) {
                this.editCompanyData.companyid = company.id;
                this.editCompanyData.companyname = company.companyname;
                $('#edit-company').modal();
            },
            editCompany: function () {
                this.$http.post('company/edit', this.editCompanyData).then(res => {

                })
            },
            dialogAddCompany: function (company) {
                this.addCompanyData.parentid = company.id;
                $('#add-company').modal();
            },
            addCompany: function () {
                this.$http.post('company/add', this.addCompanyData).then(res => {

                })
            },
            dialogDeleteCompany: function (company){
                this.deleteCompanyData.id = company.id;
                this.deleteCompanyData.companyname = company.companyname;
                $('#delete-company').modal();
            },
            deleteCompany: function () {
                this.$http.post('company/delete', this.deleteCompanyData).then(res => {

                })
            },
            editPost: function () {
                this.$http.post('post/edit', this.operPost).then(res => {

                })
            },
            deletePost: function () {
                this.$http.post('post/delete', this.operPost).then(res => {

                })
            },
            addPost: function () {
                this.operPost.companyid = this.currentCompany.id;
                this.$http.post('post/add', this.operPost).then(res => {
                })
            },
            dialogAddPost: function () {
                $('#add-job').modal()
            },
            dialogEditPost: function (post) {
                this.operPost = post;
                $('#edit-job').modal()
            },
            dialogDeletePost: function (post) {
                this.operPost = post;
                $('#delete-job').modal()
            },
            editLimit: function () {
                this.isEditLimit = true;
            },
            confirmLimit: function () {
                let ids = [];
                this.limits.forEach(item => {
                    item.items.forEach(permission => {
                        if (permission.checked) {
                            ids.push(permission.id)
                        }
                    })
                });
                this.$http.post('permission/changeForPost', {postid: this.currentPost.id, permissionlist: ids}).then(res => {
                    this.isEditLimit = false;
                });
                this.isEditLimit = false;
            },
            resetData: function () {
                this.operCompany = {};
            }
        },
        watch: {
            currentCompany: function () {
                this.getPosts()
            },
            currentPost: function () {
                this.getPostsPermission()
            }
        }
    }
</script>

<style scoped lang="less">
  @lineHeight: 2px;
  @lineColor: #efefef;
  .organize {
    white-space: nowrap;
  }

  .company,
  .job,
  .limit {
    position: relative;
    /*display: inline-block;*/
    float: left;
    padding: 30px 20px;
    vertical-align: top;
    box-shadow: 0 0 20px #ccc;
    margin-right: 20px;
    overflow: auto;
    .company-title,
    .job-title,
    .limit-title {
      clear: both;
      padding-bottom: 20px;
      border-bottom: 1px solid #ddd;
      vertical-align: middle;
      .company-title-name,
      .job-title-name,
      .limit-title-name {
        margin-right: 10px;
        display: inline-block;
        height: 24px;
        line-height: 24px;
        padding-left: 16px;
        vertical-align: middle;
        margin-top: 8px;
        border-left: 6px solid #1789e1;
        color: #1789e1;
        font-size: 24px;
      }
      .btn-add-company,
      .btn-add-job {
        display: inline-block;
        float: right;
        font-size: 18px;
        color: #fff;
        padding-left: 10px;
        vertical-align: middle;
        cursor: pointer;
      }
      .btn-add-company {
        width: 160px;
        height: 40px;
        line-height: 40px;
        background: url("../assets/sys/add-company.png");
        &:hover {
          background: url("../assets/sys/add-company-active.png");
        }
      }
      .btn-add-job {
        width: 124px;
        height: 40px;
        line-height: 40px;
        background: url("../assets/sys/add-job.png");
        &:hover {
          background: url("../assets/sys/add-job-active.png");
        }
      }
    }
    .company-content,
    .job-content,
    .limit-content {
      padding-top: 40px;
    }

  }

  .company {
    max-width: 880px;
    max-height: 910px;
    .company-full {
      display: inline-block;
    }
    .company-content {
      display: inline-block;
      white-space: nowrap;
      overflow: auto;
      font-size: 16px;
      .company-conent-items {
        padding: 33px 33px 33px 0;
        &:nth-of-type(even) {
          border-top: 1px solid #ddd;
        }
      }
    }
  }

  .job {
    .job-content-item {
      min-width: 240px;
      height: 100px;
      margin-bottom: 20px;
      text-align: center;
      border-radius: 2px;
      background-color: #efefef;
      font-size: 18px;
      cursor: pointer;
      &.active,
      &:hover{
        background-color: #ccc;
      }
      .job-content-item-name {
        padding: 18px 0;
      }
      .job-content-item-edit {
        display: inline-block;
        width: 16px;
        height: 18px;
        margin-right: 50%;
        cursor: pointer;
        background-image: url("../assets/sys/edit.png");
      }
      .job-content-item-delete {
        display: inline-block;
        width: 14px;
        height: 18px;
        cursor: pointer;
        background-image: url("../assets/sys/delete.png");
      }
    }
  }

  .limit {
    width: 280px;
    margin-right: 0;
    .limit-content {
      text-align: center;
      .limit-content-title {
        margin-bottom: 35px;
        font-size: 24px;
        text-align: left;
      }
      .limit-content-items {
        margin-bottom: 35px;
        font-size: 20px;
        color: #656565;
        text-align: left;
        .limit-content-item {
          position: relative;
          margin-bottom: 22px;
          margin-left: 80px;
          .job-content-item-edit {
            margin-right: 50%;
          }
          .limit-content-checkbox {
            position: absolute;
            width: 15px;
            height: 15px;
            left: -20px;
            top: 3px;
          }
        }
      }
      .limit-btn {
        display: inline-block;
        width: 124px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        color: #fff;
        cursor: pointer;
        font-size: 18px;
        background-image: url("../assets/sys/btn-change.png");
        &:hover {
          background-img: url("../assets/sys/btn-change-active.png");
        }
      }
    }
  }

  .tree-folder-children >
  .tree-folder-items >
  .tree-folder-branch {
    display: inline-block;
    width: 40px;
    height: @lineHeight;
    background-color: @lineColor;
    vertical-align: middle;
  }

</style>

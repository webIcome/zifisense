<template>
  <div>
    <div class="company">
      <div class="company-title clearfix">
        <div class="company-title-name">公司</div>
        <div class="btn-add-company">创建一级企业</div>
      </div>
      <div class="company-content">
        <template v-for="company in companies">
          <div class="company-conent-items">
            <tree-folder :company="company"></tree-folder>
          </div>
        </template>
      </div>

    </div>
    <div class="job">
      <div class="job-title clearfix">
        <div class="job-title-name">岗位</div>
        <div class="btn-add-job">创建岗位</div>
      </div>
      <div class="job-content">
        <template v-for="job in jobs">
          <div class="job-content-item">
            <div class="job-content-item-name">{{job.name}}</div>
            <span class="job-content-item-edit"></span>
            <span class="job-content-item-delete"></span>
          </div>
        </template>
      </div>
    </div>
    <div class="limit">
      <div class="limit-title clearfix">
        <div class="limit-title-name">选择权限</div>
      </div>
      <div class="limit-content">
        <template v-for="limit in limits">
          <div class="limit-content-title">{{limit.title}}：</div>
          <div class="limit-content-items">
            <template v-for="item in limit.items">
              <div class="limit-content-item">{{item.title}}</div>
            </template>
          </div>
        </template>
        <div class="limit-btn">修改</div>
      </div>
    </div>
  </div>
</template>

<script>
    import HttpClient from "../core/http-client";
    import RestfulConstant from "../constants/restful";
    import Config from "../config";
    import treeFolderComponent from "../components/tree-folder-component.vue";
    export default {
        name: 'organizeManagementPage',
        data() {
            return {
                companies: [{name: '厦门纵行科技', children: [{name: '厦门纵行科技', children: [{name: '厦门纵行科技', children: []},{name: '厦门纵行科技', children: []}]},{name: '厦门纵行科技', children: []}]}],
                jobs: [{name: '岗位'}],
                limits: [{title: '系统权限', items: [{title: '组织管理'}, {title: '组织管理'}]}, {
                    title: '管理权限',
                    items: [{title: '组织管理'}]
                }]
            }
        },
        created: function () {

        },
        methods: {
            getLogs: function () {
                HttpClient.getPaging(RestfulConstant.LOGS, this.searchParams).then(res => {
                    this.searchParams.pageNumber = res.pageNumber;
                    this.searchParams.pages = res.pages;
                    this.logs = res.rows;
                })
            }

        },
        components: {
            'tree-folder': treeFolderComponent,
        }
    }
</script>

<style scoped lang="less">
  .company,
  .job,
  .limit {
    display: inline-block;
    padding: 30px 20px;
    vertical-align: top;
    box-shadow: 0 0 20px #ccc;
    margin-right: 20px;
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
    .company-content {
      position: relative;
      overflow: auto;
      font-size: 16px;
      .company-conent-items {
        padding-bottom: 33px;
        border-bottom: 1px solid #ddd;
      }
    }
  }

  .job {
    .job-content-item{
      min-width: 240px;
      height: 100px;
      margin-bottom: 20px;
      text-align: center;
      border-radius: 2px;
      background-color: #efefef;
      font-size: 18px;
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
        text-align: center;
        .limit-content-item {
          margin-bottom: 22px;
          .job-content-item-edit {
            margin-right: 50%;
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

</style>

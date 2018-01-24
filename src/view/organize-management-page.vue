<template>
  <div>
    <div class="company">
      <div class="company-title">
        <div class="company-title-name">公司</div>
        <button class="btn btn-primary">创建一级企业<span class="add-company"></span></button>
      </div>
      <div class="company-content">
        <template v-for="company in companies">
          <div class=""></div>
        </template>
      </div>

    </div>
    <div class="job">
      <div class="job-title">
        <div class="job-title-name">岗位</div>
        <button class="btn btn-primary">创建岗位<span class="add-job"></span></button>
      </div>
      <div class="job-content">
        <template v-for="job in jobs">
          <div class="job-content-item">
            <div class="job-content-item-name"></div>
            <span class="job-content-item-edit"></span>
            <span class="job-content-item-delete"></span>
          </div>
        </template>
      </div>
    </div>
    <div class="limit">
      <div class="limit-title">
        <div class="limit-title-name">选择权限</div>
      </div>
    </div>
  </div>
</template>

<script>
    import HttpClient from "../core/http-client";
    import RestfulConstant from "../constants/restful";
    import Config from "../config";
    export default {
        name: 'organizeManagementPage',
        data() {
            return {
                companies: [{}],
                jobs: [{name: '岗位'}]
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

        }
    }
</script>

<style scoped lang="less">
  .company,
  .job,
  .limit {
    display: inline-block;
    padding: 20px;
    vertical-align: top;
    box-shadow: 0 0 20px #ccc;
    margin-right: 20px;
    .company-title,
    .job-title,
    .limit-title {
      clear: both;
      padding: 27px;
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
        border-left: 6px solid #1789e1;
        color: #1789e1;
        font-size: 24px;
      }
    }

  }
  .company {
    max-width: 880px;
    max-height: 910px;
    overflow: auto;
  }
  .job {
  }

</style>

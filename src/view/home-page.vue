<template>
  <div class="zifi-container height-full">
    <header-component></header-component>

    <div class="section">
      <div class="section-manage">
        <div class="section-manage-app">
          <div class="section-manage-header" data-toggle="collapse" data-target="#applications" aria-expanded="true">
            <span class="glyphicon"></span>
            <span class="section-manage-header-title">应用管理</span>
          </div>
          <div class="section-manage-container collapse in" id="applications">
            <div class="section-manage-container-items">
              <template v-for="app in applications">
                <div class="section-manage-container-item" @click="goToApplication(app.url)">
                  <div class="section-manage-container-item-img">
                    <img src="app.url">
                  </div>
                  <div class="section-manage-container-item-title">{{app.title}}</div>
                </div>
              </template>
            </div>
          </div>
        </div>
        <div class="section-manage-subsidiary">
          <div class="section-manage-header" data-toggle="collapse" data-target="#subsidiary" aria-expanded="true">
            <span class="glyphicon"></span>
            <span class="section-manage-header-title">管理辅助</span>
          </div>
          <div class="section-manage-container collapse in" id="subsidiary">
            <div class="section-manage-container-items">
              <div class="section-manage-container-item" v-for="app in subsidiary">
                <div class="section-manage-container-item-img">
                  <img src="app.url">
                </div>
                <div class="section-manage-container-item-title">{{app.title}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import HttpClient from "../core/http-client";
    import RestfulConstant from "../constants/restful";
    import HeaderComponent from "../components/header-component";
    export default {
        components: {HeaderComponent}, name: 'home',
        data() {
            return {
                user: {
                    name: '系统管理员'
                },
                applications: [{title: '智慧照明', url: '/management'},
                    {title: '智慧照明', url: ''},
                    {title: '智慧照明', url: ''}],
                subsidiary: [
                    {title: '智慧照明', url: ''}
                ]
            }
        },
        methods: {
            getApplications: function () {
                HttpClient.getPaging('management/apply1').then(res => {
                    console.log('res' + res)
                }).catch(err => {
                    console.log('err'+err)
                })
            },
            goToApplication: function (url) {
                this.$router.push(url)
            }
        }
    }
</script>

<style scoped lang="less">
  .zifi-container {
    height: 100%;
  }
</style>

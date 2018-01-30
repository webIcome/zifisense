<template>
  <div class="zifi-container height-full">
    <header-component class="home" :isHome="true"></header-component>

    <div class="section">
      <div class="section-manage">
        <div class="section-manage-app">
          <div class="section-manage-header" data-toggle="collapse" data-target="#applications" aria-expanded="true">
            <span class="icon"></span>
            <span class="section-manage-header-title">应用管理</span>
          </div>
          <div class="section-manage-container collapse in" id="applications">
            <div class="section-manage-container-items clearfix">
              <template v-for="app in applications">
                <a class="section-manage-container-item col-md-4" :href="app.url" @mouseover="appHover(app)" @mouseout="appNormal(app)">
                  <div class="section-manage-container-item-img" :style="'background:' +  'url(' + (app.isActive ? app.imgActive : app.img) +') no-repeat center center'">
                  </div>
                  <div class="section-manage-container-item-title">{{app.title}}</div>
                </a>
              </template>
            </div>
          </div>
        </div>
        <div class="section-manage-subsidiary">
          <div class="section-manage-header" data-toggle="collapse" data-target="#subsidiary" aria-expanded="true">
            <span class="icon"></span>
            <span class="section-manage-header-title">管理辅助</span>
          </div>
          <div class="section-manage-container collapse in" id="subsidiary">
            <div class="section-manage-container-items clearfix">
              <div class="section-manage-container-item col-md-4" v-for="app in subsidiary" @click="goToApplication(app.url)" @mouseover="appHover(app)" @mouseout="appNormal(app)">
                <div class="section-manage-container-item-img" :style="'background:' +  'url(' + (app.isActive ? app.imgActive : app.img) +') no-repeat center center'">
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
    import HttpClient from "../../../core/http-client";
    import RestfulConstant from "../../../constants/restful";
    export default {
        data() {
            return {
                user: {
                    name: '系统管理员',
                    active: false
                },
                applications: [],
                subsidiary: [
                    {title: '系统管理', url: '/management', img: '../static/img/home/sys.png', imgActive: '../static/img/home/sys-active.png', isActive: false}
                ]
            }
        },
        created: function () {
            this.applications = [
                {title: '智慧照明', url: 'http://localhost:8080/lamp', img: '../static/img/home/light-app.png', imgActive: '../static/img/home/light-app-active.png', isActive: false},
                {title: '智慧照明', url: '', img: '../static/img/home/estate-app.png', imgActive: '../static/img/home/estate-app-active.png', isActive: false},
                {title: '智慧照明', url: '', img: '../static/img/home/worker-app.png', imgActive: '../static/img/home/worker-app-active.png', isActive: false},
            ];
//            this.getApplications()
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
            },
            appHover: function (app) {
                app.isActive = true;
            },
            appNormal: function (app) {
                app.isActive = false;
            }
        }
    }
</script>

<style scoped lang="less">
  .zifi-container {
    height: 100%;
    .section {
    }
    .section-manage {
      width: 62.5%;
      min-width: 800px;
      margin-top: 42px;
      margin-left: auto;
      margin-right: auto;
      .section-manage-header {
        width: 100%;
        height: 60px;
        line-height: 60px;
        color: #fff;
        background: linear-gradient(left, rgba(13, 41, 109,1) 30%, rgba(13, 41, 109,0));
        font-size: 24px;
        .icon {
          display: inline-block;
          width: 24px;
          height: 24px;
          vertical-align: middle;
          margin-left: 23px;
          margin-right: 23px;
        }
      }
      .section-manage-container {
        margin-right: auto;
        margin-left: auto;
        font-size: 32px;
        .section-manage-container-items {
          padding: 40px 0;
          .section-manage-container-item {
            color: #fff;
            cursor: pointer;
            &:hover {
              color: #61b5f5;
              .section-manage-container-item-img {
                box-shadow: 0px 5px 50px rgba(0,0,0,0.5);
                background-image: url("../assets/home/app-bg-active.png");
              }
            }
            display: inline-block;
            text-align: center;
            .section-manage-container-item-img {
              display: inline-block;
              width: 200px;
              height: 200px;
              margin-bottom: 30px;
              border-radius: 50%;
            }
          }
        }

      }
      .section-manage-app {
        .icon {
          background-image: url("../assets/home/management-app-icon.png");
        }
      }
      .section-manage-subsidiary {
        .icon {
          width: 28px;
          height: 28px;
          background-image: url("../assets/home/management-subsidiary-icon.png");
        }
      }
    }
  }
</style>

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
                <a class="section-manage-container-item col-md-4" :href="app.url" :class="app.ename">
                  <div class="section-manage-container-item-img">
                  </div>
                  <div class="section-manage-container-item-title">{{app.appname}}</div>
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
              <div class="section-manage-container-item col-md-4" v-for="app in subsidiary" @click="goToApplication(app.url)" :class="app.ename">
                <div class="section-manage-container-item-img">
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
    export default {
        data() {
            return {
                user: {
                    name: '系统管理员',
                    active: false
                },
                applications: [],
                subsidiary: [
                    {title: '系统管理', url: '/management',ename: 'sys'}
                ],
                apps: [
                    {appname: '路灯',ename: 'light', appcode: 'code1'},
                    {appname: '建筑大脑-智慧照明',ename: 'estate', appcode: 'code2'},
                    {appname: 'JLL-智慧物业',ename: 'worker', appcode: 'code3'},
                ]
            }
        },
        created: function () {
            this.getApplications()
        },
        methods: {
            getApplications: function () {
               this.$globalCache.apps.then(apps => {
                   apps.map(app => {
                       this.apps.forEach(item => {
                           if (item.appcode == app.appcode) {
                               app.ename = item.ename;
                           }
                       })
                       return app
                   });
                   this.applications = apps
               })
            },
            goToApplication: function (url) {
                this.$router.push(url)
            },
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
        background: -webkit-linear-gradient(left, rgba(13, 41, 109,1) 30%, rgba(13, 41, 109,0));
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
            display: inline-block;
            text-align: center;
            &:hover {
              color: #61b5f5;
            }
            &.light,
            &.estate,
            &.worker,
            &.sys{
              .section-manage-container-item-img {
                display: inline-block;
                width: 200px;
                height: 200px;
                margin-bottom: 30px;
                border-radius: 50%;
              }
            }
            &.sys {
              .section-manage-container-item-img {
                background-image: url("../assets/home/sys.png");
              }
              &:hover {
                .section-manage-container-item-img {
                  background-image: url("../assets/home/sys-active.png");
                }
              }
            }
            &.light {
              .section-manage-container-item-img {
                background-image: url("../assets/home/light-app.png");
              }
              &:hover {
                .section-manage-container-item-img {
                  background-image: url("../assets/home/light-app-active.png");
                }
              }
            }
            &.estate {
              .section-manage-container-item-img {
                background-image: url("../assets/home/estate-app.png");
              }
              &:hover {
                .section-manage-container-item-img {
                  background-image: url("../assets/home/estate-app-active.png");
                }
              }
            }
            &.worker {
              .section-manage-container-item-img {
                background-image: url("../assets/home/worker-app.png");
              }
              &:hover {
                .section-manage-container-item-img {
                  background-image: url("../assets/home/worker-app-active.png");
                }
              }
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

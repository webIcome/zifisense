<template>
  <div class="zifi-container height-full">
    <header-component class="home" :isHome="true"></header-component>

    <div class="section">
      <div class="section-manage">
        <template v-for="app in applications">
          <div class="section-manage-app" :class="app.appcode">
            <div class="section-manage-header" data-toggle="collapse" :data-target="'#' + app.appcode" aria-expanded="true">
              <span class="icon"></span>
              <span class="section-manage-header-title">{{app.appname}}</span>
            </div>
            <div class="section-manage-container collapse in" :id="app.appcode">
              <div class="section-manage-container-items clearfix">
                <template v-for="child in app.children">
                  <a class="section-manage-container-item col-md-4" @click.prevent="goToApplication(child.url, child.appcode)" :class="child.appcode">
                    <div class="section-manage-container-item-img">
                    </div>
                    <div class="section-manage-container-item-title">{{child.appname}}</div>
                  </a>
                </template>
              </div>
            </div>
          </div>
        </template>
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
                    {appname: '应用管理', appcode: 'YYGL', children: [
                        {appname: '路灯',ename: 'light', appcode: 'LAMP', url: '/lamp'},
                        {appname: '建筑大脑-智慧照明',ename: 'estate', appcode: 'INTELLIGENTLIGHTING', url: '/lamp'},
                        {appname: 'JLL-智慧物业',ename: 'worker', appcode: 'JLLPROPERTY'},
                    ]},
                    {appname: '管理辅助', appcode: 'GLFZ', children: [
                        {appname: '系统管理',appcode: 'XTQX', url: 'sys',ename: 'sys'}
                    ]},
                ]
            }
        },
        created: function () {
            this.getApplications();
        },
        methods: {
            getApplications: function () {
               this.$globalCache.apps.then(apps => {
                   this.applications = apps
               })
            },
            goToApplication: function (url, appcode) {
                if (appcode == 'XTQX') {
                    this.$router.push(url)
                } else {
                    window.location.replace(url)
                }

            },
        },
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
            &.LAMP,
            &.INTELLIGENTLIGHTING,
            &.JLLPROPERTY,
            &.XTQX{
              .section-manage-container-item-img {
                display: inline-block;
                width: 200px;
                height: 200px;
                margin-bottom: 30px;
                border-radius: 50%;
              }
            }
            &.XTQX {
              .section-manage-container-item-img {
                background-image: url("../assets/home/sys.png");
              }
              &:hover {
                .section-manage-container-item-img {
                  background-image: url("../assets/home/sys-active.png");
                }
              }
            }
            &.LAMP {
              .section-manage-container-item-img {
                background-image: url("../assets/home/light-app.png");
              }
              &:hover {
                .section-manage-container-item-img {
                  background-image: url("../assets/home/light-app-active.png");
                }
              }
            }
            &.INTELLIGENTLIGHTING {
              .section-manage-container-item-img {
                background-image: url("../assets/home/estate-app.png");
              }
              &:hover {
                .section-manage-container-item-img {
                  background-image: url("../assets/home/estate-app-active.png");
                }
              }
            }
            &.JLLPROPERTY {
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
        &.YYGL {
          .icon {
            background-image: url("../assets/home/management-app-icon.png");
          }
        }
        &.GLFZ {
          .icon {
            width: 28px;
            height: 28px;
            background-image: url("../assets/home/management-subsidiary-icon.png");
          }
        }
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

<template>
  <div class="full-view-bg">
    <div class="content-view-bg">
      <header-component></header-component>
      <div class="section">
        <div class="aside">
          <div class="title">
            <h1 class="sr-only">纵行科技</h1>
          </div>
          <div class="aside-nav">
            <ul>
              <li v-for="nav in navs" @click="clickNav(nav)" @mouseover="navHover(nav)" @mouseout="navNormal(nav)">
                <router-link :to="nav.url" :class="nav.ename" class="nav"><div class="nav-icon"></div>{{nav.name}}
                </router-link>
              </li>
            </ul>
          </div>
        </div>
        <div class="content">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import HttpClient from "../../../core/http-client";
    import RestfulConstant from "../../../constants/restful";
    export default {
        name: 'systemManagementPage',
        data() {
            return {
                navs: []
            }
        },
        created: function () {
            this.getSysMenus();
            this.initMenus();
        },
        methods: {
            getSysMenus: function () {
                let navs = [
                    {
                        name: '用户管理',
                        ename: 'user',
                        url: '/management/user',
                    },
                    {
                        name: '组织管理',
                        ename: 'organize',
                        url: '/management/organize',
                    },
                    {
                        name: '操作日志',
                        ename: 'log',
                        url: '/management/log',
                    },
                ];
                this.navs = navs;
            },
            clickNav: function (nav) {
                this.resetNav();
                nav.active = true;
            },
            navHover: function (nav) {
                nav.hover = true;

            },
            navNormal: function (nav) {
                nav.hover = false;
            },
            resetNav: function () {
                this.navs.forEach(nav => {
                    nav.active = false;
                })
            },
            initMenus: function () {
                this.initDefaultMenu();
            },
            initDefaultMenu: function () {
                if (window.location.hash == '#/management') this.$router.push({name: 'user'});
            },
        },
        mounted: function () {
        },
        watch: {
            '$route': function () {
               this.initDefaultMenu()
            }
        }
    }
</script>

<style scoped lang="less">
  @navWidth: 320px;
  @navBackgroundColor: #071627;
  .display-inline-block {
    display: inline-block;
  }

  .content-view-bg {
    position: relative;
    min-width: 1920px;
    &:before {
      position: absolute;
      content: '';
      height: 100%;
      width: @navWidth;
      background-color: @navBackgroundColor;
    }
  }

  .full-view-bg {
    font-size: 0px;
    &:before {
      position: absolute;
      content: '';
      height: 100%;
      width: @navWidth;
      background-color: @navBackgroundColor;
    }
  }
  .section {
    position: relative;
    .aside {
      position: absolute;
      top: -80px;
      left: 0;
      z-index: 999;
      width: @navWidth;
      background-color: @navBackgroundColor;
      .title {
        width: 200px;
        height: 72px;
        margin: 44px 0 44px 60px;
        background: url("../../../../static/img/sys/logo.png");
      }
      .aside-nav {
        ul {
          padding: 0;
        }
        a.nav {
          position: relative;
          display: inline-block;
          width: 100%;
          height: 100px;
          line-height: 100px;
          text-align: center;
          color: #fff;
          font-size: 20px;
          &.router-link-active,
          &.nav:hover{
            color: #66bbff;
            background-color: #15283f;
          }
          &.user,
          &.organize,
          &.log {
            .nav-icon {
              position: absolute;
              left: 70px;
              top: 50%;
              margin-top: -12px;
              display: inline-block;
            }
          }
          &.user {
            .nav-icon {
              width: 24px;
              height: 23px;
              background-image: url("../assets/sys/user.png");
            }
            &:hover,
            &.router-link-active{
              .nav-icon {
                background-image: url("../assets/sys/user-active.png");
              }
            }
          }
          &.organize {
            .nav-icon {
              width: 24px;
              height: 24px;
              background-image: url("../assets/sys/organize.png");
            }
            &:hover,
            &.router-link-active{
              .nav-icon {
                background-image: url("../assets/sys/organize-active.png");
              }
            }
          }
          &.log{
            .nav-icon {
              width: 24px;
              height: 26px;
              background-image: url("../assets/sys/log.png");
            }
            &:hover,
            &.router-link-active {
              .nav-icon {
                background-image: url("../assets/sys/log-active.png");
              }
            }
          }
        }
        .active {
          color: #66bbff;
          background-color: #15283f;
        }
        .nav-icon {
          margin-right: 25px;
          vertical-align: text-top;
        }
      }
    }

    .content {
      margin-left: @navWidth;
      padding: 40px;
    }
  }
</style>

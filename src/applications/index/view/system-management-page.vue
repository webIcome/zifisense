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
              <li v-for="nav in navs">
                <router-link :to="nav.url" :class="nav.ename" class="nav"><div class="nav-icon"></div>{{nav.modulename}}</router-link>
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
    export default {
        name: 'systemManagementPage',
        data() {
            return {
                navs: []
            }
        },
        created: function () {
            this.getSysMenus();
        },
        methods: {
            getSysMenus: function () {
                let navs = [
                    {
                        ename: 'user',
                        url: '/sys/user',
                        modulecode: 'INETLIGHTYHGL'
                    },
                    {
                        ename: 'organize',
                        url: '/sys/organize',
                        modulecode: 'INETLIGHTZZGL'
                    },
                    {
                        ename: 'log',
                        url: '/sys/log',
                        modulecode: 'INETLIGHTCZRZ'
                    },
                ];
                this.$globalCache.sysMenus.then(list => {
                    this.navs = list.filter(nav => {
                        let permission = false;
                        navs.forEach(item => {
                            if (nav.modulecode == item.modulecode) {
                                nav.url = item.url;
                                nav.ename = item.ename;
                                permission = true;
                            }
                        });
                        return permission;
                    })
                    this.initMenus();
                })
            },
            initMenus: function () {
                this.initDefaultMenu();
            },
            initDefaultMenu: function () {
                if (window.location.hash == '#/sys') this.$router.push(this.navs[0].url);
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
      }
    }

    .content {
      margin-left: @navWidth;
      padding: 40px;
    }
  }
</style>

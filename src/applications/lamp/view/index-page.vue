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
            <div class="panel-group" id="nav" aria-multiselectable="true">
              <template v-for="nav in navs">
                <div class="panel panel-default">
                  <div class="panel-heading">
                    <h4 class="panel-title">
                      <a :class="nav.ename" data-toggle="collapse" data-parent="#nav" :href="'#' + nav.ename" aria-expanded="false"
                         aria-controls="collapseOne">
                        <div class="nav-icon"></div>
                        {{nav.modulename}}
                        <span class="nav-selected"></span>
                      </a>
                    </h4>
                  </div>
                  <div :id="nav.ename" class="panel-collapse collapse" role="tabpanel">
                    <template v-for="child in nav.children">
                      <router-link :to="child.url" class="panel-body">
                        {{child.modulename}}
                      </router-link>
                    </template>
                  </div>
                </div>
              </template>
            </div>
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
        name: 'lampPage',
        data() {
            return {
                navs: [],
                localNavs: [
                    {
                        modulename: '设备管理',
                        ename: 'device',
                        modulecode: '',
                        children: [
                            {modulename: '灯控器', modulecode: '', url: '/device/lamp'},
                            {modulename: '回路控制器', modulecode: '', url: '/device/loop'},
                            {modulename: '控制面板', modulecode: '', url: '/device/panel'},
                        ]
                    },
                    {
                        modulename: '控制管理',
                        ename: 'control',
                        url: '/management/control',

                        children: [
                            {modulename: '灯控器', modulecode: '', url: '/management/device'},
                            {modulename: '回路控制器', modulecode: '', url: '/management/device'}
                        ]
                    },
                    {
                        modulename: '策略管理',
                        ename: 'strategy',
                        url: '/management/control',

                        children: [
                            {modulename: '灯控器', modulecode: '', url: '/management/device'},
                            {modulename: '回路控制器', modulecode: '', url: '/management/device'}
                        ]
                    },
                ]
            }
        },
        created: function () {
            this.getSysMenus();
        },
        methods: {
            getSysMenus: function () {
                let navs = [
                    {
                        modulename: '设备管理',
                        ename: 'device',
                        modulecode: '',
                        children: [
                            {modulename: '灯控器', modulecode: '', url: '/device/lamp'},
                            {modulename: '回路控制器', modulecode: '', url: '/device/loop'},
                            {modulename: '控制面板', modulecode: '', url: '/device/panel'},
                        ]
                    },
                    {
                        modulename: '控制管理',
                        ename: 'control',
                        url: '/management/control',

                        children: [
                            {modulename: '灯控器', modulecode: '', url: '/management/device'},
                            {modulename: '回路控制器', modulecode: '', url: '/management/device'}
                        ]
                    },
                    {
                        modulename: '策略管理',
                        ename: 'strategy',
                        url: '/management/control',

                        children: [
                            {modulename: '灯控器', modulecode: '', url: '/management/device'},
                            {modulename: '回路控制器', modulecode: '', url: '/management/device'}
                        ]
                    },
                ];
                this.navs = navs;
               /* this.$globalCache.managementMenus.then(list => {
                    this.navs = list.forEach(item => {
                        navs.forEach(nav => {
                            if (nav.modulecode == item.modulecode) {
                                list.ename = nav.ename ;
                                item.children.forEach(child => {
                                    nav.children.forEach(local => {
                                        if (local.modulecode == child.modulecode) {
                                            child.url = local.url;
                                        }
                                    })
                                })
                            }
                        });

                    })
                })*/
            },
            initMenus: function () {
                if (window.location.hash == '#/'  || window.location.pathname == '/lamp' || window.location.pathname == '/lamp/') {
                    this.$router.push({name: 'lamp'});
                }
                this.$nextTick(function () {
                    $('.collapse .router-link-active').parent().addClass('in').parent().find('[aria-expanded]').attr('aria-expanded', true);
                })
            },
        },
        mounted: function () {
            this.initMenus();
        }
    }
</script>

<style scoped lang="less">
  @navWidth: 320px;
  @navBackgroundColor: #071627;
  .content-view-bg {
    position: relative;
    min-width: 1400px;
    &:before {
      position: absolute;
      content: '';
      height: 100%;
      width: @navWidth;
      background-color: @navBackgroundColor;
    }
  }

  .full-view-bg {
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
        font-size: 20px;
        .panel {
          border-radius: 0;
          margin: 0;
          border: none;
          background-color: transparent;
          .panel-heading {
            padding: 0;
            background-color: transparent;
            a {
              position: relative;
              display: inline-block;
              padding-left: 118px;
              width: 100%;
              height: 100px;
              line-height: 100px;
              color: #fff;
              font-size: 20px;
              &[aria-expanded=false] {
                .nav-selected {
                  width: 11px;
                  height: 20px;
                  margin-top: -10px;
                  background-image: url("../assets/home/hide-nav.png");
                }
              }
              .nav-selected {
                position: absolute;
                right: 30px;
                top: 50%;
                margin-top: -3px;
                display: inline-block;
                width: 20px;
                height: 11px;
                background-image: url("../assets/home/show-nav.png");
              }
              &:hover {
                color: #66bbff;
                background-color: #15283f;
              }
              &.device,
              &.control,
              &.strategy{
                .nav-icon {
                  position: absolute;
                  left: 70px;
                  top: 50%;
                  margin-top: -12px;
                  display: inline-block;
                }
              }
              &.device {
                .nav-icon {
                  width: 24px;
                  height: 23px;
                  background-image: url("../assets/home/device.png");
                }
                &:hover {
                  .nav-icon {
                    background-image: url("../assets/home/device-active.png");
                  }
                }
              }
              &.control {
                .nav-icon {
                  width: 24px;
                  height: 24px;
                  background-image: url("../assets/home/control.png");
                }
                &:hover {
                  .nav-icon {
                    background-image: url("../assets/home/control-active.png");
                  }
                }
              }
              &.strategy {
                .nav-icon {
                  width: 24px;
                  height: 24px;
                  background-image: url("../assets/home/strategy.png");
                }
                &:hover {
                  .nav-icon {
                    background-image: url("../assets/home/strategy-active.png");
                  }
                }
              }
            }
          }
          .panel-collapse {
            .panel-body {
              display: inline-block;
              width: 100%;
              font-size: 20px;
              border: none;
              height: 60px;
              line-height: 60px;
              padding: 0 0 0 118px;
              cursor: pointer;
              color: #fff;
              text-align: left;
              &:hover,
              &.router-link-active{
                color: #66bbff;
                background-color: #15283f;
              }
            }
          }
        }

        ul {
          padding: 0;
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
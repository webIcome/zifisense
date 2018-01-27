<template>
  <div class="bg">
    <div class="test">
      <header-component></header-component>
      <div class="section">
        <div class="aside">
          <div class="title">
            <h1 class="sr-only">纵行科技</h1>
          </div>
          <div class="aside-nav">
            <ul>
              <li v-for="nav in navs"  @click="clickNav(nav)" @mouseover="navHover(nav)" @mouseout="navNormal(nav)"><router-link :to="nav.url" :class="{active: nav.active || nav.hover}"><img class="nav-icon" :src="(nav.active||nav.hover? nav.imgActive:nav.img)"></img>{{nav.name}}</router-link></li>
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
    import HttpClient from "../core/http-client";
    import RestfulConstant from "../constants/restful";
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
                    {name: '用户管理', url: '/management/user', active: true, hover: false, img: '../static/img/sys/user.png', imgActive: '../static/img/sys/user-active.png'},
                    {name: '组织管理', url: '/management/organize', active: false, hover: false, img: '../static/img/sys/organize.png', imgActive: '../static/img/sys/organize-active.png'},
                    {name: '操作日志', url: '/management/log', active: false, hover: false, img: '../static/img/sys/log.png', imgActive: '../static/img/sys/log-active.png'},
                ];
                this.navs = navs;
                this.$router.push('/management/user')
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
                this.navs.forEach(nav => {
                    if (nav.active) this.$router.push(nav.url);
                })
            },
            initDefaultMenu: function () {

            }
        }
    }
</script>

<style scoped lang="less">
  @navWidth: 320px;
  @navBackgroundColor: #071627;
  .test {
    position: relative;
    &:before {
      position: absolute;
      content: '';
      height: 100%;
      width: @navWidth;
      background-color: @navBackgroundColor;
    }
  }
  .bg {
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
        background: url("../../static/img/sys/logo.png");
      }
      .aside-nav {
        ul {
          padding: 0;
        }
        a {
          display: inline-block;
          width: 100%;
          height: 100px;
          line-height: 100px;
          text-align: center;
          color: #fff;
          font-size: 20px;
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

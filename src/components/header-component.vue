<template>
  <div class="header clearfix">
    <div class="header-title">
      <h1 class="sr-only">纵行科技</h1>
    </div>
    <div class="personal">
      <span class="personal-describe">您好，{{user.userName}}</span>
      <div class="dropdown">
        <div class="personal-center" data-toggle="dropdown" aria-expanded="false"><i class="personal-center-icon"></i>个人中心
        </div>
        <ul class="dropdown-menu">
          <li class="change-password"><a href="#" data-toggle="modal" data-target=".modal">修改密码</a></li>
          <li @click="logout"><a href="#">退出登录</a></li>
        </ul>
      </div>
      <div @click="goToHome" v-if="!isHome" class="go-home"><i class="home-icon"></i>返回主页
      </div>
    </div>
    <dialog-component>
      <div slot="body">
      </div>
    </dialog-component>
  </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    import MutationTypes from "../store/mutation-types";
    import DialogComponent from "./dialog-component";
    export default {
        components: {DialogComponent}, name: 'headerComponent',
        data () {
            return {
                user: {}
            }
        },
        props: {
            isHome: {
                type: Boolean,
                default: false,
            }
        },
        created () {
            this.getUser().then(user => {
                if (user) this.user = user
            });
        },
        methods: {
            ...mapActions({
                getUser: MutationTypes.GET_USER_LOCAL
            }),
            goToHome: function () {
                this.$router.push('/');
            },
            changePassword: function () {

            },
            dialogChangePassword: function () {

            },
            logout: function () {

            }
        }
    }
</script>

<style scoped lang="less">
  .header {
    &.home {
      margin-left: 0;
      height: 120px;
      background-color: #0d296d;
      background-color: rgba(13, 41, 109, 0.8);
      .header-title {
        float: left;
        margin-left: 122px;
        margin-top: 24px;
        width: 200px;
        height: 72px;
        background-image: url("../assets/home/header/logo.png");
      }
      .personal {
        float:right;
        margin-top: 39px;
        margin-right: 80px;
        .personal-describe {
          margin-right: 28px;
          color: #fff;
          letter-spacing: 2px;
        }
        .dropdown {
          display: inline-block;
          width: 127px;
          height: 42px;
          line-height: 42px;
          text-align: center;
          color: #51b0f8;
          background-image: url("../assets/home/header/personal-center-bg.png");
          .personal-center-icon {
            margin-right: 8px;
            display: inline-block;
            width: 14px;
            height: 16px;
            vertical-align: text-bottom;
            background-image: url("../assets/home/header/personal-center-icon.png");
          }
        }
        .dropdown:active,
        .dropdown:hover {
          color: #a8ecfe;
          background-image: url("../assets/home/header/personal-center-bg-active.png");
        }
      }
    }
    height: 80px;
    background-color: #071627;
    font-size: 16px;
    margin-left: 320px;
    .personal {
      float:right;
      margin-top: 30px;
      margin-right: 80px;
      .personal-describe {
        margin-right: 20px;
        color: #fff;
        letter-spacing: 2px;
      }
      .dropdown {
        display: inline-block;
        height: 23px;
        line-height: 23px;
        margin-right: 20px;
        text-align: center;
        color: #51b0f8;
        &:hover {
          color: #a8ecfe;
          .personal-center-icon {
            background-image: url("../assets/header/personal-center-icon-active.png");
          }
        }
        .personal-center-icon {
          margin-right: 8px;
          display: inline-block;
          width: 14px;
          height: 16px;
          vertical-align: text-bottom;
          background-image: url("../assets/header/personal-center-icon.png");
        }
      }
      .go-home {
        display: inline-block;
        color: #51b0f8;
        &:hover {
          color: #a8ecfe;
          .home-icon {
            background-image: url("../assets/header/home-icon-active.png");
          }
        }
        .home-icon {
          margin-right: 8px;
          display: inline-block;
          width: 18px;
          height: 16px;
          vertical-align: text-bottom;
          background-image: url("../assets/header/home-icon.png");
        }
      }
    }
    .dropdown-menu {
      width: 91px;
      min-width: 91px;
      height: 80px;
      min-height: 81px;
      left: 50%;
      margin-left: -45.5px;
      padding: 0 !important;
      text-align: center;
      .change-password {
        a {
          color: #4395d7
        };
        border-bottom: 1px solid #ddd;
      }
      a {
        color: #ff5151;
        padding: 0 !important;
        height: 39px;
        line-height: 39px;
        border-radius: 4px;
      }
    }
  }
</style>

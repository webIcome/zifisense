<template>
  <div class="header">
    <div class="row">
      <div class="col-md-2 header-title">
        <h1 class="sr-only">纵行科技</h1>
      </div>
      <div class="col-md-offset-9 personal">
        <span class="personal-describe">您好，{{user.userName}}</span>
        <div class="dropdown">
          <button type="button" class="btn btn-primary" data-toggle="dropdown" aria-expanded="false"><span class="glyphicon glyphicon-user"></span>个人中心</button>
          <ul class="dropdown-menu">
            <li><a href="#" data-toggle="modal" data-target=".modal" >修改密码</a></li>
            <li @click="logout"><a href="#">退出登录</a></li>
          </ul>
        </div>
        <button @click="goToHome" type="button" class="btn btn-primary"><span class="glyphicon glyphicon-home"></span>返回主页</button>
      </div>
    </div>
    <dialog-component>
      <div slot="body">
      </div>
    </dialog-component>
  </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import MutationTypes from "../store/mutation-types";
    import DialogComponent from "./dialog-component";
    export default {
        components: {DialogComponent}, name: 'headerComponent',
        data () {
            return {
                user: {}
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
    font-size: 16px;
    .header-title {
    }
    .personal-describe {
      display: inline-block;
    }
    .dropdown {
      display: inline-block;
    }
  }
</style>

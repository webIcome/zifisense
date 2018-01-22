<template>
  <div class="zifi-container  vertical-middle height-full">
    <div class="login-container">
      <div class="login-title">
        <img src="../assets/login/logo.png">
        <img class="parting-line" src="../assets/login/parting-line.png">
      </div>
      <form class="form-horizontal" @submit.prevent="login">
        <div class="form-group"> 登录/Login</div>
        <div class="form-group">
          <label for="username" class="sr-only">用户名</label>
          <input type="text" class="form-control" id="username" name="username" v-model="username" placeholder="用户"/>
        </div>
        <div class="form-group">
          <label for="password" class="sr-only">密码</label>
          <input :type="showPassword? 'text': 'password'" class="form-control" id="password" name="password" v-model="password" placeholder="密码">
          <span @click="toggleShowPassword" :class="showPassword? 'show-password':'not-show-password'"></span>
        </div>
        <div class="form-group">
          <button type="submit" class="btn btn-info btn-block">登录</button>
        </div>

      </form>
    </div>
  </div>
</template>

<script>
    import HttpClient from "../core/http-client";
    import RestfulConstant from "../constants/restful";
    import {mapActions} from 'vuex';
    import MutationTypes from "../store/mutation-types";
    export default {
        name: 'login',
        data() {
            return {
                username: '',
                password: '',
                showPassword: false
            }
        },
        methods: {
            login: function () {
                this.getUser({username: this.username, password: this.password}).then(() => {
                    this.$router.push('/')
                }).catch(err => {

                })
            },
            toggleShowPassword: function () {
              this.showPassword = !this.showPassword;
            },
            ...mapActions({
                getUser: MutationTypes.GET_USER
            })

        }
    }
</script>

<style scoped lang="less">
  .zifi-container {
    background: url("../assets/login/bg.png") 100% 100%;
  }
  .login-container {
    display: inline-block;
    min-width: 1000px;
    min-height: 681px;
    max-height: 681px;
    height: 70%;
    vertical-align: middle;
    font-size: 16px;
    background: url("../assets/login/login-bg.png");
    &:after {
      display: inline-block;
      height: 100%;
      content: '';
      width: 0;
      vertical-align: middle;
    }
    .login-title {
      display: inline-block;
      width: 50%;
      text-align: right;
      padding-right: 60px;
      .parting-line {
        margin-left: 96px;
      }
    }
    form {
      display: inline-block;
      width: 40%;
      padding-right: 100px;
      text-align: left;
      vertical-align: middle;
      font-size: 28px;
      color: rgba(254,254,254, 0.8);
      .form-group {
        position: relative;
        margin-bottom: 36px;
      }
      input {
        padding-left: 0;
        padding-right: 0;
        background-color: transparent;
        border: none;
        border-radius: 0;
        box-shadow: none;
        border-image: linear-gradient(right,rgba(100,100,100,0), rgba(100,100,100,0.5))1 1;
        border-bottom: 1px solid #fff;
        font-size: 22px;
      }
      .not-show-password {
        position: absolute;
        right: 0;
        top: 15px;
        width: 22px;
        height: 10px;
        background-image: url("../assets/login/not-show-password.png");
      }
      .show-password {
        position: absolute;
        right: 0;
        top: 15px;
        width: 22px;
        height: 15px;
        background-image: url("../assets/login/show-password.png");
      }
    }
  }
</style>

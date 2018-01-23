<template>
  <div class="zifi-container  vertical-middle height-full">
    <div class="login-container">
      <div class="login-title">
        <img src="../assets/login/logo.png">
        <img class="parting-line" src="../assets/login/parting-line.png">
      </div>
      <form class="form-horizontal" @submit.prevent="login">
        <div class="form-group">
          <div class="col-md-12">登录/Login</div>
        </div>
        <div class="form-group">
          <label for="username" class="sr-only">用户名</label>
          <div class="col-md-12">
            <input type="text" class="form-control" id="username" name="username" v-model="username" placeholder="用户"/>
          </div>
        </div>
        <div class="form-group">
          <label for="password" class="sr-only">密码</label>
          <div class="col-md-12">
            <input :type="showPassword? 'text': 'password'" class="form-control" id="password" name="password" v-model="password" placeholder="密码">
          </div>
          <span @click="toggleShowPassword" :class="showPassword? 'show-password':'not-show-password'"></span>
        </div>
        <div class="form-group">
          <label for="verifyCode" class="sr-only">验证码</label>
          <div class="col-md-8 col-xs-8">
            <input type="text" class="form-control verify-code" id="verifyCode" name="verifyCode" v-model="verifyCode" placeholder="验证码输入">
          </div>
          <div @click="getVerifyCode" class="verify-code-img pull-left"></div>
        </div>
        <div class="form-group">
          <div class="col-md-12">
            <button type="submit" class="btn btn-info btn-block">登录</button>
          </div>
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
                verifyCode: '',
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
            getVerifyCode: function () {

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
        border-image: linear-gradient(right,rgba(100,100,100,0.3), rgba(100,100,100,0.6) 50%)1 1;
        border-bottom: 1px solid #fff;
        font-size: 22px;
        color: rgba(254,254,254, 0.8);
        &::placeholder {
          font-size: 22px;
          color: rgba(106, 131, 165, 0.8);
        }
        &.verify-code {
          border-image: linear-gradient(right,rgba(85,109,141,0.3), rgba(85,109,141,0.6) 80%)1 1;
        }
      }
      .verify-code-img {
        width: 100px;
        height: 32px;
        background-color: #3bb9dd;
      }
      .not-show-password {
        position: absolute;
        right: 15px;
        top: 15px;
        width: 22px;
        height: 10px;
        background-image: url("../assets/login/not-show-password.png");
      }
      .show-password {
        position: absolute;
        right: 15px;
        top: 15px;
        width: 22px;
        height: 15px;
        background-image: url("../assets/login/show-password.png");
      }
    }
  }
</style>

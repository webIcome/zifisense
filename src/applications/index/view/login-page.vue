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
            <input type="text" class="form-control" id="username" name="username" v-model="loginname" placeholder="用户" v-validate="'required'"/>
          </div>
        </div>
        <div class="form-group">
          <label for="password" class="sr-only">密码</label>
          <div class="col-md-12">
            <input :type="showPassword? 'text': 'password'" class="form-control" id="password" name="password" v-model="password" placeholder="密码" v-validate="'required'">
          </div>
          <span @click="toggleShowPassword" :class="showPassword? 'show-password':'not-show-password'"></span>
        </div>
        <div class="form-group">
          <label for="verifyCode" class="sr-only">验证码</label>
          <div class="col-md-8 col-xs-8">
            <input type="text" class="form-control verify-code" id="verifyCode" name="verifyCode" v-model="verifyCode" placeholder="验证码输入" v-validate="'required'">
          </div>
          <div @click="getVerifyCode" class="verify-code-img pull-left" id="code"></div>
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
    import HttpClient from "../../../core/http-client";
    import RestfulConstant from "../../../constants/restful";
    import {mapActions} from 'vuex';
    import MutationTypes from "../../../store/mutation-types";
    import GVerify from "../../../plugins/g-verify";
    export default {
        name: 'login',
        data() {
            return {
                loginname: '',
                password: '',
                verifyCode: '',
                code: '',
                showPassword: false,
                gVerifyCode: null,
            }
        },
        mounted: function () {
            this.gVerifyCode = new GVerify({id: 'code'});
            this.getVerifyCode();
        },
        methods: {
            login: function () {
                this.$validator.validateAll().then(result => {
                    if (result) {
                        let access = {loginname: this.loginname, password: this.password};
                        if (this.verifyCode) access.code = this.verifyCode;
                        if (this.code != this.verifyCode) {
                            return this.$message({
                                message: '表单验证失败',
                                type: 'warning'
                            });
                        }
                        this.getUser(access).then((user) => {
                            setTimeout(()=> {
                                this.$router.push('/')
                            }, 200)
                        }).catch(err => {
                            this.$tips.fail(err.message);
                        })
                    } else {
                        this.$message({
                            message: '表单验证失败',
                            type: 'warning'
                        });
                    }
                })
            },
            toggleShowPassword: function () {
              this.showPassword = !this.showPassword;
            },
            generateCode: function () {
                this.code = '';
                for (let i = 0; i < 4; i++) {
                    this.code +=this.random();
                }
            },
            random: function () {
                return Math.floor(Math.random()*9);
            },
            getVerifyCode: function () {
                /*this.$http.get('code').then(res => {

                }).catch(err => {

                });*/
                this.generateCode();
                this.gVerifyCode.refresh(this.code)
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
    min-width: 400px;
  }
  @media screen and (max-width: 1500px){
    .login-container {
      transform: scale(0.8, 0.8);
    }
  }
  @media screen and (max-width: 1400px){
    .login-container {
      transform: scale(0.7, 0.7);
    }
  }
  @media screen and (max-width: 1300px){
    .login-container {
      transform: scale(0.6, 0.6);
    }
  }
  @media screen and (max-width: 1200px){
    .login-container {
      transform: scale(0.5, 0.5);
    }
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
        /*border-image: linear-gradient(right,rgba(100,100,100,0.3), rgba(100,100,100,0.6) 50%)1 1;*/
        /*border-bottom: 1px solid #fff;*/
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
        border-radius: 4px;
        box-shadow: 0 0 10px #555;
      }
      .not-show-password,
      .show-password{
        position: absolute;
        right: 15px;
        top: 5px;
        width: 25px;
        height: 25px;
        cursor: pointer;
      }
      .not-show-password{
        background: url("../assets/login/not-show-password.png") no-repeat center center;
      }
      .show-password {
        background: url("../assets/login/show-password.png") no-repeat center center;
      }
    }
  }
  #username {
   background: url("../assets/login/user-code-line.png") no-repeat bottom;
  }
  #password {
    background: url("../assets/login/user-code-line.png") no-repeat bottom;
  }
  #verifyCode {
    background: url("../assets/login/verify-code-line.png") no-repeat bottom;
  }
</style>

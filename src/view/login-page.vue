<template>
  <div class="zifi-container  vertical-middle height-full">
    <div class="login-container">
      <form class="form-horizontal" @submit.prevent="login">
        <div class="form-group"><label class="control-label"> 登录/Login</label></div>
        <div class="form-group">
          <label for="username" class="sr-only">用户名</label>
          <input type="text" class="form-control" id="username" name="username" v-model="username" placeholder="用户"/>
        </div>
        <div class="form-group">
          <label for="password" class="sr-only">密码</label>
          <input type="password" class="form-control" id="password" name="password" v-model="password" placeholder="密码">
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
                password: ''
            }
        },
        methods: {
            login: function () {
                this.getUser({username: this.username, password: this.password}).then(() => {
                    this.$router.push('/')
                }).catch(err => {

                })
            },
            ...mapActions({
                getUser: MutationTypes.GET_USER
            })

        }
    }
</script>

<style scoped lang="less">
  .login-container {
    display: inline-block;
    min-width: 400px;
    vertical-align: middle;
    font-size: 16px;
    form {
      text-align: left;
      .form-group {
        margin-bottom: 60px;
      }
      input {
        padding-left: 0;
        padding-right: 0;
        border: none;
        border-radius: 0;
        box-shadow: none;
        border-image: linear-gradient(right,rgba(100,100,100,0), rgba(100,100,100,0.5))1 1;
        border-bottom: 1px solid #fff;
      }
    }
  }
</style>

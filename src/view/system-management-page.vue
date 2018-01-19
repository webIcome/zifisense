<template>
  <div class="zifi-container">
    <header-component></header-component>
    <div class="section">
      <div class="aside">
        <div class="aside-nav">
          <ul>
            <li v-for="nav in navs"><router-link :to="nav.url">{{nav.name}}</router-link></li>
          </ul>
        </div>
      </div>
      <div class="content">
        <router-view></router-view>
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
                navs: [
                    {name: '用户管理', url: '/management/user'},
                    {name: '用户管理', url: 'user'},
                    {name: '用户管理', url: '/management/log'},
                ]
            }
        },
        created: function () {
            this.getSysMenus();
        },
        methods: {
            getSysMenus: function () {
                this.$router.push('/management/user')
            },
            clickNav: function () {

            },
            initMenus: function () {

            },
            initDefaultMenu: function () {

            }
        }
    }
</script>

<style scoped lang="less">


</style>

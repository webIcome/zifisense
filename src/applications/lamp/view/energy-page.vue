<template>
  <div class="content-right">
    <energy-params-component v-if="currentPage == pages.home" v-on:search="search"></energy-params-component>
    <energy-echarts-component v-else :list="list"></energy-echarts-component>

  </div>

</template>

<script>
  import EnergyParamsComponent from "./energy-params-component";
  import EnergyEchartsComponent from './energy-echarts-component.vue';
    export default {
        name: 'energyPage',
        components: {
            EnergyParamsComponent,
            EnergyEchartsComponent
        },
        data() {
            return {
                pages: {
                    home: 1,
                    eChart: 2
                },
                currentPage : 1,
                list: []
            }
        },
        created: function () {
//            this.$http.post('accounts/login',{account: 'admin', password: '111111'}, {root: 'http://192.168.0.152:8091/'})
        },
        mounted: function () {
        },
        methods: {
            findList: function (params) {
                this.$http.get('lightController/getList', {params: params}).then(res => {
                    this.list = res.body.data.list;
                }).catch(err => {

                })
            },
            search: function (searchParams) {
                this.findList(Object.assign(searchParams, this.defaultPaging));
                this.currentPage = this.pages.eChart;
            }
        }
    }
</script>

<style scoped lang="less">

</style>

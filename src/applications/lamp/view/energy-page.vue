<template>
  <div class="content-right">
    <energy-params-component v-if="currentPage == pages.home" v-on:search="search"></energy-params-component>
    <energy-echarts-component v-else :list="list" :excelList="excelList" :searchParams="searchParams"></energy-echarts-component>

  </div>

</template>

<script>
  import EnergyParamsComponent from "./energy-params-component";
  import EnergyEchartsComponent from './energy-echarts-component.vue';
  import Services from "../services";
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
                list: [],
                excelList: [],
                searchParams: {}
            }
        },
        created: function () {
        },
        mounted: function () {
        },
        methods: {
            search: function (searchParams) {
                let list = Services.findChartData(searchParams);
                let excelList = Services.findExcelData(searchParams);
                this.searchParams = searchParams;
                Promise.all([list, excelList]).then(data => {
                    this.list = data[0].list;
                    this.excelList = data[1].list;
                    this.currentPage = this.pages.eChart;
                }).catch(err => console.log(err));
            }
        }
    }
</script>

<style scoped lang="less">

</style>

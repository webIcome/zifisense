<template>
  <div>
    <div class="energy-title">
      <div @click="choosePage(pages.excel)" class="energy-title-excel" :class="{active: currentPage == pages.excel}"><span class="icon"></span>表格</div>
      <div @click="choosePage(pages.echart)" class="energy-title-chart" :class="{active: currentPage == pages.echart}"><span class="icon"></span>柱状图</div>
    </div>
      <div v-show="currentPage == pages.echart" id="charts" style="width: 100%; height: 500px">
      </div>

    <div v-show="currentPage == pages.excel">
      <el-table ref="companyTable" :data="companyList" class="table" header-cell-class-name="header-cell">
        <el-table-column label="企业名称" prop="devicename" align="center"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
    import RestfulConstant from "../../../constants/restful";
    import Config from "../../../config";
    let Echarts = require('echarts/lib/echarts');
    require('echarts/lib/component/dataset');
    require('echarts/lib/chart/bar');
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/title');
    require('echarts/lib/component/legend');
    export default {
        name: 'energyPage',
        data() {
            return {
                pages: {
                    echart: 2,
                    excel: 1
                },
                currentPage: 2,
                options: {},
                myChart: {}
            }
        },
        props: {
            list: {
                type: Array
            }
        },
        computed: {
            data: function () {
                return [
                    ['product', '2015', '2016', '2017'],
                    ['Matcha Latte', 43.3, 85.8, 93.7],
                    ['Milk Tea', 83.1, 73.4, 55.1],
                    ['Cheese Cocoa', 86.4, 65.2, 82.5],
                    ['Walnut Brownie', 72.4, 53.9, 39.1]
                ]
            },
            legendData: function () {
                return this.data[0];
            },
            series: function () {
                let arr = [];
                this.legendData.forEach(item => {
                    arr.push({type: 'bar', barWidth: 8});
                });
                arr.shift();
                return arr;
            },
        },
        mounted: function () {
            this.initData();
        },
        methods: {
            initData: function () {
                this.myChart = Echarts.init(document.getElementById('charts'));
                this.options = {
                    color: ['#5dd3ff', '#f08b8b', '#e3e45b', '#5edece', '#9ca210'],
                    legend:{
                        orient: 'vertical',
                        right: 10,
                        top: 20,
                        bottom: 20,
                        data:  this.legendData,

                    },
                    tooltip:{},
                    dataset: {
                        source: this.data
                    },
                    xAxis: {type: 'category'},
                    yAxis: {
                        splitLine: {
                            show: false
                        }
                    },
                    series: this.series
                };
                this.myChart.setOption(this.options)
            },
            choosePage: function (page) {
                this.currentPage = page;
            },
        }
    }
</script>

<style scoped lang="less">
  .energy-title {
    padding: 40px 0;
    text-align: center;
    font-size: 24px;
    .energy-title-excel,
    .energy-title-chart{
      display: inline-block;
      width: 240px;
      height: 60px;
      line-height: 60px;
      background-color: #aaa;
      margin: 0 40px;
      border-radius: 4px;
      cursor: pointer;
      &.active {
        background-color: #1789e1;
        color: #fff;
      }
    }
  }
  .header-cell {
    background-color: #1789e1;
  }
</style>

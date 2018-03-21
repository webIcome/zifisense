<template>
  <div style="min-width: 1400px">
    <div class="energy-title">
      <div @click="choosePage(pages.excel)" class="energy-title-excel" :class="{active: currentPage == pages.excel}"><span class="icon"></span>表格</div>
      <div @click="choosePage(pages.echart)" class="energy-title-chart" :class="{active: currentPage == pages.echart}"><span class="icon"></span>柱状图</div>
    </div>
    <div  v-show="currentPage == pages.echart">
      <div id="charts" style="width: 100%; height: 450px">
      </div>
      <div class="get-table">
        <a :href="download" class="get-table-btn" download="chart">下载图片</a>
      </div>
    </div>
    <div v-show="currentPage == pages.excel" class="center">
        <table class="table table-hover table-striped">
          <thead>
          <template>

          </template>
          <th>时间</th>
          <th>统计单位</th>
          <th>有功电能累加</th>
          </thead>
          <tbody>
          <tr v-for="item in excelList">
            <td>{{item.timepoint}}</td>
            <td>{{item.according}}</td>
            <td>{{item.consumption}}</td>
          </tr>
          </tbody>
        </table>
      <div class="get-table">
        <!--<a :href="excelUrl"  class="get-table-btn">导出表格</a>-->
        <a @click="downloadExcel"  class="get-table-btn">导出表格</a>
      </div>
    </div>
  </div>
</template>

<script>
    import RestfulConstant from "../../../constants/restful";
    import Config from "../../../config";
    import Services from "../services";
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
                myChart: null
            }
        },
        props: {
            list: {
                type: Array
            },
            excelList: {
                type: Array
            },
            searchParams: {
                type: Object
            }
        },
        computed: {
            data: function () {
               /* let list = [{according: '组1', result: [{timepoint: '2018-02-28', consumption: '20'},
                    {timepoint: '2018-03-01', consumption: '21'}]},
                    {according: '组2', result: [{timepoint: '2018-02-28', consumption: '20'},
                        {timepoint: '2018-03-01', consumption: '21'}]}]*/
                let titles = [];
                let data = [];
                titles.push('unit');
                this.list.forEach((item,index) => {
                   titles.push(item.according);
                   item.result.forEach((child, childIndex) => {
                       if (index > 0) {
                           data[childIndex].push(child.consumption)
                       } else {
                           data[childIndex] = [];
                           data[childIndex].push(child.timepoint);
                           data[childIndex].push(child.consumption);
                       }
                   });
                });
                data.unshift(titles);
                return data;
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
            download: function () {
                if (this.myChart) {
                    return this.myChart.getDataURL();
                }
            },
           /* excelUrl: function () {
                return this.getUrl(Config.LAMP_URL_API, 'consumption/getExcelList', this.searchParams)
            }*/
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
           /* getUrl: function (url, path, params) {
                return  url + path + '?' + $.param(params)
            },*/
            downloadExcel: function () {
                Services.getExcel({params: this.searchParams, responseType: 'blob'}).then(res => {
                    return res.blob();
                }).then(blob => {
                    let urlObject = window.URL || window.webkitURL || window;
                    let save_link = document.createElement("a");
                    save_link.href = urlObject.createObjectURL(blob);
                    save_link.download = Date.parse(new Date()) + '.xls';
                    this.fakeClick(save_link);
                })
            },
            fakeClick: function (obj) {
                var ev = document.createEvent("MouseEvents");
                ev.initMouseEvent(
                    "click", true, false, window, 0, 0, 0, 0, 0
                    , false, false, false, false, 0, null
                );
                obj.dispatchEvent(ev);
            }
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
  thead {
    th{
      height: 60px;
      line-height: 60px;
      color: #fff;
      background: linear-gradient(#1789e1, #2b71b8);
      border-left: 0.5px solid #fff;
      &:last-child {
        border-top-right-radius: 6px;
      }
      &:first-child {
        border-left: none;
        border-top-left-radius: 6px;
      }
    }
  }
  .table-striped > tbody > tr:nth-of-type(even) {
    background-color: #e3eef6;
  }
  .table {
    border: none;
    tbody {
      td {
        border-top: none;
        border-left: 0.5px solid #fff;
        &:first-child {
          border-left: none;
        }
      }
    }
  }
  .get-table {
    text-align: center;
    margin: 40px 0 0 0;
    .get-table-btn {
      display: inline-block;
      width: 204px;
      height: 60px;
      line-height: 60px;
      border-radius: 5px;
      background-color: #1789e1;
      color: #fff;
      cursor: pointer;
    }
  }
</style>

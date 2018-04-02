<template>
  <div class="content-right">
    <div class="page-title">灯控器高级搜索</div>
    <form class="form-horizontal default-form">
      <div class="form-group">
        <label class="col-md-3 control-label">设备名称：</label>
        <div class="col-md-3">
          <el-input type="text" v-model="advancedSearchParams.devicename" placeholder="输入设备名称"/>
        </div>
        <label class="col-md-3 control-label">电压/v：</label>
        <div class="col-md-3">
          <el-input type="text" class="input-two" v-model="advancedSearchParams.voltagelow" placeholder="输入电压"/>到<el-input
            type="text" class="input-two" v-model="advancedSearchParams.voltagehigh"  placeholder="输入电压"/>
        </div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">设备ID：</label>
        <div class="col-md-3">
          <el-input type="text" v-model="advancedSearchParams.sn" placeholder="输入设备ID"/>
        </div>
        <label class="col-md-3 control-label">电流/A：</label>
        <div class="col-md-3">
          <el-input type="text" class="input-two" v-model="advancedSearchParams.currrentlow" placeholder="输入电流"/>到<el-input
            v-model="advancedSearchParams.currenthigh" type="text" class="input-two" placeholder="输入电流"/>
        </div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">归属组：</label>
        <div class="col-md-3">
          <el-input type="text" v-model="advancedSearchParams.groupname" placeholder="输入组名称"></el-input>
        </div>
        <label class="col-md-3 control-label">累计能耗：</label>
        <div class="col-md-3">
          <el-input type="text" class="input-two" v-model="advancedSearchParams.sumpowerlow" placeholder="输入累计能耗"/>到<el-input
            type="text" class="input-two" v-model="advancedSearchParams.sumpowerhigh" placeholder="输入累计能耗"/>
        </div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">归属回路控制器：</label>
        <div class="col-md-3">
          <el-input type="text" v-model="advancedSearchParams.loopcontrollersn" placeholder="输入归属回路控制器ID"></el-input>
        </div>
        <label class="col-md-3 control-label">地理位置：</label>
        <div class="col-md-3">
          <el-input type="text" v-model="advancedSearchParams.position" placeholder="输入地理位置"/>
        </div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">灯控器类型：</label>
        <div class="col-md-3">
          <el-select v-model="advancedSearchParams.lightcontrollerType" placeholder="选择灯控器类型" clearable  style="width: 100%;">
            <el-option v-for="type in lightControllerType" :key="type.value" :value="type.value" :label="type.text"></el-option>
          </el-select>
        </div>
        <label class="col-md-3 control-label">接入时间：</label>
        <div class="col-md-3">
          <el-col :span="11">
            <el-date-picker style="width: 100%" v-model="advancedSearchParams.regtimestart" type="date" placeholder="请选择开始时间"></el-date-picker>
          </el-col>
          <el-col class="line text-center" :span="2" style="line-height: 40px">到</el-col>
          <el-col :span="11">
            <el-date-picker style="width: 100%" v-model="advancedSearchParams.regtimeend" type="date" placeholder="请选择结束时间"></el-date-picker>
          </el-col>
        </div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">传感器类型：</label>
        <div class="col-md-3">
          <el-select v-model="advancedSearchParams.sensortype" placeholder="选择传感器类型" clearable  style="width: 100%;">
            <el-option v-for="type in sensorType" :key="type.value" :value="type.value" :label="type.text"></el-option>
          </el-select>
        </div>
        <label class="col-md-3 control-label">归属企业：</label>
        <div class="col-md-3">
          <tree-select-component v-model="advancedSearchParams.companyid" :list="companies"></tree-select-component>
        </div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">开关状态：</label>
        <div class="col-md-3">
          <el-select v-model="advancedSearchParams.switchstate" placeholder="选择开关状态" clearable  style="width: 100%;">
            <el-option v-for="type in switchStatus" :key="type.value" :value="type.value" :label="type.text"></el-option>
          </el-select>
        </div>
        <label class="col-md-3 control-label">亮度值：</label>
        <div class="col-md-3">
          <el-input type="text" class="input-two" v-model="advancedSearchParams.brightnesslow" placeholder="输入亮度"/>到<el-input
            type="text" class="input-two" v-model="advancedSearchParams.brightnesshigh" placeholder="输入亮度"/>
        </div>
      </div>
      <div class="search-btn">
        <div @click="search" class="default-btn">搜索</div>
        <div @click="goBack" class="default-btn">返回</div>
      </div>
    </form>
  </div>
</template>

<script>
    import HttpClient from "../../../core/http-client";
    import RestfulConstant from "../../../constants/restful";
    export default {
        name: 'searchLightControlPage',
        data() {
            return {
                advancedSearchParams: {

                },
                lightControllerType: [
                    {value: 1, text: '电源蓝牙'},
                    {value: 2, text: '电源ZETA'},
                    {value: 3, text: '电源蓝牙+ZETA'},
                    {value: 4, text: '外挂式蓝牙'},
                    {value: 5, text: '外挂式ZETA'},
                    {value: 6, text: '外挂式蓝牙+ZETA'},
                ],
                switchStatus: [
                    {value: 1, text: '开'},
                    {value: 2, text: '关'},
                ],
                sensorType: [
                    {value: 1, text: '无'},
                    {value: 2, text: '光感'},
                    {value: 3, text: '微波'},
                ]
            }
        },
        props: {
          companies: {
              type: Array
          }
        },
        methods: {
            search: function () {
                this.$emit('search', this.advancedSearchParams)
            },
            goBack: function () {
                this.$emit('back')
            },
        }
    }
</script>

<style scoped lang="less">

</style>

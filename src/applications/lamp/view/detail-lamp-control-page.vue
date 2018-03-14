<template>
  <div class="content-right">
    <div class="page-title">灯控器详情</div>
    <div class="form-horizontal">
      <div class="form-group">
        <label class="col-md-3 control-label">设备名称：</label>
        <div class="col-md-3 form-control-static">{{device.devicename}}</div>
        <label class="col-md-3 control-label">电压：</label>
        <div class="col-md-3 form-control-static">{{device.voltagelow}}</div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">设备ID：</label>
        <div class="col-md-3 form-control-static">{{device.sn}}</div>
        <label class="col-md-3 control-label">电流：</label>
        <div class="col-md-3 form-control-static">{{device.oldpwd}}</div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">归属组：</label>
        <div class="col-md-3 form-control-static">{{device.groupname}}</div>
        <label class="col-md-3 control-label">有功电能：</label>
        <div class="col-md-3 form-control-static">{{device.activepower}}</div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">归属回路控制器：</label>
        <div class="col-md-3 form-control-static">{{device.voltagelow}}</div>
        <label class="col-md-3 control-label">地理位置：</label>
        <div class="col-md-3 form-control-static">{{device.position}}</div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">灯控类型：</label>
        <div class="col-md-3 form-control-static">{{device.lightControllerType | lightControllerTypeNameConverter}}</div>
        <label class="col-md-3 control-label">接入时间：</label>
        <div class="col-md-3 form-control-static">{{device.regtime | formDate}}</div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">传感器类型：</label>
        <div class="col-md-3 form-control-static">{{device.sensortype | sensortypeNameConverter}}</div>
        <label class="col-md-3 control-label">归属企业：</label>
        <div class="col-md-3 form-control-static">{{device.compnayname}}</div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">开关状态：</label>
        <div class="col-md-3 form-control-static">{{device.switchstate | switchStateNameConverter}}</div>
        <label class="col-md-3 control-label">运行状态：</label>
        <div class="col-md-3 form-control-static">{{device.runningstate | runningstateNameConverter}}</div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">亮度值：</label>
        <div class="col-md-3 form-control-static">{{device.brightness}}</div>
      </div>
      <div class="text-center">
        <div @click="goBack" class="default-btn">返回</div>
      </div>
    </div>

  </div>
</template>

<script>
    export default {
        name: 'searchLampControlPage',
        data() {
            return {
            }
        },
        props: {
            pages: {},
            device: {}
        },

        methods: {
            goBack: function () {
                this.$emit('page', this.pages.home);
            },
        }
    }
</script>

<style scoped lang="less">

</style>

<template>
  <div class="content-right">
    <div class="page-title">灯控器详情</div>
    <div class="form-horizontal">
      <div class="form-group">
        <label class="col-md-3 control-label">设备名称：</label>
        <div class="col-md-3">{{device.devicename}}</div>
        <label class="col-md-3 control-label">电压：</label>
        <div class="col-md-3">{{device.voltagelow}}</div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">设备ID：</label>
        <div class="col-md-3">{{device.sn}}</div>
        <label class="col-md-3 control-label">电流：</label>
        <div class="col-md-3">{{device.current}}</div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">归属组：</label>
        <div class="col-md-3">{{device.group}}</div>
        <label class="col-md-3 control-label">有功电能：</label>
        <div class="col-md-3">{{device.activepower}}</div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">归属回路控制器：</label>
        <div class="col-md-3">{{device.voltagelow}}</div>
        <label class="col-md-3 control-label">地理位置：</label>
        <div class="col-md-3">{{device.position}}</div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">灯控类型：</label>
        <div class="col-md-3">{{device.lightControllerType}}</div>
        <label class="col-md-3 control-label">接入时间：</label>
        <div class="col-md-3">{{device.regtime}}</div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">传感器类型：</label>
        <div class="col-md-3">{{device.sensortype}}</div>
        <label class="col-md-3 control-label">归属企业：</label>
        <div class="col-md-3">{{device.compnayname}}</div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">开关状态：</label>
        <div class="col-md-3">{{device.switchstate}}</div>
        <label class="col-md-3 control-label">运行状态：</label>
        <div class="col-md-3">{{device.runningstate}}</div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">亮度值：</label>
        <div class="col-md-3">{{device.brightness}}</div>
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
                device: {},
            }
        },
        props: {
            id: '',
            pages: {}
        },
        created: function () {
            this.getDetail(this.id);
        },
        methods: {
            getDetail: function (id) {
                this.$http.post('lightController/getDetailsBySn', {sn: id}).then(res => {
                    this.device = res.data
                })
            },
            goBack: function () {
                this.$emit('page', this.pages.home);
            },
        }
    }
</script>

<style scoped lang="less">

</style>

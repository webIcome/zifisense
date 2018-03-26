<template>
  <div class="content-right">
    <div class="page-title">回路控制器详情</div>
    <div class="form-horizontal">
      <div class="form-group">
        <label class="col-md-3 control-label">设备名称：</label>
        <div class="col-md-3 form-control-static">{{device.devicename}}</div>
        <label class="col-md-3 control-label">DI口状态：</label>
        <div class="col-md-3 form-control-static">{{device.diportstate | switchStateNameConverter}}</div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">设备ID：</label>
        <div class="col-md-3 form-control-static">{{device.sn}}</div>
        <label class="col-md-3 control-label">三相电压：</label>
        <div class="col-md-3 form-control-static" style="overflow: hidden;text-overflow: ellipsis;" :title="device.threevoltage">{{device.threevoltage}}</div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">归属组：</label>
        <div class="col-md-3 form-control-static">{{device.groupname}}</div>
        <label class="col-md-3 control-label">三相电流：</label>
        <div class="col-md-3 form-control-static" style="overflow: hidden;text-overflow: ellipsis;" :title="device.threecurrent">{{device.threecurrent}}</div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">回路数：</label>
        <div class="col-md-3 form-control-static">{{device.loopnum}}</div>
        <label class="col-md-3 control-label">有功电能累加：</label>
        <div class="col-md-3 form-control-static">{{device.sumactivepower}}</div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">地理位置：</label>
        <div class="col-md-3 form-control-static">{{device.position}}</div>
        <label class="col-md-3 control-label">无功电能累加：</label>
        <div class="col-md-3 form-control-static">{{device.sumreactivepower}}</div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">归属企业：</label>
        <div class="col-md-3 form-control-static">{{device.companyname}}</div>
        <label class="col-md-3 control-label">接入时间：</label>
        <div class="col-md-3 form-control-static">{{device.regtime | formDate}}</div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">回路状态：</label>
        <div class="col-md-3 form-control-static">{{device.loopcontrol}}</div>
        <label class="col-md-3 control-label">心跳包周期：</label>
        <div class="col-md-3 form-control-static">{{device.heartbeattime}}</div>
      </div>
      <div class="text-center">
        <div @click="goBack" class="default-btn">返回</div>
      </div>
    </div>

  </div>
</template>

<script>
    export default {
        name: 'detailLoopControlPage',
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

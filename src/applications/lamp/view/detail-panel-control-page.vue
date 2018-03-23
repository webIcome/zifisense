<template>
  <div class="content-right">
    <div class="page-title">控制面板详情</div>
    <div class="form-horizontal">
      <div class="form-group">
        <label class="col-md-3 control-label">设备名称：</label>
        <div class="col-md-3 form-control-static">{{device.devicename}}</div>
        <label class="col-md-3 control-label">设备ID：</label>
        <div class="col-md-3 form-control-static">{{device.sn}}</div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">归属组：</label>
        <div class="col-md-3 form-control-static">{{device.groupname}}</div>
        <label class="col-md-3 control-label">按键1模式：</label>
        <div class="col-md-3 form-control-static">{{device.buttonmode1}}</div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">按键2模式：</label>
        <div class="col-md-3 form-control-static">{{device.buttonmode2}}</div>
        <label class="col-md-3 control-label">按键3模式：</label>
        <div class="col-md-3 form-control-static">{{device.buttonmode3}}</div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">地理位置：</label>
        <div class="col-md-3 form-control-static">{{device.position}}</div>
        <label class="col-md-3 control-label">归属企业：</label>
        <div class="col-md-3 form-control-static">{{device.companyname}}</div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">接入时间：</label>
        <div class="col-md-3 form-control-static">{{device.regtime | formDate}}</div>
      </div>
      <div class="text-center">
        <div @click="goBack" class="default-btn">返回</div>
      </div>
    </div>

  </div>
</template>

<script>
    export default {
        name: 'detailPanelControlPage',
        data() {
            return {
                device: {},
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

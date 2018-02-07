<template>
  <div class="content-right">
    <div class="page-title">控制面板详情</div>
    <div class="form-horizontal">
      <div class="form-group">
        <label class="col-md-3 control-label">设备名称：</label>
        <div class="col-md-3">{{device.devicename}}</div>
        <label class="col-md-3 control-label">设备ID：</label>
        <div class="col-md-3">{{device.sn}}</div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">归属组：</label>
        <div class="col-md-3">{{device.group}}</div>
        <label class="col-md-3 control-label">控制模式：</label>
        <div class="col-md-3">{{device.controlmode}}</div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">地理位置：</label>
        <div class="col-md-3">{{device.position}}</div>
        <label class="col-md-3 control-label">归属企业：</label>
        <div class="col-md-3">{{device.companyname}}</div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">接入时间：</label>
        <div class="col-md-3">{{device.regtime}}</div>
        <label class="col-md-3 control-label">运行状态：</label>
        <div class="col-md-3">{{device.runningstate}}</div>
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
            id: '',
            pages: {}
        },
        created: function () {
            this.getDetail(this.id);
        },
        methods: {
            getDetail: function (id) {
                this.$http.post('loopController/getDetailsBySn', {sn: id}).then(res => {
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

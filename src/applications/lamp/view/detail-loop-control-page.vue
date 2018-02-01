<template>
  <div class="content-right">
    <div class="page-title">回路控制器详情</div>
    <div class="form-horizontal">
      <div class="form-group">
        <label class="col-md-3 control-label">设备名称：</label>
        <div class="col-md-3">{{device}}</div>
        <label class="col-md-3 control-label">DI口状态：</label>
        <div class="col-md-3"></div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">设备ID：</label>
        <div class="col-md-3"></div>
        <label class="col-md-3 control-label">三相电压：</label>
        <div class="col-md-3"></div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">归属组：</label>
        <div class="col-md-3"></div>
        <label class="col-md-3 control-label">三相电流：</label>
        <div class="col-md-3"></div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">回路数：</label>
        <div class="col-md-3"></div>
        <label class="col-md-3 control-label">有功电能累加：</label>
        <div class="col-md-3"></div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">地理位置：</label>
        <div class="col-md-3"></div>
        <label class="col-md-3 control-label">无功电能累加：</label>
        <div class="col-md-3"></div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">归属企业：</label>
        <div class="col-md-3"></div>
        <label class="col-md-3 control-label">接入时间：</label>
        <div class="col-md-3"></div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">回路状态：</label>
        <div class="col-md-3"></div>
        <label class="col-md-3 control-label">运行状态：</label>
        <div class="col-md-3"></div>
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
                device: {}
            }
        },
        created: function () {
            this.device = this.$route.params
        },
        methods: {
            goBack: function () {
                this.$router.back();
            },
        }
    }
</script>

<style scoped lang="less">

</style>

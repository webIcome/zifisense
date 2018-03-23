<template>
  <div class="content-right">
    <div class="page-title">灯控器详情</div>
    <div class="form-horizontal">
      <div class="form-group">
        <label class="col-md-3 control-label">设备名称：</label>
        <div class="col-md-3 form-control-static">{{device.devicename}}</div>
        <label class="col-md-3 control-label">电压：</label>
        <div class="col-md-3 form-control-static">{{device.voltage}}</div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">设备ID：</label>
        <div class="col-md-3 form-control-static">{{device.sn}}</div>
        <label class="col-md-3 control-label">电流：</label>
        <div class="col-md-3 form-control-static">{{device.current}}</div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">归属组：</label>
        <div class="col-md-3 form-control-static">{{device.groupname}}</div>
        <label class="col-md-3 control-label">累计电能：</label>
        <div class="col-md-3 form-control-static">{{device.sumpower || 0}} KWH</div>
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
        <div class="col-md-3 form-control-static">{{device.runningstate}}</div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">亮度值：</label>
        <div class="col-md-3 form-control-static">{{device.brightness}}</div>
        <label class="col-md-3 control-label">亮灯时长：</label>
        <div class="col-md-3 form-control-static">{{device.sumlighttime || 0}} 分钟</div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">色温：</label>
        <div class="col-md-3 form-control-static">{{device.colortemp}}</div>
        <label class="col-md-3 control-label">RGB：</label>
        <div class="col-md-3 form-control-static">{{device.rgb}}</div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">电参数上报周期：</label>
        <div class="col-md-3 form-control-static">{{device.elecuploadperiod}} H</div>
        <label class="col-md-3 control-label">传感器使能：</label>
        <div class="col-md-3 form-control-static">{{device.enablesensor | enableSensorNameConverter}}</div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">电源额定电流：</label>
        <div class="col-md-3 form-control-static">{{device.supplycurrent}}</div>
        <label class="col-md-3 control-label">灯具额定电流：</label>
        <div class="col-md-3 form-control-static">{{device.lampcurrent}}</div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">灯具额定电压：</label>
        <div class="col-md-3 form-control-static">{{device.lampvol}}</div>
        <label class="col-md-3 control-label">电源功率因素：</label>
        <div class="col-md-3 form-control-static">{{device.powerfactor}}</div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">电压转化倍率：</label>
        <div class="col-md-3 form-control-static">{{device.voltageratio}}</div>
        <label class="col-md-3 control-label">电压异常比例：</label>
        <div class="col-md-3 form-control-static">{{device.volabratio}}</div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">电流转化倍率：</label>
        <div class="col-md-3 form-control-static">{{device.volabratio}}</div>
        <label class="col-md-3 control-label">电流转化倍率：</label>
        <div class="col-md-3 form-control-static">{{device.curratio}}</div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">电流异常比例：</label>
        <div class="col-md-3 form-control-static">{{device.curabratio}}</div>
        <label class="col-md-3 control-label">灯具故障检测开启标志：</label>
        <div class="col-md-3 form-control-static">{{device.lampfault | signNameConverter}}</div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">电源故障检测开启标志：</label>
        <div class="col-md-3 form-control-static">{{device.supplyfault | signNameConverter}}</div>
        <label class="col-md-3 control-label">电源功率故障检测开启标志：</label>
        <div class="col-md-3 form-control-static">{{device.powerfactorfault | signNameConverter}}</div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">过压检测开启标志：</label>
        <div class="col-md-3 form-control-static">{{device.overvoltage | signNameConverter}}</div>
        <label class="col-md-3 control-label">欠压检测开启标志：</label>
        <div class="col-md-3 form-control-static">{{device.undervoltage | signNameConverter}}</div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">过流检测开启标志：</label>
        <div class="col-md-3 form-control-static">{{device.overcurrent | signNameConverter}}</div>
        <label class="col-md-3 control-label">欠流检测开启标志：</label>
        <div class="col-md-3 form-control-static">{{device.undercurrent | signNameConverter}}</div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">温度异常检测开启标志：</label>
        <div class="col-md-3 form-control-static">{{device.tempfault | signNameConverter}}</div>
        <label class="col-md-3 control-label">温度告警阈值：</label>
        <div class="col-md-3 form-control-static">{{device.tempthres}}</div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">灯具类型名：</label>
        <div class="col-md-3 form-control-static">{{device.lampType}}</div>
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

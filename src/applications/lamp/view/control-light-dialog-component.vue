<template>
  <div class="icon-item">
    <span @click="dialogControlDevice" class="set-icon"></span>
    <el-dialog title="控制灯控器" :visible.sync="controlDeviceDialogVisible" center :width="'650px'">
      <el-form label-width="220px" :model="operData" ref="controlDevice" :rules="Rules" class="el-form-default">
        <el-form-item label="指令选择：" prop="controltype">
          <div>
            <el-radio v-model="operData.controltype" :label='1'>开灯</el-radio>
          </div>
          <div>
            <el-radio v-model="operData.controltype" :label='2'>关灯</el-radio>
          </div>
          <div style="position: relative">
            <el-radio v-model="operData.controltype" :label='3'>调节亮度</el-radio>
          </div>
          <div>
            <el-radio v-model="operData.controltype" :label='4'>状态读取</el-radio>
          </div>
          <div style="position: relative">
            <el-radio v-model="operData.controltype" :label='5'>下发策略</el-radio>
          </div>
          <div style="position: relative">
            <el-radio v-model="operData.controltype" :label='6'>调节色温</el-radio>
          </div>
          <div style="position: relative">
            <el-radio v-model="operData.controltype" label=7>调节RGB</el-radio>
          </div>
          <div>
            <el-radio v-model="operData.controltype" :label='8'>故障阈值设置</el-radio>
          </div>
          <div>
            <el-radio v-model="operData.controltype" :label='9'>故障阈值查询</el-radio>
          </div>
          <div>
            <el-radio v-model="operData.controltype" :label='10'>故障使能</el-radio>
          </div>
          <div>
            <el-radio v-model="operData.controltype" :label='11'>故障使能查询</el-radio>
          </div>
          <div>
            <el-radio v-model="operData.controltype" :label='12'>电参数上报周期设置</el-radio>
          </div>
          <div>
            <el-radio v-model="operData.controltype" :label='13'>电能累计清零</el-radio>
          </div>
          <div>
            <el-radio v-model="operData.controltype" :label='14'>亮灯时长累计清零</el-radio>
          </div>
          <div>
            <el-radio v-model="operData.controltype" :label='15'>传感器使能</el-radio>
          </div>
          <div>
            <el-radio v-model="operData.controltype" :label='16'>感应亮度设置</el-radio>
          </div>
          <div>
            <el-radio v-model="operData.controltype" :label='17'>感应色温设置</el-radio>
          </div>
          <div>
            <el-radio v-model="operData.controltype" :label='18'>感应RGB设置</el-radio>
          </div>
        </el-form-item>
        <el-form-item v-if="operData.controltype == 5" label="策略：" prop="strategyid">
          <select-strategy-component v-model="operData.strategyid"
                                     :strategyName="operData.strategyname"
                                     :companyId="device.companyid"
                                     @strategyname="operData.strategyname = arguments[0]"
                                     :moduletype="moduleType.light"></select-strategy-component>
        </el-form-item>
        <el-form-item v-if="operData.controltype == 3" label="亮度：">
          <el-slider v-model="operData.brightness"></el-slider>
        </el-form-item>
        <el-form-item v-if="operData.controltype == 7" label="RGB：" prop="rgb">
          <el-input type="color" v-model="operData.rgb"/>
        </el-form-item>
        <el-form-item v-if="operData.controltype == 6" label="色温：" prop="colortemp">
          <el-slider v-model="operData.colortemp">
          </el-slider>
        </el-form-item>
        <template v-if="operData.controltype == 8">
          <el-form-item label="电源额定电流：" prop="supplycurrent">
            <el-input type="text" v-model.number="operData.supplycurrent"></el-input>
          </el-form-item>
          <el-form-item label="灯具额定电流：" prop="lampcurrent">
            <el-input type="text" v-model.number="operData.lampcurrent"></el-input>
          </el-form-item>
          <el-form-item label="灯具额定电压：" prop="lampvol">
            <el-input type="text" v-model.number="operData.lampvol"></el-input>
          </el-form-item>
          <el-form-item label="电源功率因素：" prop="powerfactor">
            <el-input type="text" v-model.number="operData.powerfactor"></el-input>
          </el-form-item>
          <el-form-item label="电压转化倍率：" prop="voltageratio">
            <el-input type="text" v-model.number="operData.voltageratio"></el-input>
          </el-form-item>
          <el-form-item label="电压异常比例：" prop="volabratio">
            <el-input type="text" v-model.number="operData.volabratio"></el-input>
          </el-form-item>
          <el-form-item label="电流转化倍率：" prop="curratio">
            <el-input type="text" v-model.number="operData.curratio"></el-input>
          </el-form-item>
          <el-form-item label="电流异常比例：" prop="curabratio">
            <el-input type="text" v-model.number="operData.curabratio"></el-input>
          </el-form-item>
          <el-form-item label="温度告警阈值：" prop="tempthres">
            <el-input type="text" v-model.number="operData.tempthres"></el-input>
          </el-form-item>
        </template>
        <template v-if="operData.controltype == 10">
          <el-form-item label="灯具故障检测开启标志：" prop="lampfault">
            <el-radio v-model="operData.lampfault" :label='1'>开启</el-radio>
            <el-radio v-model="operData.lampfault" :label='2'>关闭</el-radio>
          </el-form-item>
          <el-form-item label="电源故障检测开启标志：" prop="supplyfault">
            <el-radio v-model="operData.supplyfault" :label='1'>开启</el-radio>
            <el-radio v-model="operData.supplyfault" :label='2'>关闭</el-radio>
          </el-form-item>
          <el-form-item label="功率故障检测开启标志：" prop="powerfactorfault">
            <el-radio v-model="operData.powerfactorfault" :label='1'>开启</el-radio>
            <el-radio v-model="operData.powerfactorfault" :label='2'>关闭</el-radio>
          </el-form-item>
          <el-form-item label="过压检测开启标志：" prop="overvoltage">
            <el-radio v-model="operData.overvoltage" :label='1'>开启</el-radio>
            <el-radio v-model="operData.overvoltage" :label='2'>关闭</el-radio>
          </el-form-item>
          <el-form-item label="欠压检测开启标志：" prop="undervoltage">
            <el-radio v-model="operData.undervoltage" :label='1'>开启</el-radio>
            <el-radio v-model="operData.undervoltage" :label='2'>关闭</el-radio>
          </el-form-item>
          <el-form-item label="过流检测开启标志：" prop="overcurrent">
            <el-radio v-model="operData.overcurrent" :label='1'>开启</el-radio>
            <el-radio v-model="operData.overcurrent" :label='2'>关闭</el-radio>
          </el-form-item>
          <el-form-item label="欠流检测开启标志：" prop="undercurrent">
            <el-radio v-model="operData.undercurrent" :label='1'>开启</el-radio>
            <el-radio v-model="operData.undercurrent" :label='2'>关闭</el-radio>
          </el-form-item>
          <el-form-item label="温度异常检测开启标志：" prop="tempfault">
            <el-radio v-model="operData.tempfault" :label='1'>开启</el-radio>
            <el-radio v-model="operData.tempfault" :label='2'>关闭</el-radio>
          </el-form-item>
        </template>
        <el-form-item v-if="operData.controltype == 12" label="电参数上报周期：" prop="elecuploadperiod">
          <el-input style="width: 200px" type="text" v-model.number="operData.elecuploadperiod"></el-input> H
        </el-form-item>
        <el-form-item v-if="operData.controltype == 15" label="传感器使能：" prop="enablesensor">
          <el-radio v-model="operData.enablesensor" :label='1'>有效</el-radio>
          <el-radio v-model="operData.enablesensor" :label='2'>无效</el-radio>
        </el-form-item>
        <el-form-item v-if="operData.controltype == 15 && operData.enablesensor == 1" label="感应保持状态时间：" prop="inducedkeeptime">
          <el-input type="text" v-model.number="operData.inducedkeeptime"></el-input>
        </el-form-item>
        <template  v-if="operData.controltype == 16">
          <el-form-item label="有感应亮度：" prop="inducedbrightness">
            <el-slider v-model="operData.inducedbrightness">
            </el-slider>
          </el-form-item>
          <el-form-item label="无感应亮度：" prop="noinducedbrightness">
            <div>
              <el-radio v-model="noinducedbrightness" :label='0'>关灯</el-radio>
            </div>
            <div>
              <el-radio v-model="noinducedbrightness" :label='1'>亮度</el-radio>
              <el-slider v-if="noinducedbrightness == 1" v-model="operData.noinducedbrightness"></el-slider>
            </div>
          </el-form-item>
        </template>
        <template  v-if="operData.controltype == 17">
          <el-form-item label="有感应色温：" prop="inducedcolortemp">
            <el-slider v-model="operData.inducedcolortemp">
            </el-slider>
          </el-form-item>
          <el-form-item label="无感应色温：" prop="noinducedcolortemp">
            <el-slider v-model="operData.noinducedcolortemp">
            </el-slider>
          </el-form-item>
        </template>
        <template  v-if="operData.controltype == 18">
          <el-form-item label="有感应rgb：" prop="inducedrgb">
            <el-input type="color" v-model.number="operData.inducedrgb"></el-input>
          </el-form-item>
          <el-form-item label="无感应rgb：" prop="noinducedrgb">
            <el-input type="color" v-model.number="operData.noinducedrgb"></el-input>
          </el-form-item>
        </template>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="controlDevice('controlDevice')">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
    import Services from "../services";
    import selectStrategyComponent from "./select-strategy-component.vue";
    import CommonContent from "../../../constants/common";
    export default {
        name: 'controlLightDialogComponent',
        components: {selectStrategyComponent},
        data() {
            return {
                controlDeviceDialogVisible: false,
                operData: {
                    controltype: 1,
                    brightness: '',
                    strategyid: '',
                },
                noinducedbrightness: 0,
                moduleType: {}
            }
        },
        props: {
            device: {
                default: {},
                type: Object
            }
        },
        computed: {
            Rules: function () {
                let rules = {
                    controltype: [
                        {required: true, message: '请选择指令'}
                    ],
                };
                switch (this.operData.controltype) {
                    case 5:
                        rules.strategyid = [
                            {required: true, message: '请选择策略'}
                        ];
                        break;
                    case 6:
                        rules.colortemp = [
                            {required: true, message: '请选择色温'}
                        ];
                        break;
                    case 7:
                        rules.rgb = [
                            {required: true, message: '请选择颜色'}
                        ];
                        break;
                    case 8:
                        rules.supplycurrent = [
                            {required: true, message: '请输入电源额定电流'},
                            {type: 'number', message: '范围0~25.5',min: 0, max: 25.5}
                        ];
                        rules.lampcurrent = [
                            {required: true, message: '请输入灯具额定电流'},
                            {type: 'number', message: '范围0~25.5',min: 0, max: 25.5}
                        ];
                        rules.lampvol = [
                            {required: true, message: '请输入灯具额定电压'},
                            {type: 'number', message: '范围0~330',min: 0, max: 330}
                        ];
                        rules.powerfactor = [
                            {required: true, message: '请输入电源功率因素'},
                            {type: 'number', message: '范围0.1~1',min: 0.1, max: 1}
                        ];
                        rules.voltageratio = [
                            {required: true, message: '请输入电压转化倍率'},
                            {type: 'number', message: '范围0~25.5',min: 0, max: 25.5}
                        ];
                        rules.volabratio = [
                            {required: true, message: '请输入电压异常比例'},
                            {type: 'number', message: '范围0~255',min: 0, max: 255}
                        ];
                        rules.curratio = [
                            {required: true, message: '请输入电流转化倍率'},
                            {type: 'number', message: '范围0~25.5',min: 0, max: 25.5}
                        ];
                        rules.curabratio = [
                            {required: true, message: '请输入电流异常比例'},
                            {type: 'number', message: '范围0~255',min: 0, max: 255}
                        ];
                        rules.tempthres = [
                            {required: true, message: '请输入温度告警阀值'},
                            {type: 'number', message: '范围0~255',min: 0, max: 255}
                        ];
                        break;
                    case 10:
                        rules.lampfault = [
                            {required: true, message: '请选择灯具故障检测开启标志'}
                        ];
                        rules.supplyfault = [
                            {required: true, message: '请选择电源故障检测开启标志'}
                        ];
                        rules.powerfactorfault = [
                            {required: true, message: '请选择电源功率故障检测开启标志'}
                        ];
                        rules.overvoltage = [
                            {required: true, message: '请选择过压检测开启标志'}
                        ];
                        rules.undervoltage = [
                            {required: true, message: '请选择欠压检测开启标志'}
                        ];
                        rules.overcurrent = [
                            {required: true, message: '请选择过流检测开启标志'}
                        ];
                        rules.undercurrent = [
                            {required: true, message: '请选择欠流检测开启标志'}
                        ];
                        rules.tempfault = [
                            {required: true, message: '请选择温度异常检测开启标志'}
                        ];
                        break;
                    case 12:
                        rules.elecuploadperiod = [
                            {required: true, message: '请输入电参数上报周期'},
                            {type: 'number', message: '范围0~255',min: 0, max: 255}
                        ];
                        break;
                    case 15:
                        rules.enablesensor = [
                            {required: true, message: '请选择传感器使能'}
                        ];
                        if (this.operData.enablesensor == 1) {
                            rules.inducedkeeptime = [
                                {required: true, message: '请输入感应保持状态时间'},
                                {type: 'number', message: '范围0~255',min: 0, max: 255}
                            ];
                        }
                        break;
                    case 16:
                        rules.inducedbrightness = [
                            {required: true, message: '有感应亮度不能为空'},
                        ];
                       /* rules.noinducedbrightness = [
                            {required: true, message: '无感应亮度不能为空'},
                        ];*/
                        break;
                    case 17:
                        rules.inducedcolortemp = [
                            {required: true, message: '有感应色温不能为空'},
                        ];
                        rules.noinducedcolortemp = [
                            {required: true, message: '无感应色温不能为空'},
                        ];
                        break;
                  /*  case 18:
                        rules.inducedrgb = [
                            {required: true, message: '有感应色温不能为空'},
                        ];
                        rules.noinducedrgb = [
                            {required: true, message: '无感应色温不能为空'},
                        ];
                        break;*/
                    default:
                        break;

                }
                return rules;
            }
        },
        created: function () {
            this.initData()
        },
        methods: {
            initData: function () {
                CommonContent.deviceType.forEach(item => {
                    this.moduleType[item.name] = item.value;
                })
            },
            dialogControlDevice: function () {
                this.resetData();
                this.controlDeviceDialogVisible = true;
            },
            controlDevice: function (formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        let data = this.transformData(this.operData);
                        if (this.device.deviceid) {
                            data.deviceid = this.device.deviceid;
                            Services.controlLightSingle(data).then(res => {
                                this.hideModal();
                            });

                        } else {
                            data.groupid = this.device.objectid;
                            Services.controlLightGroup(data).then(res => {
                                this.hideModal();
                            })
                        }
                    }
                })
            },
            transformData: function (data) {
                if (data.controltype == 7) {
                    if (!data.rgb) {
                        data.rgb = '#000000'
                    }
                    data.rgb = this.$common.colorRgb(data.rgb);
                } else if (data.controltype == 16) {
                    if (this.noinducedbrightness == 0) {
                        data.noinducedbrightness = 255
                    }
                } else if (data.controltype == 18) {
                    if (!data.inducedrgb) {
                        data.inducedrgb = '#000000'
                    }
                    if (!data.noinducedrgb) {
                        data.noinducedrgb = '#000000'
                    }
                    data.inducedrgb = this.$common.colorRgb(data.inducedrgb);
                    data.noinducedrgb = this.$common.colorRgb(data.noinducedrgb);
                }
                return data
            },
            hideModal: function () {
                this.controlDeviceDialogVisible = false;
            },
            resetData: function () {
                this.operData = {
                    brightness: '',
                    strategyid: '',
                    controltype: 1,
                };
            }

        }
    }
</script>

<style scoped lang="less">
</style>

<template>
  <div class="icon-item">
    <span @click="dialogControlDevice" class="set-icon"></span>
    <el-dialog title="控制灯控器" :visible.sync="controlDeviceDialogVisible" center :width="'650px'">
      <el-form label-width="120px" :model="operData" ref="controlDevice" :rules="Rules" class="el-form-default">
        <el-form-item label="指令选择：" prop="controltype">
          <div>
            <el-radio v-model="operData.controltype" :label='1'>开灯</el-radio>
          </div>
          <div>
            <el-radio v-model="operData.controltype" :label='2'>关灯</el-radio>
          </div>
          <div style="position: relative">
            <el-radio v-model="operData.controltype" :label='3'>调节亮度</el-radio>
            <div v-if="operData.controltype == 3" style="position: absolute; width: 300px; right: 0; top: 5px">
              <el-slider v-model="operData.brightness" show-input></el-slider>
            </div>
          </div>
          <div>
            <el-radio v-model="operData.controltype" :label='4'>状态读取</el-radio>
          </div>
          <div style="position: relative">
            <el-radio v-model="operData.controltype" :label='5'>下发策略</el-radio>
            <div v-if="operData.controltype == 5" style="position: absolute; width: 300px; right: 0; top: 5px">
              <select-strategy-component v-model="operData.strategyid" :strategyName="operData.strategyname"
                                        :componyid="operData.componyid"
                                         :modultype="moduleType.light"></select-strategy-component>
            </div>
          </div>
          <div style="position: relative">
            <el-radio v-model="operData.controltype" :label='6'>色温</el-radio>
            <div v-if="operData.controltype == 6" style="position: absolute; width: 300px; right: 0; top: 5px">
              <el-slider v-model="operData.temperature" show-input>
              </el-slider>
            </div>
          </div>
          <div style="position: relative">
            <el-radio v-model="operData.controltype" label=7>RGB</el-radio>
            <div v-if="operData.controltype == 7" style="position: absolute; width: 300px; right: 0; top: 5px">
              <el-input type="color" v-model="operData.rgb"/>
            </div>
          </div>
        </el-form-item>
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
                Rules: {
                    controltype: [
                        {required: true, message: '请选择指令'}
                    ],
                    strategyid: [
                        {required: true, message: '请选择策略', trigger: 'change'}
                    ],
                    rgb: [
                        {required: true, message: '请选择颜色', trigger: 'change'}
                    ],
                },
                operData: {
                    controltype: 1,
                    brightness: '',
                    strategyid: ''
                },
                moduleType: {}
            }
        },
        props: {
            device: {
                default: {},
                type: Object
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
                        if (this.device.groupid) {
                            this.operData.groupid = this.device.groupid;
                            Services.controlLightGroup(this.operData).then(res => {
                                this.hideModal();
                            })
                        } else {
                            this.operData.deviceid = this.device.deviceid;
                            Services.controlLightSingle(this.operData).then(res => {
                                this.hideModal();
                            });
                        }
                    }
                })
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

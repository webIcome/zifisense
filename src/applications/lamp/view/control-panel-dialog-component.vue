<template>
  <div class="icon-item">
    <span @click="dialogControlDevice" class="set-icon"></span>
    <el-dialog title="控制控制面板" :visible.sync="controlDeviceDialogVisible" center :width="'600px'">
      <el-form label-width="170px" :model="operData"  ref="controlDevice">
        <el-form-item label="模式选择：" prop="StrategyID">
          <el-radio-group v-model="operData.controltype">
            <el-radio-button :label="1">普通模式</el-radio-button>
            <el-radio-button :label="2">情景模式</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <template v-if="operData.controltype != 1">
          <el-form-item label="面板按钮：" prop="StrategyID">
            <el-radio-group v-model="operData.button" @change="selectBtn">
              <el-radio-button :label="1">按钮1</el-radio-button>
              <el-radio-button :label="2">按钮2</el-radio-button>
              <el-radio-button :label="3">按钮3</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="情景模式：" prop="StrategyID">
            <select-strategy-component v-model="operData.strategyid" :strategyName="operData.strategyname"
                                       :componyid="operData.componyid"
                                       :modultype="moduleType.panel"></select-strategy-component>
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
    import selectScenarioComponent from "./select-Scenario-component.vue";
    import CommonContent from "../../../constants/common";
    export default {
        name: 'controlPanelDialogComponent',
        components: {selectScenarioComponent},
        data() {
            return {
                controlDeviceDialogVisible: false,
                Rules: {
                    controltype: [
                        {required: true, message: '请选择指令'}
                    ],
                },
                operData: {
                    controltype: 1,
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
            selectBtn: function (btn) {
               /* let scenarioId;
                let scenarioName;
                switch (btn){
                    case 1:
                        scenarioName = this.device.buttonmode1;
                        scenarioId = this.device.buttonmodeid1;
                        break;
                    case 2:
                        scenarioName = this.device.buttonmode2;
                        scenarioId = this.device.buttonmodeid2;
                        break;
                    case 3:
                        scenarioName = this.device.buttonmode3;
                        scenarioId = this.device.buttonmodeid3;
                        break;
                }
                let defaultData;
                if (scenarioName != "普通模式") {
                    defaultData = {scenarioid: scenarioId, scenarioname: scenarioName}
                }
                this.operData = Object.assign({},this.operData,defaultData)*/
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
                            Services.controlPanelGroup(this.operData).then(res => {
                                this.hideModal();
                            })
                        } else {
                            this.operData.deviceid = this.device.deviceid;
                            Services.controlPanelSingle(this.operData).then(res => {
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

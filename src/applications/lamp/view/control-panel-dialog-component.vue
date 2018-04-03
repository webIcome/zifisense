<template>
  <div class="icon-item">
    <span @click="dialogControlDevice" class="set-icon"></span>
    <el-dialog title="控制控制面板" :visible.sync="controlDeviceDialogVisible" center :width="'600px'">
      <el-form label-width="170px" :model="operData" :rules="Rules"  ref="controlDevice">
        <el-form-item label="模式选择：" prop="controltype">
          <el-radio-group v-model="operData.controltype">
            <el-radio-button :label="1">普通模式</el-radio-button>
            <el-radio-button :label="2">情景模式</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <template v-if="operData.controltype != 1">
          <el-form-item label="面板按钮：" prop="button">
            <el-radio-group v-model="operData.button" @change="selectBtn">
              <el-radio-button :label="1">按钮1</el-radio-button>
              <el-radio-button :label="2">按钮2</el-radio-button>
              <el-radio-button :label="3">按钮3</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="情景模式：" prop="scenarioid">
            <select-scenario-component v-model="operData.scenarioid"
                                       :scenarioname="operData.scenarioname"
                                       @scenarioname="operData.scenarioname=arguments[0]"
                                       :componyid="device.componyid"></select-scenario-component>
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
        computed: {
            Rules: function () {
                let rules = {
                    controltype: [
                        {required: true, message: '请选择模式'}
                    ],
                }
                if (this.operData.controltype !=1) {
                    rules.scenarioid = [
                        {required: true, message: '请选择模式'}
                    ];
                    rules.button = [
                        {required: true, message: '请选择按钮'}
                    ];
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
                        if (this.device.deviceid) {
                            this.operData.deviceid = this.device.deviceid;
                            Services.controlPanelSingle(this.operData).then(res => {
                                this.hideModal();
                            });
                        } else if(this.device.groupname) {
                            this.operData.groupid = this.device.objectid;
                            Services.controlPanelGroup(this.operData).then(res => {
                                this.hideModal();
                            })
                        }else if(this.device.areaname) {
                            this.operData.areaid = this.device.objectid;
                            Services.controlPanelArea(this.operData).then(res => {
                                this.hideModal();
                            })
                        }
                    }
                })
            },
            hideModal: function () {
                this.controlDeviceDialogVisible = false;
            },
            resetData: function () {
                this.operData = {
                    button: '',
                    scenarioid: '',
                    controltype: 1,
                };
            }

        }
    }
</script>

<style scoped lang="less">

</style>

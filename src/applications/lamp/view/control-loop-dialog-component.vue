<template>
  <div class="icon-item">
    <span @click="dialogControlDevice" class="set-icon"></span>
    <el-dialog title="控制回路控制器" :visible.sync="controlDeviceDialogVisible" center :width="'650px'">
      <el-form label-width="170px" :model="operData"  ref="controlDevice" class="el-form-default">
        <el-form-item label="指令选择：" prop="controltype">
          <div>
            <el-radio v-model="operData.controltype" :label="1">开关</el-radio>
          </div>
          <div>
            <el-radio v-model="operData.controltype" :label="2">读取DI口</el-radio>
          </div>
          <div>
            <el-radio v-model="operData.controltype" :label="3">抄表</el-radio>
          </div>
          <div>
            <el-radio v-model="operData.controltype" :label="4">下发策略</el-radio>
            <div v-if="operData.controltype == 4" style="display: inline-block">
              <select-strategy-component v-model="operData.strategyid" :strategyName="operData.strategyname"
                                         :componyid="operData.componyid"
                                         :modultype="moduleType.loop"></select-strategy-component>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="控制回路：" prop="loop">
          <template v-for="(item,index) in selectedLoops" >
            <div style="margin-bottom: 10px">
             <!-- <el-select style="width: 100px; margin-right: 10px" v-model="item.number">
                <el-option v-for="loop in loopNumber" :key="loop" :value="loop" :label="loop"></el-option>
              </el-select>-->
              <el-input style="width: 100px; margin-right: 10px" v-model="item.number"></el-input>
              <div style="display: inline-block;" v-if="operData.controltype==1">
                <el-radio v-model="item.switch" :label='1'>开</el-radio>
                <el-radio v-model="item.switch" :label='2'>关</el-radio>
              </div>
              <i title="删除回路" class="el-icon-remove-outline" style="vertical-align: middle;margin-left: 20px;cursor: pointer" @click="deleteLoop(index)"></i>
            </div>
          </template>
          <div style="margin-top: 20px">
            <el-button type="primary" @click="addLoop">添加回路</el-button>
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
        name: 'controlLoopDialogComponent',
        components: {selectStrategyComponent},
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
                    strategyid: '',
                },
                selectedLoops: [],
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
           loopNumber: function () {
               return this.device.loop
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
                        let data = {};
                        data.deviceid = this.operData.deviceid;
                        data.controltype = this.operData.controltype;
                        if (data.controltype == 4) {
                            data.strategyid = this.operData.strategyid;
                        }
                        if (data.controltype == 1) {
                            data.switch = this.selectedLoops.map(item => {
                                return item.switch
                            }).join()
                        }
                        data.loop = this.selectedLoops.map(item => {
                            return item.number;
                        }).join();
                        if (this.device.groupid) {
                            data.groupid = this.device.groupid;
                            Services.controlLoopGroup(data).then(res => {
                                this.hideModal();
                            })
                        } else {
                            data.deviceid = this.device.deviceid;
                            Services.controlLoopSingle(data).then(res => {
                                this.hideModal();
                            });
                        }
                    }
                })
            },
            addLoop: function () {
                /*if (this.selectedLoops.length < this.loopNumber) {
                    this.selectedLoops.push({switch: 1, number: this.selectedLoops.length + 1})
                } else {
                    this.$message({
                        message: '不能大于回路控制器的回路数',
                        type: 'warning',
                    })
                }*/
                this.selectedLoops.push({switch: 1, number: this.selectedLoops.length + 1})
            },
            deleteLoop: function (index) {
                this.selectedLoops.splice(index, 1)
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

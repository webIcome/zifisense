<template>
  <div class="icon-item">
    <span @click="dialogControlDevice" class="set-icon"></span>
    <el-dialog title="控制回路控制器" :visible.sync="controlDeviceDialogVisible" center :width="'650px'">
      <el-form label-width="170px" :model="operData" :rules="Rules"  ref="controlDevice" class="el-form-default">
        <el-form-item label="指令选择：" prop="controltype">
          <div>
            <el-radio v-model="operData.controltype" :label="1">开关</el-radio>
          </div>
          <div>
            <el-radio v-model="operData.controltype" :label="2">读取所有线路</el-radio>
          </div>
          <div>
            <el-radio v-model="operData.controltype" :label="3">读取电流</el-radio>
          </div>
          <div>
            <el-radio v-model="operData.controltype" :label="4">抄表</el-radio>
          </div>
          <div>
            <el-radio v-model="operData.controltype" :label="5">下发策略</el-radio>
            <el-form-item v-if="operData.controltype == 5" style="display: inline-block"  prop="strategyid">
              <select-strategy-component v-model="operData.strategyid"
                                         :strategyName="operData.strategyname"
                                         :companyId="device.companyid"
                                         @strategyname="operData.strategyname = arguments[0]"
                                         :moduletype="moduleType.loop"></select-strategy-component>
            </el-form-item>
          </div>
          <div>
            <el-radio v-model="operData.controltype" :label="6">设置心跳包周期</el-radio>
            <el-form-item v-if="operData.controltype == 6" style="display: inline-block; width: 100px;margin-left: 10px"  prop="heartperiod">
              <el-input type="text" v-model.number="operData.heartperiod"></el-input> 分钟
            </el-form-item>
          </div>
        </el-form-item>
        <el-form-item v-if="operData.controltype == 1" label="控制回路：" prop="loop">
          <template v-for="(item,index) in selectedLoops" >
            <div style="margin-bottom: 10px">
              <el-input style="width: 100px; margin-right: 10px" v-model="item.number"></el-input>
              <div style="display: inline-block;" v-if="operData.controltype==1">
                <el-radio v-model="item.switchtype" :label='1'>开</el-radio>
                <el-radio v-model="item.switchtype" :label='2'>关</el-radio>
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
            Rules: function () {
                let rules = {
                    controltype: [
                        {required: true, message: '请选择指令'}
                    ]
                };
                if (this.operData.controltype == 1) {
                    rules.loop = [
                        {required: true, message: '添加回路'}
                    ]
                }
                if (this.operData.controltype ==5) {
                    rules.strategyid = [
                        {required: true, message: '请选择策略'}
                    ];
                }
                if (this.operData.controltype ==6) {
                    rules.heartperiod = [
                        {required: true, message: '请输入周期'},
                        {type:'number',min: 0,max: 65535, message: '范围0~65535'}
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
                        } else if (data.controltype == 1) {
                            data.switchtype = this.selectedLoops.map(item => {
                                return item.switchtype
                            }).join()
                        } else if (data.controltype == 6) {
                            data.heartperiod = this.operData.heartperiod;
                        }
                        data.loop = this.operData.loop;
                        if (this.device.deviceid) {
                            data.deviceid = this.device.deviceid;
                            Services.controlLoopSingle(data).then(res => {
                                this.hideModal();
                            });

                        } else {
                            data.groupid = this.device.objectid;
                            Services.controlLoopGroup(data).then(res => {
                                this.hideModal();
                            })
                        }
                    }
                })
            },
            addLoop: function () {
                this.selectedLoops.push({switchtype: 1, number: this.selectedLoops.length + 1});
                this.operData.loop = this.selectedLoops.map(item => {
                    return item.number;
                }).join();
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

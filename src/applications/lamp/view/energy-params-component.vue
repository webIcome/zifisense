<template>
  <div>
    <el-form label-width="210px" :model="searchParams" :rules="Rules" ref="search" class="el-form-default"
             style="padding: 0 200px;" :validate-on-rule-change="false">
      <el-form-item label="请选择设备类型：" prop="moduletype">
        <el-radio v-model="searchParams.moduletype" :label="1">灯控器</el-radio>
        <el-radio v-model="searchParams.moduletype" :label="2">回路控制器</el-radio>
      </el-form-item>
      <el-form-item label="请选择统计单位：" prop="statisticalway">
        <el-radio v-model="searchParams.statisticalway" :label="units.device">单个设备</el-radio>
        <el-radio v-model="searchParams.statisticalway" :label="units.group">组</el-radio>
        <el-radio v-model="searchParams.statisticalway" :label="units.area">区域</el-radio>
        <el-radio v-model="searchParams.statisticalway" :label="units.company">企业</el-radio>
      </el-form-item>
      <el-form-item v-if="searchParams.statisticalway != units.company" label="所属企业：" prop="companyid">
        <tree-select-component style="width: 300px" v-model="searchParams.companyid"
                               :list="companies"></tree-select-component>
      </el-form-item>
      <el-form-item label="参与统计的相关单位：" prop="according">
        <edit-energy-unit-component v-model="searchParams.according"
                                    :statisticalway="searchParams.statisticalway"
                                    :companyid="searchParams.companyid"
                                    :moduletype="searchParams.moduletype"></edit-energy-unit-component>
      </el-form-item>
      <el-form-item label="情景类别：" required>
        <el-row type="flex" justify="space-between">
          <el-col>
            <el-form-item prop="timetype">
              <el-select v-model="searchParams.timetype" placeholder="请选择类型跨度" clearable>
                <el-option v-for="item in sceneCategory" :key="item.value" :value="item.value"
                           :label="item.text"></el-option>
              </el-select>
            </el-form-item>

          </el-col>
          <span style="margin: 0 10px">从</span>
          <el-col>
            <el-form-item  prop="starttime">
              <el-date-picker :disabled="!searchParams.timetype" v-model="searchParams.starttime"
                              :picker-options="startTimeOptions" :value-format="dateFormat" :type="dateType" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
          <span style="margin: 0 10px;">到</span>
          <el-col>
            <el-form-item prop="endtime">
              <el-date-picker :disabled="!searchParams.timetype" v-model="searchParams.endtime"
                              :picker-options="endTimeOptions" :value-format="dateFormat" :type="dateType" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <div style="margin-top: 20px; color: #ccc;font-size: 14px">按月统计时，时间范围必须在同一年内；按日统计时，时间范围必须在同一个月内</div>

      </el-form-item>
      <div class="text-center" style="margin: 100px">
        <el-button style="width: 200px; font-size: 18px" type="primary" @click="search('search')">确 定</el-button>
      </div>
    </el-form>

  </div>
</template>

<script>
    import Config from "../../../config";
    import Services from "../services";
    import editEnergyUnitComponent from "./edit-energy-unit-component.vue";
    import moment from 'moment';
    export default {
        name: 'energyParamsComponent',
        components: {editEnergyUnitComponent},
        data() {
            return {
                selectDeviceDialogVisible: false,
                selectGroupDialogVisible: false,
                selectAreaDialogVisible: false,
                selectCompanyDialogVisible: false,
                searchParams: {
                    moduletype: '',
                    statisticalway: '',
                    according: '',
                    timetype: '',
                    starttime: '',
                    endtime: ''
                },
                companies: [],
                sceneCategory: [
                    {value: 1, text: '年'},
                    {value: 2, text: '月'},
                    {value: 3, text: '日'},
                ],
                defaultPaging: {
                    pageSize: Config.DEFAULT_PAGE_SIZE,
                    pageNum: 1
                },
                units: {
                    device: 1,
                    group: 2,
                    area: 3,
                    company: 4
                },
            }
        },
        props: {},
        computed: {
            Rules: function () {
                let rules = {
                    moduletype: [
                        {required: true, message: '请选择类型'}
                    ],
                    statisticalway: [
                        {required: true, message: '请选择统计单位'}
                    ],
                    according: [
                        {required: true, message: '请选择相关单位'}
                    ],
                    timetype: [
                        {required: true, message: '请选择情景类别'}
                    ],
                    starttime: [
                        {required: true, message: '请选择起始时间'}
                    ],
                    endtime: [
                        {required: true, message: '请选择结束时间'}
                    ],
                };
                if (this.searchParams.statisticalway != this.units.company) {
                    rules.companyid = [
                        {required: true, message: '请选择企业'}
                    ]
                }
                return rules;
            },
            startTimeOptions: function () {
                let endTime = this.searchParams.endtime;
                if (endTime) {
                    if (this.searchParams.timetype == 3) {
                        return {
                            disabledDate(time) {
                                return time.getTime() >= moment(endTime) || time.getTime() < moment(endTime).startOf('month');
                            }
                        }
                    } else if (this.searchParams.timetype == 2) {
                        return {
                            disabledDate(time) {
                                return time.getTime() >= moment(endTime).startOf('month') || time.getTime() < moment(endTime).startOf('year');
                            }
                        }
                    } else {
                        return {
                            disabledDate(time) {
                                return time.getTime() >= moment(endTime);
                            }
                        }
                    }
                }

            },
            endTimeOptions: function () {
                let startTime = this.searchParams.starttime;
                if (startTime) {
                    if (this.searchParams.timetype == 3) {
                        return {
                            disabledDate(time) {
                                return time.getTime() <= moment(startTime) || time.getTime() > moment(startTime).endOf('month');
                            }
                        }
                    } else if (this.searchParams.timetype == 2) {
                        return {
                            disabledDate(time) {
                                return time.getTime() < moment(startTime).endOf('month') || time.getTime() > moment(startTime).endOf('year');
                            }
                        }
                    } else {
                        return {
                            disabledDate(time) {
                                return time.getTime() < moment(startTime);
                            }
                        }
                    }
                }

            },
            dateFormat: function () {
                if (this.searchParams.timetype == 3) {
                    return 'yyyy-MM-dd'
                } else if (this.searchParams.timetype == 2) {
                    return 'yyyy-MM'
                } else {
                    return 'yyyy'
                }
            },
            dateType: function () {
                let type;
                switch (this.searchParams.timetype) {
                    case 1:
                        type = 'year';
                        break;
                    case 2:
                        type = 'month';
                        break;
                    case 3:
                        type = 'date';
                        break;
                    default:
                        type = 'date';
                        break;
                }
                return type;
            }
        },
        watch: {
            ['searchParams.timetype']: function () {
                this.searchParams.starttime = '';
                this.searchParams.endtime = '';
            }
        },
        created: function () {
            this.initData();
        },
        mounted: function () {
        },
        methods: {
            initData: function () {
                this.initCompanies();
            },
            initCompanies: function () {
                this.$globalCache.companies.then(companies => {
                    this.companies = companies;
                })
            },
            search: function (formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        this.$emit('search', this.searchParams);
                    }
                });
            },
            hideModal: function () {
                this.selectDeviceDialogVisible = false;
                this.selectGroupDialogVisible = false;
                this.selectAreaDialogVisible = false;
                this.selectCompanyDialogVisible = false;
            },
            resetData: function () {
                this.operData = {};
            },
        }
    }
</script>

<style scoped lang="less">

</style>

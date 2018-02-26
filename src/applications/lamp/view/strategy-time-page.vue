<template>
  <div class="content-right">
    <div class="clearfix">
      <div class="search pull-left">
        <form class="form-inline default-form">
          <div class="form-group">
            <label>策略名称：</label>
            <el-input style="width: 180px" type="text" v-model="searchParams.devicename" placeholder="输入策略名称"></el-input>
          </div>
          <div class="form-group">
            <label>有效时间起：</label>
              <el-date-picker style="width: 180px" v-model="searchParams.regtimestart" type="date" placeholder=""></el-date-picker> 到
<el-date-picker style="width: 180px" v-model="searchParams.regtimeend" type="date" placeholder=""></el-date-picker>
          </div>
          <div class="form-group">
            <label>有效时间止：</label>
            <el-date-picker style="width: 180px" v-model="searchParams.regtimestart" type="date"
                            placeholder=""></el-date-picker> 到 <el-date-picker style="width: 180px" v-model="searchParams.regtimeend" type="date"
                                                                                      placeholder=""></el-date-picker>
          </div>
          <div class="form-group">
            <label>策略类别：</label>
            <el-select v-model="searchParams.sensortype" placeholder="选择策略类别" clearable>
              <el-option v-for="status in sensorType" :key="status.value" :value="status.value"
                         :label="status.text"></el-option>
            </el-select>
          </div>
          <div @click="search" class="form-group default-btn"><span class="quick-search-icon default-icon"></span>快速筛选
          </div>
          <div class="pull-right">
            <div @click="dialogAddStrategy" class="default-btn"><span class="add-icon default-icon"></span>新建</div>
          </div>
        </form>
      </div>

    </div>
    <div class="table center">
      <table class="table table-hover table-striped">
        <thead>
        <th>策略名称</th>
        <th>类型</th>
        <th>有效时间</th>
        <th>执行时间</th>
        <th>操作</th>
        </thead>
        <tbody>
        <tr v-for="item in list">
          <td>{{item.devicename}}</td>
          <td>{{item.sn}}</td>
          <td>{{item.brightness}}</td>
          <td>{{item.activepower}}</td>
          <td class="td-btns">
            <div class="icon-item"><span @click="dialogEditStrategy" class="edit-icon"></span></div>
            <div class="icon-item"><span @click="dialogDeleteStrategy" class="delete-icon"></span></div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <paging-component v-if="searchParams.pages" :pageNumber="searchParams.pageNum" :pages="searchParams.pages"
                      @pagingEvent='pagingEvent'></paging-component>

    <el-dialog title="时序控制-新建" :visible.sync="addStrategyDialogVisible" center :width="'650px'">
      <el-form label-width="120px" :model="operData"  ref="addStrategy" class="el-form-default">
        <el-form-item label="策略名称：" prop="switchstate">
          <el-input type="text" v-model="operData.devicename" placeholder="输入设备名称"></el-input>
        </el-form-item>
        <el-form-item label="策略功能：" prop="">
          <el-select v-model="operData.deviceType" placeholder="选择类型" clearable >
            <el-option v-for="item in sensorType" :key="item.value" :value="item.value" :label="item.text"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="有效时间：" prop="deviceType">
          <el-date-picker style="width: 200px" v-model="operData.regtimestart" type="date"
                          placeholder=""></el-date-picker> 到 <el-date-picker style="width: 200px" v-model="operData.regtimeend" type="date"
                                                                             placeholder=""></el-date-picker>
        </el-form-item>
        <el-form-item label="执行频率：" prop="deviceType">
          <el-select style="width: 200px; margin-right: 24px" v-model="operData.frequency" placeholder="选择类型" clearable >
            <el-option v-for="item in frequency" :key="item.value" :value="item.value" :label="item.text"></el-option>
          </el-select>
          <el-input style="width: 200px" :disabled="operData.frequency != 4" type="text" v-model="operData.interval" placeholder="请输入间隔时间"></el-input>
        </el-form-item>
        <el-form-item label="执行时间：" prop="deviceType">
          <el-select style="width: 200px; margin-right: 24px" v-model="operData.time" placeholder="选择类型" clearable >
            <el-option v-for="item in time" :key="item.value" :value="item.value" :label="item.text"></el-option>
          </el-select>
          <el-date-picker style="width: 200px" :disabled="operData.time != 1" v-model="operData.date" type="date" placeholder="请输入时间点"></el-date-picker>
        </el-form-item>
        <el-form-item label="执行功能：" prop="">
          <div><el-radio v-model="operData.fn" label="1">开灯</el-radio></div>
          <div><el-radio v-model="operData.fn" label="2">关灯</el-radio></div>
          <div style="position: relative">
            <el-radio v-model="operData.fn" label="3">调节亮度</el-radio>
            <div style="position: absolute; width: 300px; right: 0; top: 5px"><el-slider :disabled="operData.fn != 3" v-model="operData.brightness" show-input></el-slider></div>
          </div>
          <div><el-radio v-model="operData.fn" label="1">状态读取</el-radio></div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addStrategy('addStrategy')">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="时序控制-编辑" :visible.sync="editStrategyDialogVisible" center :width="'650px'">
      <el-form label-width="120px" :model="operData"  ref="editStrategy" class="el-form-default">
        <el-form-item label="策略名称：" prop="switchstate">
          <el-input type="text" v-model="operData.devicename" placeholder="输入设备名称"></el-input>
        </el-form-item>
        <el-form-item label="策略功能：" prop="">
          <el-select v-model="operData.deviceType" placeholder="选择类型" clearable >
            <el-option v-for="item in sensorType" :key="item.value" :value="item.value" :label="item.text"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="有效时间：" prop="deviceType">
          <el-date-picker style="width: 200px" v-model="operData.regtimestart" type="date"
                          placeholder=""></el-date-picker> 到 <el-date-picker style="width: 200px" v-model="operData.regtimeend" type="date"
                                                                             placeholder=""></el-date-picker>
        </el-form-item>
        <el-form-item label="执行频率：" prop="deviceType">
          <el-select style="width: 200px; margin-right: 24px" v-model="operData.frequency" placeholder="选择类型" clearable >
            <el-option v-for="item in frequency" :key="item.value" :value="item.value" :label="item.text"></el-option>
          </el-select>
          <el-input style="width: 200px" :disabled="operData.frequency != 4" type="text" v-model="operData.interval" placeholder="请输入间隔时间"></el-input>
        </el-form-item>
        <el-form-item label="执行时间：" prop="deviceType">
          <el-select style="width: 200px; margin-right: 24px" v-model="operData.time" placeholder="选择类型" clearable >
            <el-option v-for="item in time" :key="item.value" :value="item.value" :label="item.text"></el-option>
          </el-select>
          <el-date-picker style="width: 200px" :disabled="operData.time != 1" v-model="operData.date" type="date" placeholder="请输入时间点"></el-date-picker>
        </el-form-item>
        <el-form-item label="执行功能：" prop="">
          <div><el-radio v-model="operData.fn" label="1">开灯</el-radio></div>
          <div><el-radio v-model="operData.fn" label="2">关灯</el-radio></div>
          <div style="position: relative">
            <el-radio v-model="operData.fn" label="3">调节亮度</el-radio>
            <div style="position: absolute; width: 300px; right: 0; top: 5px"><el-slider :disabled="operData.fn != 3" v-model="operData.brightness" show-input></el-slider></div>
          </div>
          <div><el-radio v-model="operData.fn" label="1">状态读取</el-radio></div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editStrategy('editStrategy')">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="删除时序控制" :visible.sync="deleteStrategyDialogVisible" center :width="'600px'">
      <div class="text-center">
        <div class="dialog-warning"></div>
      </div>
      <p class="title">您确认要删除此时序控制策略吗？</p>
      <p class="text-center">请慎重操作，您的操作一旦确认，将无法恢复，并被系统记录在日志当中！</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="deleteStrategy">确认</el-button>
      </span>
    </el-dialog>

  </div>

</template>

<script>
    import RestfulConstant from "../../../constants/restful";
    import Config from "../../../config";
    export default {
        name: 'strategyTimePage',
        data() {
            return {
                addStrategyDialogVisible: false,
                editStrategyDialogVisible: false,
                deleteStrategyDialogVisible: false,
                searchParams: {
                    devicename: '',
                    sn: '',
                    companyid: '',
                    switchstate: '',
                    lightcontrollerType: '',
                    sensortype: ''
                },
                operData: {},
                isSearchPage: false,
                list: [{}],
                companies: [],
                sensorType: [
                    {value: 1, text: '无'},
                    {value: 2, text: '光感'},
                    {value: 3, text: '微波'},
                ],
                frequency: [
                    {value: 1, text: '一次'},
                    {value: 2, text: '每天'},
                    {value: 3, text: '每周'},
                    {value: 4, text: '间隔'},
                ],
                time: [
                    {value: 1, text: '时间点'},
                    {value: 2, text: '日出'},
                    {value: 3, text: '日落'},
                ],
                defaultPaging: {
                    pageSize: Config.DEFAULT_PAGE_SIZE,
                    pageNum: 1
                },
            }
        },
        created: function () {
            this.initData()
        },
        methods: {
            initData: function () {
                this.initPaging();
                this.initOperData();
            },
            initPaging: function () {
                this.findList(this.defaultPaging)
            },
            initOperData: function () {
//                this.operData = this.$common.copyObj(LampContent);
            },
            pagingEvent: function (pageNumber) {
                this.searchParams.pageNum = pageNumber;
                this.findList(this.searchParams);
            },
            findList: function (params) {
                this.$http.get('lightController/getList', {params: params}).then(res => {
                    this.searchParams.pageNum = res.body.data.pageNum;
                    this.searchParams.pages = res.body.data.pages;
                    this.searchParams.pageSize = res.body.data.pageSize;
                    this.list = res.body.data.list;
                }).catch(err => {

                })
            },
            search: function () {
                this.findList(Object.assign(this.searchParams, this.defaultPaging));
            },
            dialogAddStrategy: function () {
                this.resetData();
                this.addStrategyDialogVisible = true;
            },
            dialogEditStrategy: function () {
                this.resetData();
                this.editStrategyDialogVisible = true;
            },
            dialogDeleteStrategy: function () {
                this.resetData();
                this.deleteStrategyDialogVisible = true;
            },
            addStrategy: function (formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {

                    }
                })
            },
            editStrategy: function (formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {

                    }
                })
            },
            deleteStrategy: function () {

            },
            getDevice: function (id) {
                return this.$http.post('lightController/getDetailsBySn', {sn: id}).then(res => {
                    return res.body.data
                }).catch()
            },
            hideModal: function () {
                this.addStrategyDialogVisible = false;
                this.editStrategyDialogVisible = false;
                this.deleteStrategyDialogVisible = false;
            },
            resetData: function () {
//                this.operData = this.$common.copyObj(LampContent);
            }

        }
    }
</script>

<style scoped lang="less">

</style>

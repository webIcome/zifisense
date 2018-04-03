<template>
  <el-row type="flex" justify="space-between">
    <el-col :span="18" v-if="value">{{deviceNumber}}个设备</el-col>
    <el-col :span="18" v-else>0个设备</el-col>
    <el-input v-model="value" v-show="false"></el-input>
    <el-button :disabled="!editable" :span="6" type="primary" icon="el-icon-edit-outline" @click="dialogEditDevice">编辑</el-button>
    <el-dialog title="选择" :visible.sync="dialogVisible" center :width="'550px'"  append-to-body>
      <el-transfer v-model="selectedList"
                   :titles="titles"
                   :data="list"
                   :props="props"
                   :format="format">
        <el-pagination style="margin-top: 5px" class="transfer-footer" slot="left-footer" @current-change="pagingEvent"
                       small
                       :total="total"
                       next-text="下一页"
                       prev-text="上一页"
                       :page-size="searchParams.pageSize"
                       layout="prev, next"></el-pagination>
      </el-transfer>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="selectDevice">确 定</el-button>
      </span>
    </el-dialog>
  </el-row>
</template>
<script>
    import Services from "../services";
    import Config from "../../../config";
    import CommonConstant from "../../../constants/common";
  export default{
      name: 'editLightGroupComponent',
      data(){
          return {
              dialogVisible: false,
              searchParams: {
//                  devicename: ''
              },
              list: [],
              titles: ['灯空器列表', '已选择灯空器'],
              format: {
                  noChecked: '${total}',
                  hasChecked: '${checked}/${total}'
              },
              props: {
                  key: 'deviceid',
                  label: 'devicename'
              },
              selectedList: [],
              selectDataList: [],
              defaultPaging: {
                  pageSize: Config.DEFAULT_PAGE_SIZE,
                  pageNum: 1
              },
              total: 0,
              deviceType: {},

          }
      },
      props: {
          companyid: {
              default: '',
          },
          groupid: {
              default: '',
          },
          moduletype: {
              default: ''
          },
          value: {
              default: ''
          },
          run: {
              default: false
          }
      },
      computed: {
          editable: function () {
              return this.moduletype && this.companyid
          },
          deviceNumber: function () {
              return this.value.split(',').length
          }
      },
      watch: {
          run: function (newVal) {
              if (newVal) this.getSelectedList();
          },
          moduletype: function (nuwVal, oldVal) {
              if (this.run && oldVal) this.getSelectedList();
          },
          companyid: function (nuwVal, oldVal) {
              if (this.run && oldVal) this.getSelectedList();
          },
      },
      created: function () {
          this.initData();
      },
      methods: {
          initData: function () {
              CommonConstant.deviceType.forEach(item => {
                  this.deviceType[item.name] = item.value;
              });
              switch (this.moduletype) {
                  case this.deviceType.light:
                      this.titles = ['灯空器列表', '已选择灯空器'];
                      break;
                  case this.deviceType.loop:
                      this.titles = ['回路控制器列表', '已选择回路控制器'];
                      break;
                  case this.deviceType.panel:
                      this.titles = ['控制面板列表', '已选择控制面板'];
                      break;
                  default:
                      break;
              }
              this.getSelectedList();
          },
          dialogEditDevice: function () {
              this.resetData();
              this.searchParams.companyid = this.companyid;
              this.searchParams.moduletype = this.moduletype;
              this.dialogVisible = true;
              this.findList(this.searchParams)
          },
          pagingEvent: function (pageNumber) {
              this.searchParams.pageNum = pageNumber;
              this.findList(this.searchParams);
          },
          findList: function (params) {
              Services.findDevicesGroupList(params).then(data => {
                  this.searchParams.pageNum = data.pageNum;
                  this.searchParams.pages = data.pages;
                  this.searchParams.pageSize = data.pageSize;
                  this.list = this.selectDataList.concat(data.list);
                  this.total = this.list.length;
              });
          },
          getSelectedList: function () {
              if (!this.groupid) {
                  this.initSelectDataList();
                  return;
              }
              Services.getSelectedDevicesGroupList({companyid: this.companyid, moduletype: this.moduletype, objectid: this.groupid}).then(data => {
                  this.selectDataList = data.list;
                 this.initSelectDataList();
              })
          },
          initSelectDataList: function () {
              this.selectedList = [];
              this.selectDataList.forEach(item => {
                  this.selectedList.push(item.deviceid);
              });
              this.$emit('input', this.selectedList.join());
          },
          selectDevice: function () {
              this.$emit('input', this.selectedList.join());
              this.dialogVisible = false;
          },
          resetData: function () {
              if (this.groupid){
                  this.searchParams.dtype = 1;
                  this.searchParams.objectid = this.groupid;
              } else {
                  this.searchParams.dtype = 2
              }
          }
      }
  }
</script>
<style lang="less" scoped>
</style>
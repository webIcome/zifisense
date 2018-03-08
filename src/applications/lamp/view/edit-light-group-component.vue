<template>
  <el-row type="flex" justify="space-between">
    <el-col :span="18" v-if="selectedList.length">{{selectedList[0].devicename}} 等{{selectedList.length}}个设备</el-col>
    <el-col :span="18" v-else>0个设备</el-col>
    <el-button :disabled="!groupid" :span="6" type="primary" icon="el-icon-edit-outline" @click="dialogEditDevice">编辑</el-button>
    <el-dialog title="编辑组" :visible.sync="dialogVisible" center :width="'550px'"  append-to-body>
      <el-form :inline="true" label-width="170px" :model="searchParams"  ref="editGroup" class="el-form-default">
        <el-form-item prop="strategyname">
          <el-input type="text" v-model="searchParams.devicename" placeholder="输入灯控器名称"></el-input>
        </el-form-item>
        <el-button type="primary" @click="search" icon="el-icon-search">筛选</el-button>
      </el-form>
      <el-transfer v-model="selectList"
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
  export default{
      name: 'editLightGroupComponent',
      data(){
          return {
              dialogVisible: false,
              searchParams: {
                  devicename: ''
              },
              list: [],
              titles: ['灯空器列表', '已选择灯空器'],
              format: {
                  noChecked: '${total}',
                  hasChecked: '${checked}/${total}'
              },
              props: {
                  key: 'sn',
                  label: 'devicename'
              },
              selectedList: [],
              selectList: [],
              defaultPaging: {
                  pageSize: Config.DEFAULT_PAGE_SIZE,
                  pageNum: 1
              },
              total: '',
              renderFunc(h, option) {
                  return option.devicename

              }
          }
      },
      props: {
          companyid: {
              default: '',
          },
          groupid: {
              default: '',
          }
      },
      methods: {
          dialogEditDevice: function () {
              this.resetData();
              this.getSelectedList(this.groupid);
              this.searchParams.companyid = this.companyid;
              this.dialogVisible = true;
              this.findList(Object.assign(this.searchParams, this.defaultPaging))
          },
          search: function () {
              this.findList(this.searchParams)
          },
          pagingEvent: function (pageNumber) {
              this.searchParams.pageNum = pageNumber;
              this.findList(this.searchParams);
          },
          findList: function (params) {
              Services.findLightList(params).then(data => {
                  this.searchParams.pageNum = data.pageNum;
                  this.searchParams.pages = data.pages;
                  this.searchParams.pageSize = data.pageSize;
                  this.total = data.total;
                  this.list = data.list;
              });
          },
          getSelectedList: function (id) {
              Services.getSelectedDevicesByGroupId(id).then(data => {
                  this.selectedList = data;
              })
          },
          selectDevice: function () {
              this.selectedList = this.selectList;
              this.$emit('input', this.selectedList.join());
              this.dialogVisible = false;
          },
          resetData: function () {
              this.selectedList = [];
              this.selectList = [];
          }
      }
  }
</script>
<style lang="less" scoped>
</style>
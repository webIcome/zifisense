<template>
  <div>
    <el-input type="text" :vule="strategyName" placeholder="选择灯控器类型" clearable @focus="dialogSelect" @change="changeSelect"></el-input>
    <el-dialog title="选择策略类型" :visible.sync="dialogVisible" center :width="'700px'"  append-to-body>
      <el-form :inline="true" label-width="170px" :model="searchParams"  ref="editGroup" class="el-form-default">
        <el-form-item prop="strategyname">
          <el-input type="text" v-model="searchParams.strategyname" placeholder="输入策略名称"></el-input>
        </el-form-item>
        <el-form-item prop="moduletype">
          <el-select v-model="searchParams.moduletype" placeholder="选择策略类别" clearable>
            <el-option v-for="status in moduleTypeID" :key="status.value" :value="status.value"
                       :label="status.text"></el-option>
          </el-select>
        </el-form-item>
        <el-button type="primary" @click="findList" icon="el-icon-search">筛选</el-button>
      </el-form>
      <div>
        <el-table ref="singleTable" :data="list" border class="table" @current-change="select" highlight-current-row>
          <el-table-column label="策略名称" prop="strategyName" align="center"></el-table-column>
          <el-table-column label="类型" prop="moduletype" align="center"></el-table-column>
          <el-table-column label="有效期" prop="validitytime" align="center"></el-table-column>
        </el-table>
        <paging-component v-if="searchParams.pages" :pageNumber="searchParams.pageNum" :pages="searchParams.pages"
                          @pagingEvent='pagingEvent'></paging-component>
      </div>
    </el-dialog>
  </div>
</template>
<script>
    import Services from "../services";
    import Config from "../../../config";
  export default {
      data() {
          return {
              searchParams: {
                  strategyname: '',
                  moduletype: ''
              },
              moduleTypeID: [
                  {value: 1, text: '灯控器'},
                  {value: 2, text: '回路控制器'},
              ],
              defaultPaging: {
                  pageSize: Config.DEFAULT_PAGE_SIZE,
                  pageNum: 1
              },
              dialogVisible: false,
              list: []
          }
      },
      props: {
          strategyName: {
              type: String,
              default: ''
          }
      },
      created: function () {
          this.initData()
      },
      methods: {
          initData: function () {
//              this.findList(this.defaultPaging);
          },
          pagingEvent: function (pageNumber) {
              this.searchParams.pageNum = pageNumber;
              this.findList(this.searchParams);
          },
          findList: function () {
              Services.findStrategy(this.searchParams).then(data => {
                  this.searchParams.pageNum = data.pageNum;
                  this.searchParams.pages = data.pages;
                  this.searchParams.pageSize = data.pageSize;
                  this.list = data.list;
              })
          },
          dialogSelect: function () {
              this.findList(this.defaultPaging);
              this.dialogVisible = true;
          },
          select: function (val) {
              this.dialogVisible = false;
              this.$emit('select', val.objectid);
              this.$emit('name', val.strategyname);
          },
          changeSelect: function (val) {
              if (!val) {
                  this.$emit('select', '');
                  this.$emit('name', '');
              }
          },
      }
  }
</script>
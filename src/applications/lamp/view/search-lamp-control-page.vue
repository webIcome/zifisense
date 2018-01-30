<template>
  <div class="content-right">
    <div class="title">灯控器高级搜索</div>
    <form class="form-horizontal default-form">
      <div class="form-group">
        <label class="col-md-3 control-label">设备详情：</label>
        <div class="col-md-3">
            <input type="text" class="form-control"/>
        </div>
        <label class="col-md-3 control-label">电压：</label>
        <div class="col-md-3">
          <input type="text" class="form-control input-two"/>到<input type="text" class="form-control input-two"/>
        </div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">设备ID：</label>
        <div class="col-md-3">
          <input type="text" class="form-control"/>
        </div>
        <label class="col-md-3 control-label">电流：</label>
        <div class="col-md-3">
          <input type="text" class="form-control input-two"/>到<input type="text" class="form-control input-two"/>
        </div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">归属组：</label>
        <div class="col-md-3">
          <select  class="form-control">
            <option value="">--选择回路控制器--</option>
            <template>
              <option></option>
            </template>
          </select>
        </div>
        <label class="col-md-3 control-label">有功电能：</label>
        <div class="col-md-3">
          <input type="text" class="form-control input-two"/>到<input type="text" class="form-control input-two"/>
        </div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">归属回路控制器：</label>
        <div class="col-md-3">
          <select  class="form-control">
            <option value="">--选择回路控制器--</option>
            <template>
              <option></option>
            </template>
          </select>
        </div>
        <label class="col-md-3 control-label">地理位置：</label>
        <div class="col-md-3">
          <input type="text" class="form-control"/>
        </div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">灯控类型：</label>
        <div class="col-md-3">
          <select  class="form-control">
            <option value="">--选择灯控类型--</option>
            <template>
              <option></option>
            </template>
          </select>
        </div>
        <label class="col-md-3 control-label">接入时间：</label>
        <div class="col-md-3">
          <vue-datepicker-local clearable :inputClass="'form-control'" class="input-two"></vue-datepicker-local>到
          <vue-datepicker-local clearable :inputClass="'form-control'" class="input-two"></vue-datepicker-local>
        </div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">传感器类型：</label>
        <div class="col-md-3">
          <select  class="form-control">
            <option value="">--选择传感器--</option>
            <template>
              <option></option>
            </template>
          </select>
        </div>
        <label class="col-md-3 control-label">归属企业：</label>
        <div class="col-md-3">
          <select  class="form-control">
            <option value="">无</option>
            <template>
              <option></option>
            </template>
          </select>
        </div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">开关状态：</label>
        <div class="col-md-3">
          <select  class="form-control">
            <option value="">无</option>
            <template>
              <option></option>
            </template>
          </select>
        </div>
        <label class="col-md-3 control-label">运行状态：</label>
        <div class="col-md-3">
          <select  class="form-control">
            <option value="">--选择运行状态--</option>
            <template>
              <option></option>
            </template>
          </select>
        </div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">亮度值：</label>
        <div class="col-md-3">
          <input type="text" class="form-control input-two"/>到<input type="text" class="form-control input-two"/>
        </div>
      </div>
      <div class="search-btn">
        <div @click="search" class="default-btn">搜索</div>
        <div @click="goBack" class="default-btn">返回</div>
      </div>
    </form>

  </div>
</template>

<script>
    import HttpClient from "../../../core/http-client";
    import RestfulConstant from "../../../constants/restful";
    export default {
        name: 'searchLampControlPage',
        data() {
            return {}
        },
        methods: {
            search: function () {
                this.goBack();
            },
            goBack: function () {
              this.$router.back();
            },
        }
    }
</script>

<style scoped lang="less">
  .content-right {
    box-shadow: 0 0 20px #ccc;
    padding: 40px;
    .title {
      color: #333;
      font-size: 30px;
      text-align: center;
      margin-bottom: 50px;
    }
    .input-two {
      display: inline-block;
      width: 43%;
      margin: 0 5px;
    }
    .search-btn {
      margin-top: 80px;
      text-align: center;
      .default-btn {
        margin: 0 15%;
        width: 150px;
      }
    }

  }
</style>

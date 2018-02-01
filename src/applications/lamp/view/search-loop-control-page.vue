<template>
  <div class="content-right">
    <div class="page-title">回路控制器高级搜索</div>
    <form class="form-horizontal default-form">
      <div class="form-group">
        <label class="col-md-3 control-label">设备名称：</label>
        <div class="col-md-3">
          <input type="text" class="form-control"/>
        </div>
        <label class="col-md-3 control-label">有功电能累加：</label>
        <div class="col-md-3">
          <input type="text" class="form-control input-two"/>到<input type="text" class="form-control input-two"/>
        </div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">设备ID：</label>
        <div class="col-md-3">
          <input type="text" class="form-control"/>
        </div>
        <label class="col-md-3 control-label">无功电能累加：</label>
        <div class="col-md-3">
          <input type="text" class="form-control input-two"/>到<input type="text" class="form-control input-two"/>
        </div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">归属组：</label>
        <div class="col-md-3">
          <select class="form-control">
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
        <label class="col-md-3 control-label">回路数：</label>
        <div class="col-md-3">
          <select class="form-control">
            <option value="">--选择回路数--</option>
            <template>
              <option></option>
            </template>
          </select>
        </div>
        <label class="col-md-3 control-label">接入时间：</label>
        <div class="col-md-3">
          <vue-datepicker-local clearable :inputClass="'form-control'" class="input-two"></vue-datepicker-local>
          到

          <vue-datepicker-local clearable :inputClass="'form-control'" class="input-two"></vue-datepicker-local>
        </div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">DI口状态：</label>
        <div class="col-md-3">
          <select class="form-control">
            <option value="">--选择DI口状态--</option>
            <template>
              <option></option>
            </template>
          </select>
        </div>
        <label class="col-md-3 control-label">归属企业：</label>
        <div class="col-md-3">
          <select class="form-control">
            <option value="">无</option>
            <template>
              <option></option>
            </template>
          </select>
        </div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">三相电压：</label>
        <div class="col-md-3">
          <input type="text" class="form-control input-two"/>到<input type="text" class="form-control input-two"/>
        </div>
        <label class="col-md-3 control-label">运行状态：</label>
        <div class="col-md-3">
          <select class="form-control">
            <option value="" selected>--选择运行状态--</option>
            <template>
              <option></option>
            </template>
          </select>
        </div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">三项电流：</label>
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
    import {mapActions} from 'vuex';
    import MutationTypes from "../../../store/mutation-types";
    export default {
        name: 'searchLoopControlPage',
        data() {
            return {
                searchParams: {name: 111224442}
            }
        },
        methods: {
            ...mapActions('SearchParamsModule', [
                MutationTypes.EMIT_LOOP
            ]),
            search: function () {
//                this[MutationTypes.EMIT_LOOP](this.searchParams);
//                this.goBack()
                this.$router.push({name: 'loop', params: {name: 1111}})
            },
            goBack: function () {
                this.$router.back();
            },
        }
    }
</script>

<style scoped lang="less">

</style>

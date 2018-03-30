<template>
  <div class="content-right">
    <div class="page-title">灯具高级搜索</div>
    <form class="form-horizontal default-form">
      <div class="form-group">
        <label class="col-md-3 control-label">灯具型号：</label>
        <div class="col-md-3">
          <el-input type="text" v-model="advancedSearchParams.modelnum" placeholder="输入灯具型号"/>
        </div>
        <label class="col-md-3 control-label">灯具寿命：</label>
        <div class="col-md-3">
          <el-input type="text" class="input-two" v-model="advancedSearchParams.lifetimelow"/>到<el-input type="text" class="input-two" v-model="advancedSearchParams.lifetimehigh"/>
        </div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">灯具类型：</label>
        <div class="col-md-3">
          <el-select v-model="advancedSearchParams.lamptype" placeholder="选择灯具类型" clearable  style="width: 100%;">
            <el-option v-for="type in lamptype" :key="type.value" :value="type.value" :label="type.text"></el-option>
          </el-select>
        </div>
        <label class="col-md-3 control-label">电源类型：</label>
        <div class="col-md-3">
          <el-select v-model="advancedSearchParams.powertype" placeholder="选择电源类型" clearable  style="width: 100%;">
            <el-option v-for="type in powertype" :key="type.value" :value="type.value" :label="type.text"></el-option>
          </el-select>
        </div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">灯具功率：</label>
        <div class="col-md-3">
          <el-input type="text" class="input-two" v-model="advancedSearchParams.powerLow"/>到<el-input type="text" class="input-two" v-model="advancedSearchParams.powerHigh"/>
        </div>
        <label class="col-md-3 control-label">额定电流：</label>
        <div class="col-md-3">
          <el-input type="text" class="input-two" v-model="advancedSearchParams.ratedCurrentLow"/>到<el-input type="text" class="input-two" v-model="advancedSearchParams.ratedCurrentHigh"/>
        </div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">额定电压：</label>
        <div class="col-md-3">
          <el-input type="text" class="input-two" v-model="advancedSearchParams.ratedVoltageLow"/>到<el-input type="text" class="input-two" v-model="advancedSearchParams.ratedVoltageHigh"/>
        </div>
      </div>
      <div class="search-btn">
        <div @click="highSearch" class="default-btn">搜索</div>
        <div @click="goBack" class="default-btn">返回</div>
      </div>
    </form>
  </div>
</template>

<script>
    export default {
        name: 'searchLampsControlComponent',
        data() {
            return {
                advancedSearchParams: {}
            }
        },
        props: {
            lamptype: {
                type: Array
            },
            powertype: {
                type: Array
            },
            companies: {
                type: Array
            },
        },
        methods: {
            highSearch: function () {
                this.$emit('search', this.advancedSearchParams)
            },
            goBack: function () {
                this.$emit('back')
            },
        }
    }
</script>

<style scoped lang="less">

</style>

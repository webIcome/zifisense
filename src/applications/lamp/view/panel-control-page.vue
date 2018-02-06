<template>
  <div v-if="!isSearchPage" class="content-right">
    <div class="clearfix">
      <div class="search pull-left">
        <form class="form-inline default-form">
          <div class="form-group">
            <label class="sr-only">设备名称：</label>
            <input type="text" class="form-control" v-model="searchParams.phone" placeholder="输入设备名称"/>
          </div>
          <div class="form-group">
            <label class="sr-only">设备ID：</label>
            <input type="text" class="form-control" v-model="searchParams.phone" placeholder="输入设备ID"/>
          </div>
          <div class="form-group">
            <label class="sr-only">归属企业：</label>
            <select v-model="searchParams.type" class="form-control">
              <option value="">--选择归属企业--</option>
              <template v-for="company in logs">
                <option>{{company.name}}</option>
              </template>
            </select>
          </div>
          <div class="form-group default-btn"><span class="quick-search-icon default-icon"></span>快速筛选</div>
          <div class="pull-right">
            <div @click="dialogHighSearch" class="default-btn"><span class="search-icon default-icon"></span>高级搜索</div>
            <div data-toggle="modal" data-target="#add-device" class="default-btn"><span
                class="add-icon default-icon"></span>创建
            </div>
          </div>
        </form>
      </div>

    </div>
    <div class="table center">
      <table class="table table-hover table-striped">
        <thead>
        <th>设备名称</th>
        <th>设备ID</th>
        <th>运行状态</th>
        <th>情景模式</th>
        <th>地理位置</th>
        <th>操作</th>
        </thead>
        <tbody>
        <tr v-for="log in logs" @click="showDetail($event, log)">
          <td>{{log}}</td>
          <td>{{log}}</td>
          <td>{{log}}</td>
          <td>{{log}}</td>
          <td>{{log}}</td>
          <td class="td-btns">
            <div class="icon-item"><span data-toggle="modal" data-target="#edit-device" @click="dialogEditDevice" class="edit-icon"></span></div>
            <div class="icon-item"><span data-toggle="modal" data-target="#delete-device" @click="dialogDeleteDevice"
                                         class="delete-icon"></span></div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <paging-component v-if="pages" :pageNumber="pageNumber" :pages="pages"
                      @pagingEvent='pagingEvent'></paging-component>

    <dialog-component id="add-device">
      <div slot="body">
        <div class="dialog-title">创建控制面版</div>
        <form class="form-horizontal default-form">
          <div class="form-group">
            <label class="col-md-4 control-label">设备名称：</label>
            <div class="col-md-8">
              <input type="text" class="form-control" v-model="addDeviceData.company"/>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-4 control-label">设备ID：</label>
            <div class="col-md-8">
              <input type="text" class="form-control" v-model="addDeviceData.company"/>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-4 control-label">归属组：</label>
            <div class="col-md-8 group-lamp">
              <template v-for="group in groups">
                <div class="group-item default-btn">{{group.name}} <span class="group-delete"></span></div>
              </template>
              <div @click="addGroup" class="group-add"></div>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-4 control-label">情景模式：</label>
            <div class="col-md-8">
              <input type="text" class="form-control" v-model="addDeviceData.company"/>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-4 control-label">地理位置：</label>
            <div class="col-md-8">
              <input type="text" class="form-control" v-model="addDeviceData.company" placeholder="请输入地理位置"/>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-4 control-label">归属企业：</label>
            <div class="col-md-8">
              <select v-model="addDeviceData.company" class="form-control">
                <option value="">无</option>
                <template v-for="company in logs">
                  <option>{{company.name}}</option>
                </template>
              </select>
            </div>
          </div>
          <div class="dialog-btn">
            <span @click="addDevice" class="dialog-btn-icon">确认</span>
          </div>
        </form>
      </div>
    </dialog-component>
    <dialog-component id="edit-device">
      <div slot="body">
        <div class="dialog-title">编辑控制面板</div>
        <form class="form-horizontal default-form">
          <div class="form-group">
            <label class="col-md-4 control-label">设备名称：</label>
            <div class="col-md-8">
              <input type="text" class="form-control" v-model="addDeviceData.company"/>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-4 control-label">设备ID：</label>
            <div class="col-md-8">
              <input type="text" class="form-control" v-model="addDeviceData.company"/>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-4 control-label">归属组：</label>
            <div class="col-md-8 group-lamp">
              <template v-for="group in groups">
                <div class="group-item default-btn">{{group.name}} <span class="group-delete"></span></div>
              </template>
              <div @click="addGroup" class="group-add"></div>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-4 control-label">情景模式：</label>
            <div class="col-md-8">
              <select v-model="addDeviceData.company" class="form-control">
                <option value="">无</option>
                <template v-for="company in logs">
                  <option>{{company.name}}</option>
                </template>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-4 control-label">地理位置：</label>
            <div class="col-md-8">
              <input type="text" class="form-control" v-model="addDeviceData.company" placeholder="请输入地理位置"/>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-4 control-label">归属企业：</label>
            <div class="col-md-8">
              <select v-model="addDeviceData.company" class="form-control">
                <option value="">无</option>
                <template v-for="company in logs">
                  <option>{{company.name}}</option>
                </template>
              </select>
            </div>
          </div>
          <div class="dialog-btn">
            <span @click="editDevice" class="dialog-btn-icon">确认</span>
          </div>
        </form>
      </div>
    </dialog-component>

    <dialog-component id="delete-device">
      <div slot="body">
        <div class="dialog-title">删除控制面版</div>
        <div class="text-center">
          <div class="dialog-warning"></div>
        </div>
        <p class="title">您确认要删除此控制面板吗？</p>
        <p class="text-center">请慎重操作，您的操作一旦确认，将无法恢复，并被系统记录在日志当中！</p>
        <div class="dialog-btn">
          <span @click="deleteDevice" class="dialog-btn-icon">确认删除</span>
        </div>
      </div>
    </dialog-component>
  </div>

  <div v-else class="content-right">
    <div class="page-title">控制面版高级搜索</div>
    <form class="form-horizontal default-form">
      <div class="form-group">
        <label class="col-md-3 control-label">设备名称：</label>
        <div class="col-md-3">
          <input type="text" class="form-control"/>
        </div>
        <label class="col-md-3 control-label">设备ID：</label>
        <div class="col-md-3">
          <input type="text" class="form-control"/>
        </div>
      </div>
      <div class="form-group">
        <label class="col-md-3 control-label">归属组：</label>
        <div class="col-md-3">
          <select class="form-control">
            <option value="">--无--</option>
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
        <label class="col-md-3 control-label">情景模式：</label>
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
        <label class="col-md-3 control-label">归属企业：</label>
        <div class="col-md-3">
          <select class="form-control">
            <option value="">--无--</option>
            <template>
              <option></option>
            </template>
          </select>
        </div>
        <label class="col-md-3 control-label">运行状态：</label>
        <div class="col-md-3">
          <select class="form-control">
            <option value="" selected>--所有--</option>
            <template>
              <option></option>
            </template>
          </select>
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
    import HttpClient from "../../../core/http-client";
    import RestfulConstant from "../../../constants/restful";
    export default {
        name: 'lampControlPage',
        data() {
            return {
                searchParams: {
                    deviceName: '',
                    deviceId: '',
                    company: '',
                    switchStatus: '',
                    type: '',
                    sensorType: ''
                },
                advancedSearchParams: {},
                operData: {},
                addDeviceData: {},
                groups: [{name: '分组1'},{name: '分组2'}],
                pageNumber: 1,
                pages: 6,
                logs: [{}, {}],
                isSearchPage: false
            }
        },
        created: function () {

        },
        methods: {
            pagingEvent: function (pageNumber) {
                this.pageNumber = pageNumber;
            },
            getList: function (searchParams) {
            },
            dialog: function (id, data) {
                id = '#' + id;
                $(id).modal();
            },
            addGroup: function () {

            },
            dialogHighSearch: function () {
                this.isSearchPage = true
            },
            highSearch: function () {
                this.getList(this.advancedSearchParams);
                this.goBack();
            },
            goBack: function () {
                this.isSearchPage = false
            },
            showDetail: function (event,device) {
                if (event.target.className == 'delete-icon' || event.target.className == 'edit-icon') {
                    return;
                }
                let path = 'panel/' + device.sn + '/detail';
                this.$router.push(path)
            },
            dialogAddDevice: function () {
                this.resetData();
            },
            dialogEditDevice: function (device) {
                this.resetData();
                this.operData = device;
            },
            dialogDeleteDevice: function () {
            },
            deleteDevice: function () {
                this.hideModal();
            },
            editDevice: function () {
                this.hideModal();
            },
            addDevice: function () {
                this.hideModal();
            },
            hideModal: function () {
                $('.modal').modal('hide')
            },
            resetData: function () {
                this.operData = {};
            }
        }
    }
</script>

<style scoped lang="less">

</style>

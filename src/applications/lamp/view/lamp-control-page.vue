<template>
  <div class="content-right">
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
          <div class="form-group">
            <label class="sr-only">选择开关状态：</label>
            <select v-model="searchParams.type" class="form-control">
              <option value="">--选择开关状态--</option>
              <template v-for="company in logs">
                <option>{{company.name}}</option>
              </template>
            </select>
          </div>
          <div class="form-group">
            <label class="sr-only">灯控器类型：</label>
            <select v-model="searchParams.type" class="form-control">
              <option value="">--选择灯控器类型--</option>
              <template v-for="company in logs">
                <option>{{company.name}}</option>
              </template>
            </select>
          </div>
          <div class="form-group">
            <label class="sr-only">传感器类型：</label>
            <select v-model="searchParams.type" class="form-control">
              <option value="">--选择传感器类型--</option>
              <template v-for="company in logs">
                <option>{{company.name}}</option>
              </template>
            </select>
          </div>
          <div class="default-btn"><span class="quick-search-icon default-icon"></span>快速筛选</div>
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
        <th>地理位置</th>
        <th>开关状态</th>
        <th>亮度值</th>
        <th>电压</th>
        <th>电流</th>
        <th>有功电能</th>
        <th>操作</th>
        </thead>
        <tbody>
        <tr v-for="log in logs">
          <td>{{log}}</td>
          <td>{{log}}</td>
          <td>{{log}}</td>
          <td>{{log}}</td>
          <td>{{log}}</td>
          <td>{{log}}</td>
          <td>{{log}}</td>
          <td>{{log}}</td>
          <td>{{log}}</td>
          <td class="td-btns">
            <div class="icon-item"><span @click="dialogSetDevice" class="set-icon"></span></div>
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
        <div class="dialog-title">创建灯控器</div>
        <form class="form-horizontal default-form">
          <div class="form-group">
            <label class="col-md-4 control-label">设备详情：</label>
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
            <label class="col-md-4 control-label">归属回路控制器：</label>
            <div class="col-md-8">
              <select v-model="addDeviceData.company" class="form-control">
                <option value="">--选择回路控制器--</option>
                <template v-for="company in logs">
                  <option>{{company.name}}</option>
                </template>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-4 control-label">灯控器类型：</label>
            <div class="col-md-8">
              <select v-model="addDeviceData.company" class="form-control">
                <option value="">--选择灯控器--</option>
                <template v-for="company in logs">
                  <option>{{company.name}}</option>
                </template>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-4 control-label">传感器类型：</label>
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
            <span @click="addDevice" class="dialog-btn-icon">创建账号</span>
          </div>
        </form>
      </div>
    </dialog-component>
    <dialog-component id="edit-device">
      <div slot="body">
        <div class="dialog-title">创建灯控器</div>
        <form class="form-horizontal default-form">
          <div class="form-group">
            <label class="col-md-4 control-label">设备详情：</label>
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
            <label class="col-md-4 control-label">归属回路控制器：</label>
            <div class="col-md-8">
              <select v-model="addDeviceData.company" class="form-control">
                <option value="">--选择回路控制器--</option>
                <template v-for="company in logs">
                  <option>{{company.name}}</option>
                </template>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-4 control-label">灯控器类型：</label>
            <div class="col-md-8">
              <select v-model="addDeviceData.company" class="form-control">
                <option value="">--选择灯控器--</option>
                <template v-for="company in logs">
                  <option>{{company.name}}</option>
                </template>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-4 control-label">传感器类型：</label>
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
            <span @click="addDevice" class="dialog-btn-icon">创建账号</span>
          </div>
        </form>
      </div>
    </dialog-component>

    <dialog-component id="delete-device">
      <div slot="body">
        <div class="dialog-title">删除账号</div>
        <div class="text-center">
          <div class="dialog-warning"></div>
        </div>
        <p class="title">您确认要删除此灯控器吗？</p>
        <p class="text-center">请慎重操作，您的操作一旦确认，将无法恢复，并被系统记录在日志当中！</p>
        <div class="dialog-btn">
          <span @click="deleteDevice" class="dialog-btn-icon">确认删除</span>
        </div>
      </div>
    </dialog-component>
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
                operData: {},
                addDeviceData: {},
                groups: [{name: '分组1'},{name: '分组2'}],
                pageNumber: 1,
                pages: 6,
                logs: [{}, {}]
            }
        },
        methods: {
            pagingEvent: function (pageNumber) {
                this.pageNumber = pageNumber;
            },
            dialog: function (id, data) {
                id = '#' + id;
                $(id).modal();
            },
            addGroup: function () {

            },
            dialogHighSearch: function () {
                this.$router.push('/device/lamp/search');
            },
            dialogAddDevice: function () {

            },
            dialogSetDevice: function () {

            },
            dialogEditDevice: function () {

            },
            dialogDeleteDevice: function () {
            },
            deleteDevice: function () {

            },
            addDevice: function () {

            }

        }
    }
</script>

<style scoped lang="less">
  .content-right {
    box-shadow: 0 0 20px #ccc;
    padding: 40px;
    .search {
      display: inline-block;
      .default-btn {
        .quick-search-icon {
          width: 19px;
          height: 21px;
          background-image: url("../assets/home/quick-search.png");
        }
      }
    }
    .pull-right {
      .default-btn {
        display: block;
        margin-bottom: 10px;
        font-size: 18px;
        text-align: center;
        .search-icon {
          width: 18px;
          height: 18px;
          background-image: url("../../../assets/sys/search.png");
        }
        .add-icon {
          width: 18px;
          height: 18px;
          background-image: url("../../../assets/sys/add-number.png");
        }
      }
    }
    .table {
      margin-top: 20px;
    }
    .td-btns {
      white-space: nowrap;
      .icon-item {
        display: inline-block;
        width: 33%;
        vertical-align: middle;
        .edit-icon,
        .set-icon,
        .delete-icon {
          display: inline-block;
          text-align: center;
          vertical-align: middle;
          cursor: pointer;
        }
        .edit-icon {
          width: 23px;
          height: 24px;
          background-image: url("../assets/device/edit.png");
        }
        .set-icon {
          width: 25px;
          height: 24px;
          background-image: url("../assets/device/set.png");
        }
        .delete-icon {
          width: 24px;
          height: 26px;
          background-image: url("../assets/device/delete.png");
        }
      }
    }

  }

  .group-lamp {
    position: relative;
    .group-item {
      width: 40%;
      text-align: center;
      .group-delete {
        display: inline-block;
        width: 20px;
        height: 20px;
        vertical-align: sub;
        margin-left: 10px;
        background-image: url("../assets/device/group-delete.png");
      }
     &:nth-child(odd){
       margin-right: 20%;
     }
    }
    .group-add {
      position: absolute;
      right: -20px;
      top: 50%;
      margin-top: -12px;
      display: inline-block;
      width: 24px;
      height: 24px;
      background-image: url("../assets/device/group-add.png");
      cursor: pointer;
    }
  }
</style>

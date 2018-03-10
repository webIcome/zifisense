<template>
  <el-row type="flex" justify="space-between">
    <el-col :span="18">{{operData[0]?operData[0].groupname: '' }} 等{{operData.length}}个组</el-col>
    <el-button :span="6" type="primary" icon="el-icon-edit-outline" @click="dialogEditGroup">编辑</el-button>
    <el-dialog title="编辑组" :visible.sync="editGroupDialogVisible" center :width="'650px'" append-to-body>
      <template v-for="(groupItem,index) in operData">
        <el-form label-width="120px" :model="groupItem" ref="editGroup" :rules="groupRules" class="el-form-default">
          <el-form-item label="应用组：" prop="objectid">
            <select-group-component v-model="groupItem.objectid"
                                    :groupName="groupItem.groupname"
                                    @groupname="groupItem.groupname = arguments[0]"></select-group-component>
          </el-form-item>
          <el-form-item label="执行功能：" prop="task">
            <div>
              <el-radio v-model="groupItem.task" label="1">开灯</el-radio>
            </div>
            <div>
              <el-radio v-model="groupItem.task" label="2">关灯</el-radio>
            </div>
            <div style="position: relative">
              <el-radio v-model="groupItem.task" label="3">调节亮度</el-radio>
              <div style="position: absolute; width: 300px; right: 0; top: 5px">
                <el-slider :disabled="groupItem.task != 3" v-model="groupItem.brightness" show-input></el-slider>
              </div>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button class="pull-right" type="primary" @click="deleteGroup(index)">
              删除本组
            </el-button>
          </el-form-item>
        </el-form>
      </template>
      <div style="display: flex; justify-content: space-between; padding: 0 50px;">
        <el-button type="primary" @click="addGroup">添加一组</el-button>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="selectGroup('editGroup')">确 定</el-button>
      </span>
    </el-dialog>
  </el-row>

</template>

<script>
    import selectGroupComponent from "./select-group-component.vue";
    export default {
        name: 'addScenarioGroupDialogComponent',
        components: {selectGroupComponent},
        data() {
            return {
                editGroupDialogVisible: false,
                groupRules: {
                    objectid: [
                        {required: true, message: '请选择应用组'}
                    ],
                    task: [
                        {required: true, message: '请选择功能'}
                    ],
                },
                operData: [],
            }
        },
        props: {
            value: {
                default: [{}],
            }
        },
        created: function () {
            this.initData()
        },
        methods: {
            initData: function () {
            },
            dialogEditGroup: function () {
                this.operData = this.value.concat();
                this.editGroupDialogVisible = true;
            },
            addGroup: function () {
                this.operData.push({});
            },
            deleteGroup: function (index) {
                this.operData.splice(index, 1);
            },
            selectGroup: function (formName) {
                let valids = [];
                this.$refs[formName].forEach(item => {
                    item.validate(valid => {
                        valids.push(valid);
                    })
                });
                if (valids.every(item => item)) {
                    this.$emit('input',this.operData);
                    this.hideModal();
                }
            },
            hideModal: function () {
                this.editGroupDialogVisible = false;
            },
        }
    }
</script>

<style scoped lang="less">

</style>

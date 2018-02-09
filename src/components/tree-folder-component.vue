<template>
  <div class="tree-folder-items" v-if="company">
    <!--<div class="tree-folder-branch"></div>-->
    <div class="tree-folder-header-branch"></div>
    <div @click.prevent="choose(company)" class="tree-folder-item" :class="{active: (value.objectid == company.objectid)}">
      <div class="tree-folder-item-name">{{company.companyname}}</div>
      <div @click.stop="dialogEdit(company)" class="tree-folder-item-edit"></div>
      <div @click.stop="dialogDelete(company)" class="tree-folder-item-delete"></div>
      <div @click.stop="dialogAdd(company)" class="tree-folder-item-add"></div>
    </div>
    <div v-if="company.children.length" class="tree-folder-end-branch"></div>
    <tree-folder-contents-component :value="value" :children="company.children" v-on:edit="dialogEdit" v-on:add="dialogAdd" v-on:delete="dialogDelete" v-on:input="choose"></tree-folder-contents-component>
  </div>
</template>

<script>
    export default {
        props: {
            company: {
                type: Object,
                default: ''
            },
            value: {
                type: Object,
                default: {}
            }
        },
        methods: {
            dialogEdit: function (company) {
                this.$emit('edit', company)
            },
            dialogDelete: function (company) {
                this.$emit('delete', company)
            },
            dialogAdd: function (company) {
                this.$emit('add', company)
            },
            choose: function (company) {
                this.$emit('input', company)
            }
        }
    }
</script>

<style scoped lang="less">
  @lineHeight: 2px;
  @lineColor: #efefef;
  .tree-folder-items {
    position: relative;
    font-size: 0;
  }
  .tree-folder-header-branch,
  .tree-folder-end-branch,
  .tree-folder-branch{
    display: inline-block;
  }

  .tree-folder-item {
    display: inline-block;
    min-width: 200px;
    padding: 15px;
    margin: 9px 0;
    vertical-align: middle;
    background-color: #efefef;
    text-align: center;
    font-size: 16px;
    cursor: pointer;
    &:hover {
      background: #ccc;
    }
    &.active {
      background: #ccc;
    }
    .tree-folder-item-name {
      margin-bottom: 15px;
    }
    .tree-folder-item-edit {
      display: inline-block;
      width: 16px;
      height: 18px;
      margin-right: 30%;
      cursor: pointer;
      background-image: url("../assets/sys/edit.png");
    }
    .tree-folder-item-delete {
      display: inline-block;
      width: 14px;
      height: 18px;
      margin-right: 30%;
      cursor: pointer;
      background-image: url("../assets/sys/delete.png");
    }
    .tree-folder-item-add {
      display: inline-block;
      width: 18px;
      height: 18px;
      cursor: pointer;
      background-image: url("../assets/sys/add.png");
    }
  }
</style>

<template>
  <div class="tree-folder-items" v-if="company">
        <div class="tree-folder-item">
          <div class="tree-folder-item-name">{{company.name}}</div>
          <div class="tree-folder-item-edit"></div>
          <div class="tree-folder-item-delete"></div>
          <div class="tree-folder-item-add"></div>
        </div>
        <tree-folder-contents-component :children="company.children"></tree-folder-contents-component>
      </div>
</template>

<script>
    export default {
        props: {
            company: {
                type: Object,
                default: ''
            }
        }
    }
</script>

<style scoped lang="less">
  .tree-folder-items {
  }
  .tree-folder-item {
    display: inline-block;
    min-width: 200px;
    padding: 15px;
    margin-bottom: 18px;
    background-color: #efefef;
    text-align: center;
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

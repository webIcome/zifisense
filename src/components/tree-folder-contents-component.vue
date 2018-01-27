<template>
  <div class="tree-folder-children">
    <template v-for="child in children">
      <tree-folder-component v-if="child.children" :company="child"></tree-folder-component>
    </template>
  </div>
</template>

<script>
    export default {
        props: {
            children: {
                type: Array,
                default: []
            }
        }
    }
</script>

<style scoped lang="less">
  @lineHeight: 2px;
  @lineColor: #efefef;
  .tree-folder-children {
    display: inline-block;
    vertical-align: middle;
  }
</style>

<template>
  <div class="tree-folder-children">
    <template v-for="child in children">
      <tree-folder-component :value="value" v-if="child.children" :company="child" v-on:edit="dialogEdit" v-on:add="dialogAdd" v-on:delete="dialogDelete" v-on:input="choose"></tree-folder-component>
    </template>
  </div>
</template>

<script>
    export default {
        props: {
            children: {
                type: Array,
                default: []
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
  .tree-folder-children {
    display: inline-block;
    vertical-align: middle;
  }
</style>

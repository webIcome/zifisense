<template>
  <div class="modal fade" role="dialog">
    <div class="modal-dialog" :class="dialog" role="document">
      <div class="modal-content">
        <div v-if="header" class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <h4 class="modal-title">
            <slot name="title"></slot>
          </h4>
        </div>

        <div class="modal-body">
          <div v-if="bodyClose" class="clearfix">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <slot name="body"></slot>
        </div>

        <div v-if="footer" class="modal-footer">
          <slot name="btn"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: 'dialogComponent',
        data () {
            return {

            }
        },
        props: {
            dialog: {
                type: String,
                default: 'modal-log'
            },
            header: {
                type: Boolean,
                default: false
            },
            footer: {
                type: Boolean,
                default: false
            },
            bodyClose: {
                type: Boolean,
                default: true
            }
        }
    }
</script>

<style scoped lang="less">
</style>

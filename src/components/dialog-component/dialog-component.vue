<template>
  <div class="modal fade" role="dialog">
    <div class="modal-dialog" :class="dialog" role="document">
      <div class="modal-content">
        <div v-if="header" class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span class="close-img" aria-hidden="true"></span>
          </button>
          <h4 class="modal-title">
            <slot name="title"></slot>
          </h4>
        </div>

        <div class="modal-body clearfix">
          <div v-if="bodyClose" class="clearfix">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span class="close-img" aria-hidden="true"></span>
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
            return {}
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
  .close-img {
    display: inline-block;
    width: 25px;
    height: 25px;
    background-image: url("./imgs/close.png");
  }

  .dialog-title {
    text-align: center;
    font-size: 24px;
    color: #1789e1;
    margin-bottom: 40px;
  }

  .dialog-btn {
    text-align: center;
    .dialog-btn-icon {
      display: inline-block;
      width: 200px;
      height: 48px;
      line-height: 48px;
      background-image: url("./imgs/btn.png");
      font-size: 18px;
      color: #fff;
      margin-top: 50px;
      margin-bottom: 40px;
      cursor: pointer;
      border: none;
      &[disabled] {
        cursor: not-allowed;
        filter: alpha(opacity=65);
        box-shadow: none;
        opacity: .65;
      }
      &:hover {
        background-image: url("./imgs/btn-active.png");
      }
    }
  }
  p{
    font-size: 16px;
    white-space: normal;
    &.title {
      font-size: 20px;
      margin-bottom: 40px;
      color: #000;
      text-align: center;
    }
  }

  .dialog-warning {
    display: inline-block;
    width: 56px;
    height: 47px;
    margin-bottom: 40px;
    background-image: url("./imgs/warning.png");
  }
</style>

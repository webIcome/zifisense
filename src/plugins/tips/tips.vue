<template>
  <div class="tips-content" v-show="isShow">
    <div :class="{'tips-content-fail': isFail, 'tips-content-normal': isNormal}">{{msg}}
    </div>
  </div>
</template>
<script type="text/babel">
    export default {
        data() {
            return {
                isShow: false,
                msg: '请检查网络',
                isNormal: false,
                isFail: false,
            }
        },
        methods: {

            show() {
                this.isShow = true
                setTimeout(() => {
                    this.isShow = false
                }, 2000)
            },
            success (msg) {
                this.resetData();
                this.isNormal = true;
                if (msg) {
                    this.msg = msg;
                }else {
                    this.msg = '操作成功'
                }
                this.show();
            },
            fail (msg) {
                this.resetData();
                this.isFail = true;
                if (msg) {
                    this.msg = msg;
                }else {
                    this.msg = '请检查网络'
                }
                this.show();
            },
            hide() {
                this.isShow = false
            },
            resetData() {
                this.isNormal = false;
                this.isFail = false;
                this.msg = '请检查网络';
            }
        },
    }
</script>

<style lang="less" scope>

  .tips-content {
    position: fixed;
    top: 100px;
    left: 50%;
    background: transparent;
    animation: change 2s infinite;
    .tips-content-fail,
    .tips-content-normal {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 200px;
      text-align: center;
      margin-left: -50px;
      border-radius: 10px;
      padding: 10px;
      z-index: 999;
    }
    .tips-content-fail {
      background: rgba(255, 0, 0, 0.1);
      color: red;
    }
    .tips-content-normal {
      background: rgba(0, 225, 0, 0.1);
      color: #5cb85c ;
    }
  }

  @-webkit-keyframes change {
    0% {
      opacity: .3;
    }
    40% {
      opacity: 1;
    }
    60% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

</style>
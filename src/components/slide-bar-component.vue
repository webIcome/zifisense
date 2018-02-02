<template>
  <div class="slide-bar">
    <div class="slide-bar-progress">
      <div class="slide-bar-progress-bar">
        <div class="slide-bar-progress-value" role="progressbar" aria-valuenow="60" aria-valuemin="0"
             aria-valuemax="100" style="width: 60%;"></div>
        <div class="slide-bar-progress-btn" :style="slideBarBtnStyle">
          <div class="slide-bar-progress-btn-circle" @mousedown="mousedown" @mouseup="mouseup"></div>
          <div class="slide-bar-progress-btn-value" @mousedown="mousedown" @mouseup="mouseup">{{value}}</div>
        </div>
        <div class="slide-bar-min">{{min}}</div>
        <div class="slide-bar-max">{{max}}</div>
      </div>
      <input class="slide-bar-input"/>
    </div>
  </div>

</template>
<script>
    export default{
        name: 'slideBarComponent',
        data() {
            return {
                length: 2
            }
        },
        computed: {
            slideBarBtnStyle: function () {
                return {
                    left: this.slideBarWith
                }
            },
            slideBarWith: function () {
                return (this.length / this.max) * 100 + '%';
            }
        },
        created: function () {
            this.length = this.value;
        },
        props: {
            min: {
                default: 0,
                type: Number
            },
            max: {
                type: Number,
                default: 100
            },
            value: {
                type: Number,
                default: 0
            },
        },
        methods: {
            moveBtn: function (event) {
                console.log(event)
            },
            move: function (length) {
                let width = $('.slide-bar-progress-bar').width();
                let perent = this.max/width;
                this.length += perent * length;
                console.log(this.length)
            },
            mousedown: function (event) {
                let offsetX = event.offsetX;
                $(document).on('mousemove.drag', (event)=> {
                    this.move(event.offsetX - offsetX);
                })
                $('body').off('mouseup').on('mouseup', () => {
                    $(document).off('mousemove.drag')
                })
            },
            mouseup: function (event) {
                $(document).off('mousemove.drag');
                this.$emit('input', this.length)
            }
        }
    }
</script>
<style lang="less" scoped="">
  .slide-bar {
    position: relative;
    width: 100%;
    .slide-bar-progress {
      width: 100%;
      .slide-bar-progress-bar {
        position: relative;
        display: inline-block;
        width: 80%;
        height: 5px;
        box-shadow: inset 0 1px 2px rgba(0, 0, 0, .1);
        border-radius: 4px;
        background-image: linear-gradient(to bottom, #ebebeb 0, #f5f5f5 100%);
        .slide-bar-progress-value {
          background-color: #6cd18a;
          height: 100%;
        }
        .slide-bar-min,
        .slide-bar-max,
        .slide-bar-progress-btn {
          position: absolute;
          display: inline-block;
          font-size: 14px;
        }
        .slide-bar-min {
          left: 0;
          bottom: -25px;
        }
        .slide-bar-max {
          right: 0px;
          bottom: -25px;
        }
        .slide-bar-progress-btn {
          .slide-bar-progress-btn-circle {
            cursor: pointer;
            height: 15px;
            width: 15px;
            border-radius: 50%;
            background-color: #6cd18a;
            position: absolute;
            top: -9px;
          }
          .slide-bar-progress-btn-value {
            cursor: pointer;
            text-align: center;
            position: relative;
            width: 35px;
            height: 20px;
            border: 1px solid #e5e5e5;
            background-color: #fff;
            top: 15px;
            left: -10px;
            border-radius: 3px;
            padding: 0 9px;
            z-index: 999;
            color: #666;
            &:before {
              position: absolute;
              content: "";
              width: 0;
              height: 0;
              left: 9px;
              top: -6px;
              border-left: 7px solid transparent;
              border-right: 7px solid transparent;
              border-bottom: 7px solid #e5e5e5;
            }
            &:after {
              position: absolute;
              content: "";
              width: 0;
              height: 0;
              left: 10px;
              top: -5px;
              border-left: 6px solid transparent;
              border-right: 6px solid transparent;
              border-bottom: 6px solid #fff;
            }
          }
        }
      }
      .slide-bar-input {
        display: inline-block;
        width: 50px !important;
      }
    }
  }

</style>
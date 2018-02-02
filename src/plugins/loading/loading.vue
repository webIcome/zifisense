<template>
  <transition :name="animateName">
    <div class="loadings" v-show="isShow">
      <div class="juhua-loading" >
        <div class="jh-circle1 jh-circle-ios"></div>
        <div class="jh-circle2 jh-circle-ios"></div>
        <div class="jh-circle3 jh-circle-ios"></div>
        <div class="jh-circle4 jh-circle-ios"></div>
        <div class="jh-circle5 jh-circle-ios"></div>
        <div class="jh-circle6 jh-circle-ios"></div>
        <div class="jh-circle7 jh-circle-ios"></div>
        <div class="jh-circle8 jh-circle-ios"></div>
        <div class="jh-circle9 jh-circle-ios"></div>
        <div class="jh-circle10 jh-circle-ios"></div>
        <div class="jh-circle11 jh-circle-ios"></div>
        <div class="jh-circle12 jh-circle-ios"></div>
      </div>
    </div>
  </transition>
</template>
<script type="text/babel">
    export default {
        data() {
            return {
                isShow: false,
                hasAnimate: true,
            }
        },
        computed: {
            /**
             * 动画效果样式，没有返回空
             * @return {String} 样式
             */
            animateName() {
                return this.hasAnimate ? 'opacity' : ''
            },
        },
        methods: {
            /**
             * 开启动画效果
             */
            opemAnimate() {
                this.hasAnimate = true
            },
            /**
             * 去除动画效果
             * @return {Promise} 返回promise
             */
            removeAnimate() {
                return new Promise((resolve) => {
                    this.hasAnimate = false
                    resolve()
                })
            },
            /**
             * 显示动画loading
             */
            show() {
                this.isShow = true
            },
            /**
             * 隐藏动画loading
             */
            hide() {
                this.isShow = false
            },
        },
    }
</script>

<style lang="less" scope>

  .loadings {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: transparent;
  }

  .juhua-loading {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100px;
    height: 100px;
    margin-left: -50px;
    margin-top: -50px;
    background: rgba(0,0,0,0.1);
    border-radius: 10px;
  }


  .juhua-loading .jh-circle-ios {
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -20px;
    margin-top: -20px;
    width: 40px;
    height: 40px;
  }

  .juhua-loading .jh-circle-ios:before {
    content: '';
    display: block;
    margin: 5% auto;
    width: 6%;
    height: 25%;
    background-color: #555;
    -webkit-animation: jh-circleFadeDelay-ios 1.2s infinite ease-in-out both;
    animation: jh-circleFadeDelay-ios 1.2s infinite ease-in-out both;
  }

  .juhua-loading .jh-circle2 {
    -webkit-transform: rotate(30deg);
    -ms-transform: rotate(30deg);
    transform: rotate(30deg);
  }

  .juhua-loading .jh-circle3 {
    -webkit-transform: rotate(60deg);
    -ms-transform: rotate(60deg);
    transform: rotate(60deg);
  }

  .juhua-loading .jh-circle4 {
    -webkit-transform: rotate(90deg);
    -ms-transform: rotate(90deg);
    transform: rotate(90deg);
  }

  .juhua-loading .jh-circle5 {
    -webkit-transform: rotate(120deg);
    -ms-transform: rotate(120deg);
    transform: rotate(120deg);
  }

  .juhua-loading .jh-circle6 {
    -webkit-transform: rotate(150deg);
    -ms-transform: rotate(150deg);
    transform: rotate(150deg);
  }

  .juhua-loading .jh-circle7 {
    -webkit-transform: rotate(180deg);
    -ms-transform: rotate(180deg);
    transform: rotate(180deg);
  }

  .juhua-loading .jh-circle8 {
    -webkit-transform: rotate(210deg);
    -ms-transform: rotate(210deg);
    transform: rotate(210deg);
  }

  .juhua-loading .jh-circle9 {
    -webkit-transform: rotate(240deg);
    -ms-transform: rotate(240deg);
    transform: rotate(240deg);
  }

  .juhua-loading .jh-circle10 {
    -webkit-transform: rotate(270deg);
    -ms-transform: rotate(270deg);
    transform: rotate(270deg);
  }

  .juhua-loading .jh-circle11 {
    -webkit-transform: rotate(300deg);
    -ms-transform: rotate(300deg);
    transform: rotate(300deg);
  }

  .juhua-loading .jh-circle12 {
    -webkit-transform: rotate(330deg);
    -ms-transform: rotate(330deg);
    transform: rotate(330deg);
  }

  .juhua-loading .jh-circle2:before {
    -webkit-animation-delay: -1.1s;
    animation-delay: -1.1s;
  }

  .juhua-loading .jh-circle3:before {
    -webkit-animation-delay: -1s;
    animation-delay: -1s;
  }

  .juhua-loading .jh-circle4:before {
    -webkit-animation-delay: -0.9s;
    animation-delay: -0.9s;
  }

  .juhua-loading .jh-circle5:before {
    -webkit-animation-delay: -0.8s;
    animation-delay: -0.8s;
  }

  .juhua-loading .jh-circle6:before {
    -webkit-animation-delay: -0.7s;
    animation-delay: -0.7s;
  }

  .juhua-loading .jh-circle7:before {
    -webkit-animation-delay: -0.6s;
    animation-delay: -0.6s;
  }

  .juhua-loading .jh-circle8:before {
    -webkit-animation-delay: -0.5s;
    animation-delay: -0.5s;
  }

  .juhua-loading .jh-circle9:before {
    -webkit-animation-delay: -0.4s;
    animation-delay: -0.4s;
  }

  .juhua-loading .jh-circle10:before {
    -webkit-animation-delay: -0.3s;
    animation-delay: -0.3s;
  }

  .juhua-loading .jh-circle11:before {
    -webkit-animation-delay: -0.2s;
    animation-delay: -0.2s;
  }

  .juhua-loading .jh-circle12:before {
    -webkit-animation-delay: -0.1s;
    animation-delay: -0.1s;
  }

  @-webkit-keyframes jh-circleFadeDelay-ios {
    0%,
    39%,
    100% {
      opacity: .3;
    }
    40% {
      opacity: 1;
    }
  }

  @keyframes jh-circleFadeDelay-ios {
    0%,
    39%,
    100% {
      opacity: .3;
    }
    40% {
      opacity: 1;
    }
  }
</style>
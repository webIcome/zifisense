/**
 * Created by spring on 2018/2/2.
 */
export default {
    /**
     * 每个插件都有的install方法，用于安装插件
     * @param {Object} Vue - Vue类
     * @param {Object} [pluginOptions] - 插件安装配置
     */
    install(Vue, pluginOptions = {}) {
        function $slideBarInit(options) {
            let $id = options.select;
            let min = options.min;
            let max = options.max;
            let value = options.value;
            $id = $($id);
            let width = $id.width() - 60;
            // $id.width(width + 60);
            let circle = 'circle' + new Date().getTime(),
                berin = 'berin' + new Date().getTime(),
                range = 'range' + new Date().getTime(),
                boxText = 'boxText' + new Date().getTime(),
                brightLamp = 'brightLamp' + new Date().getTime();
            let html = '<div class="slide-bar"> ' +
                '<div class="slide-bar-out"id="' + range + '" style="width: ' + width + 'px;">' +
                '<div class="slide-bar-in" id="' + berin + '">' +
                '<div class="slide-bar-circle" id="' + circle + '"><div class="slide-bar-box"id="' + boxText + '"></div></div></div>' +
                '<span class="slide-bar-min">' + min + '</span><span class="slide-bar-max">' + max + '</span>' +
                '</div>' +
                '<input type="text" name="brightness" class="form-control slide-bar-input"id="' + brightLamp + '"></div>';
            let style = `<style>
 .slide-bar {
            height: 34px;
    padding-top: 10px;
    position: relative;
            }
            .slide-bar-out {
                position: relative;
    width: 250px;
    height: 5px;
    background-color: #e5e5e5;
    border-radius: 3px;
            }
            .slide-bar-in {
                position: absolute;
    left: 0px;
    width: 0px;
    height: 5px;
    background-color: #6cd18a;
    border-radius: 3px;
    }
    .slide-bar-circle {
        cursor: pointer;
    height: 15px;
    width: 15px;
    border-radius: 50%;
    background-color: #6cd18a;
    position: absolute;
    top: -5px;
    right: -7px;
    }
    .slide-bar-box {
    user-select: none;
    text-align: center;
    position: relative;
    width: 35px;
    height: 20px;
    border: 1px solid #e5e5e5;
    background-color: #fff;
    top: 23px;
    left: -11px;
    border-radius: 3px;
    z-index: 999;
    color: #666;
    font-size: 14px;
    }
    .slide-bar-box:before {
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
    .slide-bar-box:after {
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
    .slide-bar-min {
        position: absolute;
    left: -5px;
    top: 10px;
    font-size: 14px;
    user-select: none
    }
    .slide-bar-max{
    position: absolute;
    right: -5px;
    top: 10px;
    font-size: 14px;
    user-select: none
    }
    .slide-bar-input {
        width: 50px !important;
    position: absolute;
    top: 0px;
    height: 26px;
    right: 0px;
   text-align:center
    }
          
</style>`
            $id.append(html);

            $('head').append(style)
            let $berin = $('#' + berin);
            let $range = $('#' + range);
            let $brightLamp = $('#' + brightLamp);
            let $boxText = $('#' + boxText);
            $('#' + circle).on({
                mousedown: function (e) {
                    var el = $(this);
                    var os = el.offset();
                    var wth = el.parent().parent().width();
                    var parentPositionLeft = el.parent().offset().left;
                    var parentPositionRight = parentPositionLeft + wth;
                    var dx = e.pageX - os.left, dy = e.pageY - os.top;
                    $(document).on('mousemove.drag', function (e) {
                        var position = e.pageX - dx;
                        var leftset = position;
                        if (position > parentPositionRight) {
                            leftset = parentPositionRight;
                        } else if (position < parentPositionLeft) {
                            leftset = parentPositionLeft;
                        }
                        $berin.width(leftset - parentPositionLeft);
                        var result = parseInt((leftset - parentPositionLeft) / wth * (max - min)) + min;
                        $brightLamp.val(result);
                        $boxText.html(result);
                        value = result;
                    });
                },
                mouseup: function (e) {
                    $(document).off('mousemove.drag');
                },
                mouseleave: function () {
                    // $(document).off('mousemove.drag');
                }
            });
            $brightLamp.val(min);
            $boxText.html(min);
            // 绑定输入框事件
            $brightLamp.on('change onpropertychange ', function () {
                var thiz = $(this);
                var writeVal = thiz.val();
                if (!(/^(?!0[0-9]+)[0-9]*$/.test(writeVal)) || !writeVal) {
                    writeVal = value;
                }
                writeVal = writeVal > max ? max : writeVal;
                writeVal = writeVal < min ? min : writeVal;
                $boxText.html(writeVal);
                var wth = $range.width();
                var newWidth = parseInt((writeVal - min) / (max - min) * wth);//新宽度
                $berin.width(newWidth);
                thiz.val(writeVal);
                value = writeVal;
            });
            $('body').off('mouseup').on('mouseup', function () {
                $(document).off('mousemove.drag');
            });
            if (value) {
                $brightLamp.val(value > max ? max : value);
                $brightLamp.trigger('change');
            } else {
                value = min;
            }
            // 返回输入框对象
            return $brightLamp;
        }

        Vue.slideBarInit = Vue.prototype.$slideBarInit = $slideBarInit
    },
}
/**
 *
 * Created by spring on 2018/2/2.
 */
import SlideBar from './slide-bar';
import GlobalCache from './global-cache';
import Common from './common';
import Tips from './tips/tips';
import VeeValidate from 'vee-validate'
import {Select, Slider, Message, DatePicker, Form, Button, Checkbox, Input, Switch, Radio} from 'element-ui';
Message.install = function (Vue, opttions) {
    Vue.prototype.$message = Message
}
export default [
    SlideBar,
    GlobalCache,
    Common,
    Tips,
    VeeValidate,
    Select,
    Slider,
    Form,
    Button,
    Checkbox,
    Input,
    Switch,
    Radio,
    Message,
    DatePicker
]
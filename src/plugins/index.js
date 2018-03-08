/**
 *
 * Created by spring on 2018/2/2.
 */
import SlideBar from './slide-bar';
import GlobalCache from './global-cache';
import Common from './common';
import Tips from './tips/tips';
import VeeValidate from 'vee-validate'
import {Pagination,Select, Slider, Message, Dialog, FormItem, DatePicker, Form, Button, Checkbox, Input, Switch, Radio,Option,Col,Row,Table,TableColumn,TimePicker,RadioGroup,RadioButton,Transfer} from 'element-ui';
Message.install = function (Vue, opttions) {
    Vue.prototype.$message = Message
}
export default [
    Transfer,
    Pagination,
    Dialog,
    Input,
    Radio,
    RadioGroup,
    RadioButton,
    Checkbox,
    Switch,
    Select,
    Option,
    Button,
    Table,
    TableColumn,
    DatePicker,
    TimePicker,
    Form,
    FormItem,
    Slider,
    Col,
    Row,
    Message,
    SlideBar,
    GlobalCache,
    Common,
    Tips,
    VeeValidate,
]
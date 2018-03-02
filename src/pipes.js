/**
 * Created by spring on 2018/1/19.
 */
import moment from "moment";
import Common from './constants/common';
export default {
    formDate: _formDate,
    lampTypeNameConverter: _lampTypeNameConverter,
    powerTypeNameConverter: _powerTypeNameConverter,
}
function _formDate(date, pattern) {
    if (!pattern) pattern = 'YYYY-MM-DD HH:mm:ss';
    return moment(date).format(pattern);
}
function _lampTypeNameConverter(value) {
    let name = value;
    Common.lampType.forEach(item => {
        if (Number(value) == item.value) {
            name = item.text;
        }
    });
    return name;
}
function _powerTypeNameConverter(value) {
    let name = value;
    Common.powerType.forEach(item => {
        if (Number(value) == item.value) {
            name = item.text;
        }
    });
    return name;
}
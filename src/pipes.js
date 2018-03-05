/**
 * Created by spring on 2018/1/19.
 */
import moment from "moment";
import Common from './constants/common';
export default {
    formDate: _formDate,
    lampTypeNameConverter: _lampTypeNameConverter,
    powerTypeNameConverter: _powerTypeNameConverter,
    deviceTypeNameConverter: _deviceTypeNameConverter,
    deviceStateNameConverter: _deviceStateNameConverter,
    runningstateNameConverter: _runningstateNameConverter,
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
function _deviceTypeNameConverter(value) {
    let name = value;
    Common.deviceType.forEach(item => {
        if (Number(value) == item.value) {
            name = item.text;
        }
    });
    return name;
}
function _deviceStateNameConverter(value) {
    let name = value;
    Common.deviceState.forEach(item => {
        if (Number(value) == item.value) {
            name = item.text;
        }
    });
    return name;
}

function _runningstateNameConverter(value) {
    let name = value;
    Common.runningStatus.forEach(item => {
        if (Number(value) == item.value) {
            name = item.text;
        }
    });
    return name;
}
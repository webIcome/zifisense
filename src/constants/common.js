/**
 * Created by spring on 2018/1/17.
 */
const CommonConstant = {
    lampType: [
        {value: 0, text: '所有'},
        {value: 1, text: '高压钠灯'},
        {value: 2, text: 'LED灯'},
        {value: 3, text: '高压金卤灯'},
        {value: 4, text: '无极灯'},
        {value: 5, text: '普通灯具'},
    ],
    powerType: [
        {value: 0, text: '所有'},
        {value: 1, text: '电感镇流器'},
        {value: 2, text: '电子镇流器'},
        {value: 3, text: '恒流驱动电源'},
        {value: 4, text: '调色温驱动电源'},
    ],
    deviceType: [
        {value: 1, text: '灯控器', name: 'light'},
        {value: 2, text: '回路控制器', name: 'loop'},
        {value: 3, text: '控制面板', name: 'panel'},
    ],
    deviceState: [
        {value: 1, text: '应用'},
        {value: 2, text: '停用'},
    ],
    runningStatus: [
        {value: 1, text: '正常'},
        {value: 2, text: '欠流'},
        {value: 3, text: '过流'},
        {value: 4, text: '欠压'},
        {value: 5, text: '过压'},
    ],
    switchState: [
        {value: 1, text: '开'},
        {value: 2, text: '关'},
    ],
    lightControllerType: [
        {value: 1, text: '电源蓝牙'},
        {value: 2, text: '电源ZETA'},
        {value: 3, text: '电源蓝牙+ZETA'},
        {value: 4, text: '外挂式蓝牙'},
        {value: 5, text: '外挂式ZETA'},
        {value: 6, text: '外挂式蓝牙+ZETA'},
    ],
    sensorType: [
        {value: 1, text: '无'},
        {value: 2, text: '光感'},
        {value: 3, text: '微波'},
    ],
    strategyState: [
        {value: 1, text: '未下发'},
        {value: 2, text: '已下发'},
    ],
    apps: [
        {appcode: 'LAMP', appname: '路灯', name: 'lamp'},
        {appcode: 'INTELLIGENTLIGHTING', appname: '智慧照明', name: 'light'},
        {appcode: 'JLLPROPERTY', appname: '智慧物业', name: 'property'},
        {appcode: 'XTQX', appname: '系统管理', name: 'sys'},
    ],
    vendor: [
        {value: 1, text: '纵行zeta'},
    ],
    week: [
        {value: 1, text: '周一'},
        {value: 2, text: '周二'},
        {value: 3, text: '周三'},
        {value: 4, text: '周四'},
        {value: 5, text: '周五'},
        {value: 6, text: '周六'},
        {value: 0, text: '周天'},
    ],
    enableSensor: [
        {value: 1, text: '有效'},
        {value: 2, text: '无效'},
    ],
    sign: [
        {value: 1, text: '开启'},
        {value: 2, text: '关闭'},
    ],
    mode: [
        {value: 1, text: '全控制模式'},
        {value: 2, text: '情景模式'},
        {value: 3, text: '组控制模式'},
    ]
};

export default CommonConstant;
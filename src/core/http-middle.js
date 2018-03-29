import HttpClient from './http-vue';
import {Message} from 'element-ui'

export default {
    get: function (url, option) {
        return HttpClient.get(url, option).then(response => {
            handleRes(response);
            return response
        }).catch(handleError)
    },
    post: function (url, body, option) {
        return HttpClient.post(url, body, option).then(response => {
            handleRes(response);
            return response
        }).catch(handleError)
    },
    delete: function (url, option) {
        return HttpClient.delete(url, option).then(response => {
            handleRes(response);
            return response
        }).catch(handleError)
    },
    put: function (url, body, option) {
        return HttpClient.delete(url, body, option).then(response => {
            handleRes(response);
            return response
        }).catch(handleError)
    },
}

function handleRes(response) {
    if (response.body.code == 10001 || response.body.code == 422){
        error(response.body.errorMap)
    } else if (response.body.code == 10002) {
        error(response.body.msg)
    } else if (response.body.code == 20000) {
        error('系统内部错误')
    }
    else if(response.body.code == 500) {
        error('服务器500错误')
    }
    if (!(response.status == 200 || response.status == 304)) {
        error('服务器网络问题，请联系管理员')
    }
}

function handleError(error) {
    Message({
        message: error.message,
        type: 'warning',
        duration: 2000
    })
}

function error(msg) {
    if (msg instanceof Object) {
         msg = JSON.stringify(msg)
    }
    throw new Error(msg)
}
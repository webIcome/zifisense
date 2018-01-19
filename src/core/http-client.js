/**
 * Created by spring on 2018/1/17.
 */
import Config from '../config'
let Xhr;
export default class HttpClient {
    static get(url, data) {
        return _request('GET', url, data);
    }

    static post(url, data) {
        return _request('POST', url, data);
    }

    static getPaging(url, data) {
        return _requestPaging(url, data)
    }
}

function _request(method, url, data) {
    return new Promise(function (resolve, reject) {
         $.ajax({
            url: Config.URL_API + url,
            type: method,
            dataType: 'json',
            data: data,
            xhrFields: {
                withCredentials: true
            },
            beforeSend: function (XMLHttpRequest) {
                XMLHttpRequest.setRequestHeader("x-request-with", "XMLHttpRequest");
            },
            success: function (res) {
                resolve(res)
            },
            fail: function (res) {
                reject(res)
            },
            error: function (xhr) {
                if (xhr.status == 401) {
                    window.vue.$router.push('/login')
                } else {
                    reject(xhr)
                }
            }
        })
    })
}

function _requestPaging(url, data) {
    return new Promise(function (resolve, reject) {
        if (Xhr && Xhr.state() == 'pending') {
            Xhr.abort();
        }
        Xhr = $.ajax({
            url: Config.URL_API + url,
            type: 'GET',
            dataType: 'json',
            data: data,
            xhrFields: {
                withCredentials: true
            },
            beforeSend: function (XMLHttpRequest) {
                XMLHttpRequest.setRequestHeader("x-request-with", "XMLHttpRequest");
            },
            success: function (res) {
                resolve(res)
            },
            fail: function (res) {
                reject(res)
            },
            error: function (xhr) {
                if (xhr.status == 401) {
                    // window.vue.$router.push(xhr.responseJSON.url)
                    window.vue.$router.push('/login')
                } else if(xhr.readyState != 4 && Xhr.state() == 'pending') {
                    resolve()
                } else {
                    reject(xhr)
                }
            }
        })
    })
}
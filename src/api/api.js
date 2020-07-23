import axios from 'axios'
import {Message} from 'element-ui';
import { BASE_URL } from './base.url';


axios.defaults.timeout = 500000;
axios.defaults.baseURL = BASE_URL;

class Request {
    constructor() {
        // this.baseUrl = BASE_URL;
    }

    send= function (options) {
        axios(options)
            .then(response => {
                options.callback({
                    type: "success",
                    message: '请求成功',
                    data: response.data
                })
            })
            .catch(error => {
                options.callback({
                    type: "error",
                    message: '请求数据发生错误'
                })
                Message.error({
                    message: error,
                    duration: 3000
                })
            });
    }

    get= function (config) {
        return this.send(
            Object.assign({}, config, { method:'GET' })
        );
    }

    post= function (config) {
        return this.send(
            Object.assign({}, config, { method:'POST' })
        );
    }


    put = function(config) {
        this.config = config;
        return this.send(
            Object.assign({}, config, { method: "PUT" })
        );
    };
}

export function getChartDataByCode(data, callback) {
    return new Request().get({
        url: '/handler/biHandler/dataGet?code='+data.code,
        callback
    });
}

export function getAllConfiguration ( callback) {
    return new Request().get({
        url: '/handler/biHandler/echartSearch',
        callback
    });
}

export function getChartDataById (data, callback) {
    return new Request().post({
        url: 'handler/biHandler/echartGet',
        data,
        callback
    });
}

export function saveConfigration (data, callback) {
    return new Request().post({
        url: 'handler/biHandler/saveEchart',
        data,
        callback
    });
}
export function uploadImg (data, callback) {
    let config = {
        headers: {'Content-Type': 'multipart/form-data'}
    };
    axios.post('/handler/biHandler/coverUpload', data, config)
        .then(response => {
             callback(response)
        })
}

export function loadImg (data, callback) {
    return new Request().post({
        url: 'handler/biHandler/coverGet',
        data,
        callback
    });
}


export function deleteConfiguration (data, callback) {
    return new Request().post({
        url: 'handler/biHandler/deleteEchart',
        data,
        callback
    });
}
export function viewChartById (data, callback) {
    return new Request().post({
        url: 'handler/biHandler/echartGet',
        data,
        callback
    });
}

export function editChartById (data, callback) {
    return new Request().post({
        url: 'handler/biHandler/echartGet',
        data,
        callback
    });
}





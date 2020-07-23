export function setCookie(c_name, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie =
        c_name +
        '=' +
        escape(value) +
        (expiredays == null ? '' : ';expires=' + exdate.toGMTString()) +
        ';path=/';
}

export function getCookie(name) {
    var arr,
        reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
    if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
    else return null;
}

export function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
        document.cookie =
            name + '=' + cval + ';expires=' + exp.toGMTString() + ';path=/';
}

export function parseQuery(str) {
    var qso = {};
    var qs = str || document.location.search;
    // Check for an empty querystring
    if (qs == '') {
        return qso;
    }
    // Normalize the querystring
    qs = qs.replace(/(^\?)/, '').replace(/;/g, '&');
    while (qs.indexOf('&&') != -1) {
        qs = qs.replace(/&&/g, '&');
    }
    qs = qs.replace(/([\&]+$)/, '');
    // Break the querystring into parts
    qs = qs.split('&');
    // Build the querystring object
    for (var i = 0; i < qs.length; i++) {
        var qi = qs[i].split('=');
        qi = qi.map(function(n) {
            return decodeURIComponent(n);
        });
        if (qso[qi[0]] != undefined) {
            // If a key already exists then make this an object
            if (typeof qso[qi[0]] == 'string') {
                var temp = qso[qi[0]];
                if (qi[1] == '') {
                    qi[1] = null;
                }
                qso[qi[0]] = [];
                qso[qi[0]].push(temp);
                qso[qi[0]].push(qi[1]);
            } else if (typeof qso[qi[0]] == 'object') {
                if (qi[1] == '') {
                    qi[1] = null;
                }
                qso[qi[0]].push(qi[1]);
            }
        } else {
            // If no key exists just set it as a string
            if (qi[1] == '') {
                qi[1] = null;
            }
            qso[qi[0]] = qi[1];
        }
    }
    return qso;
}

export function dateFormat(jsonDt, format) {
    var date, timestamp, dtObj;
    timestamp = jsonDt.replace(/\/Date\((\d+)\)\//, '$1');
    date = new Date(Number(timestamp));
    dtObj = {
        'M+': date.getMonth() + 1, //月
        'd+': date.getDate(), //日
        'h+': date.getHours(), //时
        'm+': date.getMinutes(), //分
        's+': date.getSeconds() //秒
    };
    //因为年份是4位数，所以单独拿出来处理
    if (/(y+)/.test(format)) {
        format = format.replace(
            RegExp.$1,
            (date.getFullYear() + '').substr(4 - RegExp.$1.length)
        );
    }
    for (var k in dtObj) {
        //dtObj的属性名作为正则进行匹配
        if (new RegExp('(' + k + ')').test(format)) {
            //月，日，时，分，秒 小于10时前面补 0
            format = format.replace(
                RegExp.$1,
                RegExp.$1.length == 1
                    ? dtObj[k]
                    : ('00' + dtObj[k]).substr(('' + dtObj[k]).length)
            );
        }
    }
    return format;
}

export const pushHistory = () => {
    let state = { title: '', url: '' };
    window.history.pushState(state, state.title, state.url);
};

export function trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, '');
}

/**
 * 深拷贝，处理数组及对象
 */
export function deepCopy(o) {
    if (o instanceof Array) {
        let n = [];
        for (let i = 0; i < o.length; ++i) {
            n[i] = deepCopy(o[i]);
        }
        return n;
    } else if (o instanceof Object) {
        let n = {};
        for (let i in o) {
            n[i] = deepCopy(o[i]);
        }
        return n;
    } else {
        return o;
    }
}

/**
 *
 * @param data 数组，后台接收
 * @param legendData 数组 前端定义
 */
export function formatData(data,legendData){

    let res={};
    let xAxisData=[];
    let yAxisName="";
    let length=legendData.length;
    let seriesData=new Array(length);

    data.forEach((item,index)=>{
        xAxisData[index]=item.x;
    })


    for (let i = 0; i < length ; i++) {
        seriesData[i]={};
        seriesData[i].name=legendData[i];
        seriesData[i].data=[];
        for (let j = 0; j <data.length ; j++) {
            seriesData[i].data[j]=data[j]['qty'+(i+1)]
        }
    }

    res.xAxisData=xAxisData;
    res.seriesData=seriesData;
    res.yAxisName=yAxisName;
    return res;


}

/**
 *
 * @param dataurl
 * @param filename
 * @returns {*}
 *   base64  转 file 表单形式
 */
export function base64ToBlob(urlData){
    var mimeString = urlData.split(',')[0].split(':')[1].split(';')[0]; // mime类型
    var byteString = atob(urlData.split(',')[1]); //base64 解码
    var arrayBuffer = new ArrayBuffer(byteString.length); //创建缓冲数组
    var intArray = new Uint8Array(arrayBuffer); //创建视图
    for (var i = 0; i < byteString.length; i++) {
        intArray[i] = byteString.charCodeAt(i);
    }
    return new Blob([intArray], {type: mimeString});
}

//  如果是base64 的啦 如何转换成file对像 使用原有的接口上传啦
export function base64ToFile(urlData,fileName) {

    let arr = urlData.split(',');
    let mime = arr[0].match(/:(.*?);/)[1];
    let bytes = atob(arr[1]); // 解码base64
    let n = bytes.length
    let ia = new Uint8Array(n);
    while (n--) {
        ia[n] = bytes.charCodeAt(n);
    }
    return new File([ia], fileName, { type: mime });

}
import Mock from 'mockjs'
const Random=Mock.Random;//Random工具
import echartSearch from './echartSearch'
import dataGet from './dataGet'
import echartGet from './echartGet'

const url_dataGet="http://localhost:8080/api/handler/biHandler/dataGet"

/*Mock.setup({ //表示 400 毫秒 后才会返回响应内容；
    timeout: 400
})*/
/*延时*/
Mock.setup({
    timeout: '1000-4000' //表示响应时间介于 200 和 600 毫秒之间。默认值是'10-100'。
})

Mock.mock('http://localhost:8080/api/handler/biHandler/echartSearch', 'get', () => {
    return echartSearch
})
/*正则*/
Mock.mock(RegExp(url_dataGet + ".*"), 'get', () => {
    return dataGet
})

Mock.mock('http://localhost:8080/api/handler/biHandler/deleteEchart', 'post', () => {
    return {message:"模拟删除成功"}
})

/*post参数匹配对应1，6，9*/
Mock.mock('http://localhost:8080/api/handler/biHandler/echartGet', 'post', (request) => {
        const {id} = JSON.parse(request.body)
        switch (id) {
            case 37:
                return echartGet[0]
            case 32:
                return  echartGet[2]
            case 26:
                return echartGet[3]
        }

})

// vue.config.js
module.exports = {
    // vue项目中关闭eslint
    lintOnSave: 'warning',//boolean | 'warning' | 'default' | 'error'
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
    outputDir:"../bi/assets",
    assetsDir:"static",
    transpileDependencies: [
        'vue-echarts',
        'resize-detector'
    ],
    devServer: {
        /* 自动打开浏览器 */
        open: true,
        /* 设置为0.0.0.0则所有的地址均能访问 */
        host: '0.0.0.0',
        port: 8080,
        https: false,
        hotOnly: false,
        overlay: {
            warnings: false,
            errors: true
        },
        proxy: {
            '/api': {
                target: 'http://localhost:8030', //  目标地址 测试服
                ws: true, // 是否代理websockets
                changeOrigin: true, // 设置同源  默认false，是否需要改变原始主机头为目标URL,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
}
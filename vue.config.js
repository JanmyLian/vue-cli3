/**
 * *@2020-01-06
 * *@update 2020-06-24
 * *@author wendy
 * *@describe vue-cli 3.x配置文件
 */

const DEBUG = process.env.NODE_ENV !== "production";

let { PAGES } = require('./pages.config.js')

// 服务器多级目录下部署 vueJs 打包文件的目录地址
let _publicPath = "/";

let pages = {};
const moduleName = process.argv[3]; // 获取build后面的参数确定执行哪个文件

if (DEBUG) {
    pages = PAGES(); //判断开发环境不用分包处理
} else {
    //假如命令 npm run build-admin,就会得到 moduleName = index
    pages[moduleName] = PAGES(moduleName);

    // 假设打包后放在 二级目录
    _publicPath = _publicPath + moduleName; // 例：/page_1
}

const path = require('path')
function resolve(dir) {
    return path.join(__dirname, './', dir)
}

module.exports = {
    // 关闭SourceMap,关闭之后不仅能加快生产环境的打包速度，也能避免源码暴露在浏览器端
    productionSourceMap: false,
    //部署应用包时的基本 URL
    publicPath: _publicPath,
    outputDir: 'dist/' + moduleName,
    // 多页配置
    pages: pages,
    devServer: {
        historyApiFallback: {
            rewrites: [
                { from: /\/admin/, to: '/admin.html' },
                { from: /\/web/, to: '/web.html' }
            ]
        }
    },
    // 跨域代理 todo...
    // devServer: {
    //     proxy: {
    //         '/admin': {
    //             // 跨域API地址
    //             target: 'http://xxx.xx.com/',
    //             ws: true,
    //             changeOrigin: true,
    //         }
    //     }
    // },
    chainWebpack: config => {
        // 多页面模块分开编译js文件，chunk-vendors.js文件不包含全部依赖，分开到各自admin/web等模块js文件
        // 控制条件是minChunks字段，所以该字段的值是当前projects里面的html的个数
        config.optimization.splitChunks({
            cacheGroups: {
                vendors: {
                    name: 'chunk-vendors',
                    minChunks: 2,
                    chunks: 'initial'
                },
                common: {}
            }
        });
        // 配置webpack目录别名alias
        config.resolve.alias
            .set('@', resolve('./'))
        // svg loader
        const svgRule = config.module.rule('svg') // 找到svg-loader
        svgRule.uses.clear() // 清除已有的loader, 如果不这样做会添加在此loader之后
        svgRule.exclude.add(/node_modules/) // 正则匹配排除node_modules目录
        svgRule // 添加svg新的loader处理
            .test(/\.svg$/)
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
        // 修改images loader 添加svg处理
        const imagesRule = config.module.rule('images')
        imagesRule.exclude.add(resolve('/icons'))
        config.module
            .rule('images')
            .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
    },
}

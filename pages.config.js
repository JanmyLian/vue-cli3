const glob = require('glob')
module.exports = {
    PAGES: (projectName) => {
        let pages = {}
        const objectProject = {
            admin: {
                // 应用入口配置，相当于单页面应用的main.js，必需项
                entry: 'pages/admin/main.js',
                // 应用的模版，相当于单页面应用的public/index.html，可选项，省略时默认与模块名一致
                template: 'pages/admin/admin.html',
                // 待研究用hash加载html可以取消缓存，现在还缺nginx配置
                // filename: 'admin.[hash:8].html', 
                // 编译后在dist目录的输出文件名，可选项，省略时默认与模块名一致
                filename: 'admin.html',
                title: 'Admin Page',
                chunks: ['chunk-vendors', "chunk-common", 'admin']
            },
            web: {
                entry: 'pages/web/main.js',
                template: 'pages/web/web.html',
                filename: 'web.html',
                title: 'Web Page',
                chunks: ["chunk-vendors", "chunk-common", "web"]
            },
        }
        if(projectName){
            pages[projectName] = objectProject[projectName]
        }else{
            pages = objectProject
        }
        return pages
    }
}
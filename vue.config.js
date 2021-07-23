const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  // 部署应用包时的基本URL
  publicPath: './',

  // 打包输出目录
  outputDir: 'dist',

  // 存放静态资源（css,js,img)目录
  assetsDir: 'static',

  // 开发环境保存时做lint检查
  lintOnSave: process.env.NODE_ENV === 'development',

  productionSourceMap: false,

  // 是否使用包含运行时编译器的 Vue 构建版本
  runtimeCompiler: true,

  devServer: {
    port: 9001, // 端口号
    open: true, // 自动打开浏览器
    overlay: {
      // 浏览器同时显示错误和警告
      warnings: false,
      errors: true
    },
    proxy: {
      // 代理
      '/api/': {
        target: 'http://localhost:7300/mock/60f9196edbd67e1250897d71/', // 目标代理接口地址
        secure: false,
        pathRewrite: {
          // 接口前缀过滤
          '^/api/': ''
        }
      }
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, 'src/styles/index.less')] // 引入全局样式变量
    }
  },

  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
    } else {
      // 为开发环境修改配置...
    }
  },

  chainWebpack(config) {
    // set alias
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@c', resolve('src/components'))
      .set('@css', resolve('src/styles'))
      .set('@utils', resolve('src/utils'))
      .set('@img', resolve('src/assets/images'))

    // set svg-sprite-loader
    config.module.rule('svg').exclude.add(resolve('src/icons')).end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    // 全局引入scss
    // const oneOfsMap = config.module.rule('scss').oneOfs.store
    // oneOfsMap.forEach(item => {
    //   item
    //     .use('sass-resources-loader')
    //     .loader('sass-resources-loader')
    //     .options({
    //       // 全局变量资源路径
    //       resources: './src/styles/index.scss'
    //       // 也可以选择全局变量路径数组, 如果你有多个文件需要成为全局,就可以采用这种方法
    //       // resources: ['./path/to/vars.scss', './path/to/mixins.scss']
    //       // 或者你可以将多个scss文件@import到一个main.scss用第一种方法，都是可以的
    //     })
    //     .end()
    // })
  }
}

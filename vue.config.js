module.exports = {
  devServer: {
    open: true,
    host: 'localhost',
    port: 8000,
    proxy: {
      '/api': { // 1
        target: 'http://1.13.195.5:8080', // 2
        changOrigin: true,
        pathRewrite: { // 3
          '^/api': '',
        },
      },
      '/hello': {
        target: 'http://127.0.0.1:3000', // 2
        changOrigin: true,
        pathRewrite: { // 3
          '^/api': '',
        },
      },
    },
  },
  chainWebpack: (config) => {
    // 添加处理 .ico 文件的 loader
    config.module
      .rule('ico')
      .test(/\.ico$/)
      .use('url-loader')
      .loader('url-loader')
      .options({
        limit: 8192,
        name: 'images/[name].[hash:8].[ext]',
      })
  },
}

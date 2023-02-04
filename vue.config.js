const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8081, //部署端口
    proxy: {//配置跨域
      '/api': {
        target: 'http://localhost:8080/',
        changeOrigin: true, //允许跨域
        pathRewrite: {
          '^/api': '' //重写路径
        }
      }
    }
  }
})

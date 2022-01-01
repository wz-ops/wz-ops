module.exports = {
  devServer: {
    /* 自动打开浏览器 */
    open: true,
    /* 使用代理 */
    proxy: {
      // string | Object
      '/api': {
        /* 目标代理服务器地址 */
        target: 'https://www.wanandroid.com',
        /* 允许跨域 */
        changeOrigin: true, // 为true,服务器收到的请求头中收到的host为 www.wanandroid.com(说谎),为false服务器收到的请求头中收到的host为localhost:8080(不说谎)
        pathRewrite: {
          '^/api': '' // 规定请求地址以什么作为开头(如果请求的是以/api开头的路径就把/api替换为空字符,例: /api/tt => /tt)
        }
      }
    }
  }
}

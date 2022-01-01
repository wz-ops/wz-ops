import { createApp } from 'vue'
// 导入 mockServer模块
import '@/mock/mockServer.js'
// 导入 初始化样式
import '@/assets/css/reset.css'
// 导入 路由配置文件
import router from '@/router/index.js'
// 导入 App 组件
import App from './App.vue'
// 创建 app 应用实例
const app = createApp(App)
// 把VueRouter 设置为 createApp 实例的插件
app.use(router)
app.mount('#app')
// Vue3 全局挂载系统名称
app.config.globalProperties.$rootUrl = 'https://www.wanandroid.com'

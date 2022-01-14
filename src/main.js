import { createApp } from 'vue'
// 导入 mockServer模块
import '@/mock/mockServer.js'
// 导入 element-plus 全局配置文件中的组件列表
import { components } from '@/plugins/element.js'
// 导入 初始化样式
import '@/assets/css/reset.css'
// 导入 路由配置文件
import router from '@/router/index.js'
// 导入 App 组件
import App from './App.vue'
// 创建 app 应用实例
const app = createApp(App)

// 遍历其每一项都注册为全局组件
for (const el of components) {
  app.component(el.name, el)
  // 或 app.use(el)
}
// 把VueRouter 设置为 createApp 实例的插件
app.use(router)
/* Vue3 全局挂载系统名称(注意: 添加全局变量最好在 app.mount('#app') 挂载之前执行,
 因为之后添加的话, App组件已被创建且挂载, app实例对象是根据App组件创建的, 故获取不到, 即挂载失败) */
app.config.globalProperties.$rootUrl = 'https://www.wanandroid.com'
app.mount('#app')

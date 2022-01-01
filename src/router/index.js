// 导入路由
import { createRouter, createWebHashHistory } from 'vue-router'

// 路由配置信息
const routes = [
  { path: '/', component: () => import('@/views/Home/Home.vue') },
  { path: '/home', component: () => import('@/views/Home/Home.vue') }
]

// createRouter 创建 路由实例
const router = createRouter({
  history: createWebHashHistory(), // 使用 hash路由
  routes
})
// 导出路由实例
export default router

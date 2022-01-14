// 导入路由
import { createRouter, createWebHashHistory } from 'vue-router'

// 路由配置信息
const routes = [
  { path: '/', component: () => import('@/views/Home/Home.vue') },
  { path: '/home', component: () => import('@/views/Home/Home.vue') },
  { path: '/square', component: () => import('@/views/Square/Square.vue') },
  { path: '/ask_answer', component: () => import('@/views/AskAnswer/AskAnswer.vue') },
  { path: '/system', component: () => import('@/views/System/System.vue') },
  { path: '/project', component: () => import('@/views/Project/Project.vue') },
  { path: '/the_public', component: () => import('@/views/Public/Public.vue') },
  { name: 'projectClassification', path: '/project_classification', component: () => import('@/views/ProjectAssort/ProjectAssort.vue') },
  { path: '/nav', component: () => import('@/views/Nav/Nav.vue') }
]

// createRouter 创建 路由实例
const router = createRouter({
  history: createWebHashHistory(), // 使用 hash路由
  // 路由跳转时改变路由标签的样式, 这样指定后,在模板中就不必写 active-class, 减少冗余代码
  linkActiveClass: 'active',
  routes
})
// 导出路由实例
export default router

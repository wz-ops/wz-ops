// 请求 模块
// 导入commonAPI
import { commonAPI } from '@/api/request.js'

// 定义请求
// 1. 获取 首页banner
export const getBanner = () => commonAPI('get', '/api/banner/json')
// 2. 获取 置顶文章列表
export const getTopArt = () => commonAPI('get', '/api/article/top/json')
// 3. 获取 文章列表
export const getArt = (page_size) => commonAPI('get', '/api/article/list/0/json', { page_size })
// 4. 获取 常用网站
export const getWebsite = () => commonAPI('get', '/api/friend/json')
// 5. 获取首页 搜索热词
export const getKey = () => commonAPI('get', '/api/hotkey/json')

// mock 接口

// 1. 常用工具信息
export const getTools = () => commonAPI('get', '/tools')
// 2. 速查 信息
export const getChecks = () => commonAPI('get', '/checks')

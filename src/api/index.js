// 请求 模块
// 导入commonAPI
import { commonAPI } from '@/api/request.js'

// 定义请求
/* 首页 */
// 1. 获取 首页banner
export const getBanner = () => commonAPI('get', '/api/banner/json')
// 2. 获取 置顶文章列表
export const getTopArt = () => commonAPI('get', '/api/article/top/json')
// 3. 获取 文章列表
export const getArt = (size, page_size) => commonAPI('get', '/api/article/list/' + size + '/json', { page_size })
// 4. 获取 常用网站
export const getWebsite = () => commonAPI('get', '/api/friend/json')
// 5. 获取首页 搜索热词
export const getKey = () => commonAPI('get', '/api/hotkey/json')

// mock 接口

// 1. 常用工具信息
export const getTools = () => commonAPI('get', '/tools')
// 2. 速查 信息
export const getChecks = () => commonAPI('get', '/checks')

/* 广场 */
// 1. 获取 广场文章列表
export const getSquareArt = (size, page_size) => commonAPI('get', '/api/user_article/list/' + size + '/json', { page_size })

/* 问答 */
export const getAskAnswerArt = (size, page_size) => commonAPI('get', '/api/wenda/list/' + size + '/json', { page_size })

/* 体系 */
// 1. 体系分类
export const getSystemAssort = () => commonAPI('get', '/api/tree/json')

// 2. 体系文章
export const getSystemArt = (size, page_size, cid) => commonAPI('get', '/api/article/list/' + size + '/json', { page_size, cid })

// 项目
// 1. 热门项目文章
export const getProjectArt = (size, page_size) => commonAPI('get', '/api/article/listproject/' + size + '/json', { page_size })

// 公众号
// 1. 分享人列表
export const getChapters = () => commonAPI('get', '/api/wxarticle/chapters/json')
// 2. 公众号历史文章
export const getPublicArt = (publicId, size, page_size) => commonAPI('get', '/api/wxarticle/list/' + publicId + '/' + size + '/json', { page_size })
// 3. 公众号关键字查询历史文章
export const getHistoryPublicArt = ({ publicId, size, page_size, key }) => commonAPI('get', `/api/wxarticle/list/${publicId}/${size}/json?k=${key}`, { page_size })

// 项目分类
// 1. 项目分类列表数据
export const getProjectAssort = () => commonAPI('get', '/api/project/tree/json')
// 2. 项目分类文章数据
export const getProjectAssortArt = ({ cid, size, page_size }) => commonAPI('get', '/api/project/list/' + size + '/json', { page_size, cid })

// 导航
// 1. 导航列表数据
export const getNavList = () => commonAPI('get', '/api/navi/json')

// 搜索
// 1. 搜索页面数据(接口有问题)
// export const getSearchDetailArt = (size, page_size, k) => commonAPI('POST', `/api/article/query/${size}/json`, { page_size, k })

export const getSearchDetailArt = (size, page_size, author) => commonAPI('get', `/api/article/list/${size}/json`, { page_size, author })

// 登录
export const getLogin = (data) => commonAPI('post', '/api/user/login', data)
// 注册
// export const getRegister = (password, username, repassword) => commonAPI('post', '/api/user/register', { password, username, repassword })

// 工具
export const getMeans = () => commonAPI('get', '/means')

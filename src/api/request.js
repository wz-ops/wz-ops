// 创建 axios 实例 模块
// 导入 axios
import axios from 'axios'

// 创建 axios 实例
const request = axios.create({
  withCredentials: true //开启
})
export function commonAPI(method, url, params = null) {
  if (method.toLocaleLowerCase() === 'get') {
    return request.get(url, params ? { params } : '')
  } else if (method.toLocaleLowerCase() === 'post') {
    return request.post(url, params)
  }
}

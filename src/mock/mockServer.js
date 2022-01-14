// 导入 mockjs库
import Mock from 'mockjs'
// 导入 模板 json数据
import data from './toolCheck.json'
import datas from './navAssort.json'

// 常用工具信息
Mock.mock('/tools', { errorcode: 0, data: data.tools })
// 速查 信息
Mock.mock('/checks', { errorcode: 0, data: data.checks })

// 导航页面分类数据
Mock.mock('/nav_assort', { errorcode: 0, datas })
//该文件不用被导出,只需被执行即可

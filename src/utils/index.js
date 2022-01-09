// 导入mitt
// mitt用处: 由于 vue3 移除了 on off once 事件函数, 导致 类似于 vue2的 全局事件总线已不能正常使用,
// 故 要实现事件总线, 兄弟之间任意传值, 要使用 官方推荐的 mitt包
// 安装: npm i mitt
// 发射器 emit('自定义事件名', 数据), 在要使用的组件中导入 该模块
// 接收器 on('自定义事件名', 回调函数)
import mitt from 'mitt'
// 创建mitt实例并导出
const bus = mitt()
export default bus

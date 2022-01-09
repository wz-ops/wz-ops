import { onMounted, ref, reactive, onBeforeUnmount } from 'vue'

/* emit: 调用自定义函数, callback => 请求文章数据的函数 */
export default function usescrollLoad({ emit, callback }) {
  // 控制每页显示的数据数量
  let pageSize = ref(18)
  // 当前页码值
  let size = ref(0)
  // 是否加载
  let loading = ref(true)
  let pageCount
  // 文章数据列表
  let artData = reactive([])
  // 初始时请求数据
  getArtFun(size.value, pageSize.value)
  onMounted(() => {
    // 监听页面滚动事件
    window.addEventListener('scroll', scrollLoad)
  })
  // 请求文章数据函数
  async function getArtFun(size, pageSize) {
    // 执行了请求函数, 说明数据还在加载, 故 把 true 传过去,不显示 Footer组件
    emit('showFooter', loading.value)
    // 注意: 一个异步函数 把 async await 后获得的数据返回出去 仍是一个promise对象
    // 非置顶文章
    let result = await callback(size, pageSize)
    // 判断数据是否请求成功
    if (result.status === 200) {
      // 解构赋值 非置顶文章
      let {
        data: {
          data: { datas: res }
        }
      } = result

      // 三点运算符(把置顶与非置顶文章整合到一个数组中)
      artData.push(...res)
      pageCount = result.data.data.pageCount
    }
  }
  // 向下滚动时的回调
  function scrollLoad() {
    // 获取可视区域的高度
    let wh = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    // 获取被卷去的文档的高度
    let scrollWh = document.documentElement.scrollTop || document.body.scrollTop
    // 获取 文档的高度(获取文档可滚动的高度)
    let docWh = document.documentElement.scrollHeight || document.body.scrollHeight
    // console.log(wh + scrollWh, docWh)
    // 有些小误差, 故使用短路来判断.
    if (Math.round(wh + scrollWh) === docWh || Math.ceil(wh + scrollWh) === docWh || Math.floor(wh + scrollWh) === docWh) {
      if (size.value > pageCount) {
        window.removeEventListener('scroll', scrollLoad)
        loading.value = false
        // loading.value的值为 false, 说明数据加载完毕, 故 把 false 传过去,显示 Footer组件
        emit('showFooter', loading.value)
        size.value = pageCount
        return
      }
      size.value++
      if (loading.value) getArtFun(size.value, pageSize.value)
    }
  }
  onBeforeUnmount(() => {
    // 在组件销毁前也得移除 window身上的滚动事件...
    window.removeEventListener('scroll', scrollLoad)
    // 把footer组件改为 不显示
    emit('showFooter', true)
  })
  return {
    loading,
    artData
  }
}

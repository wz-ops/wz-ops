import { reactive, ref } from 'vue'
/* fun 是 获取文章数据的回调函数 id值是 分类的id */
export default function useelementuipagination(emit, fun, id) {
  // 文章列表数据
  const artData = reactive([])
  // 双向绑定 => 当前页码值
  // 当前页码
  const curPage = ref(1)
  // 每页数据条数
  const pageSize = ref(20)
  // 总记录
  const total = ref(0)
  // 总页码
  const totalPage = ref(0)
  //分类id
  const cid = ref(id)

  // 当页码值改变时触发
  function changePage(callback) {
    callback(cid.value, curPage.value, pageSize.value)
  }
  // 点击公众号分类时触发
  function earnArt(id) {
    cid.value = id
    // 返回初始页码,防止用户点击的分类无第2,3,4...页
    curPage.value = 1
    changePage(fun)
  }
  // 公共代码
  function commonCode(result) {
    if (result.data.errorCode === 0) {
      // 每次请求成功后先把原数据清空
      artData.splice(0)
      let {
        data: { data: res }
      } = result
      curPage.value = res.curPage
      total.value = res.total
      totalPage.value = res.pageCount
      // 说明数据请求成功且数据正确,把数据解构到 artData中
      artData.push(...res.datas)
      // 文章数据请求回来后 返回顶部
      document.documentElement ? (document.documentElement.scrollTop = 0) : (document.body.scrollTop = 0)
      // 文章数据请求 把 footer组件显示出来
      emit('showFooter', false)
    }
  }
  return {
    earnArt,
    commonCode,
    changePage,
    curPage,
    pageSize,
    total,
    totalPage,
    artData
  }
}

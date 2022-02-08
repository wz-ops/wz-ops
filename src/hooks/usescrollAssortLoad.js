import { onMounted, ref, reactive, onBeforeUnmount } from 'vue'
// 导入 mitt实例
import bus from '@/utils'

/* emit: 调用自定义函数, callback => 请求文章数据的函数 */
export default function usescrollAssortLoad({ emit, callback, callback1 }) {
  //#region
  // 控制每页显示的数据数量
  let pageSize = ref(16)
  // 当前页码值
  let size = ref(0)
  // 是否加载
  let loading = ref(true)
  let pageCount
  // 文章数据列表
  let artData = reactive([])

  // 存储 分类数据
  const assort = reactive([])
  // 存储 二级分类的数据
  const secondAssortList = reactive([])
  // 存储 用户点击一级分类的 id(默认是一级分类数据的第一个)
  // (主要作用是 比对 该 一级id 与数据中的哪个id值相同, 以达到切换 类名 'cur_assort'的作用)
  let curOneId = ref(0)
  // 存储 用户点击二级分类的 id(默认是二级分类数据的第一个)
  /*(
        主要作用是:
          1.比对 该 二级id 与数据中的哪个id值相同, 以达到切换 类名 'cur_assort'的作用
          2.根据该 id 发起请求 获取相应的体系文章数据
      )*/
  let curTwoId = ref(0)
  //#endregion
  onMounted(() => {
    // 监听页面滚动事件
    window.addEventListener('scroll', scrollLoad)
  })
  // 获取 体系二级分类的文章的方法
  async function getArtFun(size, pageSize, cid, NoDelete) {
    // 执行了请求函数, 说明数据还在加载, 故 把 true 传过去,不显示 Footer组件
    emit('showFooter', loading.value)
    // 注意: 一个异步函数 把 async await 后获得的数据返回出去 仍是一个promise对象
    // 文章
    let result = await callback(size, pageSize, cid)
    // 判断数据是否请求成功
    if (result.status === 200) {
      // 解构赋值 文章
      let {
        data: {
          data: { datas: res }
        }
      } = result

      if (NoDelete) {
        // 执行这里,说明是向下滚动加载更多,直接追加即可
        artData.push(...res)
      } else {
        // 执行这里,说明是用户点击了一级或二级分类,得先删除文章列表的所有数据再追加
        artData.splice(0)
        artData.push(...res)
      }
      if (artData.length < pageSize) {
        // 执行这说明数据太少, 无滚动
        end()
      }
      // 发送方模块
      if (artData.length < 4) {
        bus.emit('footerFix', true)
      } else {
        bus.emit('footerFix', false)
      }
      // 获取得到 每个分类 文章数据的页数
      pageCount = result.data.data.pageCount
    }
  }
  // 获取 分类数据的方法
  async function getSystemAssortFun() {
    const result = await callback1()
    if (result.status === 200) {
      // 请求分类数据成功
      // 1. 存储 数据到 assort
      assort.push(...result.data.data)
      // 2. 存储 数据到 secondAssortList
      secondAssortList.push(...assort[0].children)
      // 默认 用户点击的 一级分类数据id为 一级分类数据的第一个
      curOneId.value = assort[0].id
      // 默认 用户点击的 二级分类数据id为 二级分类数据的第一个
      curTwoId.value = assort[0].children[0].id
      // 根据 用户点击存储的二级分类的id发起请求,获取 相应文章数据
      getArtFun(size.value, pageSize.value, curTwoId.value, true)
    }
  }
  // 获取 体系二级分类的文章的方法
  // 根据用户点击的一级分类显示相应的二级分类数据
  function showSecondAssort(child, oneId) {
    size.value = 0
    // 当点击一级分类时先把 二级分类数据清空
    secondAssortList.splice(0)
    // 再根据用户点击传过来的二级分类数据追加进去
    secondAssortList.push(...child)
    // 根据用户点击传过来的最新的二级分类中第一个元素的id把旧的二级分类第一个元素的id替换掉,保持数据始终处于最新的状态
    curTwoId.value = child[0].id
    //  根据用户点击传过来的最新的一级级分类id把旧的一级分类的id替换掉,保持数据始终处于最新的状态
    curOneId.value = oneId
    // 根据点击的一级分类再次发起请求获取 相应文章数据
    getArtFun(size.value, pageSize.value, curTwoId.value, false)
  }
  function currentTwoAssort(twoId) {
    size.value = 0
    // 根据用户点击的二级分类传过来的相应的二级分类id, 把 旧的二级分类的id替换掉, 以数据始终处于最新的状态
    curTwoId.value = twoId
    // 根据点击的二级分类再次发起请求获取 相应文章数据
    getArtFun(size.value, pageSize.value, twoId, false)
  }
  getSystemAssortFun()
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
      if (size.value >= pageCount) {
        end()
        return
      }
      size.value++
      if (loading.value) getArtFun(size.value, pageSize.value, curTwoId.value, true)
    }
  }
  function end() {
    window.removeEventListener('scroll', scrollLoad)
    loading.value = false
    // loading.value的值为 false, 说明数据加载完毕, 故 把 false 传过去,显示 Footer组件
    emit('showFooter', loading.value)
    size.value = pageCount
  }
  onBeforeUnmount(() => {
    // 在组件销毁前也得移除 window身上的滚动事件...
    window.removeEventListener('scroll', scrollLoad)
    // 卸载前把footer组件隐藏
    emit('showFooter', true)
  })
  return {
    loading,
    artData,
    assort,
    secondAssortList,
    curTwoId,
    curOneId,
    showSecondAssort,
    currentTwoAssort
  }
}

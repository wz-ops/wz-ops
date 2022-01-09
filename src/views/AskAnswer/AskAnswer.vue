<template>
  <div class="container clear-fix">
    <!-- 广场模块 -->
    <div class="container_content clear-fix">
      <div class="container_content_left">
        <div class="block">
          <h2 class="title ellipsis">
            <router-link to="/ask_answer" style="color: #2782ef">问答</router-link> > <span v-if="artData" style="color: red">{{ artData[0].chapterName }}</span>
          </h2>
        </div>
        <Article :artData="artData">
          <template v-slot:bottom_desc="{ item }">
            <span class="tag" v-for="(tag, index) in item.tags" :key="index">
              <a href="">{{ tag.name }}</a>
            </span>
            <span class="author">
              作者： <a href="#">{{ item.author }}</a>
            </span>
            <span class="achapter">
              分类：
              <a href="#">{{ item.superChapterName }}</a>
              /
              <a href="#">{{ item.chapterName }}</a>
            </span>
            <span class="aniceDate">时间：{{ item.niceShareDate }}</span>
          </template>
        </Article>
        <Pagination v-if="artData" @getNewCurPage="setCurpage" :curPage="curPage" :pageCount="pageCount" :total="total" />
      </div>
      <div class="container_content_right">
        <Search />
        <SearchKey title="大家都在搜" />
        <div class="block mt20">
          <h2 class="title"><span>便捷入口</span></h2>
          <ul class="convenient">
            <li>
              <img src="https://www.wanandroid.com/blogimgs/b1bd944a-4a9e-4722-81c5-079676422c5e.jpg" alt="" />
            </li>
            <li>
              <img src="https://www.wanandroid.com/blogimgs/9d04f303-fc08-4582-b50d-4dedb1f566c9.jpg" alt="" />
            </li>
            <li>
              <img src="https://www.wanandroid.com/blogimgs/f425c236-61da-4c2a-b576-b4feb1e86f72.jpg" alt="" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onBeforeUnmount, reactive, ref, toRef, watchEffect } from 'vue'
// 问答文章接口
import { getAskAnswerArt } from '@/api/index.js'
// 分页组件
import Pagination from '@/components/Pagination/Pagination.vue'
// 文章组件
import Article from '@/components/Article/Article.vue'
// 搜索组件
import Search from '@/components/Search/Search.vue'
// 热词搜索
import SearchKey from '@/components/SearchKey/SearchKey.vue'
export default {
  name: 'AskAnswer',
  components: { Pagination, Article, Search, SearchKey },
  emits: ['showFooter'],
  setup(_, { emit }) {
    let data = reactive({})
    // 当前页码值
    const size = ref(1)
    // 每页条数
    const page_size = 20
    // 请求问答文章数据 方法
    async function getAskAnswerArtFun(size, page_size) {
      const result = await getAskAnswerArt(size, page_size)
      if (result.status === 200) {
        // 可以把任意多个的源对象自身的可枚举属性拷贝给目标对象，然后返回目标对象。Object.assign(target, ...sources)
        // 目的: 为了不破坏响应式
        Object.assign(data, result.data.data)
        // 文章数据请求回来后 返回顶部
        document.documentElement ? (document.documentElement.scrollTop = 0) : (document.body.scrollTop = 0)
        // 文章数据请求 把 footer组件显示出来
        emit('showFooter', false)
      }
    }
    function setCurpage(page) {
      size.value = page
    }
    // 组件销毁前把 footer组件改回隐藏
    onBeforeUnmount(() => {
      emit('showFooter', true)
    })
    // watchEffect 默认开启 immediate配置项, 且其回调中用到哪个属性就会监视哪个属性
    // 而我这 唯一变化的值是 size 故监听 size...
    watchEffect(() => {
      // 请求问答文章数据 实现
      getAskAnswerArtFun(size.value, page_size)
    })
    return {
      setCurpage,
      pageCount: toRef(data, 'pageCount'),
      total: toRef(data, 'total'),
      artData: toRef(data, 'datas'),
      curPage: toRef(data, 'curPage')
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/css/public.less';
.convenient {
  li {
    padding: 5px;
    img {
      width: 100%;
      height: 100%;
      vertical-align: middle;
    }
  }
}
</style>

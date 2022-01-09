<template>
  <div class="container clear-fix">
    <!-- 广场模块 -->
    <div class="container_content clear-fix">
      <div class="container_content_left">
        <div class="block">
          <h2 class="title ellipsis"><span>近期分享</span></h2>
        </div>
        <Article :artData="artData">
          <template v-slot:bottom_desc="{ item }">
            <span class="fresh" v-if="item.fresh">新</span>
            <span class="tag" v-for="(tag, index) in item.tags" :key="index">
              <a href="">{{ tag.name }}</a>
            </span>
            <span class="author">
              分享人： <a href="#">{{ item.shareUser }}</a>
            </span>
            <span class="aniceDate">时间：{{ item.niceDate === '刚刚' ? item.niceDate : item.niceShareDate }}</span>
          </template>
        </Article>
      </div>
      <div class="container_content_right">
        <Search />
        <SearchKey />
      </div>
    </div>
  </div>
  <Loading v-if="artData" :loading="loading" />
</template>

<script>
import { getSquareArt } from '@/api/index.js'
import usescrollLoad from '@/hooks/usescrollLoad.js'
import Article from '@/components/Article/Article.vue'
import Loading from '@/components/Loading/Loading.vue'
import Search from '@/components/Search/Search.vue'
import SearchKey from '@/components/SearchKey/SearchKey.vue'
export default {
  name: 'Square',
  components: { Article, Loading, Search, SearchKey },
  emits: ['showFooter'],
  setup(_, { emit }) {
    // 导入 hook (一个跟下拉加载 相关联 的函数)
    let { loading, artData } = usescrollLoad({ emit, callback: getSquareArt })
    return {
      loading,
      artData
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/css/public.less';
</style>

<template>
  <div class="container clear-fix">
    <!-- 广场模块 -->
    <div class="container_content clear-fix">
      <div class="container_content_left">
        <div class="detail" v-if="k">
          你可能在找 <span style="color: #2782ef">&nbsp;作者: &nbsp;{{ k }}</span>
        </div>
        <div class="block">
          <h2 class="title ellipsis">
            <span
              >{{ title }} <span style="color: red"> {{ k }}</span></span
            >
          </h2>
        </div>
        <Article :artData="artData">
          <!-- 这里为了复用运用了双层插槽 -->
          <template v-slot:bottom_desc="{ item }">
            <slot :item="item"></slot>
          </template>
        </Article>
      </div>
      <div class="container_content_right">
        <Search />
        <SearchKey title="大家都在搜" />
      </div>
    </div>
  </div>
  <Loading v-if="artData.length" :loading="loading" />
</template>

<script>
import usescrollLoad from '@/hooks/usescrollLoad.js'
import Article from '@/components/Article/Article.vue'
import Loading from '@/components/Loading/Loading.vue'
import Search from '@/components/Search/Search.vue'
import SearchKey from '@/components/SearchKey/SearchKey.vue'
export default {
  name: 'PublicCommon',
  components: { Article, Loading, Search, SearchKey },
  emits: ['showFooter'],
  props: ['funApi', 'k', 'title'],
  setup(props, { emit }) {
    // 导入 hook (一个跟下拉加载 相关联 的函数)
    let { loading, artData } = usescrollLoad({ emit, callback: props.funApi, k: props.k })
    return {
      loading,
      artData
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/css/public.less';
.detail {
  height: 50px;
  line-height: 50px;
  box-shadow: 0 0 3px #ccc;
  background-color: #fff;
  margin-bottom: 30px;
  padding-left: 10px;
}
</style>

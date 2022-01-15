<template>
  <PublicCommon :funApi="getSearchDetailArt" :k="k" title="搜索关键字:">
    <template v-slot="{ item }">
      <span class="author" v-if="item.author">
        作者： <a href="#">{{ item.author }}</a>
      </span>
      <span class="achapter">
        分类：
        <a href="#">{{ item.superChapterName }}</a>
        /
        <a href="#">{{ item.chapterName }}</a>
      </span>
      <span class="aniceDate">时间：{{ item.niceDate || item.niceShareDate }}</span>
    </template>
  </PublicCommon>
</template>
<script>
import { ref } from '@vue/reactivity'
import { useRoute } from 'vue-router'
import { getSearchDetailArt } from '@/api/index.js'
import PublicCommon from '@/components/PublicCommon/PublicCommon.vue'
export default {
  name: 'Square',
  components: { PublicCommon },
  setup() {
    // 创建路由信息实例
    const route = useRoute()
    const k = ref(route.query.key)
    return {
      getSearchDetailArt,
      k
    }
  }
}
</script>
<style lang="less" scoped></style>

<template>
  <PublicCommon :funApi="getSquareArt" title="近期分享">
    <template v-slot="{ item }">
      <slot :item="item"></slot>
      <span class="fresh" v-if="item.fresh">新</span>
      <span class="tag" v-for="(tag, index) in item.tags" :key="index">
        <a href="">{{ tag.name }}</a>
      </span>
      <span class="author">
        分享人： <a href="#">{{ item.shareUser }}</a>
      </span>
      <span class="aniceDate">时间：{{ item.niceDate === '刚刚' ? item.niceDate : item.niceShareDate }}</span>
    </template>
  </PublicCommon>
</template>
<script>
import { getSquareArt } from '@/api/index.js'
import PublicCommon from '@/components/PublicCommon/PublicCommon.vue'
export default {
  name: 'Square',
  components: { PublicCommon },
  setup() {
    return {
      getSquareArt
    }
  }
}
</script>
<style lang="less" scoped></style>

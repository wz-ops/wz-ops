<template>
  <div class="container">
    <!-- 广场模块 -->
    <div class="container_content">
      <div class="container_content_left">
        <HoemArticle />
      </div>
      <div class="container_content_right"></div>
    </div>
  </div>
</template>

<script>
import HoemArticle from '@/components/HomeArticle/HoemArticle.vue'
export default {
  name: 'Square',
  components: { HoemArticle }
}
</script>

<style></style>

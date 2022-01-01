<template>
  <Header />
  <router-view></router-view>
</template>

<script>
// 导入字体图标css样式
import '@/assets/fonts/iconfont.css'
import Header from '@/components/Header/Header.vue'
export default {
  name: 'App',
  components: {
    Header
  }
}
</script>

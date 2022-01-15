<template>
  <footer class="footer" :style="fixed ? styPosition : ''">
    <p class="mt10">
      &copy;2020&nbsp;·&nbsp;wanandroid.com&nbsp;·&nbsp;All Rights Reserved.&nbsp;
      <a href="http://www.beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">皖ICP备17022096号</a>&nbsp;
      <a :href="rootUrl + '/about'">关于我们</a>
    </p>
  </footer>
</template>

<script>
import { ref, inject, reactive, onMounted } from 'vue'
//导入 mitt实例
import bus from '@/utils'
export default {
  name: 'Footer',
  setup() {
    let rootUrl = inject('rootUrl')
    const fixed = ref(false)
    // 获取 footer盒子 DOM元素
    const footerRef = ref(null)
    const styPosition = reactive({
      // 应该用粘性定位, 粘性定位是相对定位和固定定位的结合体...
      position: 'sticky',
      left: 0,
      bottom: 0
    })
    onMounted(() => {
      // 接收方
      bus.on('footerFix', (fix) => {
        fixed.value = fix
      })
    })
    return {
      rootUrl,
      footerRef,
      fixed,
      styPosition
    }
  }
}
</script>

<style lang="less" scoped>
.footer {
  width: 100%;
  height: 60px;
  margin-top: 30px;
  background-color: #fff;
  font-size: 14px;
  border-top: 1px solid #e4dede;
  .mt10 {
    margin-top: 10px;
    line-height: 40px;
    color: #767676;
    text-align: center;
    > a {
      text-decoration: underline;
      color: #767676;
    }
  }
}
</style>
